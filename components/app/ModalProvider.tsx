'use client';

import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface ModalContextType {
  showModal: (content: ReactNode) => void;
  dismissModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
};

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode | null>(null);

  const showModal = useCallback((node: ReactNode) => {
    setContent(node);
  }, []);

  const dismissModal = useCallback(() => {
    setContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, dismissModal }}>
      {children}
      {content && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) dismissModal();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') dismissModal();
          }}>
          <div className="bg-[#FCFBF8] rounded-2xl p-6 mx-4 max-w-md w-full shadow-xl">
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
