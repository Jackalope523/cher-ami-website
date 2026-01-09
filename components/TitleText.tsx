'use client';

import { useState, useEffect } from 'react';

const texts = ['Grandparents', 'Family Friends', 'Aunts & Uncles ', 'Old Friends'];
const maxLength = Math.max(...texts.map((text) => text.length));
const longestText = texts.find((text) => text.length === maxLength);


export default function CyclingTextHeader() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isAnimating, setIsAnimating] = useState(false);
  const [effect, setEffect] = useState('slideDown');

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


  const effects: any = {
    pop: {
      style: {
        transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
        transformOrigin: 'left top',
      },
      className: 'transition-transform duration-150'
    },
    fade: {
      style: {
        opacity: isAnimating ? 0 : 1,
      },
      className: 'transition-opacity duration-200'
    },
    slideUp: {
      style: {
        transform: isAnimating ? 'translateY(-10px)' : 'translateY(0)',
        opacity: isAnimating ? 0 : 1,
      },
      className: 'transition-all duration-200'
    },
    slideDown: {
      style: {
        transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
        opacity: isAnimating ? 0 : 1,
      },
      className: 'transition-all duration-200'
    },
    bounce: {
      style: {
        transform: isAnimating ? 'scale(1.2) translateY(-5px)' : 'scale(1) translateY(0)',
        transformOrigin: 'left top',
      },
      className: 'transition-all duration-150'
    },
    rotate: {
      style: {
        transform: isAnimating ? 'scale(0.9) rotate(-5deg)' : 'scale(1) rotate(0deg)',
        opacity: isAnimating ? 0.5 : 1,
        transformOrigin: 'left top',
      },
      className: 'transition-all duration-150'
    },
    blur: {
      style: {
        filter: isAnimating ? 'blur(4px)' : 'blur(0px)',
        opacity: isAnimating ? 0.3 : 1,
      },
      className: 'transition-all duration-150'
    },
    zoom: {
      style: {
        transform: isAnimating ? 'scale(1.3)' : 'scale(1)',
        opacity: isAnimating ? 0 : 1,
        transformOrigin: 'left top',
      },
      className: 'transition-all duration-150'
    }
  };

  const currentEffect = effects[effect];

  return (
    <h2 className="text-[2.5rem] text-[#242832] font-semibold text-center max-w-[650px] mb-12">
      Your Cherished Memories Mailed to{' '}
      <span className="inline-block relative align-top" style={{ minWidth: '280px' }}>
        <span
          className={`absolute top-0 left-0 text-left ${currentEffect.className}`}
          style={currentEffect.style}
        >
          {texts[currentIndex]}
        </span>
        <span className="invisible text-left whitespace-pre-wrap">{longestText || texts[currentIndex]}</span>
      </span>
    </h2>
  );
}