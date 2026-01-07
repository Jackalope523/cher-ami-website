import Link from 'next/link';
import Chevron from '@/public/chevron-right.svg';
import Image from 'next/image';

export default function GeneralHelp() {
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
          General
        </p>
      </nav>
      <div>
        <h1 className="text-[2.5rem] text-[#383a3f] font-semibold mb-8">
          General
        </h1>
        <div className="flex flex-col gap-y-6 mb-16">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              The app isn't loading, help!
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              As a temporary measure to minimise our resources, our servers may take a few seconds to wake up if there hasn't been activity for a while. Give it a few seconds, refresh the app, and it should load up fine!
              If you are still unable to access the app, please try again later as we are likely fixing an issue.
            </p>
          </div>
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
              How do I upload pictures?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              From the mobile app, join or create a circle for your family and friends to share pictures securely. Then, tap the bottom-right button to post from the feed screen on the app.
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              How do I join or create a circle?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              If you were given a code to join a circle, open the app, sign up, and enter it on the welcome screen. If you want to create your own circle, sign up and tap "Create Circle" instead and follow the instructions.
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              Can I edit my circle after creating it?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              Currently, you cannot change your circle's name or photo after creating it. However, we are planning this feature very soon!
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              How can I invite people to my circle? Who can join my circle?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              From the app, navigate to your circle from the top-left menu, copy the circle code, and share it with others!
              Only those who have the code can join your circle.
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              Someone I don't know joined my circle! What do I do?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              If you don't recognise someone in your circle, you may remove them from the circle page if you own it or alert the circle creator.
              It is possible a member accidentally shared the code publicly. In this case, you may press the 'regenerate code' button from the circle screen that will create a new code and invalidate the old one.
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              What are recipients?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              Recipients are those who will receive a physical magazine in the mail with last month's posts—perfect for distant family and friends. Add as many as you like!
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <h2 className="text-[1.5rem] text-[#383a3f] font-medium">
              Are my photos public?
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal">
              No, your photos are not public and are only visible to members of your circle. We prioritize your privacy and ensure that your shared moments remain within your trusted group.
              If you have any other questions or concerns about your privacy and data, please view our <Link href="/help/privacy" className="underline">Privacy & Security</Link> section.
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
