import Link from 'next/link';
import Image from 'next/image';
import Chevron from '@/public/chevron-right.svg';
import type { BlogPost } from '@/lib/blog';

type Props = {
  post: BlogPost;
  children: React.ReactNode;
};

export default function BlogLayout({ post, children }: Props) {
  return (
    <article className="bg-[#FCFBF8] max-w-[760px] mx-auto px-5 pt-8 pb-24">
      <nav aria-label="Breadcrumb" className="flex flex-row items-center gap-x-3 py-3 text-[0.9rem] text-[#868581]">
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
        <Image src={Chevron} alt="" width={16} height={16} aria-hidden />
        <span className="truncate">{post.title}</span>
      </nav>

      <header className="flex flex-col gap-4 mt-4 mb-10">
        <div className="flex flex-row items-center gap-x-3 text-[0.9rem] text-[#868581]">
          <time dateTime={post.dateISO}>{post.date}</time>
          <span aria-hidden>•</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="text-[2.25rem] sm:text-[2.75rem] leading-tight text-[#242832] font-semibold">
          {post.title}
        </h1>
        <p className="text-[1.05rem] text-[#4b4f59]">{post.excerpt}</p>
      </header>

      <div className="blog-prose flex flex-col gap-5 text-[1.05rem] text-[#242832] leading-[1.7]">
        {children}
      </div>

      <aside className="mt-16 p-6 sm:p-8 bg-[#F4F1EA] rounded-2xl flex flex-col gap-4 items-start">
        <h2 className="text-[1.5rem] text-[#242832] font-semibold">
          Your first magazine is free
        </h2>
        <p className="text-[1rem] text-[#4b4f59]">
          Your family adds photos to a shared circle in the app. We print a glossy
          magazine and mail it to whoever misses you most. Free shipping. Cancel anytime.
        </p>
        <Link
          href="/start"
          className="py-3 px-5 bg-[#C15F3C] hover:bg-[#b05637] rounded-[12px] shadow-md text-white text-[1rem] font-medium"
        >
          Send her first magazine free
        </Link>
      </aside>
    </article>
  );
}
