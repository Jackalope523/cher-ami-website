'use client';

import { useGetRecipientQuery, useDeleteRecipientMutation } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import { useRouter, useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

export default function DeleteRecipientPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const showToast = useToast();
  const queryClient = useQueryClient();
  const recipientQuery = useGetRecipientQuery(id);

  const deleteRecipientMutation = useDeleteRecipientMutation(
    async () => {
      await queryClient.invalidateQueries({ queryKey: ['Circle'] });
      showToast('Recipient removed.', ToastType.Success);
      router.push('/app/manage');
    },
    () => showToast('Failed to remove recipient.', ToastType.Error),
  );

  if (recipientQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto px-5 py-10 bg-[#FCFBF8] min-h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-[32px] font-medium text-[#242832] mb-4">Remove recipient?</h1>
        <p className="text-base text-[#242832] mb-2">
          Are you sure you want to remove <span className="font-bold">{recipientQuery.data?.name}</span>?
        </p>
        <p className="text-sm text-[#868581]">
          They will no longer receive a magazine at the end of each month. This action cannot be undone.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => router.back()}
          className="flex-1 py-4 rounded-[14px] border-2 border-[#DEDBD5] text-[#242832] font-medium">
          Cancel
        </button>
        <button
          onClick={() => deleteRecipientMutation.mutate({ Id: id })}
          disabled={deleteRecipientMutation.isPending}
          className="flex-1 py-4 rounded-[14px] bg-red-500 text-white font-medium border-2 border-red-500">
          {deleteRecipientMutation.isPending ? 'Removing...' : 'Remove'}
        </button>
      </div>
    </div>
  );
}
