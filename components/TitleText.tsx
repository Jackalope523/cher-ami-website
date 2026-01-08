'use client';

import { useState, useEffect } from 'react';

export default function CyclingTextHeader() {
  const texts = ['Grandparents', 'Family Friends', 'Aunts & Uncles', 'Old Friends'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPop, setIsPop] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPop(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsPop(false);
      }, 150);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h2 className="text-[2.5rem] text-[#242832] font-semibold text-left max-w-[650px] mb-12">
      Your Cherished Memories Mailed to{' '}
      <span className="inline-block relative align-top" style={{ minWidth: '280px' }}>
        <span
          className="absolute top-0 left-0 transition-transform duration-150 text-left"
          style={{
            transform: isPop ? 'scale(1.1)' : 'scale(1)',
            transformOrigin: 'left top',
          }}
        >
          {texts[currentIndex]}
        </span>
        <span className="invisible text-left whitespace-pre-wrap">{texts[currentIndex]}</span>
      </span>
    </h2>
  );
}