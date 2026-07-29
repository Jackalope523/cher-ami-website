import HelpFaqItem from '@/components/HelpFaqItem';
import HelpPageLayout from '@/components/HelpPageLayout';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Billing & delivery | Help',
  description:
    'Prices, the free first magazine, cancelling, refunds, and when magazines arrive.',
  robots: {
    noimageindex: true,
  },
  alternates: {
    canonical: 'https://thecherami.com/help/billing',
  },
};

export default function BillingHelp() {
  return (
    <HelpPageLayout
      title="Billing & delivery"
      intro="What a magazine costs, when you're charged, and when it lands in the mailbox."
      lastUpdated="July 29, 2026">
      <h2 className="mt-2 mb-1 text-[1.25rem] font-semibold text-[#242832]">
        Cost and billing
      </h2>

      <HelpFaqItem question="How much does it cost?" defaultOpen>
        <p>
          $12.99 a month for each magazine you send. If it&apos;s going to a
          veteran or serving member of the military, the Military Edition is
          $9.99 a month — 20% off — and we deliver to APO, FPO and DPO addresses.
        </p>
        <p>
          Delivery is always free. Sharing photos in the app is free for
          everyone in your family circle.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Is the first magazine really free?">
        <p>
          Yes. The first magazine your family circle sends is on us, and
          it&apos;s not a limited-time offer — it&apos;s there whenever
          you&apos;re ready. There&apos;s one free magazine per family circle.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="When am I charged?">
        <p>
          Each magazine is a monthly subscription, billed on the 1st. Nothing is
          charged when you first add a recipient, and because your first
          magazine is free, your first payment covers the one after it.
        </p>
        <p>
          The app shows you the exact dates before you confirm — when this
          month&apos;s magazine closes, when it goes in the mail, and when your
          first payment would be.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="What if I send magazines to more than one person?">
        <p>
          Each recipient gets their own printed copy, and each copy is its own
          monthly subscription — so two recipients is $12.99 twice. The app adds
          it up for you before you confirm.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="How do I cancel?">
        <p>
          You can cancel any time. There&apos;s no long-term commitment and no
          cancellation fee. Manage it from <strong>Billing</strong> in the app
          menu, or <Link href="/contact">write to us</Link> and we&apos;ll take
          care of it for you.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Can I get a refund?">
        <p>
          Yes — we have a Happiness Guarantee. If a magazine arrives damaged, or
          you&apos;re simply not happy with it,{' '}
          <Link href="/contact">tell us what went wrong</Link> and we&apos;ll
          refund you or send a replacement.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Are payments secure?">
        <p>
          Yes. Payments are handled by our payment provider using
          industry-standard encryption, and card details are never stored on our
          servers. More in{' '}
          <Link href="/help/privacy">Privacy &amp; security</Link>.
        </p>
      </HelpFaqItem>

      <h2 className="mt-10 mb-1 text-[1.25rem] font-semibold text-[#242832]">
        Delivery
      </h2>

      <HelpFaqItem question="When will the magazine arrive?">
        <p>
          A magazine closes at the end of its month. Printing and posting happen
          early the following month, within about 3–5 business days, and
          delivery usually takes up to a week after that.
        </p>
        <p>
          So a magazine covering June is typically in the mailbox partway
          through July.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Where do you deliver?">
        <p>
          Anywhere in the USA, including military APO, FPO and DPO addresses.
          Delivery is free everywhere we ship. We don&apos;t deliver outside the
          USA yet, though family anywhere in the world can still add photos in
          the app.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="It's been two weeks and nothing has arrived">
        <p>
          We know that&apos;s disappointing, especially when someone is waiting
          on it. <Link href="/contact">Tell us who it was going to</Link> and
          we&apos;ll track it down and make it right — usually by sending a
          fresh copy.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="What does the magazine look like?">
        <p>
          8.5 × 11 inches, printed on premium glossy paper, up to 12 pages
          depending on how many photos went in. You can{' '}
          <Link href="/example">look through an example</Link> before you send
          one.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Does the recipient need anything to receive it?">
        <p>
          No — just a mailing address. No app, no account, no Wi-Fi, nothing to
          set up or sign in to.
        </p>
      </HelpFaqItem>
    </HelpPageLayout>
  );
}
