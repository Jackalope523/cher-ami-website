'use client';

import { useEffect, useState } from 'react';

function getNextPrintMonth() {
  const now = new Date();
  const nextPrint = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return nextPrint.toLocaleString('en-US', { month: 'long' });
}

export default function NextPrintNotice({ className = '' }: { className?: string }) {
  const [month, setMonth] = useState<string | null>(null);

  useEffect(() => {
    setMonth(getNextPrintMonth());
  }, []);

  if (!month) return null;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 bg-[#C15F3C]/10 rounded-full animate-fade-in ${className}`}>
      <p className="text-[0.85rem] text-[#C15F3C] font-medium">
        Your next magazine prints {month} 1st!
      </p>
    </div>
  );
}
