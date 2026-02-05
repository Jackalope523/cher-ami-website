'use client';

import { usePlausible } from 'next-plausible';
import { useEffect, useState } from 'react';
import SendIcon from '@/public/send.svg';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

type Props = {
  variant?: 'default' | 'military';
}

type ThemeVariantType = keyof typeof themeVariants;

const themeVariants = {
  defaultText: 'text-[#C15F3C]',
  defaultButton: 'bg-[#C15F3C] hover:bg-[#b05637] active:bg-[#b05637]',
  militaryText: 'text-[#5c8f41]',
  militaryButton: 'bg-[#5c8f41] hover:bg-[#476f32] active:bg-[#476f32]'
}

export default function EmailCTA({ variant = 'default' }: Props) {
  const textTheme: ThemeVariantType = variant === 'military' ? 'militaryText' : 'defaultText';
  const buttonTheme: ThemeVariantType = variant === 'military' ? 'militaryButton' : 'defaultButton';
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email,
      military: variant === 'military'
    };

    try {
      const res = await fetch('/api/welcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to submit');
    } catch (err) {
      console.error(err);
    }

    plausible('Email Given');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className={`text-[1rem] ${themeVariants[textTheme]} font-medium text-center`}>
        Check your inbox!
      </p>
    );
  }
  else {
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
                      text-white justify-center`}
          >
              Sign up
              <Image src={SendIcon} alt="arrow icon" />
          </button>
        </div>
        <p className="text-[0.75rem] text-[#676D7B]">We only use your email to help you get started. You can unsubscribe anytime.</p>
      </form>
    );
  }
}
