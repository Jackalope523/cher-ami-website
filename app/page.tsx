import Image from 'next/image';
import TitleImage from '@/public/title.png';
import Hedgehog from '@/public/hedgehog.png';
import Mouse from '@/public/mouse.png';
import Placeholder from '@/public/placeholder.jpg';
import PhoneShowcase from '@/public/app-showcase.png';
import MagazineShowcase from '@/public/magazine-showcase.png';
import Rat from '@/public/rat.png';
import Fox from '@/public/fox.png';
import Family from '@/public/family.png';
import Shield from '@/public/shield.png';
import Book from '@/public/book.png';
import StepOne from '@/public/step-one.png';
import StepTwo from '@/public/step-two.png';
import StepThree from '@/public/step-three.png';
import Check from '@/public/check.svg';
import X from '@/public/x.svg';
import Chevron from '@/public/chevron.svg';
import Kimi from '@/public/kimi.jpg';

export default function Home() {
  return (
    <div className="bg-[#FCFBF8]">
      <main className="flex flex-col items-center gap-y-36 py-5">
        <div className="flex flex-row justify-between w-full px-50">
          <Image
            src={TitleImage}
            alt="Cher Ami logo"
            width={143}
            height={32}
            priority
          />
          <div className="flex flex-row gap-x-4">
            <button className="text-[#B05637] px-4 py-3 rounded-xl">
              How It Works
            </button>
            <button className="bg-[#C15F3C] text-[#FFFFFF] px-4 py-3 rounded-xl">
              Get Cher Ami
            </button>
          </div>
        </div>

        <div className="flex flex-row items-center">
          <div className="flex-1 hidden xl:block">
            <Image
              src={Hedgehog}
              alt="Cher Ami logo"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-[2.5rem] text-[#242832] font-semibold text-center max-w-3xl mx-auto mb-12">
              Share your cherished memories of family and friends.
            </h1>
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
              alt="Cher Ami logo"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="flex flex-row gap-x-10 overflow-x-auto px-40">
          <Image
            src={Placeholder}
            alt="Cher Ami logo"
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt="Cher Ami logo"
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt="Cher Ami logo"
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt="Cher Ami logo"
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt="Cher Ami logo"
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt="Cher Ami logo"
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt="Cher Ami logo"
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt="Cher Ami logo"
            width={408}
            height={510}
            className="rounded-[32]"
          />
          <Image
            src={Placeholder}
            alt="Cher Ami logo"
            width={408}
            height={510}
            className="rounded-4xl"
          />
        </div>

        <div>
          <div className="mb-10">
            <h1 className="text-[40px] text-[#242832] font-semibold text-center max-w-3xl mx-auto pb-5">
              Two ways to connect.
            </h1>
            <p className="text-[16px] text-[#242832] font-normal text-center max-w-xl mx-auto">
              {
                'Sharing moments of your life with family and friends has never been easier.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 mb-20">
            <Image
              src={PhoneShowcase}
              alt="Cher Ami logo"
              className="block w-auto h-auto"
            />
            <Image
              src={MagazineShowcase}
              alt="Cher Ami logo"
              className="block w-auto h-auto"
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-10">
            <h1 className="text-[40px] text-[#242832] font-semibold text-center max-w-3xl mx-auto pb-5">
              As easy as...
            </h1>
            <p className="text-[16px] text-[#242832] font-normal text-center max-w-xl mx-auto">
              {
                'You focus on making memories while we take care of everything else, from design to delivery.'
              }
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="relative w-[300px] flex flex-col items-center">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#F4F1EA] rounded-full flex items-center justify-center">
                <Image
                  src={StepOne}
                  alt="Cher Ami logo"
                  width={18}
                  height={22}
                />
              </div>
              <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center">
                <Image src={Rat} alt="Cher Ami logo" width={255} height={178} />
                <h1 className="text-[28px] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                  Share Photos
                </h1>
                <p className="text-[16px] text-[#242832] font-normal text-center">
                  Upload memories through our app all month long.
                </p>
              </div>
            </div>

            <div className="relative w-[300px] flex flex-col items-center">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#F4F1EA] rounded-full flex items-center justify-center">
                <Image
                  src={StepTwo}
                  alt="Cher Ami logo"
                  width={26.61}
                  height={30.86}
                />
              </div>
              <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center">
                <Image src={Fox} alt="Cher Ami logo" width={255} height={178} />
                <h1 className="text-[28px] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                  Receive Magazine
                </h1>
                <p className="text-[16px] text-[#242832] font-normal text-center">
                  Upload memories through our app all month long.
                </p>
              </div>
            </div>

            <div className="relative w-[300px] flex flex-col items-center">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#F4F1EA] rounded-full flex items-center justify-center">
                <Image
                  src={StepThree}
                  alt="Cher Ami logo"
                  width={22}
                  height={26}
                />
              </div>
              <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center">
                <Image
                  src={Family}
                  alt="Cher Ami logo"
                  width={255}
                  height={178}
                />
                <h1 className="text-[28px] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                  Enjoy Together
                </h1>
                <p className="text-[16px] text-[#242832] font-normal text-center">
                  Upload memories through our app all month long.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-[40px] text-[#242832] font-semibold text-center max-w-3xl mx-auto mb-10">
            Pricing
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <div className="flex flex-col rounded-t-[20] border-t-2 border-l-2 border-r-2 border-[#F4F1EA] items-center bg-[#F4F1EA] py-2 w-full">
                <h3 className="text-[28px] text-[#242832] font-semibold">
                  FREE
                </h3>
              </div>
              <div className="flex flex-col items-center pl-6 pr-6 pb-6 rounded-b-[20] border-b-2 border-l-2 border-r-2 border-[#F4F1EA]">
                <h3 className="text-[48px] text-[#242832] font-semibold my-4">
                  $0
                </h3>
                <div className="flex flex-col">
                  <div className="flex flex-row gap-x-1">
                    <Image
                      src={Check}
                      alt="Cher Ami logo"
                      width={24}
                      height={24}
                    />
                    <p className="text-[16px] text-[#242832] font-normal">
                      Share and view posts on the Cher Ami app.
                    </p>
                  </div>
                  <div className={'flex flex-row gap-x-1'}>
                    <Image src={X} alt="Cher Ami logo" width={24} height={24} />
                    <p className="text-[16px] text-[#242832] font-normal">
                      No printed magazine.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex flex-col rounded-t-[20] border-t-2 border-l-2 border-r-2 border-[#C15F3C] items-center bg-[#C15F3C] py-2 w-full">
                <h3 className="text-[28px] text-[#FCFBF8] font-semibold">
                  Standard
                </h3>
              </div>
              <div className="flex flex-col items-center pl-6 pr-6 pb-6 rounded-b-[20] border-b-2 border-l-2 border-r-2 border-[#C15F3C]">
                <h3 className="text-[48px] text-[#242832] font-semibold my-4">
                  $12
                </h3>
                <div className="flex flex-col">
                  <div className="flex flex-row gap-x-1">
                    <Image
                      src={Check}
                      alt="Cher Ami logo"
                      width={24}
                      height={24}
                    />
                    <p className="text-[16px] text-[#242832] font-normal">
                      Share and view posts on the Cher Ami app.
                    </p>
                  </div>
                  <div className={'flex flex-row gap-x-1'}>
                    <Image
                      src={Check}
                      alt="Cher Ami logo"
                      width={24}
                      height={24}
                    />
                    <p className="text-[16px] text-[#242832] font-normal">
                      Receive a printed magazine each month.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-[40px] text-[#242832] font-semibold text-center max-w-3xl mx-auto mb-10">
            Our values
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center w-[300px]">
              <Image src={Book} alt="Cher Ami logo" width={255} height={178} />
              <h1 className="text-[28px] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                High Quality
              </h1>
              <p className="text-[16px] text-[#242832] font-normal text-center">
                Upload memories through our app all month long.
              </p>
            </div>

            <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center w-[300px]">
              <Image
                src={Shield}
                alt="Cher Ami logo"
                width={156}
                height={183}
              />
              <h1 className="text-[28px] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                Private
              </h1>
              <p className="text-[16px] text-[#242832] font-normal text-center">
                Upload memories through our app all month long.
              </p>
            </div>

            <div className="bg-[#F4F1EA] rounded-4xl p-7 flex flex-col items-center w-[300px]">
              <Image src={Fox} alt="Cher Ami logo" width={255} height={178} />
              <h1 className="text-[28px] text-[#C15F3C] font-semibold text-center mt-6 mb-2">
                Free Shipping
              </h1>
              <p className="text-[16px] text-[#242832] font-normal text-center">
                Upload memories through our app all month long.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-[40px] text-[#242832] font-semibold text-center max-w-3xl mx-auto mb-10">
            What people are saying
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#F4F1EA] rounded-3xl p-5 w-[300px]">
              <p className="text-[16px] text-[#242832] font-normal">
                {
                  '"Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped."'
                }
              </p>
              <div className="flex flex-row items-center gap-x-2 mt-5">
                <Image
                  src={Kimi}
                  alt="Cher Ami logo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <p className="text-[16px] text-[#242832] font-semibold">Kimi</p>
              </div>
            </div>

            <div className="bg-[#F4F1EA] rounded-3xl p-5 w-[300px]">
              <p className="text-[16px] text-[#242832] font-normal">
                {
                  '"Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped."'
                }
              </p>
              <div className="flex flex-row items-center gap-x-2 mt-5">
                <Image
                  src={Kimi}
                  alt="Cher Ami logo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <p className="text-[16px] text-[#242832] font-semibold">Kimi</p>
              </div>
            </div>

            <div className="bg-[#F4F1EA] rounded-3xl p-5 w-[300px]">
              <p className="text-[16px] text-[#242832] font-normal">
                {
                  '"Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped."'
                }
              </p>
              <div className="flex flex-row items-center gap-x-2 mt-5">
                <Image
                  src={Kimi}
                  alt="Cher Ami logo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <p className="text-[16px] text-[#242832] font-semibold">Kimi</p>
              </div>
            </div>

            <div className="bg-[#F4F1EA] rounded-3xl p-5 w-[300px]">
              <p className="text-[16px] text-[#242832] font-normal">
                {
                  '"Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped."'
                }
              </p>
              <div className="flex flex-row items-center gap-x-2 mt-5">
                <Image
                  src={Kimi}
                  alt="Cher Ami logo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <p className="text-[16px] text-[#242832] font-semibold">Kimi</p>
              </div>
            </div>
            <div className="bg-[#F4F1EA] rounded-3xl p-5 w-[300px]">
              <p className="text-[16px] text-[#242832] font-normal">
                {
                  '"Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped."'
                }
              </p>
              <div className="flex flex-row items-center gap-x-2 mt-5">
                <Image
                  src={Kimi}
                  alt="Cher Ami logo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <p className="text-[16px] text-[#242832] font-semibold">Kimi</p>
              </div>
            </div>

            <div className="bg-[#F4F1EA] rounded-3xl p-5 w-[300px]">
              <p className="text-[16px] text-[#242832] font-normal">
                {
                  '"Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped."'
                }
              </p>
              <div className="flex flex-row items-center gap-x-2 mt-5">
                <Image
                  src={Kimi}
                  alt="Cher Ami logo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <p className="text-[16px] text-[#242832] font-semibold">Kimi</p>
              </div>
            </div>

            <div className="bg-[#F4F1EA] rounded-3xl p-5 w-[300px]">
              <p className="text-[16px] text-[#242832] font-normal">
                {
                  '"Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped."'
                }
              </p>
              <div className="flex flex-row items-center gap-x-2 mt-5">
                <Image
                  src={Kimi}
                  alt="Cher Ami logo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <p className="text-[16px] text-[#242832] font-semibold">Kimi</p>
              </div>
            </div>

            <div className="bg-[#F4F1EA] rounded-3xl p-5 w-[300px]">
              <p className="text-[16px] text-[#242832] font-normal">
                {
                  '"Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped."'
                }
              </p>
              <div className="flex flex-row items-center gap-x-2 mt-5">
                <Image
                  src={Kimi}
                  alt="Cher Ami logo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <p className="text-[16px] text-[#242832] font-semibold">Kimi</p>
              </div>
            </div>
            <div className="bg-[#F4F1EA] rounded-3xl p-5 w-[300px]">
              <p className="text-[16px] text-[#242832] font-normal">
                {
                  '"Such a delightful experience! The process was seamless, and the final gazette looked even better than we had hoped."'
                }
              </p>
              <div className="flex flex-row items-center gap-x-2 mt-5">
                <Image
                  src={Kimi}
                  alt="Cher Ami logo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <p className="text-[16px] text-[#242832] font-semibold">Kimi</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-[40px] text-[#242832] font-semibold text-center max-w-3xl mx-auto mb-5">
            FAQ
          </h1>
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-row justify-between bg-[#F4F1EA] p-4 w-[500px] rounded-[14]">
              <p>How do I create a new account?</p>
              <Image
                src={Chevron}
                alt="Cher Ami logo"
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-row justify-between bg-[#F4F1EA] p-4 w-[500px] rounded-[14]">
              <p>How do I create a new account?</p>
              <Image
                src={Chevron}
                alt="Cher Ami logo"
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-row justify-between bg-[#F4F1EA] p-4 w-[500px] rounded-[14]">
              <p>How do I create a new account?</p>
              <Image
                src={Chevron}
                alt="Cher Ami logo"
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-row justify-between bg-[#F4F1EA] p-4 w-[500px] rounded-[14]">
              <p>How do I create a new account?</p>
              <Image
                src={Chevron}
                alt="Cher Ami logo"
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

