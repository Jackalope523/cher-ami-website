'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const APP_DEEP_LINK = "cherami://";

const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=com.hollowinc.cherami&pcampaignid=web_share";
const APPLE_STORE_URL = "https://apps.apple.com/us/app/cher-ami-family-magazine/id6753635033";

export default function Redirect() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const redirect = searchParams.get('redirect');
    var url: string | undefined;

    switch (redirect) {
      case 'open':
        url = APP_DEEP_LINK;
        break;
      case 'download':
        const ua = navigator.userAgent;
        const isIOS = /iPhone|iPad|iPod/.test(ua);
        const isAndroid = /Android/.test(ua);
  
        url = isIOS ? APPLE_STORE_URL : isAndroid ? ANDROID_STORE_URL : undefined;
        break;
      default:
        break;
    }
    
    if (url) {
      window.location.href = url;
    }
  }, [searchParams]);

  return null;
}