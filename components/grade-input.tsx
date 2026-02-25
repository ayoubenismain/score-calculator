'use client';

import { useState } from 'react';

interface Props {
  field: string;
  value: string | number;
  onChange: (value: string) => void;
  label: string;
}

export default function GradeInput({ field, value, onChange, label }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const isValid = value === '' || (Number(value) >= 0 && Number(value) <= 20);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-foreground uppercase tracking-wide">
        {label}
      </label>
      <input
        type="number"
        min="0"
        max="20"
        step="0.5"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="0"
        className={`w-full px-3 py-2.5 rounded-lg text-center font-semibold transition-all duration-200 border-2 ${
          !isValid
            ? 'border-destructive bg-destructive/10 text-destructive'
            : isFocused
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-border bg-input text-foreground hover:border-primary/50'
        } focus:outline-none focus:ring-2 focus:ring-primary/20`}
      />
      {!isValid && (
        <p className="text-xs text-destructive font-medium">Must be 0-20</p>
      )}
    </div>
  );
}
