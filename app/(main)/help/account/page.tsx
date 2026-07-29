import HelpFaqItem from '@/components/HelpFaqItem';
import HelpPageLayout from '@/components/HelpPageLayout';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Your account | Help',
  description:
    'Signing in, changing your name or photo, leaving a family circle, and deleting your account.',
  robots: {
    noimageindex: true,
  },
  alternates: {
    canonical: 'https://thecherami.com/help/account',
  },
};

export default function AccountHelp() {
  return (
    <HelpPageLayout
      title="Your account"
      intro="Signing in, your details, and leaving or closing your account."
      lastUpdated="July 29, 2026">
      <HelpFaqItem question="My sign-in code didn't arrive" defaultOpen>
        <p>Three things fix this almost every time:</p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Check your spam or junk folder — the code often lands there.</li>
          <li>
            Check the email address you typed. A code sent to a mistyped address
            can&apos;t reach you.
          </li>
          <li>
            Ask for a new code from the same screen. Codes expire, so the newest
            one is the one that works.
          </li>
        </ul>
        <p>
          Still nothing? <Link href="/contact">Write to us</Link> with the email
          address you&apos;re using and we&apos;ll get you in.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="How do I create an account?">
        <p>
          <Link href="/?redirect=download#download">Download the app</Link> and
          sign up with Google, Apple, or your email address. If you sign up with
          an email we&apos;ll send you a short code to confirm it&apos;s you —
          there&apos;s no password to remember.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Do I need to pay to join someone's family circle?">
        <p>
          No. Joining and sharing photos is free. Only the person who adds a
          recipient pays for that magazine — see{' '}
          <Link href="/help/billing">Billing &amp; delivery</Link>.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="How do I change my name or profile photo?">
        <p>
          Open the menu in the top-left and tap your name at the top, then use
          the edit button. Your family sees the change next to any photos you
          add.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="How do I leave a family circle?">
        <p>
          Open the menu, tap <strong>My Family Circle</strong>, and choose to
          leave. Photos you already added stay in magazines that have already
          been printed — we can&apos;t reach into a magazine that&apos;s already
          in someone&apos;s mailbox.
        </p>
        <p>
          Leaving a circle doesn&apos;t close your account, and it doesn&apos;t
          cancel a magazine you pay for. Cancel that from{' '}
          <strong>Billing</strong> first if you no longer want it.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="How do I delete my account?">
        <p>
          You can do it yourself from the app&apos;s settings. Our{' '}
          <Link href="/help/account-deletion">account deletion page</Link> walks
          through the steps and lists exactly what gets deleted and what
          doesn&apos;t.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Can I use my account on more than one device?">
        <p>
          Yes — sign in with the same Google, Apple or email account and
          you&apos;ll find your family circle exactly as you left it.
        </p>
      </HelpFaqItem>
    </HelpPageLayout>
  );
}
