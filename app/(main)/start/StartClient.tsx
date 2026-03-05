'use client'

import Image from 'next/image';
import Magazine from '@/public/magazine.webp';
import Link from 'next/link';
import EmailCTA from '@/components/EmailCTA';
import { Suspense, useState } from 'react';
import SquirrelIllustration from '@/public/step-two-illustration.webp';

export default function StartClient() {
  const [signedUp, setSignedUp] = useState(false);

  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto px-5 gap-12 md:gap-20 pt-10 pb-18">
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
            Your First Magazine <span className="text-[#C15F3C]">Free</span>
          </h2>
          <p className="text-[1rem] text-[#242832] font-normal text-center md:text-left max-w-[500px]">
            We'll even cover shipping. Sign up with your email address and we'll send you instructions for how to start!
          </p>
          <Suspense>
            <EmailCTA location='start-top' onSignUp={() => setSignedUp(true)} done={signedUp} />
          </Suspense>
        </div>
      </section>

      <section id="objections" className="flex flex-col gap-16 max-w-2xl items-center gap-6">
        <div className="flex flex-col gap-4">
          <h3 className="text-[1.5rem] text-[#242832] font-semibold text-center">
            What if I don't have enough photos?
          </h3>
          <p className="text-[1rem] text-[#242832] font-normal text-center">
            Don't worry! You don't have to fill up the magazine every month to ship it.
            Even if you only make it yourself, you'll have enough time during the month
            to fill up the magazine (you may even want more pages!).
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-[1.5rem] text-[#242832] font-semibold text-center">
            Are my photos private and safe?
          </h3>
          <p className="text-[1rem] text-[#242832] font-normal text-center">
            Your photos are visible only to you and your circle (others you invite to join).
            Additionally, we take the utmost care for your data privacy which you can
            read more about <Link href="/help/privacy" className="underline">here</Link>.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-[1.5rem] text-[#242832] font-semibold text-center">
            I'm too busy to make an entire magazine
          </h3>
          <p className="text-[1rem] text-[#242832] font-normal text-center">
            As fellow busy people, we feel the same, which is why we've made it as easy and
            intuitive as possible to add your photos. Plus, invite as many
            other members as you want to help create your magazine!
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center">
          <h2 className="text-[1.5rem] text-[#242832] font-semibold text-center">
            We've made it easy, give it a go!
          </h2>
          <div className="flex flex-col w-full sm:w-auto gap-3 px-2">
            <Suspense>
              <EmailCTA location='start-bottom' onSignUp={() => setSignedUp(true)} done={signedUp} />
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
    </div>
  );
}
