'use client';

import { usePostCountQuery } from '@/lib/hooks';

export default function PostCounter({ issueTitle }: { issueTitle?: string | null }) {
  const postCountQuery = usePostCountQuery();
  const count = postCountQuery.data ?? 0;

  return (
    <div className="px-5 py-4">
      {issueTitle && (
        <p className="text-sm font-medium text-[#242832] mb-1">{issueTitle}</p>
      )}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-[#F4F1EA] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C15F3C] rounded-full transition-all duration-300"
            style={{ width: `${Math.min((count / 20) * 100, 100)}%` }}
          />
        </div>
        <span className="text-xs font-medium text-[#868581] whitespace-nowrap">{count}/20</span>
      </div>
    </div>
  );
}
