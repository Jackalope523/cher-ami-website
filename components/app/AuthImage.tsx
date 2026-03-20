'use client';

import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';

interface AuthImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function AuthImage({ src, alt, className, width, height }: AuthImageProps) {
  const { getToken } = useAuth();
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const token = getToken();
    if (!token || !src) return;

    fetch(src, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.blob())
      .then((blob) => {
        if (!cancelled) {
          setBlobUrl(URL.createObjectURL(blob));
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, getToken]);

  if (!blobUrl) {
    return (
      <div
        className={className}
        style={{ width, height, backgroundColor: '#F4F1EA' }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={blobUrl}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );
}
