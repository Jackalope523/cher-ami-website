import Image from 'next/image';
import QuestionMark from '@/public/question-mark.svg';
import User from '@/public/user-round.svg';
import Shield from '@/public/shield.svg';
import Billing from '@/public/credit-card.svg';
import Truck from '@/public/truck.svg';
import Mail from '@/public/mail.svg';
import Link from 'next/link';
import LinkCard from '@/components/LinkCard';

export default function Help() {
  return (
    <div className="bg-[#FCFBF8] pt-12 pb-36">
      <main className="flex flex-col items-center max-w-[1200px] mx-auto px-5">
        <h1 className="text-[3rem] text-[#242832] font-semibold mb-5">Help</h1>
        <p className="text-[1rem] text-[#242832] font-normal mb-16">
          Find answers to your questions here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full mb-16">
          <LinkCard
            href="/help/general"
            imageSource={QuestionMark}
            alt={'Go to general help'}
            title={'General'}
          />
          <LinkCard
            href="/dsfsfsd"
            imageSource={User}
            alt={'Go to account help'}
            title={'Account'}
          />
          <LinkCard
            href="/dsfsfsd"
            imageSource={Shield}
            alt={'Go to security and privacy help'}
            title={'Security & Privacy'}
          />
          <LinkCard
            href="/dsfsfsd"
            imageSource={Billing}
            alt={'Go to billing help'}
            title={'Billing'}
          />
          <LinkCard
            href="/dsfsfsd"
            imageSource={Truck}
            alt={'Go to shipping help'}
            title={'Shipping'}
          />
        </div>

        <h2 className="text-[1.75rem] text-[#242832] font-semibold mb-5">
          Still need help?
        </h2>
        <Link
          href={'/contact'}
          className="flex flex-row px-8 py-6 gap-x-2 rounded-[1.25rem] border-2 border-[#242832]">
          <p className="text-[1rem] text-[#242832] font-medium">
            Contact us directly
          </p>
          <Image src={Mail} alt="Go to contact" width={24} height={24} />
        </Link>
      </main>
    </div>
  );
}
