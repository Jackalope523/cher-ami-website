import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import TitleImage from '@/public/title.png';
import MenuIcon from '@/public/menu.svg';
import PlausibleProvider, { usePlausible } from 'next-plausible';
import './globals.css';
import CTA from '@/components/CTA';
import Header from '@/components/Header';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cher Ami',
  description: 'Share memories with your family',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const plausible = usePlausible();

  return (
    <html lang="en">
      <body className={poppins.className}>
        <PlausibleProvider domain="thecherami.com">
          <Header />

          <main className="pt-16 bg-[#FCFBF8]">{children}</main>

          <footer className="flex flex-col w-full items-center gap-y-10 px-5 pb-5 bg-[#FCFBF8]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-4xl ">
              <div className="flex flex-col">
                <h3 className="text-[20px] text-[#242832] font-semibold mb-6">
                  Product
                </h3>
                <Link href="/#steps" className="text-[#B05637] py-2">
                  How It Works
                </Link>
                <Link href="/contact" className="text-[#B05637] py-2">
                  Contact
                </Link>
                <Link href="/help" className="text-[#B05637] py-2">
                  Help
                </Link>
                <Link href="/#download" className="text-[#B05637] py-2">
                  Get Cher Ami
                </Link>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[20px] text-[#242832] font-semibold mb-6">
                  Legal
                </h3>
                <Link href="/legal/privacy" className="text-[#B05637] py-2">
                  Privacy Policy
                </Link>
                <Link href="/legal/terms" className="text-[#B05637] py-2">
                  Terms of Service
                </Link>
                <Link href="/legal/return" className="text-[#B05637] py-2">
                  Return Policy
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
                <Link
                  href="https://www.reddit.com/user/thecherami/"
                  target="_blank"
                  className="text-[#B05637] py-2">
                  Reddit
                </Link>
              </div>
              <div className="flex flex-col gap-y-4">
                <h3 className="text-[20px] text-[#242832] font-semibold mb-6">
                  Download the app
                </h3>
                <CTA store="Apple" width={120} height={40} />
                <CTA store="Google" width={135} height={40} />
              </div>
            </div>
            <div className="bg-[#F4F1EA] rounded-xl w-full p-4 max-w-4xl ">
              <Image
                src={TitleImage}
                alt="Cher Ami logo"
                className="w-[143px] h-8 flex-none"
                priority
              />
              <div className="border border-[#DEDBD5] my-4" />
              <div className="flex flex-row justify-between">
                <p className="text-[#868581]">
                  © 2025 Hollow Inc. All rights reserved.
                </p>
                <p className="text-[#868581]">
                  Made with ❤️ in the USA, Canada, and EU.
                </p>
              </div>
            </div>
          </footer>
        </PlausibleProvider>
      </body>
    </html>
  );
}
