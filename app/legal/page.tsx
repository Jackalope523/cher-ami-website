import Image from 'next/image';
import Lock from '@/public/lock.svg';
import Handshake from '@/public/handshake.svg';
import Undo from '@/public/undo.svg';
import Cookie from '@/public/undo.svg';
import Shipping from '@/public/truck.svg';
import Arrow from '@/public/arrow-up-right.svg';
import Link from 'next/link';
import LinkCard from '@/components/LinkCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal | Cher Ami',
  description: 'Find answers to your questions with our FAQ or contact us for support.',
  robots: {
    noimageindex: true,
  },
  alternates: {
    canonical: 'https://thecherami.com/legal'
  }
};

export default function Legal() {
  return (
    <div className="flex flex-col items-center max-w-[1200px] mx-auto px-5 pt-12 pb-36">
      <h1 className="text-[3rem] text-[#383a3f] font-semibold mb-16">Legal</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-16 gap-5 w-full">
        <LinkCard
          href="/legal/privacy"
          imageSource={Lock}
          alt={'privacy policy icon'}
          title={'Privacy Policy'}
        />
        <LinkCard
          href="/legal/terms"
          imageSource={Handshake}
          alt={'terms and conditions icon'}
          title={'Terms and Conditions'}
        />
        <LinkCard
          href="/legal/cookies"
          imageSource={Undo}
          alt={'cookie policy icon'}
          title={'Cookie Policy'}
        />
        <LinkCard
          href="/legal/shipping"
          imageSource={Shipping}
          alt={'shipping policy icon'}
          title={'Shipping Policy'}
        />
        <LinkCard
          href="/legal/return"
          imageSource={Undo}
          alt={'return policy icon'}
          title={'Return Policy'}
        />
      </div>
      <h2 className="text-[1.75rem] text-[#242832] font-semibold mb-5">
        Need help?
      </h2>
      <Link
        href={'/help'}
        className="flex flex-row px-8 py-6 gap-x-2 rounded-[1.25rem] border-2 border-[#242832]">
        <p className="text-[1rem] text-[#242832] font-medium">View help docs</p>
        <Image src={Arrow} alt="Go to help" width={24} height={24} />
      </Link>
    </div>
  );
}
