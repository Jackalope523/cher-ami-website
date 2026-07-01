'use client';

import StartWizard from '@/components/StartWizard';

export default function StartClient() {
  return (
    <div className="flex flex-col items-center w-full max-w-[960px] mx-auto px-5 pt-6 pb-20">
      <StartWizard layout="page" />
    </div>
  );
}
