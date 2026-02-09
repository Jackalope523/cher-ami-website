import Image from 'next/image';
import Mouse from '@/public/mouse-hole.png';
import Arrow from '@/public/arrow-left.svg';
import Link from 'next/link';
import Header from '@/components/Header';

export default function NotFound() {
  return (
    <>
      <Header />
      
      <div className="bg-[#FCFBF8] py-36">
        <main className="flex flex-col md:flex-row items-center justify-center gap-10 py-36">
          <Image
            src={Mouse}
            alt="A mouse throwing a paper airplane."
            width={244}
            height={252}
          />
          <div className="flex flex-col items-center">
            <h1 className="text-[7rem] text-[#242832] font-medium mb-4">404</h1>
            <h2 className="text-[1.75rem] text-[#242832] font-semibold mb-6">
              Page Not Found
            </h2>
            <p className="text-[1rem] text-[#242832] font-normal mb-12">
              We couldn’t find the page you’re looking for.
            </p>
            <Link
              href="/"
              className="flex flex-row bg-[#C15F3C] rounded-[20px] px-8 py-6 gap-x-2 w-fit items-center justify-center">
              <Image src={Arrow} alt="Go to home" width={24} height={24} />
              <p className="text-[1rem] text-[#FFFFFF] font-semibold">
                Take me back home!
              </p>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
