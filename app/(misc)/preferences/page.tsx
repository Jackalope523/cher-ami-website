import type { Metadata } from 'next';
import PreferencesClient from './PreferencesClient';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Email Preferences | Cher Ami',
  description: 'Manage your email preferences for Cher Ami.',
  robots: {
    index: false,
    follow: false,
    noimageindex: true,
  },
};

export default function PreferencesPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PreferencesClient />
    </Suspense>
  );
}
