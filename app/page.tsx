import Image from 'next/image';
import TitleImage from '@/public/title.png';
import Phone from '@/public/phone.png';
import Mouse from '@/public/mouse.png';
import AppStoreBadge from '@/public/apple-app-store badge.svg';
import PlayStoreBadge from '@/public/googe-play-badge.svg';
import Placeholder from '@/public/placeholder.jpg';
import PhoneShowcase from '@/public/app-showcase.png';
import MagazineShowcase from '@/public/magazine-showcase.png';
import StepOne from '@/public/step-one.png';
import StepTwo from '@/public/step-two.png';
import StepThree from '@/public/step-three.png';
import StepOneIllustration from '@/public/step-one-illustration.png';
import StepTwoIllustration from '@/public/step-two-illustration.png';
import StepThreeIllustration from '@/public/step-three-illustration.png';
import ValueQualityIllustration from '@/public/value-quality.png';
import ValuePrivacyIllustration from '@/public/value-privacy.png';
import ValueFreeShippingIllustration from '@/public/value-shipping.png';
import Check from '@/public/check.svg';
import X from '@/public/x.svg';
import Kimi from '@/public/kimi.jpg';
import FAQItem from '@/components/FAQItem';
import FeedbackCard from '@/components/FeedbackCard';
import Link from 'next/link';
import { usePlausible } from 'next-plausible';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <div className="bg-[#FCFBF8] py-36">
      <main className="flex flex-col items-center w-full max-w-[1200px] mx-auto px-5 gap-36">
        <section
          id="download-section"
          className="flex flex-col lg:flex-row items-center justify-between w-full px-8">
          <div className="flex flex-col">
            <div className="flex flex-col items-center">
              <h2 className="text-[2.5rem] text-[#242832] font-semibold text-center max-w-[650px] mb-12">
                Share Cherished Memories with Family and Friends
              </h2>
              <p className="text-[1rem] text-[#242832] font-normal text-center max-w-[500px] mb-8">
                {
                  "Every month, your circle's best photos are transformed into a beautiful magazine and delivered to loved ones' doorsteps."
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
            height={504 * 1.5}
            width={205 * 1.5}
            style={{ transform: 'rotate(2deg)' }}
            className="hidden lg:block"
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
              Two Ways To Connect
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal text-center max-w-xl mx-auto">
              {
                'Sharing moments of your life with family and friends has never been easier.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <Image
              src={PhoneShowcase}
              alt="A smartphone running the Cher Ami mobile app"
              className="block w-auto h-auto"
            />
            <Image
              src={MagazineShowcase}
              alt="The Cher Ami magazine"
              className="block w-auto h-auto"
            />
          </div>
        </section>

        <section id="steps-section" className="flex flex-col items-center">
          <h2 className="text-[2.5rem] text-[#242832] font-semibold text-center max-w-3xl mx-auto pb-5 mb-10">
            As Easy As...
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="relative w-[350px] flex flex-col items-center">
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
                  You Upload
                </h2>
                <p className="text-[1rem] text-[#242832] font-normal text-center">
                  Post your photos to your shared private album throughout the
                  month.
                </p>
              </div>
            </div>

            <div className="relative w-[350px] flex flex-col items-center">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#F4F1EA] rounded-full flex items-center justify-center">
                <Image
                  src={StepTwo}
                  alt="The number two"
                  width={26.61}
                  height={30.86}
                />
              </div>
              <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center">
                <div className="flex flex-col h-[255px] justify-center">
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
                  At the end of the month, we print and ship the magazine to
                  your loved ones. No design hassle required.
                </p>
              </div>
            </div>

            <div className="relative w-[350px] flex flex-col items-center">
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
                  Enjoy Together
                </h2>
                <p className="text-[1rem] text-[#242832] font-normal text-center">
                  They recieve your best memories everyone can enjoy in a
                  beautiful magazine to keep forever.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-10">
            <h2 className="text-[2.5rem] text-[#242832] font-semibold text-center max-w-3xl mx-auto">
              Your Move
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal text-center max-w-xl mx-auto">
              {'No hidden fees, cancel anytime.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <div className="flex flex-col rounded-t-[20] border-t-2 border-l-2 border-r-2 border-[#F4F1EA] items-center bg-[#F4F1EA] py-2 w-full">
                <h3 className="text-[1.75rem] text-[#242832] font-semibold">
                  Digital Edition
                </h3>
              </div>
              <div className="flex flex-col items-center pl-6 pr-6 pb-6 rounded-b-[20] border-b-2 border-l-2 border-r-2 border-[#F4F1EA]">
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
                  <div className={'flex flex-row gap-x-1]'}>
                    <p className="text-[1rem] text-transparent font-normal">
                      Free shipping
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
              <div className="flex flex-col items-center pl-6 pr-6 pb-6 rounded-b-[20] border-b-2 border-l-2 border-r-2 border-[#C15F3C]">
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
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[2.5rem] text-[#242832] font-semibold text-center max-w-3xl mx-auto mb-10">
            Our Guiding Principles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 place-items-center">
            <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center w-[350px]">
              <div className="flex flex-col h-[255px] justify-center">
                <Image
                  src={ValueQualityIllustration}
                  alt="A mouse reading a paper"
                  width={156}
                  height={183}
                />
              </div>
              <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                High Quality
              </h2>
              <p className="text-[1rem] text-[#242832] font-normal text-center">
                Premium prints that you can cherish for years to come.
              </p>
            </div>

            <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center w-[350px]">
              <div className="flex flex-col h-[255px] justify-center">
                <Image
                  src={ValuePrivacyIllustration}
                  alt="A chipmunk picking up acorns"
                  width={156}
                  height={183}
                />
              </div>
              <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                Privacy-First
              </h2>
              <p className="text-[1rem] text-[#242832] font-normal text-center">
                All your data is completely private and not shared with anyone.
              </p>
            </div>

            <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center w-[350px]">
              <div className="flex flex-col h-[255px] justify-center">
                <Image
                  src={ValueFreeShippingIllustration}
                  alt="A paper airplane"
                  width={156}
                  height={183}
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
            FAQ
          </h2>
          <div className="flex flex-col gap-y-3 items-center">
            <FAQItem
              question={'How do I create a new account?'}
              answer={
                'Download the official Cher Ami app on your iOS or Android device and follow the sign-up instructions!'
              }
            />
            <FAQItem
              question={'Who is it for?'}
              answer={
                'Grandparents, parents, aunts, uncles, or anyone who wants to stay connected with their loved ones through shared memories!'
              }
            />
            <FAQItem
              question={'Where can I deliver a Cher Ami?'}
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
          </div>
        </section>
      </main>
    </div>
  );
}
