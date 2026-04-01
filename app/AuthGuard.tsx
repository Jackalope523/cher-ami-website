'use client';

import { useAuth } from '@/lib/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const PUBLIC_PATHS = ['/app/login', '/app/verify'];
export default function AuthGuard({
  children,
}: {
  children: (showSidebar: boolean) => ReactNode;
}) {
  const { loaded, getToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (!loaded) return;

    const token = getToken();

    if (!token && !isPublic) {
      router.push('/app/login');
    } else if (token && isPublic) {
      router.push('/app/feed');
    }
  }, [loaded, getToken, pathname, router, isPublic]);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FCFBF8]">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const token = getToken();

  // Don't render protected content without auth
  if (!token && !isPublic) return null;

  const showSidebar = !!token && !isPublic;

  return <>{children(showSidebar)}</>;
}
