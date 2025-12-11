import Image from 'next/image';
import Link from 'next/link';

interface LinkCardProps {
  imageSource: string;
  alt: string;
  title: string;
  href: string;
}

export default function LinkCard({
  imageSource,
  alt,
  title,
  href,
}: LinkCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-y-4 p-8 border-2 border-[#242832] rounded-[1.25rem]">
      <Image src={imageSource} alt={alt} width={48} height={48} />
      <p className="text-[1.25rem] text-[#242832] font-medium">{title}</p>
    </Link>
  );
}
