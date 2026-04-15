import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { BLOG_POSTS } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | Cher Ami',
  description:
    'Gift ideas, long-distance family tips, and guides for sending memories to the people who miss you most — from the team at Cher Ami.',
  alternates: { canonical: 'https://thecherami.com/blog' },
  openGraph: {
    title: 'Cher Ami Blog',
    description:
      'Gift ideas, long-distance family tips, and guides for sending memories to the people who miss you most.',
    url: 'https://thecherami.com/blog',
    siteName: 'Cher Ami',
    type: 'website',
    images: '/opengraph-image.png',
  },
};

export default function BlogIndex() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Cher Ami Blog',
    url: 'https://thecherami.com/blog',
    blogPost: BLOG_POSTS.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.dateISO,
      url: `https://thecherami.com/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <Script
        id="ld-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col items-center max-w-[1000px] mx-auto px-5 pt-12 pb-24">
        <header className="flex flex-col items-center gap-4 mb-12 text-center">
          <p className="text-[1rem] text-[#C15F3C] font-semibold py-1 px-2 border-2 border-[#C15F3C] rounded-[1000px] w-min">
            Blog
          </p>
          <h1 className="text-[2.5rem] sm:text-[3rem] text-[#242832] font-semibold">
            Stories for families who miss each other
          </h1>
          <p className="text-[1.05rem] text-[#4b4f59] max-w-[620px]">
            Gift ideas, long-distance family tips, and guides for turning everyday moments into
            something the people you love can hold.
          </p>
        </header>

        <ul className="flex flex-col gap-4 w-full">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-3 p-6 sm:p-8 bg-[#F4F1EA] hover:bg-[#ECE7DC] rounded-2xl transition-colors"
              >
                <div className="flex flex-row items-center gap-x-3 text-[0.85rem] text-[#868581]">
                  <time dateTime={post.dateISO}>{post.date}</time>
                  <span aria-hidden>•</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-[1.4rem] sm:text-[1.6rem] text-[#242832] font-semibold leading-tight">
                  {post.title}
                </h2>
                <p className="text-[1rem] text-[#4b4f59]">{post.excerpt}</p>
                <span className="text-[0.95rem] text-[#B05637] font-medium mt-1">
                  Read more →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
