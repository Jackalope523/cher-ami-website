'use client';

import { useAuth } from '@/lib/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const PUBLIC_PATHS = ['/app/login', '/app/verify'];
const NO_SIDEBAR_PATHS = ['/app/onboarding', '/app/getting-started'];

export default function AuthGuard({
  children,
}: {
  children: (showSidebar: boolean) => ReactNode;
}) {
  const { loaded, getToken, getOnboarded } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  const isOnboarding = pathname.startsWith('/app/onboarding');
  const isGettingStarted = pathname.startsWith('/app/getting-started');
  const isNoSidebar = NO_SIDEBAR_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (!loaded) return;

    const token = getToken();
    const onboarded = getOnboarded();
    const wizardComplete = typeof window !== 'undefined' && localStorage.getItem('wizardComplete') === 'true';

    if (!token && !isPublic) {
      router.push('/app/login');
    } else if (token && !onboarded && !isOnboarding && !isPublic) {
      router.push('/app/onboarding');
    } else if (token && onboarded && !wizardComplete && !isGettingStarted && !isOnboarding && !isPublic) {
      router.push('/app/getting-started');
    } else if (token && onboarded && wizardComplete && (isPublic || isOnboarding || isGettingStarted)) {
      router.push('/app/feed');
    }
  }, [loaded, getToken, getOnboarded, pathname, router, isPublic, isOnboarding, isGettingStarted]);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FCFBF8]">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const token = getToken();
  const onboarded = getOnboarded();

  // Don't render protected content without auth
  if (!token && !isPublic) return null;

  // Show sidebar only for authenticated + onboarded + wizard-complete users on main app pages
  const showSidebar = !!token && !!onboarded && !isPublic && !isNoSidebar;

  return <>{children(showSidebar)}</>;
}
