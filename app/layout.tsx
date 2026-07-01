import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import TermlyCMP from '@/components/TermlyCMP';
import { Suspense } from 'react';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Cher Ami — A printed photo magazine from your family, every month',
    template: '%s | Cher Ami',
  },
  description: 'Every month, transform your family\'s photos and stories into a beautiful printed magazine, delivered to those you love. First magazine free. Free US shipping. Cancel anytime.',
  applicationName: 'Cher Ami',
  keywords: [
    'family photo magazine',
    'printed photo magazine',
    'gift for grandparents',
    'long distance family gift',
    'mother\'s day gift',
    'monthly photo subscription',
    'family memories',
  ],
  authors: [{ name: 'Cher Ami' }],
  creator: 'Cher Ami',
  publisher: 'Cher Ami',
  robots: {
    index: true,
    follow: true,
    noimageindex: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL('https://thecherami.com'),
  openGraph: {
    title: 'Cher Ami — A printed photo magazine from your family, every month',
    description: 'Every month, transform your family\'s photos and stories into a beautiful printed magazine, delivered to those you love.',
    url: 'https://thecherami.com',
    siteName: 'Cher Ami',
    images: '/opengraph-image.png',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cher Ami — A printed photo magazine from your family, every month',
    description: 'Turn your family\'s photos into a printed magazine, delivered to those you love. First magazine free.',
    images: '/opengraph-image.png',
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
    <html lang="en" style={{ background: '#FCFBF8'}}>
      <body className={poppins.className} suppressHydrationWarning>
        <Script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Cher Ami',
              url: 'https://thecherami.com',
              logo: 'https://thecherami.com/title.png',
              sameAs: [
                'https://www.facebook.com/thecherami',
                'https://www.instagram.com/thecherami',
                'https://www.tiktok.com/@thecherami',
                'https://www.youtube.com/@thecherami',
              ],
            }),
          }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Cher Ami',
              url: 'https://thecherami.com',
            }),
          }}
        />
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
      </body>
    </html>
  );
}