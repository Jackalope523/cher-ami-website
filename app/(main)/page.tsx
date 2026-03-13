import Image from 'next/image';
import DesktopHero from '@/public/hero.webp';
import HeroImage from '@/public/hero-parents.webp';
import Magazine from '@/public/magazine.webp';
import MiceFamilyIllustration from '@/public/step-one-illustration.webp';
import SquirrelIllustration from '@/public/step-two-illustration.webp';
import BearFamilyIllustration from '@/public/step-three-illustration.webp';
import EnvelopeIllustration from '@/public/envelope-splash-green.webp';
import ArmchairIllustration from '@/public/value-quality.webp';
import MouseKidIllustration from '@/public/value-privacy.png';
import ValueCollaborateIllustration from '@/public/value-collaborate.png';
import ValueSecurePaymentsIllustration from '@/public/value-secure.png';
import ValueFreeShippingIllustration from '@/public/value-shipping.png';

import Check from '@/public/check.svg';
import X from '@/public/x.svg';
import Arrow from '@/public/arrow.svg';
import DiagonalArrow from '@/public/arrow-up-right.svg';
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

import { Damion } from 'next/font/google';

const damion = Damion({
  weight: '400',
  fallback: ['cursive'],
  display: 'swap',
});


export const metadata: Metadata = {
  title: 'Cher Ami',
  description: 'Every month, transform your family\'s photos and stories into a beautiful magazine, delivered to those you love.',
  robots: {
    noimageindex: true,
  },
  alternates: {
    canonical: 'https://thecherami.com'
  }
};

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto px-5 gap-16 lg:gap-36 pt-2 pb-18">
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
        className="flex flex-col lg:flex-row-reverse items-center justify-between w-full px-8 xl:px-0 lg:mb-[-100]">
        <div className="flex flex-col lg:self-start w-[100vw] lg:max-w-[30vw] pb-4">
          <Image
            src={HeroImage}
            alt="Parents reading a Cher Ami"
            className="h-[50vw] md:max-lg:h-[45vh] object-cover lg:rounded-b-[32]"
            priority
          />
        </div>
        <div className="flex flex-col items-center lg:items-start gap-8">
          <TitleText />
          <p className="text-[1rem] text-[#242832] font-normal text-center lg:text-left max-w-[500px]">
            Your precious memories deserve more than to be forgotten in a group chat or camera roll.{' '}
            <br className='hidden lg:inline-block' />
            <br className='hidden lg:inline-block' />
            Send those you love a beautiful magazine filled with your photos and stories.
          </p> {/* Make it easy, solve their problem (gift) */}
            <Link
              href="/start"
              className="flex min-w-[50%] py-3 bg-[#C15F3C] hover:bg-[#b05637] active:bg-[#b05637]
                          rounded-[12px] shadow-md text-[1rem] text-white justify-center">
                Let's go!
            </Link>
            <Suspense fallback={null}>
              <DownloadPopup />
            </Suspense>
        </div>
      </section>

      <section
        id="carousel"
        className="flex flex-row w-[100vw] gap-5 px-5 lg:px-12 xl:px-44 overflow-x-auto no-scrollbar">
        <Image
          src={CarouselPhotoParents}
          alt=""
          className="min-w-[256px] h-[320px] md:min-w-[408px] md:h-[510px]
                    rounded-[32] object-cover"
        />
        <Image
          src={CarouselVideoMagazine}
          alt=""
          className="min-w-[180px] h-[320px] md:min-w-[287px] md:h-[510px]
                    rounded-[32] object-cover"
        />
        <Image
          src={CarouselPhotoGirl}
          alt=""
          className="min-w-[256px] h-[320px] md:min-w-[408px] md:h-[510px]
                    rounded-[32] object-cover"
        />
        <Image
          src={CarouselVideoGuy}
          alt=""
          className="min-w-[180px] h-[320px] md:min-w-[287px] md:h-[510px]
                    rounded-[32] object-cover"
        />
        <Image
          src={CarouselPhotoParentHoldingUp}
          alt=""
          className="min-w-[256px] h-[320px] md:min-w-[408px] md:h-[510px]
                    rounded-[32] object-cover"
        />
        <Image
          src={CarouselVideoGirl}
          alt=""
          className="min-w-[180px] h-[320px] md:min-w-[287px] md:h-[510px]
                    rounded-[32] object-cover"
        />
      </section>

      <section id="problem" className="flex flex-col sm:flex-row gap-12 lg:gap-40 w-full max-w-[1200px] px-5 lg:px-8 xl:px-0">
        <div className="flex flex-[1.5] flex-col gap-4">
          <h2 className="text-[2rem] text-[#242832] font-semibold text-center sm:text-left">
            A monthly dose of <span className={`${damion.className} text-[3rem] text-[#C15F3C]`}>joy</span>
          </h2>
          <p className="text-[1rem] text-[#242832] font-normal text-center sm:text-left">
            Every month, your family's photos and stories become a beautiful magazine,
            the perfect photo album to send as a gift or enjoy at home.
            Each page filled with people you care about and love.
            Not too big, not too small—just right.
          </p>
          <Image
            src={MiceFamilyIllustration}
            alt="Illustration of a family of bears"
            className='hidden sm:block max-w-[35vw] self-center'
          />
        </div>
        <Link
          href="/example"
          className="flex flex-1 flex-col max-w-[50vw] self-center items-center gap-4"
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
        <div className="flex flex-2 flex-col gap-4">
          <h2 className="text-[2rem] text-[#242832] font-semibold text-center sm:text-left">
            Why not just <span className={`${damion.className} text-[3rem] text-[#C15F3C]`}>text them?</span>
          </h2>
          <p className="text-[1rem] text-[#242832] font-normal text-center sm:text-left">
            <span className="font-semibold">Paper has held memories for thousands of years. </span>
            We were meant to hold photos, not scroll past them.
            No one forgets the letter or postcard
            from a friend or relative, because love exists when you can
            feel it as much as you can see it.
          </p>
        </div>
        <div className="flex flex-1 max-w-[60vw] self-center">
          <Image
            src={EnvelopeIllustration}
            alt="Envelope containing a Cher Ami"
          />
        </div>
      </section>

      <section id="options" className="flex flex-col gap-10 mb-10 items-center">
        <div>
          <h2 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center max-w-3xl mx-auto">
            Options for <span className={`${damion.className} text-[3.2rem] lg:text-[3.8rem] text-[#C15F3C]`}>everyone</span>
          </h2>
          <p className="text-[1rem] text-[#242832] font-normal text-center max-w-xl mx-auto">
            No long-term commitment,<br/>billed only when we print and ship.
          </p>
        </div>

        <div className="flex flex-col gap-8 items-center">
          <div className="flex flex-col lg:flex-row gap-8">
            <Link
              href="/start"
              className="flex flex-col items-center drop-shadow-lg transition-transform transform hover:translate-y-[-8px]">
              <div className="flex flex-col rounded-t-[20] border-t-2 border-l-2 border-r-2 border-[#C15F3C] items-center bg-[#C15F3C] py-2 w-full">
                <h3 className="text-[1.75rem] text-[#FCFBF8] font-semibold">
                  Monthly Edition
                </h3>
              </div>
              <div className="flex flex-col items-center bg-[#FCFBF8] rounded-b-[20] border-b-2 border-l-2 border-r-2 border-[#C15F3C] w-full">
                <div className="flex flex-col items-center px-6 pb-6">
                  <div className="flex flex-col h-[200px] justify-center my-4 scale-x-[-1]">
                    <Image
                      src={SquirrelIllustration}
                      alt="A squirrel delivering a letter"
                      height={200}
                      placeholder="blur"
                    />
                  </div>
                  <h3 className="text-[2rem] text-[#242832] font-medium my-2">
                    $12.99
                    <span className="absolute transform -translate-y-[-1.1rem] text-[0.9rem] text-[#676d7b] font-normal">
                      /magazine
                    </span>
                  </h3>
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-x-1">
                      <Image
                        src={Check}
                        alt="A check mark"
                        width={24}
                        height={24}
                      />
                      <p className="text-[1rem] text-[#242832] font-normal">
                        Share and view posts on the Cher Ami app.
                      </p>
                    </div>
                    <div className="flex flex-row gap-x-1">
                      <Image
                        src={Check}
                        alt="A check mark"
                        width={24}
                        height={24}
                      />
                      <p className="text-[1rem] text-[#242832] font-normal">
                        Add unlimited members to your circle.
                      </p>
                    </div>
                    <div className={'flex flex-row gap-x-1'}>
                      <Image
                        src={Check}
                        alt="A check mark"
                        width={24}
                        height={24}
                      />
                      <p className="text-[1rem] text-[#242832] font-normal">
                        Receive a printed magazine each month.
                      </p>
                    </div>
                    <div className={'flex flex-row gap-x-1'}>
                      <Image
                        src={Check}
                        alt="A check mark"
                        width={24}
                        height={24}
                      />
                      <p className="text-[1rem] text-[#242832] font-normal">
                        Up to 20 posts per magazine.
                      </p>
                    </div>
                    <div className={'flex flex-row gap-x-1'}>
                      <Image
                        src={Check}
                        alt="A check mark"
                        width={24}
                        height={24}
                      />
                      <p className="text-[1rem] text-[#242832] font-normal">
                        Free shipping in the USA.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={'flex flex-row w-full p-4 justify-center gap-x-1 border-t-2 border-[#C15F3C]'}>
                  <p className="text-[1rem] text-[#242832] font-medium text-center">
                    Click me to get started!
                  </p>
                  <Image src={Arrow} alt="arrow icon" className="stroke-black" />
                </div>
              </div>
            </Link>
          </div>

          <Link
            href="/military"
            className="flex flex-col max-w-[423px] items-center drop-shadow-lg transition-transform transform hover:translate-y-[-8px]">
            <div className="flex flex-col rounded-t-[20] border-t-2 border-l-2 border-r-2 border-[#5c8f41] items-center bg-[#5c8f41] py-2 w-full">
              <h3 className="text-[1.75rem] text-[#FCFBF8] font-semibold">
                Military Edition
              </h3>
            </div>
            <div className="flex flex-col items-center bg-[#FCFBF8] rounded-b-[20] border-b-2 border-l-2 border-r-2 border-[#5c8f41] w-full">
              <div className="flex flex-col items-center p-6 bg-[#FCFBF8]">
                <p className="text-[1rem] text-[#242832] font-normal text-center">
                  Sending to an active military member or veteran?
                </p>
              </div>
              <div className={'flex flex-row w-full p-4 justify-center gap-x-1 border-t-2 border-[#5c8f41]'}>
                <p className="text-[1rem] text-[#242832] font-medium text-center">
                  Click me to learn more
                </p>
                <Image src={Arrow} alt="arrow icon" className="stroke-black" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section id="values" className="flex flex-col items-center">
        <h2 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center mb-10 px-5">
          Why families <span className={`${damion.className} text-[3.2rem] lg:text-[3.8rem] text-[#C15F3C]`}>choose us</span>
        </h2>
        <div className="flex w-[100vw] max-w-[100vw] lg:justify-center px-5 lg:px-8 xl:px-0 pt-[8px] gap-6 overflow-x-auto no-scrollbar">
          <div className="shrink-0 lg:shrink-1 max-w-[200px] flex flex-col items-center
                          bg-[#F4F1EA] rounded-4xl p-5
                          transition-transform transform hover:translate-y-[-8px]">
            <div className="flex h-[100px] justify-center">
              <Image
                src={ValueCollaborateIllustration}
                alt="A mouse using a phone"
                className="max-w-[120px] max-h-[120px] object-contain"
              />
            </div>
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
              Happiness<br/>Guaranteed
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal text-center">
              If you don't like it, we'll refund it. No questions asked.
            </p>
          </div>

          <div className="shrink-0 lg:shrink-1 max-w-[200px] flex flex-col items-center
                        bg-[#F4F1EA] rounded-4xl p-5
                        transition-transform transform hover:translate-y-[-8px]">
            <div className="flex h-[100px] justify-center">
              <Image
                src={ValueFreeShippingIllustration}
                alt="A paper airplane"
                className="max-w-[100px] max-h-[100px] object-contain"
              />
            </div>
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
              Free<br/>Shipping
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal text-center">
              Send to anyone you want, anywhere in the USA, on us.
            </p>
          </div>

          <div className="shrink-0 lg:shrink-1 max-w-[200px] flex flex-col items-center
              bg-[#F4F1EA] rounded-4xl p-5
              transition-transform transform hover:translate-y-[-8px]">
            <div className="flex h-[100px] justify-center">
              <Image
                src={MouseKidIllustration}
                alt="A mouse kid running"
                className="max-w-[100px] max-h-[100px] object-contain"
              />
            </div>
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
              Privacy<br/>First
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal text-center">
              All your photos are completely private and never shared.
            </p>
          </div>
          
          <div className="shrink-0 lg:shrink-1 max-w-[200px] flex flex-col items-center
                          bg-[#F4F1EA] rounded-4xl p-5
                          transition-transform transform hover:translate-y-[-8px]">
            <div className="flex h-[100px] justify-center">
              <Image
                src={ArmchairIllustration}
                alt="A mouse reading a paper"
                className="max-w-[100px] max-h-[100px] object-contain"
              />
            </div>
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
              Timeless<br/>Quality
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal text-center">
              Premium prints that you can cherish for years to come.
            </p>
          </div>

          <div className="shrink-0 lg:shrink-1 max-w-[200px] flex flex-col items-center
                        bg-[#F4F1EA] rounded-4xl p-5
                        transition-transform transform hover:translate-y-[-8px]">
            <div className="flex h-[100px] justify-center">
              <Image
                src={ValueSecurePaymentsIllustration}
                alt="An acorn"
                className="max-w-[80px] max-h-[80px] object-contain self-center"
              />
            </div>
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
              Secure<br/>Payments
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal text-center">
              We retain no card information for your peace of mind.
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

      <section className="flex flex-col w-full">
        <h2 className="text-[2rem] lg:text-[2.5rem] text-[#242832] font-semibold text-center mb-5">
          Questions?
        </h2>
        <div className="flex flex-col gap-y-3 items-center">
          <FAQItem
            question={'How do I create a new account?'}
            answer={
              <span>
                <a href="/start" className="underline">Get started here</a> and we'll send you the sign-up instructions!
              </span>
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
            question={'Who can see my photos?'}
            answer={
              'Only you and members you invite to your circle can view, add, and deliver photos.'
            }
          />
          <FAQItem
            question={"It's already the end of the month! Can I still join?"}
            answer={
              "Yes! When you join, you can choose to start your first issue next month so you don't have to worry about not having enough photos."
            }
          />
          <FAQItem
            question={"Can I still participate if I live outside the United States?"}
            answer={
              "Absolutely! While we currently only deliver magazines within the USA, you can still join and share photos with your circle digitally through the app. We have plans to expand our delivery services internationally in the future."
            }
          />
        </div>
      </section>
    </div>
  );
}
