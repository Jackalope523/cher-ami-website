import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    noimageindex: true,
    index: false,
  },
};

export default function PrintLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
