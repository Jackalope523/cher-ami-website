import Image from 'next/image';
import TitleImage from '@/public/title.png';
import Hedgehog from '@/public/hedgehog.png';
import Mouse from '@/public/mouse.png';
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
import AppStoreBadge from '@/public/apple-app-store badge.svg';
import PlayStoreBadge from '@/public/googe-play-badge.svg';
import Kimi from '@/public/kimi.jpg';
import FAQItem from '@/components/FAQItem';
import FeedbackCard from '@/components/FeedbackCard';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-[#FCFBF8]">
      <header className="flex flex-row justify-between w-full px-5 md:px-40 xl:px-50 pt-5">
        <Image
          src={TitleImage}
          alt="Cher Ami logo"
          className="w-[143px] h-8 flex-none"
          priority
        />
        <div className="flex flex-row gap-x-4">
          <Link
            href="#steps-section"
            className="text-[#B05637] px-4 py-3 rounded-xl">
            How It Works
          </Link>
          <Link
            href="#download-section"
            className="bg-[#C15F3C] text-[#FFFFFF] px-4 py-3 rounded-xl">
            Get Cher Ami
          </Link>
        </div>
      </header>
      <main className="flex flex-col items-center gap-y-36 pb-5 my-36">
        <div className="flex flex-row items-center">
          <div className="flex-1 hidden xl:block">
            <Image
              src={Hedgehog}
              alt="A hedgehog holding balloons."
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-[2.5rem] text-[#242832] font-semibold text-center max-w-3xl mx-auto mb-12">
              Share your cherished memories of family and friends.
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal text-center max-w-xl mx-auto mb-16">
              {
                "Every month, your circle's best photos are transformed into a beautiful magazine and delivered to loved ones' doorsteps."
              }
            </p>
            <div className="flex flex-col border-2 border-[#C15F3C] p-5 rounded-[20] gap-y-3 w-[75%]">
              <p className="text-[1.25rem] text-[#242832] font-medium">
                Get notified when we launch.
              </p>
              <div className="flex flex-row justify-between gap-x-3">
                <div className="border-2 border-[#DEDBD5] px-4 py-3 rounded-xl flex-1">
                  <p>Email address</p>
                </div>
                <button className="bg-[#C15F3C] text-[#FFFFFF] px-4 py-3 rounded-xl">
                  Get notified
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 hidden xl:block">
            <Image
              src={Mouse}
              alt="A mouse throwing a paper airplane."
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="flex flex-row gap-x-10 overflow-x-auto px-40">
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
        </div>

        <div>
          <div className="mb-10">
            <h2 className="text-[40px] text-[#242832] font-semibold text-center max-w-3xl mx-auto pb-5">
              Two ways to connect.
            </h2>
            <p className="text-[16px] text-[#242832] font-normal text-center max-w-xl mx-auto">
              {
                'Sharing moments of your life with family and friends has never been easier.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 mb-20">
            <Image
              src={PhoneShowcase}
              alt="An smartphone running the Cher Ami mobile app"
              className="block w-auto h-auto"
            />
            <Image
              src={MagazineShowcase}
              alt="The Cher Ami magazine"
              className="block w-auto h-auto"
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-10">
            <h2
              id="steps-section"
              className="text-[40px] text-[#242832] font-semibold text-center max-w-3xl mx-auto pb-5">
              As easy as...
            </h2>
            <p className="text-[16px] text-[#242832] font-normal text-center max-w-xl mx-auto">
              {
                'You focus on making memories while we take care of everything else, from design to delivery.'
              }
            </p>
          </div>
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
                <h2 className="text-[28px] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                  Share Photos
                </h2>
                <p className="text-[16px] text-[#242832] font-normal text-center">
                  Upload memories through our app all month long.
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
                <h2 className="text-[28px] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                  Receive Magazine
                </h2>
                <p className="text-[16px] text-[#242832] font-normal text-center">
                  Upload memories through our app all month long.
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
                <h2 className="text-[28px] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                  Enjoy Together
                </h2>
                <p className="text-[16px] text-[#242832] font-normal text-center">
                  Upload memories through our app all month long.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-[40px] text-[#242832] font-semibold text-center max-w-3xl mx-auto mb-10">
            Pricing
          </h2>

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
        </div>

        <div>
          <h2 className="text-[40px] text-[#242832] font-semibold text-center max-w-3xl mx-auto mb-10">
            Our values
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center w-[350px]">
              <div className="flex flex-col h-[255px] justify-center">
                <Image
                  src={ValueQualityIllustration}
                  alt="A mouse smoking a pipe"
                  width={156}
                  height={183}
                />
              </div>
              <h2 className="text-[28px] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                High Quality
              </h2>
              <p className="text-[16px] text-[#242832] font-normal text-center">
                Upload memories through our app all month long.
              </p>
            </div>

            <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center w-[350px]">
              <div className="flex flex-col h-[255px] justify-center">
                <Image
                  src={ValuePrivacyIllustration}
                  alt="A mouse picking up acorns"
                  width={156}
                  height={183}
                />
              </div>
              <h2 className="text-[28px] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                Private
              </h2>
              <p className="text-[16px] text-[#242832] font-normal text-center">
                Upload memories through our app all month long.
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
              <h2 className="text-[28px] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                Free Shipping
              </h2>
              <p className="text-[16px] text-[#242832] font-normal text-center">
                Upload memories through our app all month long.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-[40px] text-[#242832] font-semibold text-center max-w-3xl mx-auto mb-10">
            What people are saying
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeedbackCard
              text={
                'Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped.'
              }
              image={Kimi}
              name={'Kimi'}
            />{' '}
            <FeedbackCard
              text={
                'Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped.'
              }
              image={Kimi}
              name={'Kimi'}
            />{' '}
            <FeedbackCard
              text={
                'Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped.'
              }
              image={Kimi}
              name={'Kimi'}
            />{' '}
            <FeedbackCard
              text={
                'Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped.'
              }
              image={Kimi}
              name={'Kimi'}
            />{' '}
            <FeedbackCard
              text={
                'Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped.'
              }
              image={Kimi}
              name={'Kimi'}
            />{' '}
            <FeedbackCard
              text={
                'Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped.'
              }
              image={Kimi}
              name={'Kimi'}
            />{' '}
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
        </div>

        <div className="flex flex-col w-full">
          <h2 className="text-[40px] text-[#242832] font-semibold text-center max-w-3xl mx-auto mb-5">
            FAQ
          </h2>
          <div className="flex flex-col gap-y-3 items-center">
            <FAQItem
              question={'How do I create a new account?'}
              answer={'Idk Walt'}
            />
            <FAQItem
              question={'How do I create a new account?'}
              answer={'Idk Walt'}
            />
            <FAQItem
              question={'How do I create a new account?'}
              answer={'Idk Walt'}
            />
            <FAQItem
              question={'How do I create a new account?'}
              answer={'Idk Walt'}
            />
          </div>
        </div>
      </main>
      <footer className="flex flex-col w-full items-center gap-y-10 pb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-4xl ">
          <div className="flex flex-col">
            <h3 className="text-[20px] text-[#242832] font-semibold mb-6">
              Product
            </h3>
            <p className="text-[#B05637] py-2">How It Works</p>
            <p className="text-[#B05637] py-2">Get Cher Ami</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[20px] text-[#242832] font-semibold mb-6">
              Legal
            </h3>
            <Link href="/legal/privacy" className="text-[#B05637] py-2">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="text-[#B05637] py-2">
              Terms of Service
            </Link>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[20px] text-[#242832] font-semibold mb-6">
              Follow us
            </h3>
            <Link
              href="https://www.facebook.com/thecherami"
              className="text-[#B05637] py-2">
              Facebook
            </Link>
            <Link
              href="https://www.instagram.com/thecherami"
              className="text-[#B05637] py-2">
              Instagram
            </Link>
            <Link
              href="https://www.tiktok.com/@thecherami"
              className="text-[#B05637] py-2">
              TikTok
            </Link>
            <Link
              href="https://www.youtube.com/@thecherami"
              className="text-[#B05637] py-2">
              YouTube
            </Link>
            <Link
              href="https://www.reddit.com/user/thecherami/"
              className="text-[#B05637] py-2">
              Reddit
            </Link>
          </div>
          <div className="flex flex-col gap-y-4">
            <h3
              id="download-section"
              className="text-[20px] text-[#242832] font-semibold mb-6">
              Download the app
            </h3>
            <Link href="https://apps.apple.com/us/app/cher-ami-family-magazine/id6753635033">
              <Image
                src={AppStoreBadge}
                alt="Go to the Apple App Store"
                className="w-[120px] h-10"
              />
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=com.hollowinc.cherami&pcampaignid=web_share">
              <Image
                src={PlayStoreBadge}
                alt="Go to the Google Play Store"
                className="w-[135px] h-10"
              />
            </Link>
          </div>
        </div>
        <div className="bg-[#F4F1EA] rounded-xl w-full p-4 max-w-4xl ">
          <Image
            src={TitleImage}
            alt="Cher Ami logo"
            className="w-[143px] h-8 flex-none"
            priority
          />
          <div className="border border-[#DEDBD5] my-4" />
          <div className="flex flex-row justify-between">
            <p className="text-[#868581]">
              © 2025 Hollow Inc. All rights reserved.
            </p>
            <p className="text-[#868581]">
              Made with ❤️ in the USA, Canada, and EU.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
