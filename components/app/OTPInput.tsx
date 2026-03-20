'use client';

import { useRef, KeyboardEvent, ClipboardEvent } from 'react';

interface OTPInputProps {
  codeLength: number;
  code: string;
  setCode: (code: string) => void;
}

export default function OTPInput({ codeLength, code, setCode }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;

    const digits = code.split('');
    digits[index] = value.slice(-1);
    const newCode = digits.join('');
    setCode(newCode);

    if (value && index < codeLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, codeLength);
    setCode(pasted.padEnd(codeLength, ' ').slice(0, codeLength).replace(/ /g, ''));
    const focusIndex = Math.min(pasted.length, codeLength - 1);
    inputRefs.current[focusIndex]?.focus();
  }

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length: codeLength }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={code[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="w-12 h-14 text-center text-xl font-semibold rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] focus:border-[#C15F3C] focus:outline-none transition-colors"
        />
      ))}
    </div>
  );
}
