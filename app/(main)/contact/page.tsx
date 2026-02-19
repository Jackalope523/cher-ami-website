import type { Metadata } from 'next';
import ContactClient from './ContactClient';

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
    <ContactClient />
  );
}
