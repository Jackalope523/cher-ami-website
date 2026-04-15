import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import BlogLayout from '@/components/BlogLayout';
import { getPostBySlug } from '@/lib/blog';

const post = getPostBySlug('mothers-day-gifts-for-grandma')!;
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

  const Item = ({
    n,
    title,
    best,
    children,
    price,
    why,
  }: {
    n: number;
    title: string;
    best: string;
    children: React.ReactNode;
    price: string;
    why?: string;
  }) => (
    <section className="flex flex-col gap-3">
      <h2>
        {n}. {title}
      </h2>
      <p>
        <strong>Best for:</strong> {best}
      </p>
      {children}
      <p>
        <strong>Price:</strong> {price}
      </p>
      {why && (
        <p>
          <strong>Why it wins:</strong> {why}
        </p>
      )}
    </section>
  );

  return (
    <>
      <Script
        id="ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogLayout post={post}>
        <p>
          Grandma says all she wants is your love — she&apos;s telling the truth.
        </p>
        <p>
          She doesn&apos;t want another candle or mug with tacky quotes in goofy fonts. She wants to
          feel connected to the family and grandkids she doesn&apos;t see enough. Something that
          reminds her she&apos;s still part of the family — even from far away.
        </p>
        <p>
          Here are nine gifts that actually deliver on that. No generic online gift baskets, not things
          that end up in a closet or bin.
        </p>
        <hr />

        <Item
          n={1}
          title="A Monthly Photo Magazine from Her Family"
          best="Grandmas who live far away and aren't great with technology"
          price="$12.99/month (first magazine is free)"
          why="It's not a one-time gift. It arrives every month. And it gets better over time as your family fills it with more memories."
        >
          <p>
            This is our pick — and yes, we&apos;re biased, because we built it, and our grandparents{' '}
            <em>love</em> it.
          </p>
          <p>
            <Link href="/start">Cher Ami</Link> turns your family&apos;s photos into a glossy printed
            magazine and mails it to Grandma every month. Your whole family contributes through the
            app, and she gets a real magazine in her mailbox. No app needed on her end — just a
            physical keepsake in her lap.
          </p>
          <p>
            And trust us, she&apos;ll keep every single one, and probably ask for more. One customer
            told us her mom reads hers until the next one arrives.
          </p>
          <p>
            <Link href="/start">Send her first magazine for free →</Link>
          </p>
        </Item>
        <hr />

        <Item
          n={2}
          title="A Handwritten Letter Kit"
          best="Grandmas who love stationery and personal touches"
          price="$15–30"
        >
          <p>
            Buy a nice set of letter paper and pre-address a stack of envelopes to yourself and the
            grandkids. Include stamps. The gift is making it easy for her to write back. Most
            grandmas love writing letters — they just need a nudge.
          </p>
        </Item>
        <hr />

        <Item
          n={3}
          title="A Digital Photo Frame (Pre-Loaded)"
          best="Grandmas who are somewhat comfortable with technology"
          price="$150–300"
        >
          <p>
            Frames like the Aura or Skylight let you send photos remotely. The key: set it up{' '}
            <em>for</em> her before you give it. Pre-load it with 50+ photos so it works out of the
            box. The ones that require Wi-Fi setup on her end often end up unplugged.
          </p>
        </Item>
        <hr />

        <Item
          n={4}
          title={"A \u2018Grandma\u2019s Brag Book\u2019 Photo Album"}
          best="Grandmas who love showing off their grandkids to friends"
          price="$10–20"
        >
          <p>
            A small, purse-sized photo album filled with recent photos of the grandkids. Old school?
            Yes. But she&apos;ll pull it out at church, at lunch with friends, at the doctor&apos;s
            office. Print 20–30 of your best recent photos at a local print shop.
          </p>
        </Item>
        <hr />

        <Item
          n={5}
          title="A Custom Calendar with Family Photos"
          best="Grandmas who are practical and like having family photos visible"
          price="$20–40"
        >
          <p>
            A 12-month wall calendar with family photos for each month. Add birthdays and
            anniversaries to the dates. She&apos;ll look at it every single day, which means
            she&apos;ll see her family every single day.
          </p>
        </Item>
        <hr />

        <Item
          n={6}
          title="A Video Message Compilation"
          best="Grandmas who are comfortable watching videos on a tablet or TV"
          price="Free (just your time)"
        >
          <p>
            Have each family member record a short video — 30 seconds to a minute — telling Grandma
            what they love about her or sharing a favorite memory. Compile them into one video. If
            she has a tablet, load it on there. If not, play it for her on a call.
          </p>
        </Item>
        <hr />

        <Item
          n={7}
          title="A Subscription to Her Favorite Magazine Or Newspaper"
          best="Grandmas who love reading and already have a magazine habit"
          price="$15–30/year"
        >
          <p>
            If she already reads Better Homes &amp; Gardens or People, renewing her subscription is a
            thoughtful, practical gift. Pair it with a Cher Ami subscription and she&apos;ll have{' '}
            <em>her</em> magazine and <em>her family&apos;s</em> magazine arriving every month.
          </p>
        </Item>
        <hr />

        <Item
          n={8}
          title={"A \u2018Date\u2019 \u2014 Even Virtual"}
          best="Grandmas who value time over things"
          price="Free"
        >
          <p>
            If she&apos;s nearby, take her out. If she&apos;s far away, schedule a dedicated video
            call — not a quick check-in, but a real hour where you cook the same recipe together,
            watch the same movie, or just talk. Put it on the calendar and treat it like a real date.
          </p>
        </Item>
        <hr />

        <Item
          n={9}
          title="A Flower Subscription (With a Catch)"
          best="Grandmas who genuinely love fresh flowers"
          price="$30–50/month"
        >
          <p>
            A monthly flower delivery is nice — but only if she actually loves flowers. Don&apos;t
            default to flowers because it&apos;s easy. If she does love them, a subscription from a
            local florist (not a national chain) will feel more personal and last longer than a
            single bouquet.
          </p>
        </Item>
        <hr />

        <h2>The Real Gift Is Consistency</h2>
        <p>
          The best Mother&apos;s Day gifts for Grandma aren&apos;t the ones that impress her on May
          11th. They&apos;re the ones that still make her feel loved in June, July, and August.
        </p>
        <p>
          That&apos;s why a monthly gift (whether it&apos;s a photo magazine, a letter, or a standing
          phone date) beats a one-time surprise every time.
        </p>
        <p>
          If your grandma is far away and you want her to feel close,{' '}
          <Link href="/start">start her first Cher Ami magazine for free</Link>. It arrives in her
          mailbox every month, full of the family she loves and misses.
        </p>
      </BlogLayout>
    </>
  );
}
