'use client';

import { useRouter } from 'next/navigation';

export default function PickSizePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-[#FCFBF8] max-w-sm mx-auto">
      <h1 className="text-[32px] font-medium text-[#242832] mb-2">Choose a format</h1>
      <p className="text-base text-[#868581] mb-10 text-center">Select the aspect ratio for your post image.</p>

      <div className="flex flex-col gap-6 w-full">
        <button
          onClick={() => router.push('/app/post/create?width=372&height=259')}
          className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-[#DEDBD5] hover:border-[#C15F3C] transition-colors">
          <div className="w-full aspect-[372/259] bg-[#F4F1EA] rounded-xl flex items-center justify-center max-w-[280px]">
            <span className="text-[#868581] text-sm">Wide (372 x 259)</span>
          </div>
          <span className="text-base font-medium text-[#242832]">Wide</span>
        </button>

        <button
          onClick={() => router.push('/app/post/create?width=372&height=372')}
          className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-[#DEDBD5] hover:border-[#C15F3C] transition-colors">
          <div className="w-48 aspect-square bg-[#F4F1EA] rounded-xl flex items-center justify-center">
            <span className="text-[#868581] text-sm">Square (1:1)</span>
          </div>
          <span className="text-base font-medium text-[#242832]">Square</span>
        </button>
      </div>
    </div>
  );
}
