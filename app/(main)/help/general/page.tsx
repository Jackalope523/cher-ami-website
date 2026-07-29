import HelpFaqItem from '@/components/HelpFaqItem';
import HelpPageLayout from '@/components/HelpPageLayout';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Using Cher Ami | Help',
  description:
    'How family circles, photos, recipients and monthly magazines work.',
  robots: {
    noimageindex: true,
  },
  alternates: {
    canonical: 'https://thecherami.com/help/general',
  },
};

export default function GeneralHelp() {
  return (
    <HelpPageLayout
      title="Using Cher Ami"
      intro="How family circles, photos and magazines fit together — and what to do when something looks wrong."
      lastUpdated="July 29, 2026">
      <HelpFaqItem question="What is Cher Ami?" defaultOpen>
        <p>
          Your family shares photos in a private space in the app called a
          family circle. At the end of each month those photos are printed as a
          glossy magazine and mailed to the people you choose — usually
          grandparents.
        </p>
        <p>
          The people who receive the magazine need nothing at all: no app, no
          account, no Wi-Fi. It simply arrives in their mailbox.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Someone sent me an invite code. What do I do?">
        <p>
          <Link href="/?redirect=download#download">Download the app</Link>,
          sign up with your email, and when you&apos;re asked about your family
          circle choose to join one and enter the code you were given. You&apos;ll
          land straight in your family&apos;s photo feed.
        </p>
        <p>
          Joining costs nothing. Only the person who adds a recipient pays for
          that magazine.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="How do I start a family circle?">
        <p>
          <Link href="/?redirect=download#download">Download the app</Link> and
          sign up. When you&apos;re asked, choose to start a family circle,
          give it a name your family will recognise — something like &ldquo;The
          Harper Family&rdquo; — and add a cover photo.
        </p>
        <p>
          After that you can invite the rest of the family, add photos, and add
          the person who&apos;ll receive the magazine.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="How do I add photos?">
        <p>
          Open your feed and tap the round + button in the bottom-right corner.
          Choose a photo, pick the shape you&apos;d like it printed in, crop it,
          and add a caption if you want one.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="How many photos fit in one magazine?">
        <p>
          Up to 20 photos per magazine, shared across everyone in the family
          circle. The app shows how full this month&apos;s magazine is at the
          top of the feed.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="When is the magazine made and sent?">
        <p>
          Each magazine covers one calendar month. It closes at the end of that
          month, then it&apos;s printed and mailed during the following month.
        </p>
        <p>
          Anything added after a magazine closes goes into the next one, so
          nothing is ever lost — it just travels in the next issue. See{' '}
          <Link href="/help/billing">Billing &amp; delivery</Link> for arrival
          times.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="What are recipients?">
        <p>
          Recipients are the people who get the printed magazine in the mail.
          You add their name and address in the app, and that&apos;s all
          that&apos;s needed — they don&apos;t need the app or an account.
        </p>
        <p>
          You can add more than one. Each recipient gets their own copy, and
          each copy is its own monthly subscription.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Can I be both a member and a recipient?">
        <p>
          Yes. You can add photos in the app and also receive the printed
          magazine each month — just add yourself as a recipient.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Can family outside the USA take part?">
        <p>
          They can share photos in the app from anywhere in the world. We only
          deliver printed magazines within the USA at the moment, so recipients
          need a US mailing address.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Can I change our family circle's name or cover photo?">
        <p>
          Yes. Open the menu in the top-left, tap{' '}
          <strong>My Family Circle</strong>, and edit the name or cover photo
          from there. Everyone in the circle sees the change.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Can I delete a photo I added?">
        <p>
          Yes — tap the ⋮ button in the top-right of your photo and choose
          delete. If the magazine it belongs to hasn&apos;t been printed yet,
          the photo is removed from it.
        </p>
        <p>
          Once a magazine has been printed and mailed we can&apos;t change that
          copy, but deleting still removes the photo from the app.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="How do I invite more family?">
        <p>
          Open the menu, tap <strong>My Family Circle</strong>, then{' '}
          <strong>Invite Family &amp; Friends</strong>. You can send an
          invitation by text or email, or copy the invite code and share it
          however you like. There&apos;s no limit on how many people can join.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Someone I don't recognise joined our circle. What can I do?">
        <p>
          Invite codes work for anyone who has them, so this usually means a
          code was shared more widely than intended. Open{' '}
          <strong>My Family Circle</strong>, tap{' '}
          <strong>Invite Family &amp; Friends</strong>, and choose{' '}
          <strong>Generate new code</strong> — the old code stops working
          immediately, so nobody else can join with it.
        </p>
        <p>
          You can also block someone from their profile, which hides their
          photos from you and yours from them.{' '}
          <Link href="/contact">Contact us</Link> if you need a hand and
          we&apos;ll sort it out with you.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="The app is slow to open, or photos look blank">
        <p>
          Our servers rest when nobody has used the app for a while, so the
          first load after a quiet spell can take a few seconds. Give it a
          moment, or close and reopen the app.
        </p>
        <p>
          Your photos are safe either way — nothing is deleted by a slow load.
          If it still won&apos;t load after a few minutes,{' '}
          <Link href="/contact">let us know</Link>.
        </p>
      </HelpFaqItem>

      <HelpFaqItem question="Does everyone in the family have to pay?">
        <p>
          No. Sharing photos is free for everyone in the family circle. Only the
          person who adds a recipient pays for that recipient&apos;s magazine.
        </p>
      </HelpFaqItem>
    </HelpPageLayout>
  );
}
