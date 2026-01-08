'use client';

import { useState } from 'react';
import Image from 'next/image';
import Chevron from '../public/chevron.svg';
import Link from 'next/link';
import TitleImage from '@/public/title.png';
import MenuIcon from '@/public/menu.svg';

export default function Header() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <header className="fixed w-full bg-[#FCFBF8] pt-5 pb-2 z-50">
      <div className="flex flex-row justify-between items-center w-full max-w-[1200px] mx-auto px-5">
        <Link href={'/'}>
          <Image
            src={TitleImage}
            alt="Cher Ami logo"
            className="w-[143px] h-8 flex-none"
            priority
          />
        </Link>
        <div className="hidden sm:flex flex-row gap-x-4">
          <Link
            href="/#steps-section"
            className="text-[#B05637] px-4 py-3 rounded-xl">
            How It Works
          </Link>
          <Link href="/help" className="text-[#B05637] px-4 py-3 rounded-xl">
            Help
          </Link>
          <Link
            href="/#download-section"
            className="bg-[#C15F3C] text-[#FFFFFF] px-4 py-3 rounded-xl">
            Get Cher Ami
          </Link>
        </div>
        <button
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          className="sm:hidden bg-[#C15F3C] p-4 rounded-[14px]">
          <Image src={MenuIcon} alt="Open menu" width={24} height={24} />
        </button>
      </div>
      {showMenu && (
        <div className="sm:hidden flex flex-col w-full max-w-[1200px] mx-auto px-5">
          <Link
            href="/#steps-section"
            onClick={() => {
              setShowMenu(false);
            }}
            className="text-[#B05637] px-4 py-3 rounded-xl">
            How It Works
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
            href="/#download-section"
            onClick={() => {
              setShowMenu(false);
            }}
            className="bg-[#C15F3C] text-[#FFFFFF] px-4 py-3 rounded-xl">
            Get Cher Ami
          </Link>
        </div>
      )}
    </header>
  );
}
