import Link from 'next/link';
import CheckIcon from '@/public/check.svg';
import NotIcon from '@/public/x.svg';
import Chevron from '@/public/chevron-right.svg';
import Image from 'next/image';
import TitleImage from '@/public/title.png';

export default function GeneralHelp() {
  return (
    <div className="bg-[#FCFBF8] pt-12 pb-36">
      <div className="bg-[#FCFBF8] max-w-[1200px] mx-auto px-5">
        <nav className="flex flex-row gap-x-4 py-3">
          <Link href="/help" className="text-[1rem] text-[#242832] font-medium">
            Help
          </Link>
          <Image
            src={Chevron}
            alt="A right facing chevron"
            width={24}
            height={24}
          />
          <p className="text-[1rem] text-[#242832] font-medium underline">
            General
          </p>
        </nav>
        <main>
          <h1 className="text-[2.5rem] text-[#383a3f] font-semibold mb-8">
            General
          </h1>
          <div className="flex flex-col gap-y-6 mb-16">
            <div className="flex flex-col gap-y-4">
              <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
                Question
              </h2>
              <p className="text-[1rem] text-[#242832] font-normal">
                Lorem ipsum dolor sit amet consectetur. Nunc ut feugiat
                vestibulum id. Odio varius magna ullamcorper magna fermentum
                dis. Laoreet ornare fusce consequat urna at urna dolor porta
                est. Odio tristique felis maecenas commodo. Mauris suspendisse
                massa a id fusce aenean a.
              </p>
            </div>
            <div className="flex flex-col gap-y-4">
              <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
                Question
              </h2>
              <p className="text-[1rem] text-[#242832] font-normal">
                Lorem ipsum dolor sit amet consectetur. Nunc ut feugiat
                vestibulum id. Odio varius magna ullamcorper magna fermentum
                dis. Laoreet ornare fusce consequat urna at urna dolor porta
                est. Odio tristique felis maecenas commodo. Mauris suspendisse
                massa a id fusce aenean a.
              </p>
            </div>
            <div className="flex flex-col gap-y-4">
              <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
                Question
              </h2>
              <p className="text-[1rem] text-[#242832] font-normal">
                Lorem ipsum dolor sit amet consectetur. Nunc ut feugiat
                vestibulum id. Odio varius magna ullamcorper magna fermentum
                dis. Laoreet ornare fusce consequat urna at urna dolor porta
                est. Odio tristique felis maecenas commodo. Mauris suspendisse
                massa a id fusce aenean a.
              </p>
            </div>
            <div className="flex flex-col gap-y-4">
              <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
                Question
              </h2>
              <p className="text-[1rem] text-[#242832] font-normal">
                Lorem ipsum dolor sit amet consectetur. Nunc ut feugiat
                vestibulum id. Odio varius magna ullamcorper magna fermentum
                dis. Laoreet ornare fusce consequat urna at urna dolor porta
                est. Odio tristique felis maecenas commodo. Mauris suspendisse
                massa a id fusce aenean a.
              </p>
            </div>
            <div className="flex flex-col gap-y-4">
              <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
                Question
              </h2>
              <p className="text-[1rem] text-[#242832] font-normal">
                Lorem ipsum dolor sit amet consectetur. Nunc ut feugiat
                vestibulum id. Odio varius magna ullamcorper magna fermentum
                dis. Laoreet ornare fusce consequat urna at urna dolor porta
                est. Odio tristique felis maecenas commodo. Mauris suspendisse
                massa a id fusce aenean a.
              </p>
            </div>
          </div>
          <p className="text-[1rem] text-[#242832] font-semibold">
            Last updated 11.12.2025
          </p>
        </main>
      </div>
    </div>
  );
}
