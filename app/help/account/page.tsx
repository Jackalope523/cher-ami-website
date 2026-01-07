import Link from 'next/link';
import Chevron from '@/public/chevron-right.svg';
import Image from 'next/image';

export default function AccountHelp() {
  return (
    <div className="bg-[#FCFBF8] max-w-[1200px] mx-auto px-5 pt-12 pb-36">
      <nav className="flex flex-row gap-x-4 py-3">
        <Link href="/help" className="text-[1rem] text-[#242832] font-medium">
          Help
        </Link>
        <Image
          src={Chevron}
          alt="A right facing chevron"
          width={24}
          height={24}
        />
        <p className="text-[1rem] text-[#242832] font-medium underline">
          Account
        </p>
      </nav>
      <div>
        <h1 className="text-[2.5rem] text-[#383a3f] font-semibold mb-8">
          Account
        </h1>
        <div className="flex flex-col gap-y-6 mb-16">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              How do I create an account?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              <Link href="/?redirect=download#download-section" className="underline">Download the app</Link> on your mobile device and follow the sign-up instructions!
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              I didn't get a code or I can't log in to my account!
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              If you're having trouble signing up or logging in, please ensure you are using the correct email and check your spam folder for the verification code if you cannot find it!
              If you still can't log in, please <Link href="/contact" className="underline">contact us</Link>.
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              How do I change my name or profile picture?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              From the app, navigate to your profile via the menu and tap the edit button or press on your profile picture to edit.
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              How do I delete my account?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              If you wish to delete your account, please follow the instructions on our <Link href="/help/account-deletion" className="underline">account deletion page</Link>.
            </p>
          </div>
        </div>
        <p className="text-[1rem] text-[#242832] font-semibold">
          Last updated the 7th of January, 2026
        </p>
      </div>
    </div>
  );
}
