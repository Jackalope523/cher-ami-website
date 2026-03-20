'use client';

import { useAuth } from '@/lib/auth-context';
import {
  useEmailAuthMutation,
  useExchangeGoogleTokenMutation,
  useExchangeAppleTokenMutation,
} from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';

function LoginContent() {
  const { updateToken, updateOnboarded } = useAuth();
  const [email, setEmail] = useState('');
  const showToast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const exchangeGoogleTokenMutation = useExchangeGoogleTokenMutation(
    (response) => {
      updateToken(response.token);
      updateOnboarded(response.onboarded);
    },
    () => showToast('Failed to log in. Try again.', ToastType.Error),
  );

  const exchangeAppleTokenMutation = useExchangeAppleTokenMutation(
    (response) => {
      updateToken(response.token);
      updateOnboarded(response.onboarded);
    },
    () => showToast('Failed to log in. Try again.', ToastType.Error),
  );

  const emailAuthMutation = useEmailAuthMutation(
    () => router.push(`/app/verify?email=${encodeURIComponent(email)}`),
    () => showToast('Failed to log in. Try again.', ToastType.Error),
  );

  // Handle OAuth callback
  useEffect(() => {
    const code = searchParams.get('code');
    const provider = searchParams.get('provider');
    if (code && provider === 'google') {
      exchangeGoogleTokenMutation.mutate({ authorizationCode: code });
    } else if (code && provider === 'apple') {
      exchangeAppleTokenMutation.mutate({ authorizationCode: code });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function handleGoogleLogin() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://app-cherami-prod.azurewebsites.net';
    const redirectUri = encodeURIComponent(`${window.location.origin}/app/login?provider=google`);
    window.location.href = `${apiUrl}/auth/google?redirect_uri=${redirectUri}&client_id=google`;
  }

  function handleAppleLogin() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://app-cherami-prod.azurewebsites.net';
    const redirectUri = encodeURIComponent(`${window.location.origin}/app/login?provider=apple`);
    window.location.href = `${apiUrl}/auth/apple?redirect_uri=${redirectUri}&client_id=apple`;
  }

  const continueDisabled = emailAuthMutation.isPending || email === '';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-[#FCFBF8]">
      <div className="w-full max-w-sm flex flex-col">
        <div className="flex justify-center mb-5">
          <Image
            src="/title.png"
            alt="Cher Ami"
            width={268}
            height={60}
            className="max-w-[268px] w-full h-auto"
            priority
          />
        </div>

        <div className="flex justify-center mb-5">
          <Image
            src="/squirrel.webp"
            alt="Cher Ami mascot"
            width={288}
            height={228}
            className="max-w-[288px] w-[90%] h-auto"
          />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-4 py-4 rounded-xl bg-white shadow-lg mb-4 w-full hover:shadow-xl transition-shadow">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span className="text-lg font-medium text-black/55">Continue with Google</span>
        </button>

        <button
          onClick={handleAppleLogin}
          className="flex items-center justify-center gap-4 py-4 rounded-xl bg-black shadow-lg mb-4 w-full hover:shadow-xl transition-shadow">
          <svg width="20" height="24" viewBox="0 0 17 20" fill="white">
            <path d="M13.545 10.239c-.022-2.234 1.828-3.312 1.911-3.362-1.042-1.522-2.664-1.731-3.238-1.754-1.372-.142-2.693.818-3.392.818-.71 0-1.79-.804-2.949-.781-1.504.023-2.9.89-3.675 2.249-1.584 2.746-.404 6.797 1.128 9.023.757 1.09 1.65 2.31 2.824 2.268 1.14-.047 1.567-.733 2.943-.733 1.367 0 1.762.733 2.949.707 1.221-.019 1.995-1.1 2.735-2.198.875-1.257 1.228-2.49 1.244-2.555-.028-.01-2.38-.912-2.403-3.622l-.077.04z" />
            <path d="M11.302 3.3c.62-.762 1.044-1.808.928-2.865-.898.039-2.003.612-2.647 1.362-.573.666-1.083 1.742-.951 2.762 1.01.078 2.045-.505 2.67-1.259z" />
          </svg>
          <span className="text-lg font-medium text-white">Continue with Apple</span>
        </button>

        <div className="flex items-center gap-3 my-8">
          <div className="flex-1 h-[3px] bg-[#DEDBD5]" />
          <span className="text-sm font-semibold text-[#868581]">OR</span>
          <div className="flex-1 h-[3px] bg-[#DEDBD5]" />
        </div>

        <input
          type="email"
          placeholder="Your email"
          maxLength={255}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="w-full px-4 py-4 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none mb-4"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !continueDisabled) {
              emailAuthMutation.mutate({ email });
            }
          }}
        />

        <button
          disabled={continueDisabled}
          onClick={() => emailAuthMutation.mutate({ email })}
          className={`w-full py-4 rounded-[14px] border-2 text-base font-medium transition-colors ${
            continueDisabled
              ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
              : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
          }`}>
          Continue
        </button>

        <p className="text-center text-sm font-medium text-[#242832] mt-4 px-8">
          By continuing, you agree to the{' '}
          <a href="/legal/terms" target="_blank" className="underline">Terms and Conditions</a>
          {' '}and{' '}
          <a href="/legal/privacy" target="_blank" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#FCFBF8]">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
