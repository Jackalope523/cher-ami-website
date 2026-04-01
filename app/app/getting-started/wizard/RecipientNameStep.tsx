'use client';

import { useState } from 'react';

interface RecipientNameStepProps {
  onNext: (name: string) => void;
}

export default function RecipientNameStep({ onNext }: RecipientNameStepProps) {
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col pt-6">
      <h1 className="text-[32px] font-medium text-[#242832] mb-3">
        Who will receive your magazine?
      </h1>
      <p className="text-base text-[#868581] mb-8">
        Each month, a printed magazine with your circle&apos;s photos and stories will be delivered to someone special.
      </p>

      <label className="text-sm font-semibold text-[#242832] mb-2">Their name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && name.trim()) onNext(name.trim()); }}
        placeholder="e.g. Grandma, Mom & Dad, Uncle Joe"
        maxLength={100}
        autoFocus
        className="w-full px-4 py-4 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none mb-8"
      />

      <button
        onClick={() => name.trim() && onNext(name.trim())}
        disabled={!name.trim()}
        className={`w-full py-4 rounded-[14px] border-2 text-base font-medium transition-colors ${
          !name.trim()
            ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
            : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
        }`}>
        Next
      </button>
    </div>
  );
}
