import Link from 'next/link';
import CheckIcon from '@/public/check.svg';
import NotIcon from '@/public/x.svg';
import ArrowIcon from '@/public/arrow.svg';
import Image from 'next/image';
import TitleImage from '@/public/title.png';

export default function GeneralHelp() {
  return (
    <div className="bg-[#FCFBF8]">
      <main className="max-w-[1200px] mx-auto">
        <h1 className="text-[3rem] text-[#383a3f] font-semibold mb-16">
          General
        </h1>
        <h2 className="text-[3rem] text-[#383a3f] font-semibold mb-16">
          Question
        </h2>
      </main>
    </div>
  );
}
