import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import BlogLayout from '@/components/BlogLayout';
import { getPostBySlug } from '@/lib/blog';

const post = getPostBySlug('gifts-for-mom-who-has-everything')!;
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
        <p>&ldquo;I don&apos;t want anything.&rdquo;</p>
        <p>
          Every year she says it, and every year you get her something anyway — because not getting
          her anything feels wrong. So you end up with candles, slippers, a robe, a spa gift card,
          and the lingering sense that none of it is quite right.
        </p>
        <p>
          Here&apos;s what she actually means when she says she doesn&apos;t want anything: she
          doesn&apos;t want <em>stuff</em>. She wants something that makes her feel like she
          matters. The thing that shows you see her, you think about her, and she&apos;s still part
          of your world even if she&apos;s far away.
        </p>
        <p>She wants connection. Not another thing contributing to clutter.</p>

        <h2>What She Won&apos;t Tell You She Wants</h2>
        <p>Your mom won&apos;t say this out loud, but:</p>
        <p>
          She wants to know what you and her grandkids are up to. Not the highlight reel — the{' '}
          <em>real</em> stuff. You have the photos: the afternoon mess from lunch, the silly faces
          at dinner, the cat on someone&apos;s homework.
        </p>
        <p>
          She wants to feel included in the life happening at your house, the one she doesn&apos;t
          get to see because you live in different places now.
        </p>
        <p>
          She wants something she can hold, flip through, and show her friends at lunch. Something
          that makes her feel like the distance doesn&apos;t matter as much as it used to.
        </p>

        <h2>The Gift That Keeps Showing Up</h2>
        <p>
          <Link href="/start">Cher Ami</Link> is a monthly printed photo magazine made by your
          family and mailed to your mom.
        </p>
        <p>
          Here&apos;s how it works: you, your siblings, your dad — everyone in the family — add
          photos and stories to a shared circle in the app throughout the month. Then we print it
          into a glossy 8.5×11&quot; magazine and mail it to her door.
        </p>
        <p>
          She doesn&apos;t download anything. She doesn&apos;t create an account. She just checks
          her mailbox.
        </p>
        <p>
          The first time she gets one, she&apos;ll call you. The second time, she&apos;ll have it on
          the coffee table when her friends come over. By the third, she&apos;ll be watching the
          mailbox.
        </p>
        <p>That&apos;s not just a gift. That&apos;s a tradition.</p>

        <h2>Why This Works When Nothing Else Does</h2>
        <p>
          The mom who has everything doesn&apos;t need one more thing on Mother&apos;s Day. She
          needs one thing that reminds her she&apos;s part of a family that loves her, even from far
          away.
        </p>
        <p>
          Cher Ami does that with zero effort on her end and almost none on yours. Your whole family
          contributes. We handle the printing and shipping. She handles the smiling.
        </p>

        <h2>Your First Magazine Is Free</h2>
        <p>No commitment. Free shipping. Cancel anytime.</p>
        <p>If she says she doesn&apos;t want anything, give her the thing she&apos;ll never say she needs.</p>
        <p>
          <Link href="/start">Start her first magazine for free →</Link>
        </p>
      </BlogLayout>
    </>
  );
}
