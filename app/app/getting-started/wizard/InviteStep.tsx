'use client';

import { useState } from 'react';
import { useGetCircleQuery, useRerollCodeMutation } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';

interface InviteStepProps {
  recipientName: string | null;
  onNext: () => void;
}

export default function InviteStep({ recipientName, onNext }: InviteStepProps) {
  const showToast = useToast();
  const circleQuery = useGetCircleQuery();
  const [copied, setCopied] = useState(false);

  const rerollMutation = useRerollCodeMutation(
    () => {
      circleQuery.refetch();
      showToast('New code generated!', ToastType.Success);
    },
    () => showToast('Failed to generate new code.', ToastType.Error),
  );

  const inviteCode = circleQuery.data?.inviteCode || '';
  const memberCount = circleQuery.data?.contributors?.length ?? 1;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Failed to copy code.', ToastType.Error);
    }
  }

  async function handleShare() {
    if (!navigator.share) {
      handleCopy();
      return;
    }
    try {
      await navigator.share({
        title: 'Join my Cher Ami circle!',
        text: `Join my circle on Cher Ami! Use this invite code: ${inviteCode}\n\nDownload the app: https://thecherami.com/start`,
      });
    } catch {
      // User cancelled share — do nothing
    }
  }

  const heading = recipientName
    ? `Get more photos in ${recipientName}'s magazine`
    : 'Invite friends & family';

  return (
    <div className="flex flex-col pt-6">
      <h1 className="text-[32px] font-medium text-[#242832] mb-3">{heading}</h1>
      <p className="text-base text-[#868581] mb-8">
        Invite friends and family to contribute their photos and stories.
      </p>

      {/* Invite code display */}
      <div className="bg-white rounded-2xl border-2 border-[#F4F1EA] p-6 mb-6">
        <p className="text-sm font-semibold text-[#868581] mb-3 text-center">Your invite code</p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-3xl font-bold text-[#242832] tracking-widest font-mono">
            {inviteCode}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
              copied
                ? 'bg-green-50 border-green-300 text-green-700'
                : 'border-[#DEDBD5] text-[#242832] hover:border-[#C15F3C]'
            }`}>
            {copied ? '✓ Copied!' : 'Copy Code'}
          </button>

          {'share' in navigator && (
            <button
              onClick={handleShare}
              className="flex-1 py-3 rounded-xl border-2 bg-[#C15F3C] border-[#C15F3C] text-white text-sm font-medium hover:bg-[#a8512f] transition-colors">
              Share
            </button>
          )}
        </div>
      </div>

      {/* Member count */}
      <div className="flex items-center gap-2 text-sm text-[#868581] mb-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span>{memberCount} member{memberCount !== 1 ? 's' : ''} in your circle</span>
      </div>

      <button
        onClick={() => rerollMutation.mutate()}
        disabled={rerollMutation.isPending}
        className="text-sm text-[#B05637] hover:text-[#C15F3C] transition-colors text-left mb-8">
        {rerollMutation.isPending ? 'Generating...' : 'Generate new code'}
      </button>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-[14px] border-2 bg-[#C15F3C] border-[#C15F3C] text-white text-base font-medium hover:bg-[#a8512f] transition-colors">
        Next
      </button>
    </div>
  );
}
