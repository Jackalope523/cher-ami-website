import type { Metadata } from 'next';
import PreferencesClient from './PreferencesClient';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Contact | Cher Ami',
  description: 'Contact the Cher Ami team.',
  robots: {
    noimageindex: true,
  },
  alternates: {
    canonical: 'https://thecherami.com/contact'
  }
};

export default function Contact() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PreferencesClient />
    </Suspense>
  );
}
