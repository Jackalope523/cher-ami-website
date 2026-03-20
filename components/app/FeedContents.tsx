'use client';

import { useFeedPostsInfiniteQuery, useGetCircleQuery, useGetSelfQuery, useGetPaymentMethodQuery } from '@/lib/hooks';
import { useToast, ToastType } from './ToastProvider';
import { mapDateToText } from '@/lib/utility';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Post from './Post';
import PostCounter from './PostCounter';

export default function FeedContents() {
  const { data, status, fetchNextPage, hasNextPage } = useFeedPostsInfiniteQuery();
  const circleQuery = useGetCircleQuery();
  const userQuery = useGetSelfQuery();
  const getPaymentMethodQuery = useGetPaymentMethodQuery();
  const showToast = useToast();
  const router = useRouter();
  const [hideBanner, setHideBanner] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Infinite scroll observer
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  // Auto-fetch if too few posts
  useEffect(() => {
    if (data) {
      for (const page of data.pages) {
        if (page.posts.length >= 2) return;
      }
      fetchNextPage();
    }
  }, [data, fetchNextPage]);

  function handleAddRecipient() {
    if (getPaymentMethodQuery.data || userQuery.data?.isBillingExempt) {
      router.push('/app/circle/recipients/add');
    } else {
      router.push('/app/billing/add');
    }
  }

  function handleCreatePost() {
    if (data?.pages[0].posts.length === 20) {
      showToast("This month's issue is complete!", ToastType.Informational);
    } else {
      router.push('/app/post/pick-size');
    }
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#868581]">Something went wrong. Please try again.</p>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="relative min-h-screen bg-[#FCFBF8]">
      <div className="max-w-2xl mx-auto pb-24">
        <PostCounter issueTitle={data.pages[0].issueTitle} />

        {/* No recipients banner */}
        {circleQuery.data?.recipients.length === 0 && !hideBanner && (
          <div className="mx-5 mb-4 p-5 bg-gradient-to-br from-[#FFF3ED] to-[#FFE8DB] rounded-[20px] border border-[#DEDBD5] relative">
            <button
              onClick={() => setHideBanner(true)}
              className="absolute top-4 right-4 text-[#868581] hover:text-[#242832]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </button>
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-[#242832] mb-2">Who is this magazine for?</h3>
              <p className="text-base text-[#242832] mb-6">
                You haven&apos;t added a recipient yet. Add an address so we can mail these memories to your loved ones at the end of the month!
              </p>
              <button
                onClick={handleAddRecipient}
                className="px-4 py-3 bg-[#C15F3C] text-white font-medium rounded-[14px] border-2 border-[#C15F3C]">
                Add recipient
              </button>
            </div>
          </div>
        )}

        {/* Empty state or full state banners */}
        {data.pages[0].posts.length === 0 && (
          <div className="mx-5 mb-4 flex items-center justify-between bg-[#9AD47C] rounded-[20px] px-5 py-2">
            <h3 className="text-base font-medium text-[#242832]">Be the first to upload to this month&apos;s issue!</h3>
          </div>
        )}
        {data.pages[0].posts.length === 20 && (
          <div className="mx-5 mb-4 flex items-center justify-between bg-[#9AD47C] rounded-[20px] px-5 py-2">
            <h3 className="text-base font-medium text-[#242832]">This month&apos;s issue is full!</h3>
          </div>
        )}

        {/* Posts by issue */}
        {data.pages.map((page, pageIndex) => (
          <div key={page.id ?? pageIndex}>
            {/* Issue header (skip for current issue) */}
            {page.issueTitle && page.issueDate && data.pages[0].id !== page.id && (
              <div className="px-5 mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-[#242832]">{page.issueTitle}</span>
                  <span className="text-xs font-medium text-[#868581]">
                    {new Date(page.issueDate).toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })}
                  </span>
                </div>
                <div className="flex justify-center mb-4">
                  <span className="px-3 py-1 rounded-xl bg-[#F4F1EA] text-xs font-medium text-[#242832]">
                    {mapDateToText(new Date(page.issueDate))}
                  </span>
                </div>
              </div>
            )}

            {/* Empty issue state */}
            {page.posts.length === 0 && data.pages[0].id !== page.id && (
              <div className="flex flex-col items-center py-20">
                <p className="text-2xl text-[#242832]" style={{ fontFamily: 'Damion, cursive' }}>Nothing to see here :(</p>
              </div>
            )}

            {/* Current issue empty state */}
            {page.posts.length === 0 && data.pages[0].id === page.id && data.pages.length === 1 && (
              <div className="flex flex-col items-center py-20">
                <p className="text-2xl text-[#242832]" style={{ fontFamily: 'Damion, cursive' }}>Nothing to see here :(</p>
              </div>
            )}

            {page.posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        ))}

        {/* Infinite scroll sentinel */}
        <div ref={sentinelRef} className="h-10" />
      </div>

      {/* FAB create post button */}
      <button
        onClick={handleCreatePost}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#C15F3C] rounded-[20px] flex items-center justify-center shadow-lg hover:bg-[#a8512f] transition-colors z-10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}
