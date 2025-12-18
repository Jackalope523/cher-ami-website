'use client';

import Image from 'next/image';
import Link from 'next/link';

import AppStoreBadge from '@/public/apple-app-store badge.svg';
import PlayStoreBadge from '@/public/googe-play-badge.svg';

import { usePlausible } from 'next-plausible';

interface CTAProps {
  store: 'Apple' | 'Google';
  width: number;
  height: number;
}

export default function CTA({ store, width, height }: CTAProps) {
  const plausible = usePlausible();

  if (store === 'Apple') {
    return (
      <Link
        href="https://apps.apple.com/us/app/cher-ami-family-magazine/id6753635033"
        onClick={() => plausible('App Download')}>
        <Image
          src={AppStoreBadge}
          alt="Go to the Apple App Store"
          width={width}
          height={height}
        />
      </Link>
    );
  } else {
    return (
      <Link
        href="https://play.google.com/store/apps/details?id=com.hollowinc.cherami&pcampaignid=web_share"
        onClick={() => plausible('App Download')}>
        <Image
          src={PlayStoreBadge}
          alt="Go to the Google Play Store"
          width={width}
          height={height}
        />
      </Link>
    );
  }
}
