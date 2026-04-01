'use client';

import AuthProvider from '@/lib/auth-context';
import APIProvider from '@/lib/api-context';
import Sidebar from '@/components/app/Sidebar';
import ToastProvider from '@/components/app/ToastProvider';
import ModalProvider from '@/components/app/ModalProvider';
import AuthGuard from '@/components/app/AuthGuard';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <APIProvider>
        <ToastProvider>
          <ModalProvider>
            <AuthGuard>
              {(showSidebar) => (
                <div className="flex min-h-screen bg-[#FCFBF8] overflow-x-hidden">
                  {showSidebar && <Sidebar />}
                  <main className="flex-1 min-w-0">
                    {children}
                  </main>
                </div>
              )}
            </AuthGuard>
          </ModalProvider>
        </ToastProvider>
      </APIProvider>
    </AuthProvider>
  );
}
