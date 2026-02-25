'use client';

import GradeInput from '@/components/grade-input';

interface SubjectInput {
  name: string;
  coefficient: number;
  ds?: number;
  ex?: number;
  tp?: number;
}

interface Props {
  subject: SubjectInput;
  moduleIndex: number;
  subjectIndex: number;
  moduleName: string;
  grades: { [key: string]: { [key: string]: number } };
  onGradeChange: (moduleIndex: number, subjectIndex: number, field: string, value: string) => void;
  calculateSubjectGrade: (subject: SubjectInput, subjectKey: string) => number | null;
}

export default function SubjectInput({
  subject,
  moduleIndex,
  subjectIndex,
  moduleName,
  grades,
  onGradeChange,
  calculateSubjectGrade
}: Props) {
  const subjectKey = `${moduleName}-${subjectIndex}`;
  const grade = calculateSubjectGrade(subject, subjectKey);
  const values = grades[subjectKey] || {};

  // Determine the input fields based on subject
  const getInputFields = () => {
    if (
      subject.name === 'Théorie des langages' ||
      subject.name === 'Théorie de Graphe' ||
      subject.name === 'Conception SI'
    ) {
      return ['ds', 'ex'];
    } else if (
      subject.name === 'Probabilité' ||
      subject.name === 'Programmation Java' ||
      subject.name === 'Ingénierie BDD' ||
      subject.name === 'Services Réseaux' ||
      subject.name === 'POO' ||
      subject.name === 'Cryptographie'
    ) {
      return ['ds', 'tp', 'ex'];
    } else if (subject.name === 'Anglais' ||
               subject.name === 'Gestion d\'entreprise') {
      return ['ds1', 'ds2'];
    }
    return [];
  };

  const inputFields = getInputFields();

  return (
    <div className="bg-muted/40 rounded-xl p-4 border border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{subject.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">Coeff: {subject.coefficient}</p>
        </div>
        {grade !== null && (
          <div className="text-right">
            <div className="text-xl font-bold text-primary">
              {grade.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">/20</div>
          </div>
        )}
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {inputFields.map((field) => (
          <GradeInput
            key={field}
            field={field}
            value={values[field] ?? ''}
            onChange={(value) => onGradeChange(moduleIndex, subjectIndex, field, value)}
            label={getFieldLabel(field)}
          />
        ))}
      </div>
    </div>
  );
}

function getFieldLabel(field: string): string {
  const labels: { [key: string]: string } = {
    ds: 'DS',
    ds1: 'DS1',
    ds2: 'DS2',
    ex: 'EX',
    tp: 'TP'
  };
  return labels[field] || field;
}
