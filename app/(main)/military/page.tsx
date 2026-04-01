import Image from 'next/image';
import Magazine from '@/public/magazine.webp';
import Link from 'next/link';
import type { Metadata } from 'next';
import WizardEmailCTA from '@/components/WizardEmailCTA';
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
            Keep them connected, wherever they serve
          </h2>
          <p className="text-[1rem] text-[#242832] font-normal text-center md:text-left max-w-[500px]">
            Send a monthly magazine filled with family photos to your service member or veteran for just <span className="text-[#779443] font-medium">$9.99/issue (20% off)</span>.
            We ship to APO/FPO/DPO addresses and anywhere in the USA.
            <br /><br />
            First magazine free, shipping included. Because distance shouldn't mean missing out on family.
          </p>
          <Suspense>
            <WizardEmailCTA variant='military' location='military' />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
