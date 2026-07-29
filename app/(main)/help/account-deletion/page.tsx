import Link from 'next/link';
import Mail from '@/public/mail.svg';
import Check from '@/public/check-black.svg';
import X from '@/public/x-black.svg';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Deletion | Cher Ami',
  description: 'View the instructions for deleting your account.',
  robots: {
    noimageindex: true,
    index: false,
  },
  alternates: {
    canonical: 'https://thecherami.com/help/account-deletion'
  }
};

export default function AccountDeletionHelp() {
  return (
    <div className="bg-[#FCFBF8] max-w-[750px] mx-auto px-5 pt-12 pb-36">
      <div className="flex flex-col items-center">
        <h1 className="text-[2.5rem] text-[#242832] font-semibold mb-4">
          Account Deletion
        </h1>
        <p className="text-[1rem] text-[#242832] font-normal mb-16">
Here&apos;s exactly what happens, and how to do it yourself in the app.
        </p>
        <div className="flex flex-col gap-y-8 mb-12">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.25rem] text-[#383a3f] font-semibold">
              The following data will be deleted:
            </h2>
            <ul>
              <li className="flex gap-3 mb-3 text-[#383a3f]">
                <Image src={Check} alt="" width={24} height={24} />
Your account, name and profile photo.
              </li>
              <li className="flex gap-3 mb-3 text-[#383a3f]">
                <Image src={Check} alt="" width={24} height={24} />
Every photo and caption you added.
              </li>
              <li className="flex gap-3 text-[#383a3f]">
                <Image src={Check} alt="" width={24} height={24} />
Any recipients you added, including their addresses.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.25rem] text-[#383a3f] font-semibold">
              The following data will not be deleted:
            </h2>
            <ul>
              <li className="flex gap-3 mb-3 text-[#383a3f]">
                <Image src={X} alt="" width={24} height={24} />
The family circle itself, and photos other members added — they
                stay so the rest of your family keeps their memories.
              </li>
              <li className="flex gap-3 text-[#383a3f]">
                <Image src={X} alt="" width={24} height={24} />
Magazines already printed and mailed. Once a magazine is in
                someone&apos;s mailbox, it&apos;s theirs to keep.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.25rem] text-[#383a3f] font-semibold">
              Instructions
            </h2>
            <p className="text-[#383a3f]">
              To delete your Cher Ami account, you must access your account
              through the app. If you cannot access your account or the app,
              send us an email.
            </p>
            <ul>
              <li className="flex mb-3 gap-3">
                <p className="text-[#C15F3C]">1.</p>
                <p className="text-[#383a3f]">
                  Access your in-app settings through the button in the sidebar.
                </p>
              </li>
              <li className="flex mb-3 gap-3">
                <p className="text-[#C15F3C]">2.</p>
                <p className="text-[#383a3f]">Click “Delete Account”.</p>
              </li>
              <li className="flex gap-3">
                <p className="text-[#C15F3C]">3.</p>
                <p className="text-[#383a3f]">Continue with the on-screen instructions.</p>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-[1rem] text-[#242832] text-center font-normal mb-16">
          Please note that account deletion is permanent and we won&apos;t be able to recover your data, including previous photos and issues, once the process is complete.
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
