'use client';

import { usePlausible } from 'next-plausible';
import { useEffect, useState } from 'react';
import ArrowIcon from '@/public/arrow.svg';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';


export default function EmailCTAAlt() {
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
      <p className="text-[1rem] text-[#C15F3C] font-medium">
        Check your inbox!
      </p>
    );
  }
  else {
    return (
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-row gap-3">
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-1.5 rounded-[12px] border-2 border-[#DEDBD5] text-[#868581]"
            type="email"
            required
          />
          <button
            type="submit"
            className="bg-[#C15F3C] px-3 sm:px-4 py-1.5 rounded-[12px]
                      hover:bg-[#B05637] active:bg-[#B05637] cursor-pointer"
          >
            <Image src={ArrowIcon} alt="arrow icon" className="block sm:hidden" />
            <p className="hidden sm:block text-white">Continue</p>
          </button>
        </div>
        <p className="text-[0.75rem] text-[#676D7B]">We only use your email to help you get started. You can unsubscribe anytime.</p>
      </form>
    );
  }
}
