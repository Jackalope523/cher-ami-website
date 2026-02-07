import Image from 'next/image';
import StepOne from '@/public/step-one.svg';
import StepTwo from '@/public/step-two.svg';
import StepThree from '@/public/step-three.svg';
import StepOneIllustration from '@/public/step-one-illustration.webp';
import StepTwoIllustration from '@/public/step-two-illustration.webp';
import StepThreeIllustration from '@/public/step-three-illustration.webp';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product | Cher Ami',
  description: 'Learn how the Cher Ami works!',
  robots: {
    noimageindex: true,
  },
  alternates: {
    canonical: 'https://thecherami.com'
  }
};

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto px-5 gap-16 md:gap-36 pt-2 pb-18">
      <section id="main" className="flex flex-col items-center">
        <div className="mb-10">
          <h2 className="text-[2rem] text-[#242832] font-semibold text-center max-w-3xl mx-auto">
            Three Easy Steps
          </h2>
          <p className="text-[1rem] text-[#242832] font-normal text-center max-w-xl mx-auto">
            to sharing your daily joys!
          </p>
        </div>

        <div className="flex w-[100vw] max-w-[100vw] lg:justify-center p-6 gap-6 overflow-x-auto no-scrollbar">
          <div className="shrink-0 lg:shrink-1 max-w-[350px] flex flex-col items-center">
            <div className="relative w-full">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#F4F1EA] rounded-full flex items-center justify-center z-5">
                <Image
                  src={StepOne}
                  alt="The number one"
                  width={18}
                  height={22}
                />
              </div>
              <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center">
                <div className="flex flex-col h-[255px] justify-center z-10">
                  <Image
                    src={StepOneIllustration}
                    alt="Three mice playing with a kite"
                    height={255}
                    placeholder="blur"
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
          </div>

          <div className="shrink-0 lg:shrink-1 max-w-[350px] flex flex-col items-center">
            <div className="relative w-full">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#F4F1EA] rounded-full flex items-center justify-center z-5">
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
                    placeholder="blur"
                  />
                </div>
                <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                  We Deliver
                </h2>
                <p className="text-[1rem] text-[#242832] font-normal text-center">
                  <b>Every month, your photos become</b> a professionally designed,
                  beautifully printed magazine
                  delivered right to the doors of your family and friends.
                </p>
              </div>
            </div>
          </div>

          <div className="shrink-0 lg:shrink-1 max-w-[350px] flex flex-col items-center">
            <div className="relative w-full">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#F4F1EA] rounded-full flex items-center justify-center z-5">
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
                    placeholder="blur"
                  />
                </div>
                <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                  Cherish Forever
                </h2>
                <p className="text-[1rem] text-[#242832] font-normal text-center">
                  <b>Grandparents enjoy it</b> with their morning coffee. Parents treasure their growing collection.
                  It becomes the mail that everyone looks forward to each month—physical proof
                  that family is never far away.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-10">
          <p className="text-[1rem] text-[#242832] font-semibold text-center lg:text-left max-w-[500px]">
            Ready to make your own?
          </p>
          <div className="flex flex-col w-fit gap-4 justify-center text-center">
            <Link
              href="/start"
              className="flex px-10 py-3 bg-[#C15F3C] rounded-[12px] shadow-md
                          text-[1rem] text-white justify-center">
                Build mine for free
            </Link>
            <Link
              href="/example"
              className="flex px-6 py-3 border-2 border-[#C15F3C]
                          rounded-[12px] shadow-md
                          text-[1rem] text-[#C15F3C] justify-center">
                See an example
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
