import Chevron from '@/public/chevron-right.svg';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface HelpPageLayoutProps {
  title: string;
  intro: string;
  children: ReactNode;
  /** Absolute date, so nobody has to guess how current the answers are. */
  lastUpdated: string;
}

export default function HelpPageLayout({
  title,
  intro,
  children,
  lastUpdated,
}: HelpPageLayoutProps) {
  return (
    <div className="mx-auto max-w-[800px] bg-[#FCFBF8] px-5 pt-12 pb-36">
      <nav className="flex flex-row items-center gap-x-3 py-3">
        <Link href="/help" className="text-[1rem] font-medium text-[#242832]">
          Help
        </Link>
        <Image src={Chevron} alt="" width={20} height={20} />
        <p className="text-[1rem] font-medium text-[#242832] underline">
          {title}
        </p>
      </nav>

      <h1 className="mb-4 text-[2.5rem] font-semibold text-[#242832]">
        {title}
      </h1>
      <p className="mb-10 text-[1.0625rem] text-[#242832]">{intro}</p>

      {children}

      <div className="mt-12 rounded-[1.25rem] border-2 border-[#DEDBD5] p-6">
        <h2 className="mb-2 text-[1.25rem] font-semibold text-[#242832]">
          Didn&apos;t find your answer?
        </h2>
        <p className="mb-5 text-[1rem] text-[#242832]">
          Write to us and a real person will reply. Tell us what you were trying
          to do and we&apos;ll walk you through it.
        </p>
        <Link
          href="/contact"
          className="inline-flex rounded-[0.875rem] border-2 border-[#242832] bg-[#242832] px-6 py-3 text-[1rem] font-medium text-[#FCFBF8]">
          Contact us
        </Link>
      </div>

      <p className="mt-10 text-[0.875rem] text-[#868581]">
        Last updated {lastUpdated}
      </p>
    </div>
  );
}
