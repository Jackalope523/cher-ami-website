'use client';

import OTPInput from '@/app/app/verify/OTPInput';
import CTA from '@/components/CTA';
import ToastProvider, {
  ToastType,
  useToast,
} from '@/components/app/ToastProvider';
import APIProvider from '@/lib/api-context';
import AuthProvider, { useAuth } from '@/lib/auth-context';
import {
  useEmailAuthMutation,
  useEmailVerifyMutation,
  useGetSelfQuery,
  useJoinCircleByLinkMutation,
  useUpdateUserMutation,
} from '@/lib/hooks';
import { Damion } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const damion = Damion({
  weight: '400',
  fallback: ['cursive'],
  display: 'swap',
});

type Step = 'intro' | 'email' | 'code' | 'name' | 'success' | 'alreadyInCircle';

interface JoinClientProps {
  token: string;
  title: string;
  memberCount: number;
}

const buttonClass = (disabled: boolean) =>
  `w-full py-4 rounded-[14px] border-2 text-base font-medium transition-colors ${
    disabled
      ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
      : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
  }`;

const inputClass =
  'w-full px-4 py-4 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none';

function IntroStep({
  title,
  memberCount,
  onContinue,
}: {
  title: string;
  memberCount: number;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <Image
        src="/squirrel.webp"
        alt="Cher Ami mascot"
        width={288}
        height={228}
        className="max-w-[200px] w-[60%] h-auto mb-6"
      />
      <p className="text-base text-[#868581] mb-1">
        You&apos;re invited to join
      </p>
      <h1 className={`${damion.className} text-4xl text-[#C15F3C] mb-2`}>
        {title}
      </h1>
      {memberCount > 0 && (
        <p className="text-sm text-[#868581] mb-8">
          {memberCount} family {memberCount === 1 ? 'member is' : 'members are'}{' '}
          already sharing photos
        </p>
      )}

      <div className="w-full text-left bg-white border-[1.5px] border-[#DEDBD5] rounded-2xl p-5 mb-8">
        <p className="text-base font-semibold text-[#242832] mb-3">
          How Cher Ami works
        </p>
        <ul className="space-y-3 text-base text-[#242832]">
          <li className="flex gap-3">
            <span className="text-[#C15F3C] font-semibold">1.</span>
            The family shares photos in a private family circle — no social
            media, no strangers.
          </li>
          <li className="flex gap-3">
            <span className="text-[#C15F3C] font-semibold">2.</span>
            Every month, the photos become a real printed magazine.
          </li>
          <li className="flex gap-3">
            <span className="text-[#C15F3C] font-semibold">3.</span>
            It&apos;s mailed to the people you love — no app, account, or Wi-Fi
            needed on their end.
          </li>
        </ul>
      </div>

      <button onClick={onContinue} className={buttonClass(false)}>
        Join the family
      </button>
      <p className="text-sm text-[#868581] mt-4">
        Joining is free. You&apos;ll just create an account so the family knows
        it&apos;s you.
      </p>
    </div>
  );
}

function EmailStep({ onCodeSent }: { onCodeSent: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const showToast = useToast();

  const emailAuthMutation = useEmailAuthMutation(
    () => onCodeSent(email),
    () =>
      showToast(
        "Couldn't send the code. Check the email address and try again.",
        ToastType.Error,
      ),
  );

  const disabled = emailAuthMutation.isPending || email === '';

  return (
    <div>
      <h1 className="text-[28px] font-medium text-[#242832] mb-4">
        What&apos;s your email?
      </h1>
      <p className="text-base text-[#242832] mb-6">
        We&apos;ll send you a 6-digit code to make sure it&apos;s really you —
        no password to remember.
      </p>
      <input
        type="email"
        placeholder="Your email"
        maxLength={255}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        className={inputClass + ' mb-4'}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !disabled) {
            emailAuthMutation.mutate({ email });
          }
        }}
      />
      <button
        disabled={disabled}
        onClick={() => emailAuthMutation.mutate({ email })}
        className={buttonClass(disabled)}>
        Send my code
      </button>
      <p className="text-center text-sm font-medium text-[#242832] mt-4">
        By continuing, you agree to the{' '}
        <a href="/legal/terms" target="_blank" className="underline">
          Terms and Conditions
        </a>{' '}
        and{' '}
        <a href="/legal/privacy" target="_blank" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}

function CodeStep({
  email,
  onVerified,
}: {
  email: string;
  onVerified: () => void;
}) {
  const [code, setCode] = useState('');
  const { updateToken, updateOnboarded } = useAuth();
  const showToast = useToast();

  const emailVerifyMutation = useEmailVerifyMutation(
    (response) => {
      updateToken(response.token);
      updateOnboarded(response.onboarded);
      onVerified();
    },
    () => showToast("That code didn't work. Try again.", ToastType.Error),
  );

  const resendMutation = useEmailAuthMutation(
    () => {
      setCode('');
      showToast('We sent you a new code!', ToastType.Success);
    },
    () => showToast("Couldn't send a new code. Try again.", ToastType.Error),
  );

  const disabled = code.length !== 6 || emailVerifyMutation.isPending;

  return (
    <div>
      <h1 className="text-[28px] font-medium text-[#242832] mb-4">
        Check your email
      </h1>
      <p className="text-base text-[#242832] mb-2">
        We sent a 6-digit code to <span className="font-bold">{email}</span>.
      </p>
      <p className="text-sm text-[#868581] mb-8">
        Can&apos;t find it? Check your spam or junk folder.
      </p>

      <OTPInput codeLength={6} code={code} setCode={setCode} />

      <button
        onClick={() => {
          if (!resendMutation.isPending) resendMutation.mutate({ email });
        }}
        className="block mx-auto text-sm text-[#868581] underline mt-6 mb-8">
        Send a new code
      </button>

      <button
        disabled={disabled}
        onClick={() => emailVerifyMutation.mutate({ email, code })}
        className={buttonClass(disabled)}>
        Continue
      </button>
    </div>
  );
}

function NameStep({ onDone }: { onDone: () => void }) {
  const selfQuery = useGetSelfQuery();

  if (!selfQuery.data) {
    return (
      <div className="flex justify-center mt-10">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <NameForm
      initialFirstName={selfQuery.data.firstName ?? ''}
      initialLastName={selfQuery.data.lastName ?? ''}
      onDone={onDone}
    />
  );
}

function NameForm({
  initialFirstName,
  initialLastName,
  onDone,
}: {
  initialFirstName: string;
  initialLastName: string;
  onDone: () => void;
}) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const showToast = useToast();

  const updateUserMutation = useUpdateUserMutation(onDone, () =>
    showToast('Something went wrong. Try again.', ToastType.Error),
  );

  const disabled =
    !firstName.trim() || !lastName.trim() || updateUserMutation.isPending;

  return (
    <div>
      <h1 className="text-[28px] font-medium text-[#242832] mb-4">
        What&apos;s your name?
      </h1>
      <p className="text-base text-[#242832] mb-6">
        This is how the family will see you in the app.
      </p>
      <input
        type="text"
        placeholder="First name"
        maxLength={100}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        autoComplete="given-name"
        className={inputClass + ' mb-4'}
      />
      <input
        type="text"
        placeholder="Last name"
        maxLength={100}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        autoComplete="family-name"
        className={inputClass + ' mb-4'}
      />
      <button
        disabled={disabled}
        onClick={() =>
          updateUserMutation.mutate({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            avatarFile: null,
          })
        }
        className={buttonClass(disabled)}>
        Continue
      </button>
    </div>
  );
}

function SuccessStep({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Image
        src="/squirrel.webp"
        alt="Cher Ami mascot"
        width={288}
        height={228}
        className="max-w-[180px] w-[55%] h-auto mb-6"
      />
      <h1 className={`${damion.className} text-4xl text-[#C15F3C] mb-3`}>
        You&apos;re in!
      </h1>
      <p className="text-base text-[#242832] mb-8">
        Welcome to <span className="font-bold">{title}</span>. Download the app
        to start adding photos to this month&apos;s magazine.
      </p>

      <div className="flex flex-col items-center gap-3 mb-8">
        <CTA
          store="Apple"
          width={180}
          height={60}
          trackingProps={{ source: 'join-link' }}
        />
        <CTA
          store="Google"
          width={180}
          height={60}
          trackingProps={{ source: 'join-link' }}
        />
      </div>

      <Link href="/app/feed" className="text-sm text-[#868581] underline">
        Or continue in your browser
      </Link>
    </div>
  );
}

function AlreadyInCircleStep() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-[28px] font-medium text-[#242832] mb-4">
        You&apos;re already in a family circle
      </h1>
      <p className="text-base text-[#242832] mb-2">
        Your account belongs to another family circle with photos or members in
        it, and you can only be part of one at a time.
      </p>
      <p className="text-base text-[#242832] mb-8">
        To switch, open the Cher Ami app, leave your current family circle,
        then tap this invite link again.
      </p>
      <Link
        href="/app/feed"
        className="text-base font-medium text-[#C15F3C] underline">
        See my family circle
      </Link>
    </div>
  );
}

function JoinFlow({ token, title, memberCount }: JoinClientProps) {
  const [step, setStep] = useState<Step>('intro');
  const [email, setEmail] = useState('');
  const { loaded, getToken } = useAuth();
  const showToast = useToast();

  const joinMutation = useJoinCircleByLinkMutation(
    () => setStep('success'),
    (error) => {
      if (error.response?.status === 409) {
        setStep('alreadyInCircle');
      } else if (error.response?.status === 404) {
        showToast(
          'This invite link is no longer valid. Ask for a new one.',
          ToastType.Error,
        );
      } else {
        showToast('Something went wrong. Try again.', ToastType.Error);
      }
    },
  );

  function handleJoin() {
    joinMutation.mutate({ token });
  }

  function handleIntroContinue() {
    // Someone already signed in on this browser skips straight to confirming
    // their name; everyone else creates an account first.
    if (loaded && getToken()) {
      setStep('name');
    } else {
      setStep('email');
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFBF8]">
      <header className="flex justify-center py-6">
        <Link href="/">
          <Image
            src="/title.png"
            alt="Cher Ami"
            width={180}
            height={40}
            className="h-auto"
            priority
          />
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center px-5 pb-16">
        <div className="w-full max-w-sm pt-4">
          {step === 'intro' && (
            <IntroStep
              title={title}
              memberCount={memberCount}
              onContinue={handleIntroContinue}
            />
          )}
          {step === 'email' && (
            <EmailStep
              onCodeSent={(sentTo) => {
                setEmail(sentTo);
                setStep('code');
              }}
            />
          )}
          {step === 'code' && (
            <CodeStep email={email} onVerified={() => setStep('name')} />
          )}
          {step === 'name' && <NameStep onDone={handleJoin} />}
          {step === 'success' && <SuccessStep title={title} />}
          {step === 'alreadyInCircle' && <AlreadyInCircleStep />}

          {joinMutation.isPending && (
            <div className="flex justify-center mt-6">
              <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function JoinClient(props: JoinClientProps) {
  return (
    <AuthProvider>
      <APIProvider>
        <ToastProvider>
          <JoinFlow {...props} />
        </ToastProvider>
      </APIProvider>
    </AuthProvider>
  );
}
