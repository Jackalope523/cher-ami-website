'use client';

import { ReactNode } from 'react';

interface WizardShellProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onSkip?: () => void;
  showBack?: boolean;
  showSkip?: boolean;
  children: ReactNode;
}

export default function WizardShell({
  currentStep,
  totalSteps,
  onBack,
  onSkip,
  showBack = true,
  showSkip = true,
  children,
}: WizardShellProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#FCFBF8] flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-[#F4F1EA]">
        <div
          className="h-full bg-[#C15F3C] rounded-r-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top nav */}
      <div className="flex items-center justify-between px-5 py-4">
        {showBack && onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-[#868581] hover:text-[#242832] transition-colors"
            aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </button>
        ) : (
          <div />
        )}
        {showSkip && onSkip ? (
          <button
            onClick={onSkip}
            className="text-sm text-[#868581] hover:text-[#242832] transition-colors">
            Skip for now
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-5 pb-10">
        <div className="w-full max-w-md animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}
