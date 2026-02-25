'use client';

import { useState } from 'react';
import GradeCalculator from '@/components/grade-calculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <GradeCalculator />
    </main>
  );
}
