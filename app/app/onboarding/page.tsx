'use client';

import { useAuth } from '@/lib/auth-context';
import { useUpdateUserMutation, useCreateCircleMutation, useJoinCircleMutation } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

type Step = 'firstName' | 'lastName' | 'circleChoice' | 'circleName' | 'circleHeader';

export default function OnboardingPage() {
  const { updateOnboarded } = useAuth();
  const router = useRouter();
  const showToast = useToast();
  const queryClient = useQueryClient();

  const [step, setStep] = useState<Step>('firstName');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [circleName, setCircleName] = useState('');
  const [circleCode, setCircleCode] = useState('');
  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [headerPreview, setHeaderPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateUserMutation = useUpdateUserMutation(
    () => {},
    () => showToast('Failed to update profile.', ToastType.Error),
  );

  const createCircleMutation = useCreateCircleMutation(
    async () => {
      await queryClient.invalidateQueries({ queryKey: ['Circle'] });
      updateOnboarded(true);
      router.push('/app/getting-started');
    },
    () => showToast('Failed to create circle.', ToastType.Error),
  );

  const joinCircleMutation = useJoinCircleMutation(
    async () => {
      await queryClient.invalidateQueries({ queryKey: ['Circle'] });
      updateOnboarded(true);
      router.push('/app/getting-started');
    },
    () => showToast('Failed to join circle.', ToastType.Error),
  );

  function handleFirstNameContinue() {
    if (!firstName) return;
    setStep('lastName');
  }

  function handleLastNameContinue() {
    if (!lastName) return;
    updateUserMutation.mutate({ firstName, lastName, avatarFile: null });
    setStep('circleChoice');
  }

  function handleJoinCircle() {
    if (!circleCode) return;
    joinCircleMutation.mutate({ code: circleCode });
  }

  function handleCreateCircle() {
    setStep('circleName');
  }

  function handleCircleNameContinue() {
    if (!circleName) return;
    setStep('circleHeader');
  }

  function handleHeaderSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setHeaderFile(file);
      setHeaderPreview(URL.createObjectURL(file));
    }
  }

  function handleFinish() {
    if (!headerFile) return;
    createCircleMutation.mutate({ title: circleName, imageFile: headerFile });
  }

  const buttonClass = (disabled: boolean) =>
    `w-full py-4 rounded-[14px] border-2 text-base font-medium transition-colors ${
      disabled
        ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
        : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
    }`;

  return (
    <div className="flex flex-col min-h-screen px-5 bg-[#FCFBF8] max-w-sm mx-auto py-10">
      {step === 'firstName' && (
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h1 className="text-[32px] font-medium text-[#242832] mb-4">What&apos;s your first name?</h1>
            <input
              type="text"
              placeholder="Your first name"
              maxLength={100}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              autoCapitalize="words"
              className="w-full px-4 py-4 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleFirstNameContinue()}
            />
          </div>
          <button onClick={handleFirstNameContinue} disabled={!firstName} className={buttonClass(!firstName)}>
            Continue
          </button>
        </div>
      )}

      {step === 'lastName' && (
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h1 className="text-[32px] font-medium text-[#242832] mb-4">What&apos;s your last name?</h1>
            <input
              type="text"
              placeholder="Your last name"
              maxLength={100}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              className="w-full px-4 py-4 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleLastNameContinue()}
            />
          </div>
          <button onClick={handleLastNameContinue} disabled={!lastName} className={buttonClass(!lastName)}>
            Continue
          </button>
        </div>
      )}

      {step === 'circleChoice' && (
        <div className="flex-1">
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
            onClick={handleJoinCircle}
            disabled={!circleCode || joinCircleMutation.isPending}
            className={buttonClass(!circleCode || joinCircleMutation.isPending) + ' mb-8'}>
            Join circle
          </button>

          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-px bg-[#DEDBD5]" />
            <span className="text-sm font-semibold text-[#868581]">OR</span>
            <div className="flex-1 h-px bg-[#DEDBD5]" />
          </div>

          <h1 className="text-[32px] font-medium text-[#242832] mb-4">Create circle</h1>
          <p className="text-base text-[#242832] mb-8">Start your own circle and invite others to join.</p>
          <button onClick={handleCreateCircle} className={buttonClass(false)}>
            Create circle
          </button>
        </div>
      )}

      {step === 'circleName' && (
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h1 className="text-[32px] font-medium text-[#242832] mb-4">Name your circle</h1>
            <p className="text-base text-[#242832] mb-8">Choose a name for your circle. You can change this later.</p>
            <input
              type="text"
              placeholder="Circle name"
              maxLength={100}
              value={circleName}
              onChange={(e) => setCircleName(e.target.value)}
              className="w-full px-4 py-4 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleCircleNameContinue()}
            />
          </div>
          <button onClick={handleCircleNameContinue} disabled={!circleName} className={buttonClass(!circleName)}>
            Continue
          </button>
        </div>
      )}

      {step === 'circleHeader' && (
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h1 className="text-[32px] font-medium text-[#242832] mb-4">Add a header image</h1>
            <p className="text-base text-[#242832] mb-8">This will be displayed at the top of your circle. You can change this later.</p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleHeaderSelect}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-[2/1] rounded-[32px] bg-[#F4F1EA] flex items-center justify-center mb-4 overflow-hidden border-2 border-dashed border-[#DEDBD5] hover:border-[#C15F3C] transition-colors">
              {headerPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={headerPreview} alt="Header preview" className="w-full h-full object-cover" />
              ) : (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#868581" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              )}
            </button>
          </div>
          <button
            onClick={handleFinish}
            disabled={!headerFile || createCircleMutation.isPending}
            className={buttonClass(!headerFile || createCircleMutation.isPending)}>
            {createCircleMutation.isPending ? 'Creating...' : 'Finish'}
          </button>
        </div>
      )}
    </div>
  );
}
