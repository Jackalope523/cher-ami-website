'use client';

import { useGetSelfQuery, useUpdateUserMutation } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import AuthImage from '@/components/app/AuthImage';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';

export default function ProfileEditPage() {
  const router = useRouter();
  const showToast = useToast();
  const selfQuery = useGetSelfQuery();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (selfQuery.data) {
      setFirstName(selfQuery.data.firstName); // eslint-disable-line react-hooks/set-state-in-effect -- syncing server data
      setLastName(selfQuery.data.lastName);
    }
  }, [selfQuery.data]);

  const updateUserMutation = useUpdateUserMutation(
    () => {
      showToast('Profile updated!', ToastType.Success);
      router.push(`/app/profile/${selfQuery.data?.id}`);
    },
    () => showToast('Failed to update profile.', ToastType.Error),
  );

  function handleAvatarSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  function handleSave() {
    if (!firstName || !lastName) return;
    updateUserMutation.mutate({ firstName, lastName, avatarFile });
  }

  if (selfQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const formValid = firstName && lastName;

  return (
    <div className="max-w-sm mx-auto px-5 py-10 bg-[#FCFBF8] min-h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-[32px] font-medium text-[#242832] mb-6">Edit profile</h1>

        <div className="flex justify-center mb-6">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarSelect} className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} className="relative">
            {avatarPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarPreview} alt="Avatar" className="h-24 w-24 rounded-full object-cover" />
            ) : selfQuery.data?.avatarUrl ? (
              <AuthImage src={selfQuery.data.avatarUrl} alt="Avatar" className="h-24 w-24 rounded-full object-cover" />
            ) : (
              <div className="h-24 w-24 rounded-full bg-[#F4F1EA] flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#868581" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
            <div className="absolute bottom-0 right-0 bg-[#C15F3C] rounded-full p-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
            </div>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-4 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-4 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={!formValid || updateUserMutation.isPending}
        className={`w-full py-4 rounded-[14px] border-2 text-base font-medium transition-colors ${
          !formValid || updateUserMutation.isPending
            ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
            : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
        }`}>
        {updateUserMutation.isPending ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}
