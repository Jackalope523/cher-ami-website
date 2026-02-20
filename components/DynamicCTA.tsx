'use client';

import { useEffect, useState } from 'react';
import CTA from './CTA';

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
      <>
        <CTA store="Apple" width={192} height={64} trackingProps={trackingProps} />
        <CTA store="Google" width={216} height={64} trackingProps={trackingProps} />
      </>
    );
  }
}
