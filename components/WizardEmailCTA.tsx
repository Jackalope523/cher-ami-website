'use client';

import { usePlausible } from 'next-plausible';
import { useEffect, useState } from 'react';
import SendIcon from '@/public/send.svg';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import StartWizard from './StartWizard';

type Props = {
  variant?: 'default' | 'military';
  location?: string;
  done?: boolean;
  onSignUp?: () => any;
};

type ThemeVariantType = keyof typeof themeVariants;

const themeVariants = {
  defaultText: 'text-[#C15F3C]',
  defaultButton: 'bg-[#C15F3C] hover:bg-[#b05637] active:bg-[#b05637]',
  militaryText: 'text-[#779443]',
  militaryButton: 'bg-[#779443] hover:bg-[#6c873d] active:bg-[#6c873d]',
};

export default function EmailCTA({
  variant = 'default',
  location = '',
  done = false,
  onSignUp,
}: Props) {
  const textTheme: ThemeVariantType =
    variant === 'military' ? 'militaryText' : 'defaultText';
  const buttonTheme: ThemeVariantType =
    variant === 'military' ? 'militaryButton' : 'defaultButton';

  const plausible = usePlausible();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const isSubmitted = searchParams.get('submitted');
    if (isSubmitted && isSubmitted === 'true') {
      setSubmitted(true);
    }
  }, []);

  useEffect(() => {
    if (done) {
      setSubmitted(true);
    }
  }, [done]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    plausible('Wizard Start', { props: { location } });
    if (onSignUp) {
      onSignUp();
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col gap-4">
        <p className={`text-[1rem] ${themeVariants[textTheme]} font-semibold text-center`}>
          You&apos;re in! Let&apos;s set up your first magazine.
        </p>
        <StartWizard email={email} />
      </div>
    );
  } else {
    return (
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full px-4 py-1.5 md:py-2 rounded-[12px] border-2 border-[#DEDBD5] text-[#868581]"
            type="email"
            required
          />
          <button
            type="submit"
            className={`flex flex-row gap-1 px-3 px-4 py-1.5 md:py-2
                      ${themeVariants[buttonTheme]} rounded-[12px] cursor-pointer
                      text-white justify-center`}>
            Sign up
            <Image src={SendIcon} alt="arrow icon" />
          </button>
        </div>
        <p className="text-[0.75rem] text-[#676D7B]">
          We&apos;ll only use this to help you get started. Unsubscribe anytime.
          One free magazine per family.
        </p>
      </form>
    );
  }
}
