'use client';

import posthog from 'posthog-js';
import { useState } from 'react';

const BLURB =
  'A magazine of your family, every month. Cher Ami turns your family’s ' +
  'photos into a printed magazine, mailed to your loved one here at the ' +
  'community every month. No technology needed on their end — just a ' +
  'magazine full of family in their mailbox. Your first magazine is free at ' +
  'thecherami.com/start';

export default function CopyBlurb() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(BLURB);
      posthog.capture('community_blurb_copied');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      posthog.captureException(err);
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <blockquote className="text-[0.9rem] text-[#4b4f59] italic border-l-3 border-[#C15F3C] pl-4 text-left">
        {BLURB}
      </blockquote>
      <button
        onClick={handleCopy}
        className="text-[1rem] text-[#C15F3C] border-2 border-[#C15F3C] hover:bg-[#C15F3C]/10 rounded-2xl w-fit px-4 py-3 cursor-pointer">
        {copied ? 'Copied to clipboard' : 'Copy the newsletter blurb'}
      </button>
    </div>
  );
}
