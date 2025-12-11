import Image from 'next/image';
import Lock from '@/public/lock.svg';
import Handshake from '@/public/handshake.svg';
import Undo from '@/public/undo.svg';
import Arrow from '@/public/arrow-up-right.svg';
import Link from 'next/link';
import LinkCard from '@/components/LinkCard';

export default function Legal() {
  return (
    <div className="bg-[#FCFBF8]">
      <main className="flex flex-col items-center">
        <h1 className="text-[3rem] text-[#383a3f] font-semibold mb-16">
          Legal
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16 gap-5">
          <LinkCard
            href="/dfihjsdkjfj"
            imageSource={Lock}
            alt={'Go to general help'}
            title={'General'}
          />
          <LinkCard
            href="/dsfsfsd"
            imageSource={Handshake}
            alt={'Go to account help'}
            title={'Account'}
          />
          <LinkCard
            href="/dsfsfsd"
            imageSource={Undo}
            alt={'Go to security and privacy help'}
            title={'Security & Privacy'}
          />
        </div>
        <h2 className="text-[1.75rem] text-[#242832] font-semibold mb-5">
          Need help?
        </h2>
        <Link
          href={'/help'}
          className="flex flex-row px-8 py-6 gap-x-2 rounded-[1.25rem] border-2 border-[#242832]">
          <p className="text-[1rem] text-[#242832] font-medium">
            View help docs
          </p>
          <Image src={Arrow} alt="Go to help" width={24} height={24} />
        </Link>
      </main>
    </div>
  );
}
