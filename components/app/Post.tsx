'use client';

import { useGetSelfQuery, useGetUserQuery, useDeletePostMutation, useReportPostMutation } from '@/lib/hooks';
import { FeedPost } from '@/lib/types/responses';
import { useToast, ToastType } from './ToastProvider';
import { useModal } from './ModalProvider';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import AuthImage from './AuthImage';

export default function Post({ post }: { post: FeedPost }) {
  const userQuery = useGetUserQuery(post.authorId);
  const selfQuery = useGetSelfQuery();
  const { showModal, dismissModal } = useModal();
  const showToast = useToast();
  const queryClient = useQueryClient();

  const deletePostMutation = useDeletePostMutation(
    async () => {
      await queryClient.invalidateQueries({ queryKey: ['FeedPages'] });
      await queryClient.invalidateQueries({ queryKey: ['PostCount'] });
      showToast('Post deleted.', ToastType.Success);
      dismissModal();
    },
    () => showToast('Failed to delete post.', ToastType.Error),
  );

  const reportPostMutation = useReportPostMutation(
    () => {
      showToast('Post reported.', ToastType.Success);
      dismissModal();
    },
    () => showToast('Failed to report post.', ToastType.Error),
  );

  function handlePostMenu() {
    if (post.authorId === selfQuery.data?.id) {
      showModal(
        <div>
          <h3 className="text-lg font-medium text-[#242832] mb-2">Delete post?</h3>
          <p className="text-sm text-[#868581] mb-6">This action cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={dismissModal} className="flex-1 py-3 rounded-xl border-2 border-[#DEDBD5] text-[#242832] font-medium">Cancel</button>
            <button
              onClick={() => deletePostMutation.mutate({ Id: post.id })}
              className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium">
              Delete
            </button>
          </div>
        </div>,
      );
    } else {
      showModal(
        <div>
          <h3 className="text-lg font-medium text-[#242832] mb-2">Report post?</h3>
          <p className="text-sm text-[#868581] mb-6">This post will be reviewed by our team.</p>
          <div className="flex gap-3">
            <button onClick={dismissModal} className="flex-1 py-3 rounded-xl border-2 border-[#DEDBD5] text-[#242832] font-medium">Cancel</button>
            <button
              onClick={() => reportPostMutation.mutate({ Id: post.id })}
              className="flex-1 py-3 rounded-xl bg-[#C15F3C] text-white font-medium">
              Report
            </button>
          </div>
        </div>,
      );
    }
  }

  if (!userQuery.data || !selfQuery.data) return null;

  const aspectRatio =
    (post.imageWidth !== undefined ? post.imageWidth : 372) /
    (post.imageHeight !== undefined ? post.imageHeight : 259);

  return (
    <div>
      <div className="flex items-center justify-between px-5 py-4">
        <Link href={`/app/profile/${post.authorId}`} className="flex items-center gap-4">
          {userQuery.data.avatarUrl ? (
            <AuthImage
              src={userQuery.data.avatarUrl}
              alt="Avatar"
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-[#F4F1EA] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#868581" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
          <span className="text-sm font-semibold text-[#242832]">
            {userQuery.data.firstName} {userQuery.data.lastName}
          </span>
        </Link>

        <button onClick={handlePostMenu} className="p-3 hover:bg-[#F4F1EA] rounded-lg transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#242832" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>

      <div className="mb-4">
        <div className="px-5">
          <AuthImage
            src={post.photoUrl}
            alt="Post photo"
            className="w-full rounded-[32px] object-cover"
            width={372}
            height={Math.round(372 / aspectRatio)}
          />
        </div>

        {post.caption && (
          <div className="px-5 mt-4">
            <p className="text-base text-[#242832]">{post.caption}</p>
          </div>
        )}
      </div>

      <div className="border-t border-[#DEDBD5] mx-5" />
    </div>
  );
}
