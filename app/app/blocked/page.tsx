'use client';

import { useBlockedUsersQuery, useUnblockUserMutation } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import { useModal } from '@/components/app/ModalProvider';
import UserItem from '@/components/app/UserItem';
import { useQueryClient } from '@tanstack/react-query';

export default function BlockedUsersPage() {
  const blockedQuery = useBlockedUsersQuery();
  const showToast = useToast();
  const { showModal, dismissModal } = useModal();
  const queryClient = useQueryClient();

  const unblockMutation = useUnblockUserMutation(
    async () => {
      await queryClient.invalidateQueries({ queryKey: ['BlockedUsers'] });
      showToast('User unblocked.', ToastType.Success);
      dismissModal();
    },
    () => showToast('Failed to unblock user.', ToastType.Error),
  );

  function handleUnblock(userId: number, name: string) {
    showModal(
      <div>
        <h3 className="text-lg font-medium text-[#242832] mb-2">Unblock {name}?</h3>
        <p className="text-sm text-[#868581] mb-6">You will see their posts in the feed again.</p>
        <div className="flex gap-3">
          <button onClick={dismissModal} className="flex-1 py-3 rounded-xl border-2 border-[#DEDBD5] text-[#242832] font-medium">Cancel</button>
          <button onClick={() => unblockMutation.mutate({ Id: userId })} className="flex-1 py-3 rounded-xl bg-[#C15F3C] text-white font-medium">Unblock</button>
        </div>
      </div>,
    );
  }

  if (blockedQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto px-5 py-10 bg-[#FCFBF8] min-h-screen">
      <h1 className="text-[32px] font-medium text-[#242832] mb-6">Blocked users</h1>

      {blockedQuery.data?.length === 0 ? (
        <p className="text-base text-[#868581]">No blocked users.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {blockedQuery.data?.map((user) => (
            <UserItem
              key={user.id}
              text={`${user.firstName} ${user.lastName}`}
              imageSource={user.avatarUrl}
              tagRight="Unblock"
              onPress={() => handleUnblock(user.id, user.firstName)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
