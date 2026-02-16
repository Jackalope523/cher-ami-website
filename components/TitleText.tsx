'use client';

import { useState, useEffect } from 'react';

const texts = ['Love', 'Feeling', 'Stories', 'Meaning', 'Joy', 'Memories'];
const maxLength = Math.max(...texts.map((text) => text.length));
const longestText = texts.find((text) => text.length === maxLength);


// AB Test Texts
// Your Family Deserves More
// Digital Sharing Is Broken/Flat

export default function TitleText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  return (
    <h2 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center lg:text-left min-w-[320px] max-w-[650px]">
      Send Real Photos With{' '}
      <br className="block sm:hidden" />
      <span className="inline-block relative align-top text-center sm:text-left">
        <span
          className="absolute w-full text-[#C15F3C] transition-all duration-200"
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