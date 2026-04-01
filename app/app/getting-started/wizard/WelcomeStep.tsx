'use client';

interface WelcomeStepProps {
  circleName: string;
  onNext: () => void;
}

export default function WelcomeStep({ circleName, onNext }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center text-center pt-10">
      {/* Celebration emoji */}
      <div className="text-6xl mb-6">🎉</div>

      <h1 className="text-[32px] font-medium text-[#242832] mb-2">
        Your circle is ready!
      </h1>
      <p className="text-lg text-[#C15F3C] font-medium mb-6">{circleName}</p>
      <p className="text-base text-[#868581] mb-10">
        Let&apos;s set up your first magazine in under 2 minutes.
      </p>

      {/* Checklist preview */}
      <div className="w-full bg-white rounded-2xl border-2 border-[#F4F1EA] p-6 mb-10">
        <p className="text-sm font-semibold text-[#242832] mb-4 text-left">Here&apos;s what we&apos;ll do:</p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-full bg-[#FDF0EB] flex items-center justify-center flex-shrink-0">
              <span className="text-base">💌</span>
            </div>
            <span className="text-base text-[#242832]">Name who the magazine is for</span>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-full bg-[#FDF0EB] flex items-center justify-center flex-shrink-0">
              <span className="text-base">📸</span>
            </div>
            <span className="text-base text-[#242832]">Add your first photo</span>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-full bg-[#FDF0EB] flex items-center justify-center flex-shrink-0">
              <span className="text-base">👨‍👩‍👧‍👦</span>
            </div>
            <span className="text-base text-[#242832]">Invite family &amp; friends to contribute</span>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-[14px] border-2 bg-[#C15F3C] border-[#C15F3C] text-white text-base font-medium hover:bg-[#a8512f] transition-colors">
        Let&apos;s go
      </button>
    </div>
  );
}
