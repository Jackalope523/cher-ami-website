'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DynamicCTA from "./DynamicCTA";



export default function DownloadPopup() {
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const redirect = searchParams.get('redirect');
    var url: string | undefined;

    switch (redirect) {
      case 'open':
      case 'download':
        setVisible(true);
        break;
      default:
        break;
    }
    
    if (url) {
      window.location.href = url;
    }
  }, [searchParams]);

  if (visible) {
    return (
      <DynamicCTA />
    );
  }
  return null;
  
}