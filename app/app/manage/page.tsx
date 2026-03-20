'use client';

import { useGetCircleQuery, useGetSelfQuery, useGetPaymentMethodQuery, useRerollCodeMutation } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import { useModal } from '@/components/app/ModalProvider';
import UserItem from '@/components/app/UserItem';
import AuthImage from '@/components/app/AuthImage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLeaveCircleMutation } from '@/lib/hooks';
import { useQueryClient } from '@tanstack/react-query';

export default function ManagePage() {
  const router = useRouter();
  const userQuery = useGetSelfQuery();
  const circleQuery = useGetCircleQuery();
  const getPaymentMethodQuery = useGetPaymentMethodQuery();
  const showToast = useToast();
  const { showModal, dismissModal } = useModal();
  const queryClient = useQueryClient();
  const [inviteCode, setInviteCode] = useState<string | null>(null);

  const rerollCodeMutation = useRerollCodeMutation(
    (data) => {
      setInviteCode(data.code);
      showToast('New code generated!', ToastType.Success);
    },
    () => showToast('Failed to generate code.', ToastType.Error),
  );

  const leaveCircleMutation = useLeaveCircleMutation(
    async () => {
      await queryClient.invalidateQueries({ queryKey: ['Circle'] });
      showToast('Left circle.', ToastType.Success);
      dismissModal();
      router.push('/app/feed');
    },
    () => showToast('Failed to leave circle.', ToastType.Error),
  );

  function handleInvite() {
    const code = inviteCode || circleQuery.data?.inviteCode || '';
    showModal(
      <div>
        <h3 className="text-lg font-medium text-[#242832] mb-2">Invite to Circle</h3>
        <p className="text-sm text-[#868581] mb-4">Share this code with family and friends so they can join your circle.</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 px-4 py-3 bg-[#F4F1EA] rounded-xl text-center text-lg font-semibold tracking-widest text-[#242832]">
            {code}
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(code);
              showToast('Code copied!', ToastType.Success);
            }}
            className="px-4 py-3 rounded-xl border-2 border-[#B05637] text-[#B05637] font-medium text-sm">
            Copy
          </button>
        </div>
        <button
          onClick={() => rerollCodeMutation.mutate()}
          className="w-full py-3 rounded-xl border-2 border-[#B05637] text-[#B05637] font-medium text-sm">
          Generate New Code
        </button>
      </div>,
    );
  }

  function handleAddRecipient() {
    if (getPaymentMethodQuery.data || userQuery.data?.isBillingExempt) {
      router.push('/app/circle/recipients/add');
    } else {
      router.push('/app/billing/add');
    }
  }

  function handleLeaveCircle() {
    showModal(
      <div>
        <h3 className="text-lg font-medium text-[#242832] mb-2">Leave circle?</h3>
        <p className="text-sm text-[#868581] mb-6">You will no longer be able to see or post to this circle.</p>
        <div className="flex gap-3">
          <button onClick={dismissModal} className="flex-1 py-3 rounded-xl border-2 border-[#DEDBD5] text-[#242832] font-medium">Cancel</button>
          <button onClick={() => leaveCircleMutation.mutate()} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium">Leave</button>
        </div>
      </div>,
    );
  }

  if (circleQuery.isError || userQuery.isError || getPaymentMethodQuery.isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#868581]">Something went wrong.</p>
      </div>
    );
  }

  if (circleQuery.isLoading || userQuery.isLoading || getPaymentMethodQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!circleQuery.data || !userQuery.data) return null;

  return (
    <div className="max-w-2xl mx-auto pb-24 bg-[#FCFBF8] min-h-screen">
      {/* Header with edit button */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <h1 className="text-2xl font-medium text-[#C15F3C]" style={{ fontFamily: 'Damion, cursive' }}>
          {circleQuery.data.title}
        </h1>
        <button onClick={() => router.push('/app/circle/edit')} className="p-2 hover:bg-[#F4F1EA] rounded-lg transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C15F3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" />
          </svg>
        </button>
      </div>

      {/* Circle header image */}
      <div className="px-5 my-6">
        {circleQuery.data.headerUrl ? (
          <AuthImage
            src={circleQuery.data.headerUrl}
            alt="Circle header"
            className="w-full aspect-[2/1] rounded-[32px] object-cover"
          />
        ) : (
          <div className="w-full aspect-[2/1] rounded-[32px] bg-[#F4F1EA] flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#868581" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Members section */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-[#242832]">Members</h2>
          <span className="text-sm text-[#868581] bg-[#F4F1EA] px-3 py-1 rounded-lg">
            {circleQuery.data.contributors.length}
          </span>
        </div>
        <p className="text-base text-[#242832] mb-4">Invite family and friends to view and post to the circle!</p>

        <button
          onClick={handleInvite}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#B05637] text-[#B05637] font-medium mb-6">
          Invite to Circle
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        <div className="flex flex-col gap-6 mb-8">
          {circleQuery.data.contributors.map((x) => (
            <UserItem
              key={x.id}
              text={x.firstName}
              imageSource={x.avatarUrl}
              tagLeft={x.id === userQuery.data!.id ? '(You)' : undefined}
              onPress={() => router.push(`/app/profile/${x.id}`)}
            />
          ))}
        </div>

        {/* Recipients section */}
        <h2 className="text-xl font-medium text-[#242832] mb-4">Recipients</h2>
        <p className="text-base text-[#242832] mb-4">Recipients will receive a physical magazine each month.</p>

        <button
          onClick={handleAddRecipient}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#B05637] text-[#B05637] font-medium mb-6">
          Add Recipient
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        <div className="flex flex-col gap-6 mb-8">
          {circleQuery.data.recipients.map((x) => (
            <UserItem
              key={x.id}
              text={x.name}
              imageSource={x.avatarUrl}
              onPress={
                x.managerId === userQuery.data!.id
                  ? () => router.push(`/app/circle/recipients/${x.id}/edit`)
                  : undefined
              }
              tagRight={x.managerId === userQuery.data!.id ? '(Edit)' : undefined}
            />
          ))}
        </div>
      </div>

      {/* Bottom action buttons */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex gap-4 z-10">
        <button
          onClick={() => router.push('/app/billing/manage')}
          className="flex items-center gap-2 px-4 py-3 bg-[#B05637] text-white rounded-xl font-medium shadow-lg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
          </svg>
          Billing
        </button>
        <button
          onClick={handleLeaveCircle}
          className="flex items-center gap-2 px-4 py-3 bg-[#B05637] text-white rounded-xl font-medium shadow-lg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Leave
        </button>
      </div>
    </div>
  );
}
