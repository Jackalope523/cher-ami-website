'use client';

import { useGetUserQuery, useGetSelfQuery, useBlockUserMutation, useUnblockUserMutation, useBlockedUsersQuery } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import { useModal } from '@/components/app/ModalProvider';
import AuthImage from '@/components/app/AuthImage';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

export default function ProfilePage() {
  const params = useParams();
  const id = Number(params.id);
  const router = useRouter();
  const showToast = useToast();
  const { showModal, dismissModal } = useModal();
  const queryClient = useQueryClient();
  const userQuery = useGetUserQuery(id);
  const selfQuery = useGetSelfQuery();
  const blockedQuery = useBlockedUsersQuery();

  const isSelf = selfQuery.data?.id === id;
  const isBlocked = blockedQuery.data?.some((u) => u.id === id) ?? false;

  const blockMutation = useBlockUserMutation(
    async () => {
      await queryClient.invalidateQueries({ queryKey: ['BlockedUsers'] });
      showToast('User blocked.', ToastType.Success);
      dismissModal();
    },
    () => showToast('Failed to block user.', ToastType.Error),
  );

  const unblockMutation = useUnblockUserMutation(
    async () => {
      await queryClient.invalidateQueries({ queryKey: ['BlockedUsers'] });
      showToast('User unblocked.', ToastType.Success);
      dismissModal();
    },
    () => showToast('Failed to unblock user.', ToastType.Error),
  );

  function handleBlock() {
    showModal(
      <div>
        <h3 className="text-lg font-medium text-[#242832] mb-2">Block {userQuery.data?.firstName}?</h3>
        <p className="text-sm text-[#868581] mb-6">You will no longer see their posts in the feed.</p>
        <div className="flex gap-3">
          <button onClick={dismissModal} className="flex-1 py-3 rounded-xl border-2 border-[#DEDBD5] text-[#242832] font-medium">Cancel</button>
          <button onClick={() => blockMutation.mutate({ Id: id })} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium">Block</button>
        </div>
      </div>,
    );
  }

  function handleUnblock() {
    showModal(
      <div>
        <h3 className="text-lg font-medium text-[#242832] mb-2">Unblock {userQuery.data?.firstName}?</h3>
        <p className="text-sm text-[#868581] mb-6">You will see their posts in the feed again.</p>
        <div className="flex gap-3">
          <button onClick={dismissModal} className="flex-1 py-3 rounded-xl border-2 border-[#DEDBD5] text-[#242832] font-medium">Cancel</button>
          <button onClick={() => unblockMutation.mutate({ Id: id })} className="flex-1 py-3 rounded-xl bg-[#C15F3C] text-white font-medium">Unblock</button>
        </div>
      </div>,
    );
  }

  if (userQuery.isLoading || selfQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!userQuery.data) return null;

  return (
    <div className="max-w-sm mx-auto px-5 py-10 bg-[#FCFBF8] min-h-screen">
      <div className="flex flex-col items-center mb-8">
        {userQuery.data.avatarUrl ? (
          <AuthImage
            src={userQuery.data.avatarUrl}
            alt="Avatar"
            className="h-24 w-24 rounded-full object-cover mb-4"
          />
        ) : (
          <div className="h-24 w-24 rounded-full bg-[#F4F1EA] flex items-center justify-center mb-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#868581" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        )}
        <h1 className="text-2xl font-medium text-[#242832]">
          {userQuery.data.firstName} {userQuery.data.lastName}
        </h1>
        <p className="text-sm text-[#868581] mt-1">
          Joined {new Date(userQuery.data.joinDate).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      {isSelf ? (
        <button
          onClick={() => router.push('/app/profile/edit')}
          className="w-full py-3 rounded-xl border-2 border-[#B05637] text-[#B05637] font-medium">
          Edit Profile
        </button>
      ) : (
        <button
          onClick={isBlocked ? handleUnblock : handleBlock}
          className={`w-full py-3 rounded-xl border-2 font-medium ${
            isBlocked ? 'border-[#B05637] text-[#B05637]' : 'border-red-500 text-red-500'
          }`}>
          {isBlocked ? 'Unblock' : 'Block'}
        </button>
      )}
    </div>
  );
}
