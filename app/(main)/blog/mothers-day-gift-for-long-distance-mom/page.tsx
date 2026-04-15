import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import BlogLayout from '@/components/BlogLayout';
import { getPostBySlug } from '@/lib/blog';

const post = getPostBySlug('mothers-day-gift-for-long-distance-mom')!;
const url = `https://thecherami.com/blog/${post.slug}`;

export const metadata: Metadata = {
  title: `${post.title} | Cher Ami`,
  description: post.description,
  keywords: post.keywords,
  authors: [{ name: post.author }],
  alternates: { canonical: url },
  openGraph: {
    title: post.title,
    description: post.description,
    url,
    siteName: 'Cher Ami',
    type: 'article',
    publishedTime: post.dateISO,
    authors: [post.author],
    images: '/opengraph-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.description,
    images: '/opengraph-image.png',
  },
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: { '@type': 'Organization', name: 'Cher Ami', url: 'https://thecherami.com' },
    publisher: {
      '@type': 'Organization',
      name: 'Cher Ami',
      logo: { '@type': 'ImageObject', url: 'https://thecherami.com/title.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: 'https://thecherami.com/opengraph-image.png',
  };

  return (
    <>
      <Script
        id="ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogLayout post={post}>
        <p>
          Mother&apos;s Day is harder when your mom lives far away (it&apos;s the case for ours).
        </p>
        <p>
          You can&apos;t show up with breakfast in bed. You can&apos;t hand her a card at the door.
          You&apos;re left choosing between a phone call that never feels long enough and a delivery
          that says &ldquo;I remembered&rdquo; more than &ldquo;I know you.&rdquo;
        </p>
        <p>
          If your mom is hundreds (or thousands) of miles away, you don&apos;t need another gift idea
          list. You need the one thing that actually makes her feel close to the life she&apos;s missing.
        </p>

        <h2>Most Long-Distance Gifts? Problematic.</h2>
        <p>
          Flowers arrive and die in a week, and fake flowers don&apos;t smell of love. Gift cards sit
          in a drawer. Care packages are thoughtful — once. Your mom doesn&apos;t really want <em>things</em>;
          she wants to feel like she&apos;s still part of your everyday life. You were at one point her
          everyday life, after all.
        </p>
        <p>
          She wants to see what her grandkids wore on the first day of school. She wants to know about
          your Saturday morning Pinterest-inspired brunch with candles. She wants the ordinary moments
          she can&apos;t be a part of — the ones that never feel important enough to text, but are
          exactly the ones she&apos;s missing.
        </p>

        <h2>What If You Could Send Her All of It?</h2>
        <p>That&apos;s why we built Cher Ami.</p>
        <p>
          Every month, your family adds photos and stories to a private, shared circle in the app. Your
          sister adds hers. Your kids add theirs. All the soccer photos, the friend dinners, the dog&apos;s
          birthday chaos — it all goes in.
        </p>
        <p>
          Then we print it into a real, glossy magazine and mail it straight to your mom&apos;s door.
        </p>
        <p>
          She doesn&apos;t need an app, and she doesn&apos;t even need to set up an account. She just
          opens her mailbox and finds a magazine full of the people she loves most.
        </p>

        <h2>Why It Works for Mother&apos;s Day (and Every Month After)</h2>
        <p>
          Most Mother&apos;s Day gifts are a one-day event. Cher Ami is different — it&apos;s a gift
          that arrives every month.
        </p>
        <p>
          The first magazine is the surprise. The second is the one she starts expecting. By the third,
          it&apos;s the thing she reaches for when she sits down with her coffee, the thing she shows
          her friends when they come over, the thing she keeps on her nightstand.
        </p>
        <p>
          It turns into a tradition. And for a mom who lives far away, a monthly reminder that her
          family is thinking of her is worth more than anything you can overnight from Amazon.
        </p>

        <h2>How It Works</h2>
        <ol>
          <li>
            <strong>Download the app</strong> (iOS or Android) and create your family&apos;s circle.
          </li>
          <li>
            <strong>Invite your family</strong> — siblings, dad, cousins, anyone who wants to contribute.
          </li>
          <li>
            <strong>Add photos and stories</strong> throughout the month (up to 20 posts per magazine).
          </li>
          <li>
            <strong>We print and mail</strong> a glossy 8.5×11&quot; magazine to your mom — free USA shipping.
          </li>
        </ol>
        <p>Your first magazine is free. No commitment, cancel anytime.</p>

        <h2>Made for Families Like Yours</h2>
        <p>
          Cher Ami was built by a founder whose own family is spread across continents. The distance
          between his life and his mom&apos;s isn&apos;t something a group chat can fix. A magazine
          can&apos;t replace being there — but it&apos;s the closest thing he&apos;s found.
        </p>
        <p>If your family doesn&apos;t all live in the same place, this is for you.</p>

        <h2>Start Her First Magazine Today</h2>
        <p>
          Mother&apos;s Day is May 11th. If you start this April, her first magazine can arrive in time.
        </p>
        <p>
          Your family&apos;s first magazine is free —{' '}
          <Link href="/start">start here</Link>.
        </p>
      </BlogLayout>
    </>
  );
}
