import Image from 'next/image';
import TitleImage from '@/public/title.png';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#FCFBF8]">
      <main className="flex flex-col items-center gap-y-16 py-10 px-5 md:px-40 xl:px-50">
        {/* Header */}
        <div className="flex flex-row justify-between w-full items-center">
          <Link href={'/'}>
            <Image
              src={TitleImage}
              alt="Cher Ami logo"
              className="w-[143px] h-8 flex-none"
              priority
            />
          </Link>

          <div className="flex flex-row gap-x-4">
            <Link href="/" className="text-[#B05637] px-4 py-3 rounded-xl">
              Home
            </Link>
            <Link
              href="/get-cher-ami"
              className="bg-[#C15F3C] text-[#FFFFFF] px-4 py-3 rounded-xl">
              Get Cher Ami
            </Link>
          </div>
        </div>

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-[2.5rem] text-[#242832] font-semibold mb-6">
            Privacy Policy
          </h1>
          <p className="text-[1rem] text-[#242832] font-normal">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information when you use Cher Ami.
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="flex flex-col gap-y-10 max-w-4xl w-full">
          <div>
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold mb-3">
              Information We Collect
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              We collect information you provide directly, such as your name,
              email address, and photos you upload. We also collect usage
              information to improve our services.
            </p>
          </div>

          <div>
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold mb-3">
              How We Use Your Information
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              Your information is used to provide our services, send
              notifications, improve the app experience, and communicate updates
              or promotions. We never sell your personal information.
            </p>
          </div>

          <div>
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold mb-3">
              Sharing Your Information
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              We do not share your personal information with third parties
              except when required by law or for trusted service providers who
              help us operate the app.
            </p>
          </div>

          <div>
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold mb-3">
              Data Security
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              We use industry-standard security measures to protect your
              information. However, no method of transmission over the internet
              is completely secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold mb-3">
              Your Choices
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              You can manage your account settings, opt-out of promotional
              emails, and delete your account at any time by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold mb-3">
              Changes to This Policy
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              We may update this privacy policy from time to time. Any changes
              will be posted here with the effective date.
            </p>
          </div>

          <div>
            <h2 className="text-[1.75rem] text-[#C15F3C] font-semibold mb-3">
              Contact Us
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              If you have questions or concerns about this policy, please
              contact us at{' '}
              <a
                href="mailto:support@cherami.com"
                className="text-[#B05637] underline">
                support@cherami.com
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col w-full items-center gap-y-10 mt-16">
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
        </div>
      </main>
    </div>
  );
}
