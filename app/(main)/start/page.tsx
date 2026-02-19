import type { Metadata } from 'next';
import StartClient from './StartClient';


export const metadata: Metadata = {
  title: 'Start! | Cher Ami',
  description: 'Every month, transform your family\'s photos and stories into a beautiful magazine, delivered to those you love.',
  robots: {
    noimageindex: true,
    index: false,
  },
  alternates: {
    canonical: 'https://thecherami.com/start'
  }
};

export default function Start() {
  return (
    <StartClient />
  );
}
