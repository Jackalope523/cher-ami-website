'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TitleImage from '@/public/title.png';
import MenuIcon from '@/public/menu.svg';
import CloseIcon from '@/public/x-white.svg';
import FacebookIcon from '@/public/facebook.svg';
import InstagramIcon from '@/public/instagram.svg';
import TikTokIcon from '@/public/tiktok.svg';
import posthog from 'posthog-js';

export default function Header() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 40) {
        setIsVisible(false);
        setShowMenu(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`fixed w-full z-50 bg-[#FCFBF8] transition-transform duration-300
      ${!isVisible && !showMenu ? 'sm:translate-y-0 -translate-y-full' : 'translate-y-0'}
      ${showMenu && 'shadow-md/35 shadow-[#868581]'}`}>
      <div className="flex flex-row justify-between items-center w-full max-w-[1200px] bg-[#FCFBF8] mx-auto px-5 lg:px-13 xl:px-5 pt-2 lg:pt-5 pb-2">
        <Link href={'/'}>
          <Image
            src={TitleImage}
            alt="Cher Ami logo"
            className="w-[143px] h-8 flex-none"
            priority
          />
        </Link>
        { /* Dev */ }
        {/*
        <span className="text-left sm:hidden">xs</span>
        <span className="hidden sm:block md:hidden">sm</span>
        <span className="hidden md:block lg:hidden">md</span>
        <span className="hidden lg:block xl:hidden">lg</span>
        <span className="hidden xl:block 2xl:hidden">xl</span>
        <span className="hidden 2xl:block">2xl</span>
        */}
        <div className="hidden sm:flex flex-row gap-x-4">
          <Link
            href="/example"
            className="text-[#B05637] px-2 py-3 rounded-xl">
            Magazine
          </Link>
          <Link
            href="/#pricing"
            className="text-[#B05637] px-2 py-3 rounded-xl">
            Pricing
          </Link>
          <Link href="/help" className="text-[#B05637] px-4 py-3 rounded-xl">
            Help
          </Link>
          <Link href="/communities" className="text-[#B05637] px-4 py-3 rounded-xl">
            For Communities
          </Link>
          <Link
            href="/start"
            className="bg-[#C15F3C] hover:bg-[#89432B] active:bg-[#89432B] text-[#FFFFFF] px-4 py-3 rounded-xl"
            onClick={() => posthog.capture('header_cta_pressed', { location: 'desktop' })}>
            Get Started
          </Link>
        </div>
        <button
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          className="sm:hidden bg-[#C15F3C] active:bg-[#89432B] p-4 rounded-[14px] shadow-md/25 shadow-[#868581]">
          <Image src={showMenu ? CloseIcon : MenuIcon } alt="Open menu" width={24} height={24} />
        </button>
      </div>
      {showMenu &&
        <div className="sm:hidden flex flex-col w-full max-w-[1200px] bg-[#FCFBF8] mx-auto px-5 pb-2">
          <Link
            href="/example"
            onClick={() => {
              setShowMenu(false);
            }}
            className="text-[#B05637] px-4 py-3 rounded-xl">
            Magazine
          </Link>
          <Link
            href="/#pricing"
            onClick={() => {
              setShowMenu(false);
            }}
            className="text-[#B05637] px-4 py-3 rounded-xl">
            Pricing
          </Link>
          <Link
            href="/help"
            onClick={() => {
              setShowMenu(false);
            }}
            className="text-[#B05637] px-4 py-3 rounded-xl">
            Help
          </Link>
          <Link
            href="/communities"
            onClick={() => {
              setShowMenu(false);
            }}
            className="text-[#B05637] px-4 py-3 rounded-xl">
            For Communities
          </Link>
          <Link
            href="/start"
            onClick={() => {
              setShowMenu(false);
              posthog.capture('header_cta_pressed', { location: 'mobile' });
            }}
            className="bg-[#C15F3C] active:bg-[#89432B] text-[#FFFFFF] px-4 py-3 rounded-xl">
            Get Started
          </Link>
          <div className="flex gap-10 pt-6 pb-2 px-4">
            <Link
              href="https://www.facebook.com/thecherami"
              target="_blank"
              className="text-[#B05637]">
              <Image src={FacebookIcon} alt="Facebook icon" width={24} height={24} preload />
            </Link>
            <Link
              href="https://www.instagram.com/thecherami"
              target="_blank"
              className="text-[#B05637]">
              <Image src={InstagramIcon} alt="Instagram icon" width={24} height={24} preload />
            </Link>
            <Link
              href="https://www.tiktok.com/@thecherami"
              target="_blank"
              className="text-[#B05637]">
              <Image src={TikTokIcon} alt="Tiktok icon" width={24} height={24} preload />
            </Link>
          </div>
        </div>
       }
       {/*
       
        <div
          className="absolute bg-[#C15F3C] w-full animate-slide-down">
          <Link
            href="/start"
            onClick={() => posthog.capture('promo_banner_pressed')}
            className="flex flex-col gap-1 py-2 px-5 lg:px-13 xl:px-5">
            <p className="text-[.9rem] text-[#FCFBF8] text-center font-medium">
              Get ready for Father's Day! Send his first magazine free
            </p>
          </Link>
        </div>
       */}
    </header>
  );
}