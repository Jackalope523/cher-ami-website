import Image from 'next/image';
import Magazine from '@/public/magazine.webp';
import Link from 'next/link';
import type { Metadata } from 'next';
import EmailCTA from '@/components/EmailCTA';
import { Suspense } from 'react';


export const metadata: Metadata = {
  title: 'Military Edition | Cher Ami',
  description: 'The best newsletter active service members want to receive.',
  robots: {
    noimageindex: true,
    index: false,
  },
  alternates: {
    canonical: 'https://thecherami.com/military'
  }
};

export default function Military() {
  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto px-5 gap-20 md:gap-36 pt-10 pb-18">
      <section
        id="landing"
        className="flex flex-col md:flex-row-reverse items-center justify-between w-full px-8 xl:px-0 gap-6">
        <Image
          src={Magazine}
          alt="Image of magazine"
          className="max-w-[50vw] md:max-w-[40vw] lg:max-w-[30vw]"
          priority
          />
        <div className="flex flex-col items-center md:items-start gap-8">
          <h2 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center md:text-left min-w-[320px] max-w-[650px]">
            We appreciate our <span className="text-[#5c8f41]">veterans</span> and <span className="text-[#5c8f41]">service members!</span>
          </h2>
          <p className="text-[1rem] text-[#242832] font-normal text-center md:text-left max-w-[500px]">
            Whether you are sending to a service member APO/FPO/DPO or to a veteran in the USA, we offer <span className="text-[#C15F3C] font-medium">20% off</span> all issues.
            <br /><br />
            Sign up with your email address and we'll send you instructions for how to get started!
          </p>
          <div className="flex flex-col w-full sm:w-auto gap-3 p-5 border-2 border-[#5c8f41] rounded-[24px] shadow-lg">
            <Suspense>
              <EmailCTA variant='military' />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
