'use client'

import React, { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import IntroIllustration from '@/public/step-two-illustration.webp';

const QuizShell = dynamic(() => import("./QuizShell"), { ssr: false });

export default function Quiz() {
  const [started, setStarted] = useState(false);

  return (
    <div className="flex self-center items-center justify-center w-full min-h-[100vh] p-6 mt-[-60]">
      {!started ? (
        <section className="w-xl bg-[#FEFEFD] rounded-2xl shadow-md p-8">
          <h1 className="text-[1.25rem] font-semibold text-[#242832]">Your Monthly Magazine They'll Love</h1>
          <p className="mt-3 text-[1rem] text-[#242832]">Answer 2-3 quick questions and we'll show the best way for you to get started!</p>
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
              className="bg-[#C15F3C] text-white px-4 py-3 rounded-xl hover:bg-[#B05637] cursor-pointer"
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
          <QuizShell />
        </Suspense>
      )}
    </div>
  );
}