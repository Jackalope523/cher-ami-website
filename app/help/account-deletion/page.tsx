import Link from 'next/link';
import CheckIcon from '@/public/check.svg';
import NotIcon from '@/public/x.svg';
import ArrowIcon from '@/public/arrow.svg';
import Image from 'next/image';
import TitleImage from '@/public/title.png';

export default function AccountDeletion() {
  return (
    <div className="bg-[#FCFBF8]">
      <main className="flex flex-col items-center py-5">
        <div className="flex flex-row justify-between w-full px-5 md:px-40 xl:px-50">
          <Link href="/">
            <Image
              src={TitleImage}
              alt="Cher Ami logo"
              className="w-[143px] h-8 flex-none"
              priority
            />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen gap-(--spacing-600) px-5 py-10 bg-(--canary-sand)">
          <div className="flex flex-col items-center gap-(--spacing-300) w-full mx-auto text-center">
            <h3 className="text-2xl font-semibold">Account Deletion</h3>
            <p>Looking to delete your Cher Ami account? Look no further!</p>
          </div>

          <div className="flex flex-col max-w-[40%] items-start text-left gap-(--spacing-400) mt-10">
            <h5 className="font-semibold mb-4">
              The following data will be deleted:
            </h5>
            <div className="flex flex-col gap-(--spacing-250)">
              <div className="flex flex-row items-start gap-(--spacing-200)">
                <Image
                  src={CheckIcon}
                  alt="Cher Ami logo"
                  className="shrink-0 w-6 h-6 mt-1"
                />
                <p>Your account & nest data.</p>
              </div>
              <div className="flex flex-row items-start gap-(--spacing-200)">
                <Image
                  src={CheckIcon}
                  alt="Cher Ami logo"
                  className="shrink-0 w-6 h-6 mt-1"
                />
                <p>Your snapshots.</p>
              </div>
              <div className="flex flex-row items-start gap-(--spacing-200)">
                <Image
                  src={CheckIcon}
                  alt="Cher Ami logo"
                  className="shrink-0 w-6 h-6 mt-1"
                />
                <p>Your unstarted gatherings.</p>
              </div>
              <div className="flex flex-row items-start gap-(--spacing-200)">
                <Image
                  src={NotIcon}
                  alt="Cher Ami logo"
                  className="shrink-0 w-6 h-6 mt-1"
                />
                <p>
                  Ongoing or terminated gatherings will have your information
                  redacted.
                </p>
              </div>
              <div className="flex flex-row items-start gap-(--spacing-200)">
                <Image
                  src={NotIcon}
                  alt="Cher Ami logo"
                  className="shrink-0 w-6 h-6 mt-1"
                />
                <p>
                  We will retain any disciplinary-relevant information and may
                  apply it to future accounts.
                </p>
              </div>
            </div>
            <p className="mt-4">
              By continuing, your account will immediately be terminated and the
              aforementioned data removed, though it may take up to 30 days for
              our servers to register this.
            </p>
          </div>

          {/* Instructions Section */}
          <div className="flex flex-col min-w-[30%] max-w-[80%] items-center text-center gap-(--spacing-600) mt-12">
            <h5 className="font-semibold">Instructions</h5>
            <p>
              To delete your CANARY account, you must access your account
              through the app.
              <br />
              If you cannot access your account or the app, please{' '}
              <Link href="/help/support" className="text-[#B05637] underline">
                contact us
              </Link>
              .
            </p>
            <div className="flex flex-col min-w-[70%] max-w-[80%] items-start text-left gap-(--spacing-250) mt-6">
              <div className="flex flex-row items-start gap-(--spacing-200)">
                <Image
                  src={ArrowIcon}
                  alt="Cher Ami logo"
                  className="shrink-0 w-6 h-6 mt-1"
                />
                <p>Access your in-app settings through the nest screen.</p>
              </div>
              <div className="flex flex-row items-start gap-(--spacing-200)">
                <Image
                  src={ArrowIcon}
                  alt="Cher Ami logo"
                  className="shrink-0 w-6 h-6 mt-1"
                />
                <p>Access your private settings.</p>
              </div>
              <div className="flex flex-row items-start gap-(--spacing-200)">
                <Image
                  src={ArrowIcon}
                  alt="Cher Ami logo"
                  className="shrink-0 w-6 h-6 mt-1"
                />
                <p>Click &apos;Go To Account Deletion&apos;.</p>
              </div>
              <div className="flex flex-row items-start gap-(--spacing-200)">
                <Image
                  src={ArrowIcon}
                  alt="Cher Ami logo"
                  className="shrink-0 w-6 h-6 mt-1"
                />
                <p>Continue with the on-screen instructions.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
