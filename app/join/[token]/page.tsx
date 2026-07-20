import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JoinClient from './JoinClient';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://app-cherami-prod.azurewebsites.net';

interface InvitePreview {
  title: string;
  memberCount: number;
}

async function fetchPreview(token: string): Promise<InvitePreview | null> {
  try {
    const res = await fetch(`${API_URL}/invites/${encodeURIComponent(token)}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as InvitePreview;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const preview = await fetchPreview(token);

  if (!preview) {
    return { title: 'Join a family circle — Cher Ami' };
  }

  return {
    title: `Join ${preview.title} on Cher Ami`,
    description:
      'Your family is sharing photos that become a printed magazine every month. Join them on Cher Ami.',
    openGraph: {
      title: `Join ${preview.title} on Cher Ami`,
      description:
        'Your family is sharing photos that become a printed magazine every month. Join them on Cher Ami.',
    },
  };
}

function InvalidInvite() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-[#FCFBF8] text-center">
      <div className="w-full max-w-sm flex flex-col items-center">
        <Image
          src="/squirrel.webp"
          alt="Cher Ami mascot"
          width={288}
          height={228}
          className="max-w-[220px] w-[70%] h-auto mb-8"
        />
        <h1 className="text-[28px] font-medium text-[#242832] mb-4">
          This invite link isn&apos;t working
        </h1>
        <p className="text-base text-[#242832] mb-2">
          It may have been replaced with a newer one — that happens when the
          family creates a fresh invite code.
        </p>
        <p className="text-base text-[#242832] mb-8">
          Ask the person who invited you to send you a new link.
        </p>
        <Link
          href="/"
          className="text-base font-medium text-[#C15F3C] underline">
          What is Cher Ami?
        </Link>
      </div>
    </div>
  );
}

export default async function JoinPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const preview = await fetchPreview(token);

  if (!preview) {
    return <InvalidInvite />;
  }

  return (
    <JoinClient
      token={token}
      title={preview.title}
      memberCount={preview.memberCount}
    />
  );
}
