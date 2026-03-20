'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CTA from '@/components/CTA';

interface DoneStepProps {
  completedSteps: Set<string>;
}

const STEP_LABELS: Record<string, string> = {
  recipientName: 'Named magazine recipient',
  firstPost: 'Added first photo',
  invite: 'Shared invite code',
  shipIt: 'Set up shipping & billing',
};

export default function DoneStep({ completedSteps }: DoneStepProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center text-center pt-6">
      {/* Mascot */}
      <Image
        src="/squirrel.webp"
        alt="Cher Ami mascot"
        width={180}
        height={180}
        className="mb-6"
      />

      <h1 className="text-[32px] font-medium text-[#242832] mb-3">
        You&apos;re all set!
      </h1>
      <p className="text-base text-[#868581] mb-8">
        Photos from your circle will appear in your feed. At the start of next month, they&apos;ll be printed and shipped as a magazine.
      </p>

      {/* Completion summary */}
      <div className="w-full bg-white rounded-2xl border-2 border-[#F4F1EA] p-5 mb-8">
        <div className="flex flex-col gap-3">
          {Object.entries(STEP_LABELS).map(([key, label]) => {
            const done = completedSteps.has(key);
            return (
              <div key={key} className="flex items-center gap-3 text-left">
                {done ? (
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#F4F1EA] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-[#868581]">—</span>
                  </div>
                )}
                <span className={`text-sm ${done ? 'text-[#242832]' : 'text-[#868581]'}`}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* App download prompt */}
      <div className="w-full bg-[#FDF0EB] rounded-2xl p-5 mb-8">
        <p className="text-sm font-semibold text-[#242832] mb-2">
          Get the app for the best experience
        </p>
        <p className="text-sm text-[#868581] mb-4">
          Take and share photos on the go with the Cher Ami mobile app.
        </p>
        <div className="flex justify-center gap-3">
          <CTA store="Apple" width={120} height={40} trackingProps={{ location: 'wizard-done' }} />
          <CTA store="Google" width={135} height={40} trackingProps={{ location: 'wizard-done' }} />
        </div>
      </div>

      <button
        onClick={() => router.push('/app/feed')}
        className="w-full py-4 rounded-[14px] border-2 bg-[#C15F3C] border-[#C15F3C] text-white text-base font-medium hover:bg-[#a8512f] transition-colors">
        Go to My Feed
      </button>
    </div>
  );
}
