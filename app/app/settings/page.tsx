'use client';

import { useAuth } from '@/lib/auth-context';
import { useDeleteUserMutation } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import { useModal } from '@/components/app/ModalProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const router = useRouter();
  const { deleteToken, updateOnboarded } = useAuth();
  const showToast = useToast();
  const { showModal, dismissModal } = useModal();

  const deleteUserMutation = useDeleteUserMutation(
    () => {
      updateOnboarded(false);
      deleteToken();
      dismissModal();
      router.push('/app/login');
    },
    () => showToast('Failed to delete account.', ToastType.Error),
  );

  function handleDeleteAccount() {
    showModal(<DeleteAccountModal />);
  }

  function DeleteAccountModal() {
    const [confirmText, setConfirmText] = useState('');

    return (
      <div>
        <h3 className="text-lg font-medium text-[#242832] mb-2">Delete account?</h3>
        <p className="text-sm text-[#868581] mb-4">
          This will permanently delete your account and all data. This action cannot be undone.
        </p>
        <p className="text-sm text-[#242832] mb-2">
          Type <span className="font-bold">DELETE</span> to confirm.
        </p>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Type DELETE"
          className="w-full px-4 py-3 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-red-500 focus:outline-none mb-4"
        />
        <div className="flex gap-3">
          <button onClick={dismissModal} className="flex-1 py-3 rounded-xl border-2 border-[#DEDBD5] text-[#242832] font-medium">
            Cancel
          </button>
          <button
            onClick={() => deleteUserMutation.mutate()}
            disabled={confirmText !== 'DELETE'}
            className={`flex-1 py-3 rounded-xl font-medium ${
              confirmText === 'DELETE'
                ? 'bg-red-500 text-white'
                : 'bg-[#ECEDEF] text-[#A8ABB3]'
            }`}>
            Delete
          </button>
        </div>
      </div>
    );
  }

  const linkClass = "flex items-center justify-between px-4 py-3 text-base font-medium text-[#B05637]";
  const chevron = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B05637" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );

  return (
    <div className="max-w-sm mx-auto px-5 py-10 bg-[#FCFBF8] min-h-screen">
      <h1 className="text-2xl font-medium text-[#242832] mb-6 pl-4 lg:pl-0">Settings</h1>

      <div className="rounded-[14px] border-2 border-[#F4F1EA] bg-[#F4F1EA] overflow-hidden mb-8">
        <Link href="/legal/privacy" target="_blank" className={linkClass}>
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><circle cx="10" cy="12" r="2" /><path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22" />
            </svg>
            Privacy Policy
          </div>
          {chevron}
        </Link>
        <Link href="/legal/terms" target="_blank" className={linkClass}>
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" />
            </svg>
            Terms and Conditions
          </div>
          {chevron}
        </Link>
      </div>

      <div className="rounded-[14px] border-2 border-[#F4F1EA] bg-[#F4F1EA] overflow-hidden">
        <button onClick={() => router.push('/app/blocked')} className={`${linkClass} w-full text-left`}>
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
            Blocked Users
          </div>
          {chevron}
        </button>
        <button onClick={handleDeleteAccount} className={`${linkClass} w-full text-left`}>
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
            Delete Account
          </div>
          {chevron}
        </button>
      </div>
    </div>
  );
}
