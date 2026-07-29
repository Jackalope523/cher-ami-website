import Chevron from '@/public/chevron.svg';
import Image from 'next/image';
import type { ReactNode } from 'react';

interface HelpFaqItemProps {
  question: string;
  children: ReactNode;
  /** Opens on load — for the question most people on the page arrive with. */
  defaultOpen?: boolean;
}

/**
 * A collapsible question in the help section.
 *
 * Separate from the marketing `FAQItem` card because help answers need several
 * paragraphs, lists and links rather than one line of text, and because a help
 * page benefits from things that component can't offer: built on <details>, it
 * needs no JavaScript, is keyboard-navigable for free, and the browser's own
 * find-in-page opens a collapsed answer when the text inside it matches.
 */
export default function HelpFaqItem({
  question,
  children,
  defaultOpen = false,
}: HelpFaqItemProps) {
  return (
    <details
      open={defaultOpen}
      className="group border-b-2 border-[#DEDBD5] last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
        <h3 className="text-[1.125rem] font-medium text-[#242832]">
          {question}
        </h3>
        <Image
          src={Chevron}
          alt=""
          width={24}
          height={24}
          className="shrink-0 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="flex flex-col gap-y-3 pb-6 text-[1rem] text-[#242832] [&_a]:underline">
        {children}
      </div>
    </details>
  );
}
