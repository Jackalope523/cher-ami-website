'use client';

import { useGetCircleQuery } from '@/lib/hooks';
import FeedContents from '@/components/app/FeedContents';
import JoinOrCreateCircle from '@/components/app/JoinOrCreateCircle';

export default function FeedPage() {
  const circleQuery = useGetCircleQuery();

  if (circleQuery.isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#868581]">Something went wrong. Please try again.</p>
      </div>
    );
  }

  if (circleQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!circleQuery.data) {
    return <JoinOrCreateCircle />;
  }

  return (
    <div>
      <div className="px-5 pt-6 pb-2 lg:pl-6">
        <h1 className="text-2xl font-medium text-[#C15F3C]" style={{ fontFamily: 'Damion, cursive' }}>
          {circleQuery.data.title}
        </h1>
      </div>
      <FeedContents />
    </div>
  );
}
