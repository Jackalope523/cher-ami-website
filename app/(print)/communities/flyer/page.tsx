import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import TitleImage from '@/public/title.png';
import Magazine from '@/public/magazine.webp';
import MailboxMiceIllustration from '@/public/mailbox-mice.webp';
import FlyerQR from '@/public/community-flyer-qr.png';

import PrintButton from './PrintButton';

export const metadata: Metadata = {
  title: 'Family Flyer | Cher Ami',
  description:
    'A printable flyer introducing Cher Ami to families of senior living residents.',
  robots: {
    noimageindex: true,
    index: false,
  },
  alternates: {
    canonical: 'https://thecherami.com/communities/flyer',
  },
};

export default function CommunityFlyer() {
  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4 print:p-0">
      <style>{`
        @page {
          size: letter;
          margin: 0.4in;
        }
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          /* Keep consent banners and other injected widgets off the paper */
          iframe, [id^="termly"], [class^="termly"] {
            display: none !important;
          }
        }
      `}</style>

      {/* Screen-only toolbar */}
      <div className="flex flex-row items-center gap-6 print:hidden">
        <Link href="/communities" className="text-[#B05637] underline">
          Back to Communities
        </Link>
        <PrintButton />
      </div>

      {/* The flyer sheet */}
      <div
        className="flex flex-col items-center gap-7 w-full max-w-[7.7in] bg-white rounded-[8px]
                    shadow-[0_4px_20px_rgba(0,0,0,0.15)] p-8 sm:p-12 print:shadow-none print:rounded-none print:p-0 print:gap-6">
        <Image
          src={TitleImage}
          alt="Cher Ami logo"
          className="w-[180px] h-auto"
          priority
        />

        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-[1.9rem] text-[#242832] font-semibold leading-tight">
            A magazine of your family,
            <br />
            in their mailbox every month
          </h1>
          <p className="text-[1rem] text-[#242832] font-normal max-w-[520px]">
            Cher Ami turns your family&apos;s photos and stories into a printed
            magazine, mailed to your loved one here at the community. No
            technology needed on their end — just a magazine full of family.
          </p>
        </div>

        <div className="flex flex-row items-center gap-8 w-full justify-center">
          <Image
            src={Magazine}
            alt="A printed Cher Ami family magazine"
            className="w-[190px] h-auto"
          />
          <div className="flex flex-col gap-4 max-w-[320px]">
            {[
              'Download the Cher Ami app and invite the whole family.',
              'Everyone adds photos and stories, right from their phones.',
              'We print and mail the magazine to your loved one every month.',
            ].map((step, i) => (
              <div key={step} className="flex flex-row gap-3 items-start">
                <p className="flex items-center justify-center min-w-8 h-8 bg-[#C15F3C] text-[#FCFBF8] text-[1rem] font-semibold rounded-full">
                  {i + 1}
                </p>
                <p className="text-[0.95rem] text-[#242832] font-normal">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[0.95rem] text-[#242832] font-medium text-center">
          First magazine free • $12.99 per magazine after • Free shipping •
          Cancel anytime
        </p>

        <div className="flex flex-row items-center gap-6 bg-[#F4F1EA] rounded-[20px] px-8 py-5">
          <div className="flex flex-col gap-1 text-center">
            <p className="text-[1rem] text-[#242832] font-normal">
              Get started at
            </p>
            <p className="text-[1.5rem] text-[#C15F3C] font-semibold">
              thecherami.com/start
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Image
              src={FlyerQR}
              alt="QR code linking to thecherami.com/start"
              className="w-[110px] h-[110px] rounded-[8px]"
            />
            <p className="text-[0.75rem] text-[#868581]">Scan with your phone</p>
          </div>
        </div>

        <div className="flex flex-row items-end justify-between w-full">
          <p className="text-[0.85rem] text-[#868581]">
            Questions? Email help@thecherami.com
          </p>
          <Image
            src={MailboxMiceIllustration}
            alt="Illustration of mice checking a mailbox"
            className="w-[100px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}
