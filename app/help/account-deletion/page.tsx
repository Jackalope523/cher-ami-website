import Link from 'next/link';
import Mail from '@/public/mail.svg';
import Check from '@/public/check-black.svg';
import X from '@/public/x-black.svg';
import Image from 'next/image';

export default function AccountDeletionHelp() {
  return (
    <div className="bg-[#FCFBF8] max-w-[750px] mx-auto px-5 pt-12 pb-36">
      <div className="flex flex-col items-center">
        <h1 className="text-[2.5rem] text-[#242832] font-semibold mb-4">
          Account Deletion
        </h1>
        <p className="text-[1rem] text-[#242832] font-normal mb-16">
          Looking to delete your account?
        </p>
        <div className="flex flex-col gap-y-8 mb-12">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.25rem] text-[#383a3f] font-semibold">
              The following data will be deleted:
            </h2>
            <ul>
              <li className="flex gap-3 mb-3">
                <Image src={Check} alt="Go to contact" width={24} height={24} />
                Your account data.
              </li>
              <li className="flex gap-3 mb-3">
                <Image src={Check} alt="Go to contact" width={24} height={24} />
                Your posts.
              </li>
              <li className="flex gap-3">
                <Image src={Check} alt="Go to contact" width={24} height={24} />
                Any recipients you have created.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.25rem] text-[#383a3f] font-semibold">
              The following data will not be deleted:
            </h2>
            <ul>
              <li className="flex gap-3 mb-3">
                <Image src={X} alt="Go to contact" width={24} height={24} />
                Circles you created with other members.
              </li>
              <li className="flex gap-3">
                <Image src={X} alt="Go to contact" width={24} height={24} />
                We will retain any disciplinary-relevant information and may
                apply it to future accounts.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.25rem] text-[#383a3f] font-semibold">
              Instructions
            </h2>
            <p>
              To delete your Cher Ami account, you must access your account
              through the app. If you cannot access your account or the app,
              send us an email.
            </p>
            <ul>
              <li className="flex mb-3 gap-3">
                <p className="text-[#C15F3C]">1.</p>
                <p>
                  Access your in-app settings through the button in the sidebar.
                </p>
              </li>
              <li className="flex mb-3 gap-3">
                <p className="text-[#C15F3C]">2.</p>
                <p>Click “Delete Account”.</p>
              </li>
              <li className="flex gap-3">
                <p className="text-[#C15F3C]">3.</p>
                <p>Continue with the on-screen instructions.</p>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-[1rem] text-[#242832] text-center font-normal mb-16">
          Please note that account deletion is permanent and we won't be able to recover your data, including previous photos and issues, once the process is complete.
        </p>
        <h2 className="text-[1.75rem] text-[#242832] font-semibold mt-6 mb-4">
          Still need help?
        </h2>
        <Link
          href={'/contact'}
          className="flex flex-row px-8 py-6 gap-x-2 rounded-[1.25rem] border-2 border-[#242832]">
          <p className="text-[1rem] text-[#242832] font-medium">
            Contact us directly
          </p>
          <Image src={Mail} alt="Go to contact" width={24} height={24} />
        </Link>
      </div>
    </div>
  );
}
