
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Example Magazine | Cher Ami',
  description: 'Preview an example of one of our issues.',
  robots: {
    noimageindex: true,
  },
  alternates: {
    canonical: 'https://thecherami.com/example'
  }
};

export default function Example() {
  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto px-5 pt-6 pb-18 items-center gap-10">
      <section className="w-[90vw] md:w-[100vw] h-[90vh]">
        <iframe src="https://heyzine.com/flip-book/5b793e9c89.html" className="w-full h-full" allowFullScreen allow="clipboard-write *;" />
      </section>

      <section className="flex flex-col w-full items-center">
        <div className="flex flex-col items-center gap-8">
          <p className="text-[1rem] text-[#242832] font-normal text-center">
            Printed on premium, glossy 8.5x11 inch paper for beautiful photos every time. Up to 20 posts per magazine.
          </p>
          <div className="flex flex-col w-fit gap-4 justify-center text-center">
            <p className="text-[1rem] text-[#242832] font-semibold text-center">
              Ready to make your own?
            </p>
            <Link
              href="/start"
              className="flex px-10 py-3 bg-[#C15F3C] rounded-[12px] shadow-md
                          text-[1rem] text-white justify-center">
                Let's go!
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
