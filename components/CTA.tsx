'use client';

import Image from 'next/image';
import Link from 'next/link';

import AppStoreBadge from '@/public/apple-app-store badge.svg';
import PlayStoreBadge from '@/public/googe-play-badge.svg';

import posthog from 'posthog-js';

interface CTAProps {
  store: 'Apple' | 'Google';
  width: number;
  height: number;

  trackingProps?: Record<string, unknown>;
}

export default function CTA({ store, width, height, trackingProps }: CTAProps) {
  if (store === 'Apple') {
    return (
      <Link
        href="https://apps.apple.com/us/app/cher-ami-family-magazine/id6753635033"
        onClick={() => posthog.capture('app_download_clicked', { store: 'apple', ...trackingProps })}>
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
        onClick={() => posthog.capture('app_download_clicked', { store: 'google', ...trackingProps })}>
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
