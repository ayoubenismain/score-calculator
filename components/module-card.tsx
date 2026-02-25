'use client';

import SubjectInput from '@/components/subject-input';

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

interface Props {
  module: Module;
  moduleIndex: number;
  grades: { [key: string]: { [key: string]: number } };
  onGradeChange: (moduleIndex: number, subjectIndex: number, field: string, value: string) => void;
  calculateSubjectGrade: (subject: SubjectInput, subjectKey: string, useInputGrades?: boolean) => number | null;
  getModuleAverageRealTime: (subjects: SubjectInput[], moduleName: string) => number | null;
}

export default function ModuleCard({
  module,
  moduleIndex,
  grades,
  onGradeChange,
  calculateSubjectGrade,
  getModuleAverageRealTime
}: Props) {
  // Calculate module average in real-time
  const moduleAverage = getModuleAverageRealTime(module.subjects, module.name);

  return (
    <div className="backdrop-blur-xl bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">{module.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">Coefficient: {module.coefficient}</p>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></div>
      </div>

      {/* Subjects */}
      <div className="space-y-3 mb-6">
        {module.subjects.map((subject, subjectIdx) => (
          <SubjectInput
            key={subjectIdx}
            subject={subject}
            moduleIndex={moduleIndex}
            subjectIndex={subjectIdx}
            moduleName={module.name}
            grades={grades}
            onGradeChange={onGradeChange}
            calculateSubjectGrade={calculateSubjectGrade}
          />
        ))}
      </div>

      {/* Center Module Average Button */}
      {moduleAverage !== null && (
        <div className="flex justify-center mt-6">
          <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl px-8 py-3 text-center shadow-md">
            <div className="text-sm font-medium opacity-90">Module Average</div>
            <div className="text-3xl font-bold">{moduleAverage.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
