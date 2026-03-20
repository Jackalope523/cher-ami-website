'use client';

import AuthImage from './AuthImage';

interface UserItemProps {
  text: string;
  imageSource: string | null;
  tagLeft?: string;
  tagRight?: string;
  onPress?: () => void;
}

export default function UserItem({ text, imageSource, tagLeft, tagRight, onPress }: UserItemProps) {
  const content = (
    <div className="flex items-center gap-4">
      {imageSource ? (
        <AuthImage src={imageSource} alt={text} className="h-12 w-12 rounded-full object-cover flex-shrink-0" />
      ) : (
        <div className="h-12 w-12 rounded-full bg-[#F4F1EA] flex items-center justify-center flex-shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#868581" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-base font-medium text-[#242832] truncate">{text}</span>
        {tagLeft && <span className="text-sm text-[#868581]">{tagLeft}</span>}
      </div>
      {tagRight && <span className="text-sm text-[#B05637] font-medium">{tagRight}</span>}
    </div>
  );

  if (onPress) {
    return (
      <button onClick={onPress} className="w-full text-left hover:bg-[#F4F1EA] rounded-xl p-2 -m-2 transition-colors">
        {content}
      </button>
    );
  }

  return <div className="p-2 -m-2">{content}</div>;
}
