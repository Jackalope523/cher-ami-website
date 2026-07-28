import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';

import Magazine from '@/public/magazine.webp';
import MailboxMiceIllustration from '@/public/mailbox-mice.webp';
import Quotes from '@/public/quotes.svg';

import FAQItem from '@/components/FAQItem';
import PartnerForm from './PartnerForm';
import CopyBlurb from './CopyBlurb';

export const metadata: Metadata = {
  title: 'For Senior Living Communities',
  description:
    'Give your residents mail worth looking forward to. Cher Ami turns family photos into a printed monthly magazine mailed to each resident — paid for by their families, at no cost to your community.',
  alternates: {
    canonical: 'https://thecherami.com/communities',
  },
};

const faqItems = [
  {
    q: 'Does our community pay anything?',
    a: 'No. Families subscribe directly — $12.99 per magazine with free US shipping, and the first one is free. There is no charge, contract, or minimum for your community. Not now, not later.',
  },
  {
    q: 'What do residents need to do?',
    a: 'Nothing. No app, no account, no password, no device. The magazine arrives addressed to them like any other letter. If your mail comes to a front desk, staff hand it out with the rest.',
  },
  {
    q: 'Is there any work for our staff?',
    a: 'No. Families handle everything in the app, and magazines arrive by regular mail. The most involved thing your team could do is pin a flyer to the notice board.',
  },
  {
    q: 'Does it work for residents in memory care?',
    a: 'Yes, and often best of all. Families can add names and captions to every photo, so each page becomes a gentle prompt: familiar faces, places, and stories to revisit together — no screens involved.',
  },
  {
    q: 'How do families get started?',
    a: 'They sign up at thecherami.com/start, invite relatives to the family circle, and post photos from their phones. It takes a few minutes, and the first magazine is free.',
  },
  {
    q: 'What if a resident’s family is spread out or abroad?',
    a: 'Relatives anywhere in the world can join the family circle and contribute photos through the app. We currently mail magazines to addresses within the USA.',
  },
  {
    q: 'What about privacy?',
    a: 'Photos stay inside each family’s private circle — no ads, no data sharing, ever. The printed magazine goes only to the addresses the family chooses.',
  },
  {
    q: 'Can we see one before recommending it?',
    a: 'Of course. Flip through an example magazine at thecherami.com/example, and if you would like a printed sample for your activities room, mention it in the form.',
  },
];

export default function Communities() {
  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto px-5 gap-20 lg:gap-36 pt-6 pb-18">
      <Script
        id="ld-communities-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      {/* Attention */}
      <section
        id="landing"
        className="flex flex-col md:flex-row-reverse items-center justify-between w-full px-5 lg:px-8 xl:px-0 gap-10">
        <Image
          src={Magazine}
          alt="A printed Cher Ami family magazine"
          className="max-w-[60vw] md:max-w-[35vw]"
          priority
        />
        <div className="flex flex-col items-center md:items-start gap-8">
          <p className="text-[1.2rem] text-[#C15F3C] font-semibold py-1 px-3 border-2 border-[#C15F3C] rounded-[1000px] w-fit">
            For Senior Living Communities
          </p>
          <h1 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center md:text-left max-w-[650px]">
            Mail your residents will{' '}
            <span className="text-[#C15F3C] font-bold">look forward to</span>
          </h1>
          <p className="text-[1rem] text-[#242832] font-normal text-center md:text-left max-w-[520px]">
            Cher Ami turns each family&apos;s photos and stories into a printed
            monthly magazine for their loved one in your community.
            Each family sets up their own magazine and your resident gets
            something wonderful in the mail to open, share, and keep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#partner"
              className="flex flex-row gap-2 py-3 px-5 bg-[#C15F3C] hover:bg-[#b05637] active:bg-[#b05637]
                          rounded-[12px] shadow-md text-white justify-center">
              <p className="text-[1rem] text-white font-medium text-center">
                Get the free partner kit
              </p>
            </Link>
            <Link
              href="/example"
              className="flex flex-row gap-2 py-3 px-5 border-2 border-[#C15F3C] hover:bg-[#C15F3C]/10
                          rounded-[12px] justify-center">
              <p className="text-[1rem] text-[#C15F3C] font-medium text-center">
                See an example magazine
              </p>
            </Link>
          </div>
          <p className="text-[0.9rem] text-[#868581] text-center md:text-left">
            No cost to your community • No staff admin
            to learn
          </p>
        </div>
      </section>

      {/* Interest: how it works */}
      <section id="how-it-works" className="flex flex-col items-center gap-10 w-full">
        <h2 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center">
          Three easy{' '}
          <span className="text-[#C15F3C] font-bold">steps</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1000px]">
          {[
            {
              step: '1',
              title: 'Families share photos',
              body: 'Your family subscribes in the Cher Ami app, then kids, grandkids, and siblings post photos and short stories from wherever they live.',
            },
            {
              step: '2',
              title: 'We print and mail',
              body: 'Each month, we turn those posts into a beautiful printed magazine and mail it, addressed to the resident.',
            },
            {
              step: '3',
              title: 'Residents just open it',
              body: 'No app, no account, no password. A personal piece of mail in their mailbox, full of the people they love.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex flex-col items-center gap-4 p-8 bg-[#F4F1EA] rounded-[32px]">
              <p className="flex items-center justify-center w-12 h-12 bg-[#C15F3C] text-[#FCFBF8] text-[1.5rem] font-semibold rounded-full">
                {item.step}
              </p>
              <h3 className="text-[1.25rem] text-[#242832] font-semibold text-center">
                {item.title}
              </h3>
              <p className="text-[1rem] text-[#242832] font-normal text-center">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interest: why print */}
      <section
        id="why-print"
        className="flex flex-col items-center gap-8 w-full max-w-[800px] text-center px-5 lg:px-8 xl:px-0">
        <h2 className="text-[2rem] text-[#242832] font-semibold">
          Screens aren&apos;t made for{' '}
          <span className="text-[#C15F3C] font-bold">everyone</span>
        </h2>
        <p className="text-[1rem] text-[#242832] font-normal">
          Video calls may need a helper. Digital frames move quickly.
          A printed magazine asks nothing of your residents
          except their reading glasses. It waits on the nightstand, gets
          reread between visits, and gets shown off at lunch.
        </p>
        <div className="flex flex-row gap-6 items-center text-left">
          <div className="bg-[#F4F1EA] rounded-xl">
            <Image
              src={Quotes}
              alt="Quotation marks"
              className="min-w-14 px-3 py-4"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[0.9rem] text-[#868581] italic">
              My parents actually look forward to getting something in their
              mailbox now, that hasn&apos;t happened in years!
            </p>
            <p className="text-[0.9rem] text-[#868581] italic">
              Andrew McCabe, FL
            </p>
          </div>
        </div>
      </section>

      {/* Desire: benefits by stakeholder */}
      <section id="benefits" className="flex flex-col items-center gap-10 w-full">
        <h2 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center max-w-[800px]">
          Joy for residents. Great for families. <span className="text-[#C15F3C] font-bold">Easy for your team.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1000px]">
          <div className="flex flex-col gap-4 p-8 bg-[#F4F1EA] rounded-[32px]">
            <h3 className="text-[1.25rem] text-[#C15F3C] font-semibold">
              For your residents
            </h3>
            <p className="text-[1rem] text-[#242832] font-normal">
              Meaningful mail addressed to them. Not a bill, not a flyer. A
              monthly ritual to look forward to, photos to show neighbors, and
              stories to reread between visits.
            </p>
          </div>
          <div className="flex flex-col gap-4 p-8 bg-[#F4F1EA] rounded-[32px]">
            <h3 className="text-[1.25rem] text-[#C15F3C] font-semibold">
              For their families
            </h3>
            <p className="text-[1rem] text-[#242832] font-normal">
              A fun way to stay connected between visits. The whole family
              contributes from their phones, and they manage the subscription
              and all the photos.
            </p>
          </div>
          <div className="flex flex-col gap-4 p-8 bg-[#F4F1EA] rounded-[32px]">
            <h3 className="text-[1.25rem] text-[#C15F3C] font-semibold">
              For your care team
            </h3>
            <p className="text-[1rem] text-[#242832] font-normal">
              Every issue puts names and faces to each resident&apos;s family.
              Residents get to show off the grandkids, the new puppy, the trip to the lake.
              Something exciting to hand to residents.
            </p>
          </div>
        </div>
      </section>

      {/* Desire: use cases */}
      <section
        id="use-cases"
        className="flex flex-col items-center gap-10 w-full px-5 lg:px-8 xl:px-0">
        <h2 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center">
          Activity hours that{' '}
          <span className="text-[#C15F3C] font-bold text-nowrap">plan themselves</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1000px]">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h3 className="text-[1.1rem] text-[#242832] font-semibold">
              Magazine day
            </h3>
            <p className="text-[1rem] text-[#242832] font-normal">
              Once magazines have arrived by mail, gather residents to introduce
              their families to one another.
            </p>
          </div>
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h3 className="text-[1.1rem] text-[#242832] font-semibold">
              Reminiscence sessions
            </h3>
            <p className="text-[1rem] text-[#242832] font-normal">
              Familiar faces with names and captions make gentle prompts for
              storytelling, especially in memory care.
            </p>
          </div>
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h3 className="text-[1.1rem] text-[#242832] font-semibold">
              A warmer move-in
            </h3>
            <p className="text-[1rem] text-[#242832] font-normal">
              Suggest Cher Ami to families on move-in day. The first magazine is
              free, and arrives right when a familiar face means the most.
            </p>
          </div>
        </div>
      </section>

      {/* Desire → objection: cost */}
      <section id="cost" className="flex flex-col items-center gap-8 w-full max-w-[800px] text-center">
        <h2 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold">
          What it costs your community:{' '}
          <span className="text-[#C15F3C] font-bold">nothing</span>
        </h2>
        <p className="text-[1rem] text-[#242832] font-normal">
          Families subscribe directly — starting at $12.99 per magazine, with their first one free.
          There is nothing for your community to sign, stock, bill, or manage.
          And if a family isn&apos;t happy with a magazine, we replace or refund it.
        </p>
      </section>

      {/* Action: getting started */}
      <section
        id="get-started"
        className="flex flex-col sm:flex-row gap-12 lg:gap-24 w-full px-5 lg:px-8 xl:px-0 items-center">
        <div className="flex flex-[1.5] flex-col gap-8">
          <h2 className="text-[2rem] text-[#242832] font-semibold text-center sm:text-left">
            Bring Cher Ami to{' '}
            <span className="text-[#C15F3C] font-bold">your community</span>
          </h2>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-[1.1rem] text-[#242832] font-semibold">
                1. Request your free partner kit
              </h3>
              <p className="text-[1rem] text-[#242832] font-normal">
                Tell us about your community in the form below, or email
                partners@thecherami.com. A real person will reply within a day
                with everything you need — a printable family flyer, a
                newsletter blurb, an example magazine, and answers to the
                questions families ask. Want a printed sample for your
                activities room? Just say so.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[1.1rem] text-[#242832] font-semibold">
                2. Share it with families
              </h3>
              <p className="text-[1rem] text-[#242832] font-normal">
                The kit is made to be passed along. Pin the flyer to your notice
                board, drop the blurb into your family newsletter, and point
                families to Cher Ami. Here are the flyer and blurb to get
                started today.
              </p>
              <Link
                href="/communities/flyer"
                className="text-[1rem] text-[#C15F3C] border-2 border-[#C15F3C] hover:bg-[#C15F3C]/10 rounded-2xl w-fit px-4 py-3">
                Print the family flyer
              </Link>
              <CopyBlurb />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[1.1rem] text-[#242832] font-semibold">
                3. Watch mail day get better
              </h3>
              <p className="text-[1rem] text-[#242832] font-normal">
                Families sign up in minutes at <span className="text-nowrap">thecherami.com/start.</span> Magazines
                arrive each month addressed to their resident, nothing for
                your staff to manage. Just goodness in the mailbox!
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 max-w-[60vw] sm:max-w-[30vw] self-center">
          <Image
            src={MailboxMiceIllustration}
            alt="Illustration of mice checking a mailbox"
          />
        </div>
      </section>

      {/* Action: partner form */}
      <section id="partner" className="flex flex-col items-center gap-8 w-full">
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center">
            Get the <span className="text-[#C15F3C] font-bold">kit</span>
          </h2>
          <p className="text-[1rem] text-[#242832] font-normal text-center max-w-[600px]">
            Tell us a little about your community and we&apos;ll send the
            printable flyer, the newsletter blurb, and answers to anything
            families might ask.
          </p>
        </div>
        <PartnerForm />
      </section>

      {/* Objection handling: FAQ */}
      <section className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-[1rem] text-[#C15F3C] font-semibold py-1 px-2 border-2 border-[#C15F3C] rounded-[1000px] w-min self-center">
            FAQ
          </p>
          <h2 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center mb-5">
            Questions?
          </h2>
        </div>
        <div className="flex flex-col gap-y-3 items-center">
          {faqItems.map((item) => (
            <FAQItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
        <p className="text-[1rem] text-[#242832] font-normal text-center">
          Still curious? Write to{' '}
          <a href="mailto:partners@thecherami.com" className="text-[#B05637] underline">
            partners@thecherami.com
          </a>{' '}
          and we&apos;ll get back to you.
        </p>
      </section>
    </div>
  );
}
