'use client';

import { useGetCircleQuery } from '@/lib/hooks';
import AuthImage from '@/components/app/AuthImage';

interface MagazinePreviewProps {
  recipientName: string | null;
  postedImageUrl: string | null;
  postedCaption: string;
  onNext: () => void;
}

export default function MagazinePreview({
  recipientName,
  postedImageUrl,
  postedCaption,
  onNext,
}: MagazinePreviewProps) {
  const circleQuery = useGetCircleQuery();
  const circleName = circleQuery.data?.title || 'Your Circle';
  const headerUrl = circleQuery.data?.headerUrl;

  const heading = recipientName
    ? `Here's a preview of ${recipientName}'s first magazine`
    : "Here's a preview of your first magazine";

  const ctaText = recipientName
    ? `Ship it to ${recipientName}`
    : 'Continue';

  return (
    <div className="flex flex-col items-center pt-6">
      <h1 className="text-[32px] font-medium text-[#242832] mb-3 text-center">{heading}</h1>
      <p className="text-base text-[#868581] mb-8 text-center">
        At the start of each month, your circle&apos;s photos become a printed magazine.
      </p>

      {/* Magazine mockup */}
      <div className="w-full max-w-[320px] mb-8">
        {/* Cover */}
        <div className="relative rounded-t-2xl overflow-hidden bg-white shadow-lg border border-[#E8E5DF]">
          {/* Header image / cover background */}
          <div className="w-full aspect-[3/4] relative">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F4F1EA] to-[#E8E5DF]">
              {headerUrl && (
                <AuthImage
                  src={headerUrl}
                  alt="Circle header"
                  className="w-full h-full object-cover opacity-40"
                />
              )}
            </div>

            {/* Cover content */}
            <div className="absolute inset-0 flex flex-col items-center justify-between p-6 pt-10 pb-8">
              {/* Title area */}
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-[#868581] mb-2">Cher Ami</p>
                <h2 className="text-2xl font-bold text-[#242832]">{circleName}</h2>
              </div>

              {/* Featured photo */}
              {postedImageUrl ? (
                <div className="w-[85%] rounded-xl overflow-hidden shadow-md border-4 border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={postedImageUrl} alt="Your photo" className="w-full aspect-[4/3] object-cover" />
                  {postedCaption && (
                    <div className="bg-white px-3 py-2">
                      <p className="text-xs text-[#242832] line-clamp-2">{postedCaption}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-[85%] aspect-[4/3] rounded-xl bg-white/60 border-2 border-dashed border-[#DEDBD5] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-[#868581]">Your photos</p>
                    <p className="text-xs text-[#868581]">will appear here</p>
                  </div>
                </div>
              )}

              {/* Date */}
              <p className="text-xs text-[#868581]">
                {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Address "label" on bottom of magazine */}
        {recipientName && (
          <div className="bg-white rounded-b-2xl border border-t-0 border-[#E8E5DF] shadow-lg px-5 py-4 flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C15F3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[#242832]">{recipientName}</p>
              <p className="text-xs text-[#868581]">Free shipping in the USA</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-[14px] border-2 bg-[#C15F3C] border-[#C15F3C] text-white text-base font-medium hover:bg-[#a8512f] transition-colors">
        {ctaText}
      </button>
    </div>
  );
}
