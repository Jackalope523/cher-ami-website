import Link from 'next/link';
import Chevron from '@/public/chevron-right.svg';
import Image from 'next/image';

export default function BillingShippingHelp() {
  return (
    <div className="bg-[#FCFBF8] max-w-[1200px] mx-auto px-5 pt-12 pb-36">
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
          Billing & Shipping
        </p>
      </nav>
      <div>
        <h1 className="text-[2.5rem] text-[#383a3f] font-semibold mb-8">
          Billing & Shipping
        </h1>
        <div className="flex flex-col gap-y-6 mb-16">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              Are payments secure?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              Yes! Payments are securely processed through our trusted payment partners using industry-standard encryption.
              We retain no payment information on our servers.
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              When will the magazine arrive?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              At the start of the month, all our magazines are printed and shipped within 3-5 business days.
              Depending where your recipient is, shipping may take up to 1 week.
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              It's been two weeks and my magazine hasn't arrived. What do I do?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              We know it's disapointing when the magazine doesn't arrive on time. If your magazine has never reached your recipient, please <Link href="/contact" className="underline">contact us</Link> and we will help make it right.
            </p>
          </div>
        </div>
        <p className="text-[1rem] text-[#242832] font-semibold">
          Last updated the 7th of January, 2026
        </p>
      </div>
    </div>
  );
}
