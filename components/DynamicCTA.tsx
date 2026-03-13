'use client';

import { useEffect, useState } from 'react';
import CTA from './CTA';
import Image from 'next/image';
import QRCode from '@/public/scan-to-download.png';

type Device = 'default' | 'ios' | 'android';

interface Props {
  trackingProps?: Record<string, unknown>;
}

export default function DynamicCTA({ trackingProps }: Props) {
  const [device, setDevice] = useState<Device>('default');

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(ua);
    const isAndroid = /Android/.test(ua);

    if (isIOS) {
      setDevice('ios');
    } else if (isAndroid) {
      setDevice('android');
    }
  }, []);

  if (device === 'ios') {
    return (
        <CTA store="Apple" width={192} height={64} trackingProps={trackingProps} />
    );
  }
  else if (device === 'android') {
    return (
        <CTA store="Google" width={216} height={64} trackingProps={trackingProps} />
    );
  }
  else {
    return (
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-row md:flex-col gap-4 self-center justify-center items-center w-fit h-fit
                        border-2 border-[#DEDBD5] rounded-xl p-4">
          <CTA store="Apple" width={192} height={64} trackingProps={trackingProps} />
          <CTA store="Google" width={216} height={64} trackingProps={trackingProps} />
        </div>
        <Image
          src={QRCode}
          alt="QR code to download the app"
          className='w-80 h-auto self-center'
          />
      </div>
    );
  }
}
