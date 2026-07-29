import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Billing from '@/public/credit-card.svg';
import Mail from '@/public/mail.svg';
import QuestionMark from '@/public/question-mark.svg';
import Shield from '@/public/shield.svg';
import User from '@/public/user-round.svg';

export const metadata: Metadata = {
  title: 'Help | Cher Ami',
  description:
    'Answers about family circles, photos, magazines, delivery and billing — plus a way to reach a real person.',
  robots: {
    noimageindex: true,
  },
  alternates: {
    canonical: 'https://thecherami.com/help',
  },
};

/** The situations people actually arrive in, in rough order of how common they are. */
const COMMON_QUESTIONS = [
  {
    question: 'Someone invited me. What is this?',
    href: '/help/general',
  },
  {
    question: 'How do I start a family circle?',
    href: '/help/general',
  },
  {
    question: 'When will the magazine arrive?',
    href: '/help/billing',
  },
  {
    question: 'How much does it cost, and when am I charged?',
    href: '/help/billing',
  },
  {
    question: "I can't sign in or my code didn't arrive",
    href: '/help/account',
  },
  {
    question: 'Who can see our photos?',
    href: '/help/privacy',
  },
];

const CATEGORIES = [
  {
    href: '/help/general',
    imageSource: QuestionMark,
    title: 'Using Cher Ami',
    description:
      'Family circles, adding photos, recipients, and how a magazine gets made.',
  },
  {
    href: '/help/account',
    imageSource: User,
    title: 'Your account',
    description: 'Signing in, your name and photo, leaving, deleting.',
  },
  {
    href: '/help/billing',
    imageSource: Billing,
    title: 'Billing & delivery',
    description: 'Prices, the free first magazine, cancelling, and shipping.',
  },
  {
    href: '/help/privacy',
    imageSource: Shield,
    title: 'Privacy & security',
    description: 'Who sees your photos, what we collect, payment safety.',
  },
];

export default function Help() {
  return (
    <div className="mx-auto max-w-[900px] px-5 pt-12 pb-36">
      <h1 className="mb-4 text-[2.75rem] font-semibold text-[#242832]">
        How can we help?
      </h1>
      <p className="mb-12 text-[1.0625rem] text-[#242832]">
        Most questions are answered below. If yours isn&apos;t, write to us,
        a real person will read your message.
      </p>

      <h2 className="mb-4 text-[1.5rem] font-semibold text-[#242832]">
        Common questions
      </h2>
      <ul className="mb-14 flex flex-col overflow-hidden rounded-[1.25rem] border-2 border-[#DEDBD5]">
        {COMMON_QUESTIONS.map((item) => (
          <li
            key={item.question}
            className="border-b-2 border-[#DEDBD5] last:border-b-0">
            <Link
              href={item.href}
              className="flex items-center justify-between gap-4 px-6 py-4 text-[1.0625rem] text-[#242832]">
              {item.question}
              <span aria-hidden="true" className="text-[#C15F3C]">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mb-4 text-[1.5rem] font-semibold text-[#242832]">
        Browse by topic
      </h2>
      <div className="mb-14 grid w-full grid-cols-1 gap-5 md:grid-cols-2">
        {CATEGORIES.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="flex flex-col gap-y-3 rounded-[1.25rem] border-2 border-[#242832] p-6">
            <Image
              src={category.imageSource}
              alt=""
              width={40}
              height={40}
            />
            <p className="text-[1.25rem] font-medium text-[#242832]">
              {category.title}
            </p>
            <p className="text-[0.9375rem] text-[#575A61]">
              {category.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="rounded-[1.25rem] border-2 border-[#DEDBD5] p-8">
        <h2 className="mb-2 text-[1.5rem] font-semibold text-[#242832]">
          Still stuck?
        </h2>
        <p className="mb-6 text-[1rem] text-[#242832]">
          Tell us what you were trying to do and we&apos;ll walk you through it.
          If something went wrong with a magazine, we&apos;ll make it right.
        </p>
        <Link
          href="/contact"
          className="inline-flex flex-row items-center gap-x-2 rounded-[1.25rem] border-2 border-[#242832] px-8 py-4">
          <p className="text-[1rem] font-medium text-[#242832]">Contact us</p>
          <Image src={Mail} alt="" width={24} height={24} />
        </Link>
      </div>
    </div>
  );
}
