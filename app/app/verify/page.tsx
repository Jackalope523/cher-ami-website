'use client';

import { useAuth } from '@/lib/auth-context';
import { useEmailVerifyMutation } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import OTPInput from '@/components/app/OTPInput';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';

function VerifyContent() {
  const [code, setCode] = useState('');
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const { updateToken, updateOnboarded } = useAuth();
  const showToast = useToast();
  const router = useRouter();

  const emailVerifyMutation = useEmailVerifyMutation(
    (response) => {
      updateToken(response.token);
      updateOnboarded(response.onboarded);
      router.push('/app/feed');
    },
    () => showToast('Network error. Try again.', ToastType.Error),
  );

  const buttonDisabled = code.length !== 6 || emailVerifyMutation.isPending;

  return (
    <div className="flex flex-col min-h-screen px-5 bg-[#FCFBF8] justify-between max-w-sm mx-auto py-10">
      <div>
        <h1 className="text-[32px] font-medium text-[#242832] mb-4">Verification</h1>
        <p className="text-base text-[#242832] mb-6">
          Please enter the code we sent to your email{' '}
          <span className="font-bold">{email}</span>
        </p>
        <p className="text-base text-[#242832] mb-10">
          Can&apos;t find it? Check your spam folder.
        </p>

        <OTPInput codeLength={6} code={code} setCode={setCode} />
      </div>

      <button
        onClick={() => emailVerifyMutation.mutate({ email, code })}
        disabled={buttonDisabled}
        className={`w-full py-4 rounded-[14px] border-2 text-base font-medium transition-colors ${
          buttonDisabled
            ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
            : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
        }`}>
        Continue
      </button>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#FCFBF8]">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
