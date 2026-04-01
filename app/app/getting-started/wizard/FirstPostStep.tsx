'use client';

import { useState, useRef } from 'react';
import { useAddPostMutation } from '@/lib/hooks';
import { useToast, ToastType } from '@/components/app/ToastProvider';
import { cropImageToAspectRatio, compressImage } from '@/lib/utility';

interface FirstPostStepProps {
  recipientName: string | null;
  onNext: (imageUrl: string | null, caption: string) => void;
}

type SubStep = 'pickSize' | 'createPost';

export default function FirstPostStep({ recipientName, onNext }: FirstPostStepProps) {
  const showToast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [subStep, setSubStep] = useState<SubStep>('pickSize');
  const [selectedSize, setSelectedSize] = useState({ width: 372, height: 259 });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

  const addPostMutation = useAddPostMutation(
    () => {
      showToast('Photo added to magazine!', ToastType.Success);
      onNext(imagePreview, caption);
    },
    () => showToast('Failed to add photo.', ToastType.Error),
  );

  function handleSizeSelect(width: number, height: number) {
    setSelectedSize({ width, height });
    setSubStep('createPost');
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const cropped = await cropImageToAspectRatio(file, selectedSize.width, selectedSize.height);
      const compressed = await compressImage(cropped);
      setImageFile(compressed);
      setImagePreview(URL.createObjectURL(compressed));
    } catch {
      showToast('Failed to process image.', ToastType.Error);
    }
  }

  function handleSubmit() {
    if (!imageFile) return;
    addPostMutation.mutate({
      time: new Date().toISOString(),
      caption,
      imageFile,
      imageWidth: selectedSize.width,
      imageHeight: selectedSize.height,
    });
  }

  const heading = recipientName
    ? `Add your first photo for ${recipientName}'s magazine`
    : 'Add your first photo';

  if (subStep === 'pickSize') {
    return (
      <div className="flex flex-col pt-6">
        <h1 className="text-[32px] font-medium text-[#242832] mb-3">{heading}</h1>
        <p className="text-base text-[#868581] mb-8">Choose a format for your photo.</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSizeSelect(372, 259)}
            className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-[#DEDBD5] hover:border-[#C15F3C] transition-colors">
            <div className="w-full aspect-[372/259] bg-[#F4F1EA] rounded-xl flex items-center justify-center max-w-[260px]">
              <span className="text-[#868581] text-sm">Wide</span>
            </div>
          </button>

          <button
            onClick={() => handleSizeSelect(372, 372)}
            className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-[#DEDBD5] hover:border-[#C15F3C] transition-colors">
            <div className="w-44 aspect-square bg-[#F4F1EA] rounded-xl flex items-center justify-center">
              <span className="text-[#868581] text-sm">Square</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-6">
      <h1 className="text-[32px] font-medium text-[#242832] mb-3">{heading}</h1>
      <p className="text-base text-[#868581] mb-6">This will appear in next month&apos;s issue.</p>

      {/* Image upload */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full rounded-2xl border-2 border-dashed border-[#DEDBD5] hover:border-[#C15F3C] transition-colors overflow-hidden mb-6"
        style={{ aspectRatio: `${selectedSize.width}/${selectedSize.height}` }}>
        {imagePreview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imagePreview} alt="Selected photo" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#F4F1EA] flex flex-col items-center justify-center gap-2">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#868581" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span className="text-sm text-[#868581]">Tap to select a photo</span>
          </div>
        )}
      </button>

      {/* Caption */}
      <div className="relative mb-6">
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value.slice(0, 200))}
          placeholder="Add a caption (optional)"
          rows={3}
          className="w-full px-4 py-3 rounded-xl border-2 border-[#DEDBD5] bg-[#FCFBF8] text-[#242832] text-base placeholder-[#868581] focus:border-[#C15F3C] focus:outline-none resize-none"
        />
        <span className="absolute bottom-3 right-3 text-xs text-[#868581]">{caption.length}/200</span>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!imageFile || addPostMutation.isPending}
        className={`w-full py-4 rounded-[14px] border-2 text-base font-medium transition-colors ${
          !imageFile || addPostMutation.isPending
            ? 'bg-[#ECEDEF] border-[#ECEDEF] text-[#A8ABB3]'
            : 'bg-[#C15F3C] border-[#C15F3C] text-white hover:bg-[#a8512f]'
        }`}>
        {addPostMutation.isPending ? 'Adding...' : 'Add to Magazine'}
      </button>

      <button
        onClick={() => setSubStep('pickSize')}
        className="mt-3 text-sm text-[#868581] hover:text-[#242832] transition-colors">
        ← Change format
      </button>
    </div>
  );
}
