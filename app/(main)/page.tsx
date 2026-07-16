import Image from 'next/image';
import TitleImage from '@/public/title.png';
import DesktopHero from '@/public/hero.webp';
import HeroImage from '@/public/hero-parents.webp';
import Magazine from '@/public/magazine.webp';
import MagazineAlt from '@/public/magazine-alt.webp';
import MiceFamilyIllustration from '@/public/mice-family.webp';
import SquirrelIllustration from '@/public/squirrel.webp';
import BearFamilyIllustration from '@/public/bear-family.webp';
import ArmchairIllustration from '@/public/value-quality.webp';
import MouseKidIllustration from '@/public/value-privacy.png';
import ValueCollaborateIllustration from '@/public/value-collaborate.png';
import ValueSecurePaymentsIllustration from '@/public/value-secure.png';
import ValueFreeShippingIllustration from '@/public/value-shipping.png';

import Check from '@/public/check.svg';
import X from '@/public/x.svg';
import Arrow from '@/public/arrow.svg';
import DiagonalArrow from '@/public/arrow-up-right.svg';
import Quotes from '@/public/quotes.svg';
import USFlag from '@/public/usflag.png';
import HandshakeWhite from '@/public/handshake-white.svg';

import FAQItem from '@/components/FAQItem';
import { Suspense } from 'react';
import Redirect from '@/components/Redirect';
import Link from 'next/link';
import type { Metadata } from 'next';

import CarouselPhotoParents from '@/public/carousel-photo-parents.webp';
import CarouselPhotoParentHoldingUp from '@/public/carousel-photo-parent-holding-up.webp';
import CarouselPhotoGirl from '@/public/carousel-photo-girl.webp';
//import CarouselPhotoLeo from '@/public/carousel-photo-leo.webp';
import CarouselVideoMagazine from '@/public/carousel-video-magazine.webp';
import CarouselVideoGuy from '@/public/carousel-video-guy.webp';
import CarouselVideoGirl from '@/public/carousel-video-girl.webp';
import TitleText from '@/components/TitleText';
import DownloadPopup from '@/components/DownloadPopup';
import NextPrintNotice from '@/components/NextPrintNotice';

import { Damion } from 'next/font/google';
import Polaroid from '@/components/Polaroid';
import Script from 'next/script';

const damion = Damion({
  weight: '400',
  fallback: ['cursive'],
  display: 'swap',
});


export const metadata: Metadata = {
  title: {
    absolute: 'Cher Ami — A printed photo magazine from your family, every month',
  },
  description: 'Every month, transform your family\'s photos and stories into a beautiful printed magazine, delivered to those you love. First magazine free. Free US shipping. Cancel anytime.',
  alternates: {
    canonical: 'https://thecherami.com'
  }
};

const faqItems = [
  { q: 'How do I get started?', a: "Get started at thecherami.com/start and we'll walk you through everything. Download the app, invite family members, and your first magazine will be on its way." },
  { q: 'Does the recipient need an app or account?', a: 'No. The magazine arrives in their mailbox like any other piece of mail. No app, no account — they just open it and enjoy.' },
  { q: 'Who do I send a magazine to?', a: 'Grandparents, parents, friends, or anyone else you want to show love to with physical memories. We currently deliver in the USA with plans to reach more countries soon.' },
  { q: 'Who can contribute to the magazine?', a: 'Anyone you invite — siblings, cousins, aunts, uncles. The whole family can post photos and stories from their phone.' },
  { q: "What if I don't have enough photos this month?", a: "No problem. Even a handful of photos makes a wonderful magazine. You can also skip a month — you're only billed when we print and ship." },
  { q: 'Is this a good gift idea?', a: "It's one of the best. Grandparents and loved ones consistently tell us it's their favorite thing to receive — personal, physical, and it shows up every single month." },
  { q: 'Can I send it to someone outside the USA?', a: 'We currently ship within the USA only, but international family members can still join your family and contribute photos through the app. International delivery is coming soon.' },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto px-5 gap-20 lg:gap-36 pt-6 pb-18">
      <Script
        id="ld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Cher Ami Monthly Photo Magazine',
            description:
              "A printed monthly photo magazine created from your family's photos and stories, shipped to the people who miss you most.",
            brand: { '@type': 'Brand', name: 'Cher Ami' },
            image: 'https://thecherami.com/opengraph-image.png',
            offers: {
              '@type': 'Offer',
              price: '12.99',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              url: 'https://thecherami.com/start',
            },
          }),
        }}
      />
      <Script
        id="ld-faq"
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
      <Suspense>
        <Redirect />
      </Suspense>

      <div className="hidden"> {/* Don't remove, for embedded links */}
        <Image
          src={DesktopHero}
          alt="An illustration of forest creatures watching a messenger pigeon fly away"
        />
      </div>

      <section
        id="landing"
        className="flex flex-col lg:flex-row-reverse items-center justify-between w-full lg:mb-[-100] px-5 lg:px-8 xl:px-0">
        <div className="flex flex-row w-[100vw] lg:w-auto gap-10 p-10 overflow-x-auto no-scrollbar">
          <Polaroid
            src={HeroImage}
            alt=""
            className="w-[248px] h-[315px] lg:w-[408px] lg:h-[518px]"
            seed={1}
            priority
          />
          <Polaroid
            src={CarouselPhotoGirl}
            alt=""
            className="lg:hidden w-[248px] h-[315px] lg:w-[408px] lg:h-[518px]"
            seed={4}
            priority
          />
          <Polaroid
            src={CarouselPhotoParents}
            alt=""
            className="lg:hidden w-[248px] h-[315px] lg:w-[408px] lg:h-[518px]"
            seed={3}
            priority
          />
        </div>
        <div className="flex flex-col items-center lg:items-start gap-8">
          <TitleText />
          <p className="text-[1rem] text-[#242832] font-normal text-center lg:text-left max-w-[500px]">
            Your family shares photos. We turn them into a magazine and mail it to grandparents, parents, or anyone who'd love a little more of your everyday.{' '}
            <br className='hidden lg:inline-block' />
            <br className='hidden lg:inline-block' />
          </p>
          <div className="flex flex-col gap-4">
            <Link
              href="/start"
              className="flex flex-row gap-2 min-w-[50%] py-3 px-5 bg-[#C15F3C] hover:bg-[#b05637] active:bg-[#b05637]
                          rounded-[12px] shadow-md text-white justify-center">
              <p className="text-[1rem] text-white font-medium text-center">
                Send your first one free
              </p>
            </Link>
            {/*<Link
              href="/invite"
              className="flex flex-row gap-2 min-w-[50%] py-3 px-5 border-2 border-[#C15F3C] hover:bg-[#b05637] active:bg-[#b05637]
                          rounded-[12px] shadow-md text-white justify-center">
                  <p className="text-[1rem] text-[#C15F3C] font-medium text-center">
                    Join an existing family
                  </p>      
              </Link>*/}
          </div>
          <NextPrintNotice className="self-center lg:self-start" />
          <div className="flex flex-row w-full justify-center">
            <p className="text-[0.9rem] text-[#868581]  text-center">
              Loved by families across the USA • Free Shipping • Happiness Guaranteed
            </p>
          </div>
          <Suspense fallback={null}>
            <DownloadPopup />
          </Suspense>
        </div>
      </section>

      <section id="problem" className="flex flex-col sm:flex-row gap-12 lg:gap-40 w-full max-w-[1200px] px-5 lg:px-8 xl:px-0">
        <div className="flex flex-[1.5] flex-col gap-8">
          <h2 className="text-[2rem] text-[#242832] font-semibold text-center sm:text-left">
            The gift that arrives <span className={`${damion.className} text-[3rem] text-[#C15F3C] leading-0`}>every&nbsp;month</span>
          </h2>
          <p className="text-[1rem] text-[#242832] font-normal text-center sm:text-left">
            Picture your parents opening their mailbox and finding a magazine full of the people they love:
            stories of school plays, Sunday pancakes, and the backyard fort.
            No tech required, no account to set up.
            It just shows up, every month, like a letter from the people they miss most.
          </p>
          <Image
            src={MiceFamilyIllustration}
            alt="Illustration of a family of mice"
            className='hidden sm:block max-w-[35vw] self-center'
          />
        </div>
        <Link
          href="/example"
          className="flex flex-1 flex-col max-w-[70vw] lg:max-w-[50vw] self-center items-center gap-4"
          >
          <Image
            src={Magazine}
            alt="Image of a Cher Ami"
          />
          <p className="text-[1rem] text-[#C15F3C] border-2 border-[#C15F3C] rounded-2xl w-fit px-4 py-3 text-center justify-center">
            See Example Magazine
          </p>
        </Link>
      </section>

      <section id="objection" className="flex flex-col sm:flex-row-reverse gap-12 lg:gap-40 w-full max-w-[1200px] px-5 lg:px-8 xl:px-0">
        <div className="flex flex-2 flex-col gap-8">
          <h2 className="text-[2rem] text-[#242832] font-semibold text-center sm:text-left">
            But I already <span className={`${damion.className} text-[3rem] text-[#C15F3C] leading-0`}>send them&nbsp;photos...</span>
          </h2>
          <p className="text-[1rem] text-[#242832] font-normal text-center sm:text-left">
            You do, and they love it! But texts get buried, group chats move fast, and honestly, Granddad still isn't great with his phone.
            A magazine doesn't need Wi-Fi. It's familiar and memorable.
            It sits on the coffee table and becomes the thing they reach for when they miss you.
          </p>
          <div className="flex flex-row gap-6 items-center">
            <div className="bg-[#F4F1EA] rounded-xl">
              <Image
                src={Quotes}
                alt="Quotation marks"
                className="min-w-14 px-3 py-4"
                />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[0.9rem] text-[#868581] italic">
                My parents actually look forward to getting something in their mailbox now, that hasn't happened in years!
              </p>
              <p className="text-[0.9rem] text-[#868581] italic">
                Andrew McCabe, FL
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 max-w-[60vw] self-center">
          <Image
            src={BearFamilyIllustration}
            alt="Family of bears reading a Cher Ami"
          />
        </div>
      </section>

      <section id="pricing" className="flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-4">
          <p className="text-[1rem] text-[#C15F3C] font-semibold py-1 px-2 border-2 border-[#C15F3C] rounded-[1000px] w-min self-center">Pricing</p>
          <h2 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center max-w-3xl mx-auto">
            Pricing that makes <br className='sm:hidden' /><span className={`${damion.className} text-[3.2rem] lg:text-[3.8rem] text-[#C15F3C] leading-0`}>sense</span>
          </h2>
          <p className="text-[1rem] text-[#242832] font-normal text-center max-w-xl mx-auto">
            No contract, no commitment, cancel anytime.<br/>Billed only when we print and ship.
          </p>
        </div>

        <div className="flex flex-col gap-8 items-center">
          <Link
            href="/start"
            className="flex flex-col gap-8 w-full max-w-[500px] p-8 items-center bg-[#C15F3C] rounded-[32px]
                        drop-shadow-lg transition-transform transform hover:translate-y-[-8px]">
            <div className="flex flex-col gap-3 items-center">
              <h3 className="text-[1.75rem] text-[#FCFBF8] font-semibold">
                Monthly Edition
              </h3>
              <p className="text-[1rem] text-[#FCFBF8] font-normal">
                Most popular with families
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <Image
                src={MagazineAlt}
                alt="Image of a magazine"
                height={300}
                placeholder="blur"
              />
            </div>
            <p className="flex flex-col text-[3rem] text-[#FCFBF8] font-semibold my-2">
              $12.99
              <span className="text-[1.6rem]">
                /magazine
              </span>
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src={Check}
                  alt="A check mark"
                  width={30}
                  height={30}
                  className="p-[7px] bg-[#FCFBF8] rounded-[30px]"
                />
                <p className="text-[1rem] text-[#FCFBF8] font-normal">
                  Share and view photos on Cher Ami
                </p>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src={Check}
                  alt="A check mark"
                  width={30}
                  height={30}
                  className="p-[7px] bg-[#FCFBF8] rounded-[30px]"
                />
                <p className="text-[1rem] text-[#FCFBF8] font-normal">
                  Unlimited family members
                </p>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src={Check}
                  alt="A check mark"
                  width={30}
                  height={30}
                  className="p-[7px] bg-[#FCFBF8] rounded-[30px]"
                />
                <p className="text-[1rem] text-[#FCFBF8] font-normal">
                  A printed magazine delivered every month
                </p>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src={Check}
                  alt="A check mark"
                  width={30}
                  height={30}
                  className="p-[7px] bg-[#FCFBF8] rounded-[30px]"
                />
                <p className="text-[1rem] text-[#FCFBF8] font-normal">
                  Up to 12 pages per magazine
                </p>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src={Check}
                  alt="A check mark"
                  width={30}
                  height={30}
                  className="p-[7px] bg-[#FCFBF8] rounded-[30px]"
                />
                <p className="text-[1rem] text-[#FCFBF8] font-normal">
                  Free shipping anywhere in the USA
                </p>
              </div>
            </div>
            <div className={'w-full py-6 bg-[#FCFBF8] justify-center rounded-[20]'}>
              <p className="text-[1rem] text-[#242832] font-medium text-center">
                Get Started
              </p>
            </div>
          </Link>

          <Link
            href="/military"
            className="flex flex-col gap-8 p-8 w-full max-w-[500px] items-center bg-[#779443] rounded-[32px]
                        drop-shadow-lg transition-transform transform hover:translate-y-[-8px]">
            <div className="flex flex-row gap-5">
              <h3 className="text-[1.75rem] text-[#FCFBF8] font-semibold">
                Military Edition
              </h3>
              <Image
                src={USFlag}
                alt="US Flag"
                className="w-10 border-1 border-[#FCFBF8] rounded-[2px] self-center"
                />
            </div>
            <p className="text-[1rem] text-[#FCFBF8] font-normal text-center">
              Sending a magazine to a service member or veteran?
              Get 20% off every magazine.
            </p>
            <div className={'w-full py-6 bg-[#FCFBF8] justify-center rounded-[20]'}>
              <p className="text-[1rem] text-[#242832] font-medium text-center">
                Learn More
              </p>
            </div>
          </Link>

          <Link
            href="/communities"
            className="flex flex-col gap-8 p-8 w-full max-w-[500px] items-center bg-[#242832] rounded-[32px]
                        drop-shadow-lg transition-transform transform hover:translate-y-[-8px]">
            <div className="flex flex-row gap-5">
              <h3 className="text-[1.75rem] text-[#FCFBF8] font-semibold text-center">
                Senior Living Communities
              </h3>
              <Image
                src={HandshakeWhite}
                alt="Handshake icon"
                width={40}
                height={40}
                className="w-10 self-center shrink-0"
                />
            </div>
            <p className="text-[1rem] text-[#FCFBF8] font-normal text-center">
              Bring Cher Ami and smiles to your residents.
            </p>
            <div className={'w-full py-6 bg-[#FCFBF8] justify-center rounded-[20]'}>
              <p className="text-[1rem] text-[#242832] font-medium text-center">
                Learn More
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section id="values" className="flex flex-col items-center">
        <h2 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center mb-10 px-5">
          Why families trust <span className="inline-block pl-1 align-[-1]"><Image src={TitleImage} alt="Cher Ami logo" className='w-[9rem]'/></span>
        </h2>
        <div className="flex w-[100vw] max-w-[100vw] lg:justify-center px-5 lg:px-8 xl:px-0 py-6 gap-10 overflow-x-auto no-scrollbar">
          <div className="shrink-0 lg:shrink-1 max-w-[200px] flex flex-col items-center gap-4
                          transition-transform transform hover:translate-y-[-8px]">
            <Polaroid
              src={ValueCollaborateIllustration}
              alt="A mouse using a phone"
              className="w-[160px] h-[160px]"
              seed={10}
              objectFit="contain"
            />
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center">
              Happiness<br/>Guaranteed
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal text-center">
              Not what you expected? We&apos;ll refund it, no questions asked.
            </p>
          </div>

          <div className="shrink-0 lg:shrink-1 max-w-[200px] flex flex-col items-center gap-4
                          transition-transform transform hover:translate-y-[-8px]">
            <Polaroid
              src={ArmchairIllustration}
              alt="A mouse reading a paper"
              className="w-[160px] h-[160px]"
              seed={5}
              objectFit="contain"
            />
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center">
              Made to Keep
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal text-center">
              Premium glossy prints that look beautiful every time.
            </p>
          </div>

          <div className="shrink-0 lg:shrink-1 max-w-[200px] flex flex-col items-center gap-4
                          transition-transform transform hover:translate-y-[-8px]">
            <Polaroid
              src={MouseKidIllustration}
              alt="A mouse kid running"
              className="w-[160px] h-[160px]"
              seed={30}
              objectFit="contain"
            />
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center">
              Privacy<br/>First
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal text-center">
              Your photos never leave your family circle. No ads, no data sharing, ever.
            </p>
          </div>
        </div>
      </section>

      {/* <section className="flex flex-col items-center">
          <h2 className="text-[2.5rem] text-[#242832] font-semibold text-center max-w-3xl mx-auto mb-10">
            What people are saying
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeedbackCard
              text={
                'Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped.'
              }
              image={Kimi}
              name={'Kimi'}
            />
            <FeedbackCard
              text={
                'Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped.'
              }
              image={Kimi}
              name={'Kimi'}
            />
            <FeedbackCard
              text={
                'Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped.'
              }
              image={Kimi}
              name={'Kimi'}
            />
            <FeedbackCard
              text={
                'Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped.'
              }
              image={Kimi}
              name={'Kimi'}
            />
            <FeedbackCard
              text={
                'Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped.'
              }
              image={Kimi}
              name={'Kimi'}
            />
            <FeedbackCard
              text={
                'Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped.'
              }
              image={Kimi}
              name={'Kimi'}
            />
            <FeedbackCard
              text={
                'Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped.'
              }
              image={Kimi}
              name={'Kimi'}
            />
            <FeedbackCard
              text={
                'Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped.'
              }
              image={Kimi}
              name={'Kimi'}
            />
            <FeedbackCard
              text={
                'Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped.'
              }
              image={Kimi}
              name={'Kimi'}
            />
          </div>
            </section> */}

      <section className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-[1rem] text-[#C15F3C] font-semibold py-1 px-2 border-2 border-[#C15F3C] rounded-[1000px] w-min self-center">FAQ</p>
          <h2 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center mb-5">
            Questions?
          </h2>
        </div>
        <div className="flex flex-col gap-y-3 items-center">
          <FAQItem
            question={'How do I get started?'}
            answer={
              <span>
                <a href="/start" className="underline">Get started here</a> and we'll walk you through everything. You'll download the app, invite family members, and your first magazine will be on its way in no time!
              </span>
            }
          />
          <FAQItem
            question={'Does the recipient need an app or account?'}
            answer={
              'Nope! The magazine arrives in their mailbox like any other piece of mail. No app and no account, they just open it and enjoy.'
            }
          />
          <FAQItem
            question={'Who do I send a magazine to?'}
            answer={
              'Grandparents, parents, friends, or anyone else you want to show your love to with physical memories! ' +
              'Currently, we only deliver in the USA but have plans to reach more countries soon.'
            }
          />
          <FAQItem
            question={'Who can contribute to the magazine?'}
            answer={
              'Anyone you invite! Siblings, cousins, aunts, uncles — the whole family can post photos and stories from their phone. The more people who contribute, the better the magazine gets.'
            }
          />
          <FAQItem
            question={"What if I don't have enough photos this month?"}
            answer={
              "No problem. Even a handful of photos makes a wonderful magazine. You can also skip a month — you're only billed when we print and ship."
            }
          />
          <FAQItem
            question={"Is this a good gift idea?"}
            answer={
              "It's one of the best. Grandparents and loved ones consistently tell us it's their favorite thing to receive. It's personal, it's physical, and it shows up every single month reminding them how loved they are."
            }
          />
          <FAQItem
            question={"Can I send it to someone outside the USA?"}
            answer={
              "We currently ship within the USA only, but international family members can still join your family and contribute photos through the app. International delivery is coming soon."
            }
          />
        </div>
      </section>
    </div>
  );
}
