'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ModuleCard from '@/components/module-card';
import ResultHeader from '@/components/result-header';
import { Sun, Moon } from 'lucide-react';

interface SubjectInput {
  name: string;
  coefficient: number;
  ds?: number;
  ex?: number;
  tp?: number;
}

interface Module {
  name: string;
  coefficient: number;
  subjects: SubjectInput[];
}

const MODULES: Module[] = [
  {
    name: 'Probabilité',
    coefficient: 2,
    subjects: [
      { name: 'Probabilité', coefficient: 2, ds: undefined, tp: undefined, ex: undefined }
    ]
  },
  {
    name: 'Automates et Optimisation',
    coefficient: 2,
    subjects: [
      { name: 'Théorie des langages', coefficient: 1, ds: undefined, ex: undefined },
      { name: 'Théorie de Graphe', coefficient: 1, ds: undefined, ex: undefined }
    ]
  },
  {
    name: 'CPOO',
    coefficient: 3.5,
    subjects: [
      { name: 'Conception SI', coefficient: 1.5, ds: undefined, ex: undefined },
      { name: 'Programmation Java', coefficient: 2, ds: undefined, tp: undefined, ex: undefined }
    ]
  },
  {
    name: 'BDD & Réseaux',
    coefficient: 2.5,
    subjects: [
      { name: 'Ingénierie BDD', coefficient: 1.5, ds: undefined, tp: undefined, ex: undefined },
      { name: 'Services Réseaux', coefficient: 1, ds: undefined, tp: undefined, ex: undefined }
    ]
  },
  {
    name: 'Langue & Culture',
    coefficient: 2,
    subjects: [
      { name: 'Anglais', coefficient: 1 },
      { name: 'Gestion d\'entreprise', coefficient: 1 }
    ]
  }
  ,
  {
    name: 'Unité optionelle',
    coefficient: 3,
    subjects: [
      { name: 'POO', coefficient: 1.5, ds: undefined, tp: undefined, ex: undefined },
      { name: 'Cryptographie', coefficient: 1.5, ds: undefined, tp: undefined, ex: undefined }
    ]
  }
];

export default function GradeCalculator() {
  const [inputGrades, setInputGrades] = useState<{ [key: string]: { [key: string]: number | undefined } }>({});
  const [calculatedGrades, setCalculatedGrades] = useState<{ [key: string]: { [key: string]: number | undefined } }>({});
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const calculateSubjectGrade = (subject: SubjectInput, subjectKey: string, useInputGrades: boolean = false): number | null => {
    const values = (useInputGrades ? inputGrades : calculatedGrades)[subjectKey] || {};

    if (subject.name === 'Probabilité') {
      const ds = values.ds ?? null;
      const tp = values.tp ?? null;
      const ex = values.ex ?? null;
      if (ds !== null && tp !== null && ex !== null) {
        return (1 * ds + 2 * tp + 7 * ex) / 10;
      }
    } else if (subject.name === 'Théorie des langages' || subject.name === 'Théorie de Graphe') {
      const ds = values.ds ?? null;
      const ex = values.ex ?? null;
      if (ds !== null && ex !== null) {
        return (3 * ds + 7 * ex) / 10;
      }
    } else if (subject.name === 'Conception SI') {
      const ds = values.ds ?? null;
      const ex = values.ex ?? null;
      if (ds !== null && ex !== null) {
        return (3 * ds + 7 * ex) / 10;
      }
    } else if (subject.name === 'Programmation Java') {
      const ds = values.ds ?? null;
      const tp = values.tp ?? null;
      const ex = values.ex ?? null;
      if (ds !== null && tp !== null && ex !== null) {
        return (1 * ds + 2 * tp + 7 * ex) / 10;
      }
    } else if (subject.name === 'POO' || subject.name === 'Cryptographie') {
      const ds = values.ds ?? null;
      const tp = values.tp ?? null;
      const ex = values.ex ?? null;
      if (ds !== null && tp !== null && ex !== null) {
        return (1 * ds + 2 * tp + 7 * ex) / 10;
      }
    } else if (subject.name === 'Ingénierie BDD') {
      const ds = values.ds ?? null;
      const tp = values.tp ?? null;
      const ex = values.ex ?? null;
      if (ds !== null && tp !== null && ex !== null) {
        return (1 * ds + 2 * tp + 7 * ex) / 10;
      }
    } else if (subject.name === 'Services Réseaux') {
      const ds = values.ds ?? null;
      const tp = values.tp ?? null;
      const ex = values.ex ?? null;
      if (ds !== null && tp !== null && ex !== null) {
        return (1 * ds + 2 * tp + 7 * ex) / 10;
      }
    } else if (subject.name === 'Anglais' || subject.name === 'Gestion d\'entreprise') {
      const ds1 = values.ds1 ?? null;
      const ds2 = values.ds2 ?? null;
      if (ds1 !== null && ds2 !== null) {
        return (ds1 + ds2) / 2;
      }
    }

    return null;
  };

  const grades = useMemo(() => calculatedGrades, [calculatedGrades]);

  const totalAverage = useMemo(() => {
    let totalWeightedGrade = 0;
    let totalCoefficient = 0;

    MODULES.forEach((module) => {
      const moduleAverage = getModuleAverageRealTime(module.subjects, module.name);
      if (moduleAverage !== null) {
        totalWeightedGrade += moduleAverage * module.coefficient;
        totalCoefficient += module.coefficient;
      }
    });

    console.log(totalCoefficient)

    if (totalCoefficient === 0) return null;
    return totalWeightedGrade / totalCoefficient;
  }, [grades]);

  function getModuleAverageRealTime(moduleSubjects: SubjectInput[], moduleName: string): number | null {
    let totalGrade = 0;
    let totalSubjects = moduleSubjects.length;

    if (totalSubjects === 0) return null;

    moduleSubjects.forEach((subject, idx) => {
      const subjectKey = `${moduleName}-${idx}`;
      const grade = calculateSubjectGrade(subject, subjectKey, true);
      totalGrade += grade !== null ? grade : 0;
    });

    return totalGrade / totalSubjects;
  }

  const handleGradeChange = (moduleIndex: number, subjectIndex: number, field: string, value: string) => {
    const module = MODULES[moduleIndex];
    const subjectKey = `${module.name}-${subjectIndex}`;
    const numValue = value === '' ? undefined : Math.min(Math.max(parseFloat(value) || 0, 0), 20);

    setInputGrades(prev => ({
      ...prev,
      [subjectKey]: {
        ...prev[subjectKey],
        [field]: numValue
      }
    }));
  };

  const handleCalculate = () => {
    setCalculatedGrades(inputGrades);
  };

  const handleReset = () => {
    setInputGrades({});
    setCalculatedGrades({});
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="relative min-h-screen pb-32 bg-background text-foreground transition-colors">
      <ResultHeader totalAverage={totalAverage} />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-12 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-pretty">
              Semester Grade Calculator
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Calculate your weighted GPA across all modules and subjects
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-accent" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {MODULES.map((module, moduleIdx) => (
            <ModuleCard
              key={moduleIdx}
              module={module}
              moduleIndex={moduleIdx}
              grades={inputGrades as { [key: string]: { [key: string]: number } }}
              onGradeChange={handleGradeChange}
              calculateSubjectGrade={calculateSubjectGrade}
              getModuleAverageRealTime={getModuleAverageRealTime}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex justify-center gap-4">
          <Button
            onClick={handleCalculate}
            className="px-8 py-2 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Calculate
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="px-8 py-2 text-base font-semibold rounded-lg border-2 border-border hover:bg-muted transition-colors"
          >
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
}
