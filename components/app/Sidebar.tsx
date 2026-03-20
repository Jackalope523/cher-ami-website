'use client';

import { useAuth } from '@/lib/auth-context';
import { useGetCircleQuery, useGetSelfQuery } from '@/lib/hooks';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthImage from './AuthImage';

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const selfQuery = useGetSelfQuery();
  const circleQuery = useGetCircleQuery();
  const { deleteToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    deleteToken();
    router.push('/app/login');
  }

  function isActive(path: string) {
    return pathname === path || pathname.startsWith(path + '/');
  }

  const navItems = [
    { label: 'My Feed', href: '/app/feed', icon: feedIcon, enabled: true },
    { label: 'My Circle', href: '/app/manage', icon: circleIcon, enabled: !!circleQuery.data },
    { label: 'Settings', href: '/app/settings', icon: settingsIcon, enabled: true },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between py-6">
      <div>
        {selfQuery.data && (
          <Link
            href={`/app/profile/${selfQuery.data.id}`}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-4 px-6 mb-8">
            {selfQuery.data.avatarUrl ? (
              <AuthImage
                src={selfQuery.data.avatarUrl}
                alt="Avatar"
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-[#F4F1EA] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#868581" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
            <span className="text-lg font-medium text-[#242832]">
              {selfQuery.data.firstName} {selfQuery.data.lastName}
            </span>
          </Link>
        )}

        <nav className="flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.enabled ? item.href : '#'}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-6 py-4 text-base font-medium transition-colors ${
                isActive(item.href) ? 'text-[#C15F3C] bg-[#F4F1EA]' : item.enabled ? 'text-[#B05637] hover:bg-[#F4F1EA]' : 'text-[#868581] pointer-events-none'
              }`}>
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex flex-col">
        <a
          href="/help"
          target="_blank"
          className="flex items-center gap-2 px-6 py-4 text-base font-medium text-[#B05637] hover:bg-[#F4F1EA]">
          {helpIcon}
          Help
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-4 text-base font-medium text-[#B05637] hover:bg-[#F4F1EA] w-full text-left">
          {logoutIcon}
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#FCFBF8] shadow-md"
        onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? closeIcon : menuIcon}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#FCFBF8] border-r border-[#DEDBD5] z-40 transition-transform duration-200 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-0`}>
        {sidebarContent}
      </aside>
    </>
  );
}

const feedIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const circleIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const settingsIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const helpIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" />
  </svg>
);

const logoutIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const menuIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#242832" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const closeIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#242832" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
