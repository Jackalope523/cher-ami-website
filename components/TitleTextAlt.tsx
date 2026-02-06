'use client';

import { useState, useEffect } from 'react';

const texts = ['Love', 'Meaning', 'Feeling', 'Joy', 'Memories'];
const maxLength = Math.max(...texts.map((text) => text.length));
const longestText = texts.find((text) => text.length === maxLength);


// AB Test Texts
// Your Family Deserves More
// Digital Sharing Is Broken/Flat

export default function TitleTextAlt() {
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
      Keep Your Grandparents Close,<br />Send Photos With{' '}
      <br className="block sm:hidden" />
      <span className="inline-block relative align-top text-center sm:text-left">
        <span
          className="text-[#C15F3C] w-full absolute left-1 transition-all duration-200"
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