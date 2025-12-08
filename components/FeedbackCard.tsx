import Image, { StaticImageData } from 'next/image';

interface FeedbackCardProps {
  text: string;
  image: StaticImageData;
  name: string;
}

export default function FeedbackCard({ text, image, name }: FeedbackCardProps) {
  return (
    <div className="bg-[#F4F1EA] rounded-3xl p-5 w-[300px] flex flex-col">
      <p className="text-[16px] text-[#242832] font-normal">{text}</p>

      <div className="flex flex-row items-center gap-x-2 mt-5">
        <Image
          src={image}
          alt={name}
          width={48}
          height={48}
          className="rounded-full"
        />
        <p className="text-[16px] text-[#242832] font-semibold">{name}</p>
      </div>
    </div>
  );
}
