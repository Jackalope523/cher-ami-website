
import type { Metadata } from 'next';

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
    <div className="w-[100vw] h-[100vh] mx-auto px-5 py-18">
      <iframe src="https://heyzine.com/flip-book/42e3812bbc.html" className="w-full h-full" allowFullScreen allow="clipboard-write *;" />
    </div>
  );
}
