import Image from 'next/image';
import Magazine from '@/public/magazine.webp';
import Link from 'next/link';
import type { Metadata } from 'next';
import EmailCTA from '@/components/EmailCTA';
import { Suspense } from 'react';


export const metadata: Metadata = {
  title: 'Start! | Cher Ami',
  description: 'Every month, transform your family\'s photos and stories into a beautiful magazine, delivered to those you love.',
  robots: {
    noimageindex: true,
    index: false,
  },
  alternates: {
    canonical: 'https://thecherami.com/start'
  }
};

export default function Start() {
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
            Start creating your first magazine for <span className="text-[#C15F3C]">free</span>
          </h2>
          <p className="text-[1rem] text-[#242832] font-normal text-center md:text-left max-w-[500px]">
            Sign up with your email address and we'll send you instructions for how to get started!
          </p>
          <div className="flex flex-col w-full sm:w-auto gap-3 p-5 border-2 border-[#C15F3C] rounded-[24px] shadow-lg">
            <Suspense>
              <EmailCTA />
            </Suspense>
          </div>
        </div>
      </section>

      <section id="objections" className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <h3 className="text-[1.5rem]text-[#242832] font-semibold text-center ">
            Objection 1
          </h3>
          <p className="text-[1rem] text-[#242832] font-normal text-center ">
            Resolution
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-[1.5rem]text-[#242832] font-semibold text-center ">
            Objection 2
          </h3>
          <p className="text-[1rem] text-[#242832] font-normal text-center ">
            Resolution
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-[1.5rem]text-[#242832] font-semibold text-center ">
            Objection 3
          </h3>
          <p className="text-[1rem] text-[#242832] font-normal text-center ">
            Resolution
          </p>
        </div>
          <div className="flex flex-col w-full sm:w-auto gap-3 p-5 border-2 border-[#C15F3C] rounded-[24px] shadow-lg">
            <Suspense>
              <EmailCTA />
            </Suspense>
          </div>
      </section>
    </div>
  );
}
