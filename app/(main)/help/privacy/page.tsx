import Link from 'next/link';
import Chevron from '@/public/chevron-right.svg';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy FAQ | Cher Ami',
  description: 'View the FAQ for privacy-related questions.',
  robots: {
    noimageindex: true,
  },
  alternates: {
    canonical: 'https://thecherami.com/help/privacy'
  }
};

export default function PrivacySecurityHelp() {
  return (
    <div className="bg-[#FCFBF8] max-w-[1200px] mx-auto px-5 pt-12 pb-36">
      <nav className="flex flex-row gap-x-4 py-3">
        <Link href="/help" className="text-[1rem] text-[#242832] font-medium">
          Help
        </Link>
        <Image
          src={Chevron}
          alt="A right facing chevron"
          width={24}
          height={24}
        />
        <p className="text-[1rem] text-[#242832] font-medium underline">
          Privacy & Security
        </p>
      </nav>
      <div>
        <h1 className="text-[2.5rem] text-[#383a3f] font-semibold mb-8">
          Privacy & Security
        </h1>
        <div className="flex flex-col gap-y-6 mb-16">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              Do you sell my data?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              Nope! We are committed to protecting your privacy and do not sell your data to third parties.
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              Are my photos public?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              No, your photos are not public and are only visible to members of your circle. We prioritize your privacy and ensure that your shared moments remain within your trusted group.
              Any printed magazines are privately and securely handled.
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              Are payments secure?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              Yes! Payments are securely processed through our trusted payment partners using industry-standard encryption.
              We retain no payment information on our servers.
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              What data do you collect?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              We are committed to only collecting the necessary data to provide you with our services.
              If you'd like to learn about all our data collection policies and practices, please review our <Link href="/legal/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              How do I delete my account?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              If you wish to delete your account, please follow the instructions on our <Link href="/help/account-deletion" className="underline">account deletion page</Link>.
            </p>
          </div>
        </div>
        <p className="text-[1rem] text-[#242832] font-semibold">
          Last updated the 7th of January, 2026
        </p>
      </div>
    </div>
  );
}
