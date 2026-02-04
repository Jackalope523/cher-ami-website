'use client';

import { useState, useEffect } from 'react';

const texts = ['Grandparents', 'Family Friends', 'Aunts & Uncles ', 'Old Friends'];
const maxLength = Math.max(...texts.map((text) => text.length));
const longestText = texts.find((text) => text.length === maxLength);


export default function CyclingTextHeader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, 200);
    }, 2500);

    return () => clearInterval(interval);
  }, []);


  return (
    <h2 className="text-[2rem] md:text-[2.5rem] text-[#242832] font-semibold text-center lg:text-left min-w-[320px] max-w-[650px]">
      Your Cherished Memories Mailed to{' '}
      <span className="inline-block relative align-top">
        <span
          className="text-[#C15F3C] min-w-[320px] absolute left-1/2 transform -translate-x-1/2 sm:text-left transition-all duration-200"
          style={{
            transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
            opacity: isAnimating ? 0 : 1,
          }}
        >
          {texts[currentIndex]}
        </span>
        <span className="invisible text-center whitespace-pre-wrap">{longestText || texts[currentIndex]}</span>
      </span>
    </h2>
  );
}