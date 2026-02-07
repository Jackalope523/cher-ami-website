import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quiz | Cher Ami',
  description: 'Take a short quiz.',
  robots: {
    noimageindex: true,
    index: false,
  },
  alternates: {
    canonical: 'https://thecherami.com/quiz'
  }
};

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {children}
    </main>
  );
}