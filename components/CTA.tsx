'use client'

import Image from 'next/image';
import Link from 'next/link';

import AppStoreBadge from '@/public/apple-app-store badge.svg';
import PlayStoreBadge from '@/public/googe-play-badge.svg';

import { usePlausible } from 'next-plausible';

interface FAQItemProps {
  store: 'Apple' | 'Google';
}

export default function CTA({ store }: FAQItemProps) {
  const plausible = usePlausible();

  if (store === 'Apple') {
    return (
      <Link
        href="https://apps.apple.com/us/app/cher-ami-family-magazine/id6753635033"
        onClick={() => plausible("App Download")}>
          <Image
          src={AppStoreBadge}
          alt="Go to the Apple App Store"
          className="w-[120px] h-10"
          />
      </Link>
    );
  } else {
    return (
      <Link
        href="https://play.google.com/store/apps/details?id=com.hollowinc.cherami&pcampaignid=web_share"
        onClick={() => plausible("App Download")}>
          <Image
            src={PlayStoreBadge}
            alt="Go to the Google Play Store"
            className="w-[135px] h-10"
          />
        </Link>
      );
  }
}
