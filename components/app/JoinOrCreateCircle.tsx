'use client';

import { useJoinCircleMutation } from '@/lib/hooks';
import { useToast, ToastType } from './ToastProvider';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function JoinOrCreateCircle() {
  const queryClient = useQueryClient();
  const showToast = useToast();
  const router = useRouter();
  const [circleCode, setCircleCode] = useState('');

  const joinMutation = useJoinCircleMutation(
    async () => {
      await queryClient.invalidateQueries({ queryKey: ['Circle'] });
      showToast('Joined circle.', ToastType.Success);
    },
    () => showToast('Failed to join circle.', ToastType.Error),
  );

  function handleJoin() {
    if (!circleCode) return;
    joinMutation.mutate({ code: circleCode });
  }

  const buttonClass = (disabled: boolean) =>
    `w-full py-4 rounded-[14px] border-2 text-base font-medium transition-colors ${
      disabled
        ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
        : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
    }`;

  return (
    <div className="max-w-sm mx-auto px-5 py-10">
      <h1 className="text-[32px] font-medium text-[#242832] mb-4">Join circle</h1>
      <p className="text-base text-[#242832] mb-8">
        Please enter the <span className="font-bold">code</span> that was sent to you by the person who invited you to join the circle.
      </p>
      <input
        type="text"
        placeholder="Circle code"
        maxLength={100}
        value={circleCode}
        onChange={(e) => setCircleCode(e.target.value)}
        className="w-full px-4 py-4 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none mb-4"
      />
      <button
        onClick={handleJoin}
        disabled={!circleCode || joinMutation.isPending}
        className={buttonClass(!circleCode || joinMutation.isPending) + ' mb-8'}>
        Join circle
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-px bg-[#DEDBD5]" />
        <span className="text-sm font-semibold text-[#868581]">OR</span>
        <div className="flex-1 h-px bg-[#DEDBD5]" />
      </div>

      <h1 className="text-[32px] font-medium text-[#242832] mb-4">Create circle</h1>
      <p className="text-base text-[#242832] mb-8">Start your own circle and invite others to join.</p>
      <button
        onClick={() => router.push('/app/onboarding')}
        className={buttonClass(false)}>
        Create circle
      </button>
    </div>
  );
}
