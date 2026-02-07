import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import PlausibleProvider from 'next-plausible';
import './globals.css';
import Script from 'next/script';
import TermlyCMP from '@/components/TermlyCMP';
import { Suspense } from 'react';
import Link from 'next/link';
import CTA from '@/components/CTA';
import Image from 'next/image';
import TitleImage from '@/public/title.png';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cher Ami',
  description: 'Every month, transform your family\'s photos and stories into a beautiful magazine, delivered to those you love.',
  robots: {
    noimageindex: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const FB_PIXEL_ID = process.env.FACEBOOK_PIXEL_ID;
  const WEBSITE_UUID = '284d228d-2ee6-4d7c-9c13-ef244cd65c4b';

  return (
    <html lang="en">
      <body className={poppins.className} suppressHydrationWarning>
        {FB_PIXEL_ID &&
          <Script id='fb-pixel' strategy='afterInteractive'>
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        }

        <Suspense fallback={null}>
          <TermlyCMP
            websiteUUID={WEBSITE_UUID}
            autoBlock={true}
          />
        </Suspense>

        <PlausibleProvider domain="thecherami.com">
          <div className="bg-[#FCFBF8]">
            {FB_PIXEL_ID &&
              <noscript>
                <img
                  height="1" width="1" style={{ display: 'none' }}
                  src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                />
              </noscript>
            }
            {children}
          </div>
          
          <footer className="flex flex-col w-full items-center gap-y-10 pb-5 bg-[#FCFBF8]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-[1200px] px-5 lg:px-13 xl:px-5">
              <div className="flex flex-col">
                <h3 className="text-[20px] text-[#242832] font-semibold mb-6">
                  Product
                </h3>
                <Link href="/start" className="text-[#B05637] py-2">
                  Get Cher Ami
                </Link>
                <Link href="/product" className="text-[#B05637] py-2">
                  How It Works
                </Link>
                <Link href="/help" className="text-[#B05637] py-2">
                  Help
                </Link>
                <Link href="/contact" className="text-[#B05637] py-2">
                  Contact
                </Link>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[20px] text-[#242832] font-semibold mb-6">
                  Legal
                </h3>
                <Link href="/legal" className="text-[#B05637] py-2">
                  Policy Center
                </Link>
                <Link href="/legal/privacy" className="text-[#B05637] py-2">
                  Privacy Policy
                </Link>
                <Link href="/legal/terms" className="text-[#B05637] py-2">
                  Terms and Conditions
                </Link>
                <Link href="#" className="text-[#B05637] py-2 termly-display-preferences">
                  Consent Preferences
                </Link>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[20px] text-[#242832] font-semibold mb-6">
                  Follow us
                </h3>
                <Link
                  href="https://www.facebook.com/thecherami"
                  target="_blank"
                  className="text-[#B05637] py-2">
                  Facebook
                </Link>
                <Link
                  href="https://www.instagram.com/thecherami"
                  target="_blank"
                  className="text-[#B05637] py-2">
                  Instagram
                </Link>
                <Link
                  href="https://www.tiktok.com/@thecherami"
                  target="_blank"
                  className="text-[#B05637] py-2">
                  TikTok
                </Link>
                <Link
                  href="https://www.youtube.com/@thecherami"
                  target="_blank"
                  className="text-[#B05637] py-2">
                  YouTube
                </Link>
                {/*
                <Link
                  href="https://www.reddit.com/user/thecherami/"
                  target="_blank"
                  className="text-[#B05637] py-2">
                  Reddit
                </Link>
                  */}
              </div>
              <div className="flex flex-col gap-y-4">
                <h3 className="text-[20px] text-[#242832] font-semibold mb-6">
                  Download the app
                </h3>
                <div className="hidden sm:flex flex-row sm:flex-col gap-4">
                  <CTA store="Apple" width={120} height={40} />
                  <CTA store="Google" width={135} height={40} />
                </div>
                <div className="flex sm:hidden flex-row sm:flex-col gap-4">
                  <CTA store="Apple" width={167} height={56} />
                  <CTA store="Google" width={189} height={56} />
                </div>
              </div>
            </div>
            <div className="w-full max-w-[1200px] px-5 lg:px-13 xl:px-5">
              <div className="w-full p-4 bg-[#F4F1EA] rounded-xl">
                <Image
                  src={TitleImage}
                  alt="Cher Ami logo"
                  className="w-[143px] h-8 flex-none"
                  priority
                />
                <div className="border border-[#DEDBD5] my-4" />
                <div className="flex flex-row justify-between">
                  <p className="text-[#868581]">
                    © 2026 Hollow Inc. All rights reserved.
                  </p>
                  <p className="text-[#868581]">
                    Made with ❤️ in the USA, Canada, and EU.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </PlausibleProvider>
      </body>
    </html>
  );
}