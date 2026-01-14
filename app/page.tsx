import Image from 'next/image';
import Hero from '@/public/hero-illustration.png';
import Phone from '@/public/phone.png';
import PhoneShowcase from '@/public/app-showcase.png';
import MagazineShowcase from '@/public/magazine-showcase.png';
import StepOne from '@/public/step-one.svg';
import StepTwo from '@/public/step-two.svg';
import StepThree from '@/public/step-three.svg';
import StepOneIllustration from '@/public/step-one-illustration.png';
import StepTwoIllustration from '@/public/step-two-illustration.png';
import StepThreeIllustration from '@/public/step-three-illustration.png';
import ValueQualityIllustration from '@/public/value-quality.png';
import ValuePrivacyIllustration from '@/public/value-privacy.png';
import ValueCollaborateIllustration from '@/public/value-collaborate.png';
import ValueSecurePaymentsIllustration from '@/public/value-secure.png';
import ValueFreeShippingIllustration from '@/public/value-shipping.png';
import Check from '@/public/check.svg';
import X from '@/public/x.svg';
import FAQItem from '@/components/FAQItem';
import CTA from '@/components/CTA';
import { Suspense } from 'react';
import Redirect from '@/components/Redirect';
import TitleText from '@/components/TitleText';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto px-5 gap-36 py-18">
      <Suspense>
        <Redirect />
      </Suspense>
      <div className="hidden lg:block w-[100vw] h-full mt-[-60] mb-[-180]">
        <Image
          src={Hero}
          alt="An illustration of forest creatures watching a messenger pigeon fly away"
        />
      </div>
      <section
        id="download"
        className="flex flex-col lg:flex-row items-center justify-between w-full px-8 lg:mb-[-100]">
        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-12">
            <TitleText />
            <p className="text-[1rem] text-[#242832] font-normal text-center max-w-[500px]">
              {
                "Every month, transform your family's photos and stories into a beautiful magazine, delivered to those you love."
              }
            </p>
            <div className="flex flex-row gap-4">
              <CTA store="Apple" width={192} height={64} />
              <CTA store="Google" width={216} height={64} />
            </div>
          </div>
        </div>
        <Image
          src={Phone}
          alt="A smartphone running the Cher Ami mobile app"
          height={525}
          width={255}
          style={{ transform: 'rotate(2deg)' }}
          className="hidden lg:block transform -translate-y-1/6"
        />
      </section>

      {/* <section className="flex flex-row gap-x-10 overflow-x-auto px-40">
          <Image
            src={Placeholder}
            alt=""
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt=""
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt=""
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt=""
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt=""
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt=""
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt=""
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt=""
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt=""
            width={408}
            height={510}
            className="rounded-4xl"
          />
        </section> */}

      <section>
        <div className="mb-10">
          <h2 className="text-[2.5rem] text-[#242832] font-semibold text-center max-w-3xl mx-auto pb-5">
            Two Ways to Connect
          </h2>
          <p className="text-[1rem] text-[#242832] font-normal text-center max-w-xl mx-auto">
            {
              'Share your meaningful moments with family and friends easily.'
            }
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          <Image
              src={PhoneShowcase}
              alt="A smartphone running the Cher Ami mobile app"
              className="flex-5 w-full h-full max-h-[90vh] object-contain"
          />
          <Image
              src={MagazineShowcase}
              alt="The Cher Ami magazine"
              className="flex-7 w-full h-full max-h-[90vh] object-contain"
          />
      </div>
      </section>

      <section id="steps" className="flex flex-col items-center">
        <h2 className="text-[2.5rem] text-[#242832] font-semibold text-center max-w-3xl mx-auto pb-5 mb-10">
          As Easy As 1-2-3
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-12">
          <div className="relative w-full max-w-[350px] flex flex-col items-center">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#F4F1EA] rounded-full flex items-center justify-center">
              <Image
                src={StepOne}
                alt="The number one"
                width={18}
                height={22}
              />
            </div>
            <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center">
              <div className="flex flex-col h-[255px] justify-center">
                <Image
                  src={StepOneIllustration}
                  alt="Three mice playing with a kite"
                  height={255}
                />
              </div>
              <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                You Share
              </h2>
              <p className="text-[1rem] text-[#242832] font-normal text-center">
                <b>Add photos to your private album</b> throughout the month
                whenever inspiration strikes. When you're ready, hit post—that's
                it!
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-[350px] flex flex-col items-center">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#F4F1EA] rounded-full flex items-center justify-center">
              <Image
                src={StepTwo}
                alt="The number two"
                width={26.61}
                height={30.86}
              />
            </div>
            <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center">
              <div className="flex flex-col h-[255px] justify-center scale-x-[-1]">
                <Image
                  src={StepTwoIllustration}
                  alt="A squirrel delivering a letter"
                  height={255}
                />
              </div>
              <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                We Deliver
              </h2>
              <p className="text-[1rem] text-[#242832] font-normal text-center">
                <b>Every month, your photos become</b> a magazine
                your family eagerly awaits. Professionally designed, beautifully
                printed, delivered right to their door.
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-[350px] flex flex-col items-center">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#F4F1EA] rounded-full flex items-center justify-center">
              <Image
                src={StepThree}
                alt="The number three"
                width={22}
                height={26}
              />
            </div>
            <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center">
              <div className="flex flex-col h-[255px] justify-center">
                <Image
                  src={StepThreeIllustration}
                  alt="A family of bears reading a magazine"
                  height={255}
                />
              </div>
              <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                Cherish Forever
              </h2>
              <p className="text-[1rem] text-[#242832] font-normal text-center">
                <b>Grandparents enjoy it</b> with their morning coffee. Parents treasure it in their growing collection.
                It becomes what everyone looks forward to each month—physical proof
                that family is never far away.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-10">
          <h2 className="text-[2.5rem] text-[#242832] font-semibold text-center max-w-3xl mx-auto">
            Options for Everyone
          </h2>
          <p className="text-[1rem] text-[#242832] font-normal text-center max-w-xl mx-auto">
            Cancel whenever, billed only when we print and ship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <div className="flex flex-col rounded-t-[20] border-t-2 border-l-2 border-r-2 border-[#F4F1EA] items-center bg-[#F4F1EA] py-2 w-full">
              <h3 className="text-[1.75rem] text-[#242832] font-semibold">
                Digital Edition
              </h3>
            </div>
            <div className="flex flex-col items-center pl-6 pr-6 pb-6 rounded-b-[20] border-b-2 border-l-2 border-r-2 border-[#F4F1EA] w-full">
              <h3 className="text-[3rem] text-[#242832] font-semibold my-4">
                FREE
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
                  <Image src={X} alt="The letter X" width={24} height={24} />
                  <p className="text-[1rem] text-[#242832] font-normal">
                    No printed magazine.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col rounded-t-[20] border-t-2 border-l-2 border-r-2 border-[#C15F3C] items-center bg-[#C15F3C] py-2 w-full">
              <h3 className="text-[1.75rem] text-[#FCFBF8] font-semibold">
                Monthly Edition
              </h3>
            </div>
            <div className="flex flex-col items-center pl-6 pr-6 pb-6 rounded-b-[20] border-b-2 border-l-2 border-r-2 border-[#C15F3C] w-full">
              <h3 className="text-[3rem] text-[#242832] font-semibold my-4">
                $12.99
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
                    Free shipping.
                  </p>
                </div>
                <div className={'flex flex-row pt-2 self-center gap-x-1'}>
                  <p className="text-[1rem] text-[#676d7b] font-normal text-center">
                    Available for purchase in the <Link href="/#download" className="underline">mobile app</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-[2.5rem] text-[#242832] font-semibold text-center max-w-3xl mx-auto mb-10">
          Our Guiding Principles
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center w-[200px]
                          transition-transform transform hover:translate-y-[-8px]">
            <div className="flex flex-col h-[100px] justify-center">
              <Image
                src={ValueCollaborateIllustration}
                alt="A mouse using a phone"
                className="max-w-[120px] max-h-[120px] object-contain"
              />
            </div>
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
              Unlimited Members
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal text-center">
              As many members in your circle as you want, at no cost.
            </p>
          </div>
          
          <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center w-[200px]
                          transition-transform transform hover:translate-y-[-8px]">
            <div className="flex flex-col h-[100px] justify-center">
              <Image
                src={ValueQualityIllustration}
                alt="A mouse reading a paper"
                className="max-w-[100px] max-h-[100px] object-contain"
              />
            </div>
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
              Timeless Quality
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal text-center">
              Premium prints that you can cherish for years to come.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center w-[200px]
                            transition-transform transform hover:translate-y-[-8px]">
              <div className="flex flex-col h-[100px] justify-center">
                <Image
                  src={ValuePrivacyIllustration}
                  alt="A mouse kid running"
                  className="max-w-[100px] max-h-[100px] object-contain"
                />
              </div>
              <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                Privacy First
              </h2>
              <p className="text-[1rem] text-[#242832] font-normal text-center">
                All your photos are completely private and never shared.
              </p>
            </div>

            <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center w-[200px]
                            transition-transform transform hover:translate-y-[-8px]">
              <div className="flex flex-col h-[100px] justify-center">
                <Image
                  src={ValueSecurePaymentsIllustration}
                  alt="An acorn"
                  className="max-w-[80px] max-h-[80px] object-contain"
                />
              </div>
              <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                Secure Payments
              </h2>
              <p className="text-[1rem] text-[#242832] font-normal text-center">
                We retain no card information for your security and peace of mind.
              </p>
            </div>

            <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center w-[200px]
                            transition-transform transform hover:translate-y-[-8px]">
              <div className="flex flex-col h-[100px] justify-center">
                <Image
                  src={ValueFreeShippingIllustration}
                  alt="A paper airplane"
                  className="max-w-[100px] max-h-[100px] object-contain"
                />
              </div>
              <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                Free Shipping
              </h2>
              <p className="text-[1rem] text-[#242832] font-normal text-center">
                Shipping to whoever you want, anywhere in the USA, on us.
              </p>
            </div>
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
        <h2 className="text-[2.5rem] text-[#242832] font-semibold text-center max-w-3xl mx-auto mb-5">
          Questions?
        </h2>
        <div className="flex flex-col gap-y-3 items-center">
          <FAQItem
            question={'How do I create a new account?'}
            answer={
              'Download the official Cher Ami app on your iOS or Android device and follow the sign-up instructions!'
            }
          />
          <FAQItem
            question={'Who do I send it to?'}
            answer={
              'Grandparents, parents, aunts, uncles, or anyone you want to keep up-to-date with a physical magazine!'
            }
          />
          <FAQItem
            question={'Where can a Cher Ami be delivered?'}
            answer={
              'Currently, we deliver anywhere in the USA but have plans to reach more countries—stay tuned!'
            }
          />
          <FAQItem
            question={'When can I start adding photos?'}
            answer={
              "Right away! Once you join and create your circle, you can start uploading photos immediately for this month's issue."
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
