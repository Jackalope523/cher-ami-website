import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import CTA from '@/components/CTA';
import Phone from '@/public/phone.webp';

export const metadata: Metadata = {
  title: 'Join your family | Cher Ami',
  description: "You've been invited to a family circle on Cher Ami. Download the app and join in.",
  robots: {
    noimageindex: true,
    index: false,
  },
  alternates: {
    canonical: 'https://thecherami.com/join'
  }
};

const steps = [
  {
    title: 'Download the app',
    body: 'Get Cher Ami from the App Store or Google Play.',
  },
  {
    title: 'Sign up',
    body: 'Open Cher Ami and continue with Apple, Google, or your email.',
  },
  {
    title: 'Enter your invite code',
    body: "Choose “Join your family’s circle”, type the code from your invitation, and tap Join. That’s it!",
  },
];

export default function Join() {
  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto px-5 pt-10 pb-18">
      <section className="flex flex-col-reverse md:flex-row-reverse items-center justify-between w-full px-8 xl:px-0 gap-10">
        <Image
          src={Phone}
          alt="The Cher Ami app showing a family's shared photos"
          className="max-w-[45vw] md:max-w-[30vw] lg:max-w-[22vw]"
          priority
        />
        <div className="flex flex-col items-center md:items-start gap-8 max-w-[560px]">
          <h1 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center md:text-left text-balance">
            Join your family on the <span className="text-[#C15F3C] leading-0">Cher Ami app</span>
          </h1>
          <p className="text-[1rem] text-[#242832] text-center md:text-left">
            Your family is sharing photos on Cher Ami, and every month they become a printed
            magazine mailed to someone you love. Joining only takes a minute.
          </p>

          <ol className="flex flex-col gap-6 w-full">
            {steps.map((step, index) => (
              <li key={step.title} className="flex flex-row gap-4">
                <span className="flex flex-none items-center justify-center w-9 h-9 rounded-full bg-[#F4F1EA] text-[#C15F3C] font-semibold">
                  {index + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[1.125rem] text-[#242832] font-semibold">
                    {step.title}
                  </h2>
                  <p className="text-[1rem] text-[#242832]">
                    {step.body}
                  </p>
                  {index === 0 && (
                    <div className="flex flex-row flex-wrap gap-3 pt-2">
                      <CTA store="Apple" width={167} height={56} trackingProps={{ location: 'join' }} />
                      <CTA store="Google" width={189} height={56} trackingProps={{ location: 'join' }} />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <p className="text-[1rem] text-[#868581] text-center md:text-left">
            Can&apos;t find your code? It&apos;s in the message you were sent, and the person who
            invited you can always send it again. Still stuck?{' '}
            <Link href="/help" className="text-[#B05637]">
              Visit our Help Center
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
