'use client';

import { useState } from 'react';
import Image from 'next/image';
import Chevron from '../public/chevron.svg'; // adjust path if needed

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  return (
    <div className="bg-[#F4F1EA] p-4 w-[80%] max-w-[500px] rounded-[14px] gap-2 flex flex-col">
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="flex flex-row justify-between w-full items-center">
        <p className="font-medium text-gray-800">{question}</p>
        <Image
          src={Chevron}
          alt="Toggle answer"
          width={24}
          height={24}
          className={`transition-transform duration-300 ${
            showAnswer ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {showAnswer && <p className="mt-4 text-gray-700">{answer}</p>}
    </div>
  );
}
