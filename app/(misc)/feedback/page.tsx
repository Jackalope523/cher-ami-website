'use client'

import React, { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import IntroIllustration from '@/public/squirrel.webp';
import { usePlausible } from "next-plausible";

const FeedbackShell = dynamic(() => import("./FeedbackShell"), { ssr: false });

export default function FeedbackQuiz() {
  const plausible = usePlausible();
  const [started, setStarted] = useState(false);

  return (
    <div className="flex self-center items-center justify-center w-full h-[100vh] px-6 py-12">
      {!started ? (
        <section className="">
          <h1 className="text-[1.25rem] font-semibold text-[#242832]">A Monthly Dose of Joy</h1>
          <p className="mt-3 text-[1rem] text-[#242832]">Answer 5 quick questions and we'll show the best way for you to get started!</p>
          <div className="my-4 flex justify-center  scale-x-[-1]">
            <Image
              src={IntroIllustration}
              alt="A squirrel delivering a letter"
              height={167}
              placeholder="blur"
              />
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setStarted(true)}
              className="bg-[#C15F3C] text-white px-4 py-3 rounded-xl hover:bg-[#89432B] active:bg-[#89432B] cursor-pointer"
            >
              Start quiz
            </button>
            <a
              href="https://thecherami.com/utm_source=quiz_skip"
              className="border-1 border-[#242832] text-[#242832] px-4 py-3 rounded-xl hover:bg-[#ECEDEF]"
            >
              Continue to site instead
            </a>
          </div>
          <p className="mt-4 text-[0.75rem] text-[#676d7b]">Takes less than 30 seconds!</p>
        </section>
      ) : (
        <Suspense fallback={
          <div className="text-center p-8">Loading…</div>
        }>
          <FeedbackShell />
        </Suspense>
      )}
    </div>
  );
}