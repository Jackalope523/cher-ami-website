'use client';

import { useGetCircleQuery, useUpdateCircleMutation } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import AuthImage from '@/components/app/AuthImage';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';

export default function CircleEditPage() {
  const router = useRouter();
  const circleQuery = useGetCircleQuery();
  const showToast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [headerPreview, setHeaderPreview] = useState<string | null>(null);

  useEffect(() => {
    if (circleQuery.data) {
      setTitle(circleQuery.data.title); // eslint-disable-line react-hooks/set-state-in-effect -- syncing server data
    }
  }, [circleQuery.data]);

  const updateCircleMutation = useUpdateCircleMutation(
    () => {
      showToast('Circle updated!', ToastType.Success);
      router.push('/app/manage');
    },
    () => showToast('Failed to update circle.', ToastType.Error),
  );

  function handleHeaderSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setHeaderFile(file);
      setHeaderPreview(URL.createObjectURL(file));
    }
  }

  function handleSave() {
    updateCircleMutation.mutate({ title, headerFile });
  }

  if (circleQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto px-5 py-10 bg-[#FCFBF8] min-h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-[32px] font-medium text-[#242832] mb-6">Edit circle</h1>

        <label className="text-sm font-semibold text-[#242832] mb-2 block">Circle name</label>
        <input
          type="text"
          maxLength={100}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-4 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none mb-6"
        />

        <label className="text-sm font-semibold text-[#242832] mb-2 block">Header image</label>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleHeaderSelect} className="hidden" />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-[2/1] rounded-[32px] overflow-hidden border-2 border-dashed border-[#DEDBD5] hover:border-[#C15F3C] transition-colors mb-4">
          {headerPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={headerPreview} alt="Header preview" className="w-full h-full object-cover" />
          ) : circleQuery.data?.headerUrl ? (
            <AuthImage src={circleQuery.data.headerUrl} alt="Current header" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#F4F1EA] flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#868581" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
          )}
        </button>
      </div>

      <button
        onClick={handleSave}
        disabled={!title || updateCircleMutation.isPending}
        className={`w-full py-4 rounded-[14px] border-2 text-base font-medium transition-colors ${
          !title || updateCircleMutation.isPending
            ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
            : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
        }`}>
        {updateCircleMutation.isPending ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}
