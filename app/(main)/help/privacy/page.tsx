import HelpFaqItem from '@/components/HelpFaqItem';
import HelpPageLayout from '@/components/HelpPageLayout';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy & security | Help',
  description:
    'Who can see your photos, what we collect, and how payments are kept safe.',
  robots: {
    noimageindex: true,
  },
  alternates: {
    canonical: 'https://thecherami.com/help/privacy',
  },
};

export default function PrivacyHelp() {
  return (
    <HelpPageLayout
      title="Privacy & security"
      intro="Family photos are personal. Here's plainly who can see them and what we do with your information."
      lastUpdated="July 29, 2026">
      <HelpFaqItem question="Who can see our photos?" defaultOpen>
        <p>
          Only the people in your family circle, and whoever you mail the printed
          magazine to. Photos are never public, never browsable by strangers, and
          never shown to anyone who hasn&apos;t been invited with your code.
        </p>
        <p>
          There is no public profile, no feed of strangers, and no way to search
          for your family.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Do you sell our data or show ads?">
        <p>
          No, and no. We don&apos;t sell your information, we don&apos;t share it
          for advertising, and there are no ads in the app or in the magazine.
          Cher Ami is paid for by the magazines people send.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="What information do you collect?">
        <p>
          What we need to make and mail your magazine: your name and email, the
          photos and captions you add, and the name and address of each
          recipient.
        </p>
        <p>
          Our <Link href="/legal/privacy">Privacy Policy</Link> spells out the
          full detail, including how long we keep things.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Who handles the printed magazine?">
        <p>
          Your photos go to our print and mail partner solely to produce and post
          that magazine. They aren&apos;t used for anything else and aren&apos;t
          passed on.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Are payments secure?">
        <p>
          Yes. Card details are handled by our payment provider using
          industry-standard encryption and are never stored on our servers — we
          only ever see the last four digits, so we can show you which card is on
          file.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Can I stop someone in the circle from seeing my photos?">
        <p>
          You can block someone from their profile in the app, which hides your
          photos from them and theirs from you. If someone joined who
          shouldn&apos;t have, you can also generate a new invite code — see{' '}
          <Link href="/help/general">Using Cher Ami</Link>.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="How do I delete my account and my data?">
        <p>
          From the app&apos;s settings. Our{' '}
          <Link href="/help/account-deletion">account deletion page</Link> lists
          exactly what is removed and what is kept, and why.
        </p>
      </HelpFaqItem>
    </HelpPageLayout>
  );
}
