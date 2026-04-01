'use client';

import { useAddPostMutation } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import PostCounter from '@/app/app/feed/PostCounter';
import { cropImageToAspectRatio, compressImage } from '@/lib/utility';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState, Suspense } from 'react';

function CreatePostContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showToast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageWidth = parseInt(searchParams.get('width') || '372');
  const imageHeight = parseInt(searchParams.get('height') || '259');

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');

  const uploadMutation = useAddPostMutation(
    () => {
      showToast('Upload success!', ToastType.Success);
      router.push('/app/feed');
    },
    () => showToast('Upload failed.', ToastType.Error),
  );

  async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const cropped = await cropImageToAspectRatio(file, imageWidth, imageHeight);
    const compressed = await compressImage(cropped);
    setImageFile(compressed);
    setSelectedImage(URL.createObjectURL(compressed));
  }

  function handlePost() {
    if (!imageFile) return;
    uploadMutation.mutate({
      time: new Date().toISOString(),
      caption,
      imageFile,
      imageWidth,
      imageHeight,
    });
  }

  const buttonDisabled = !selectedImage || uploadMutation.isPending;

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFBF8] max-w-2xl mx-auto">
      <div className="flex-1">
        <PostCounter />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        <div className="px-5 pb-8">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-[32px] overflow-hidden border-2 border-dashed border-[#DEDBD5] hover:border-[#C15F3C] transition-colors"
            style={{ aspectRatio: `${imageWidth}/${imageHeight}` }}>
            {selectedImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#F4F1EA] flex items-center justify-center">
                <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#868581" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
            )}
          </button>
        </div>

        <div className="px-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-[#242832]">Caption</span>
            <span className="text-sm font-semibold text-[#242832]">{caption.length}/200</span>
          </div>
          <textarea
            placeholder="Give your post a caption..."
            maxLength={200}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none resize-none h-24"
          />
        </div>
      </div>

      <div className="p-5">
        <button
          onClick={handlePost}
          disabled={buttonDisabled}
          className={`w-full py-4 rounded-[14px] border-2 text-base font-medium transition-colors ${
            buttonDisabled
              ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
              : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
          }`}>
          {uploadMutation.isPending ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
}

export default function CreatePostPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#FCFBF8]">
        <div className="w-8 h-8 border-4 border-[#C15F3C] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CreatePostContent />
    </Suspense>
  );
}
