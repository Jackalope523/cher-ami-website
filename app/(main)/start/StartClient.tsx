'use client'

import Image from 'next/image';
import Magazine from '@/public/magazine.webp';
import Link from 'next/link';
import WizardEmailCTA from '@/components/WizardEmailCTA';
import { Suspense, useRef, useState } from 'react';
import SquirrelIllustration from '@/public/squirrel.webp';

import { Damion } from 'next/font/google';

const damion = Damion({
  weight: '400',
  fallback: ['cursive'],
  display: 'swap',
});

export default function StartClient() {
  const [signedUp, setSignedUp] = useState(false);
  const wizardRef = useRef<HTMLDivElement>(null);

  function handleBottomSignUp() {
    setSignedUp(true);
    // Scroll to the top wizard after a tick so the DOM updates
    setTimeout(() => {
      wizardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto px-5 gap-12 md:gap-20 pt-10 pb-18">
      <section
        id="landing"
        className="flex flex-col md:flex-row-reverse items-center justify-between w-full px-8 xl:px-0 gap-4">
        <Image
          src={Magazine}
          alt="Image of magazine"
          className="max-w-[60vw] sm:max-w-[50vw] md:max-w-[40vw] xl:max-w-[30vw]"
          priority
          />
        <div className="flex flex-col items-center md:items-start gap-8">
          <h2 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center md:text-left min-w-[320px] max-w-[650px]">
            Your Family's First Magazine <span className={`${damion.className} text-[2.5rem] text-[#C15F3C] leading-0`}>Free</span>
          </h2>
          <p className="text-[1rem] text-[#242832] font-normal text-center md:text-left max-w-[500px]">
            We&apos;ll even cover shipping. Enter your email and we&apos;ll help you get started in minutes.
          </p>
          <div className="w-full" ref={wizardRef}>
            <Suspense>
              <WizardEmailCTA location='start' onSignUp={() => setSignedUp(true)} done={signedUp} />
            </Suspense>
          </div>
        </div>
      </section>

      {!signedUp && (
        <section id="objections" className="flex flex-col gap-16 max-w-2xl items-center gap-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-[1.5rem] text-[#242832] font-semibold text-center">
              What if I don't post enough photos?
            </h3>
            <p className="text-[1rem] text-[#242832] font-normal text-center">
              You'd be surprised, even 5 posts make a great magazine!
              Plus, invite your kids, siblings, and cousins to contribute.
              The more the merrier (and the less work for you)
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-[1.5rem] text-[#242832] font-semibold text-center">
              Who can see my photos?
            </h3>
            <p className="text-[1rem] text-[#242832] font-normal text-center">
              Only people you personally invite to your family.
              Photos are never public, never shared, never used for ads.
              Your family's moments stay in your family.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-[1.5rem] text-[#242832] font-semibold text-center">
              I don't have time for this
            </h3>
            <p className="text-[1rem] text-[#242832] font-normal text-center">
              That's exactly why we built it.
              Posting a photo takes 30 seconds, the same time as texting one.
              We handle the layout, printing, and shipping automatically.
              Invite family members to share the load, and the magazine practically builds itself.
            </p>
          </div>
          <div className="flex flex-col gap-6 items-center">
            <h2 className="text-[1.5rem] text-[#242832] font-semibold text-center">
              Ready to make someone's day?
            </h2>
            <div className="flex flex-col w-full sm:w-auto gap-3 px-2">
              <Suspense>
                <WizardEmailCTA location='start' onSignUp={handleBottomSignUp} done={signedUp} />
              </Suspense>
            </div>
            <div className="max-w-[400px] pt-8">
              <Image
                src={SquirrelIllustration}
                alt="Illustration of a pigeon"
                className="scale-x-[-1]"
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
