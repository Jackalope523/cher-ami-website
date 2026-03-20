'use client';

import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Informational = 'info',
  Alert = 'alert',
}

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const ToastContext = createContext<((message: string, type: ToastType) => void) | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

let toastId = 0;

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const bgColor: Record<ToastType, string> = {
    [ToastType.Success]: 'bg-green-500',
    [ToastType.Error]: 'bg-red-500',
    [ToastType.Informational]: 'bg-blue-500',
    [ToastType.Alert]: 'bg-yellow-500',
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${bgColor[toast.type]} text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in min-w-[200px] text-center`}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
