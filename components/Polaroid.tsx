import Image, { StaticImageData } from 'next/image';

type Props = {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  priority?: boolean;
  /** Optional seed for deterministic random rotation. Defaults to 0. */
  seed?: number;
  /** How the image fills the frame. Defaults to 'cover'. Use 'contain' for illustrations. */
  objectFit?: 'cover' | 'contain';
};

/**
 * Simple seeded random for deterministic rotations across renders.
 * Returns a number between -1 and 1.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return (x - Math.floor(x)) * 2 - 1;
}

export default function Polaroid({
  src,
  alt,
  className = '',
  priority = false,
  seed = 0,
  objectFit = 'cover',
}: Props) {
  // Front polaroid rotation: -2 to 2 degrees
  const frontRotation = seededRandom(seed) * 2;
  // Back card: always opposite direction from front, 2-6 degrees away
  const backMagnitude = 2 + Math.abs(seededRandom(seed + 50)) * 4;
  const backRotation = frontRotation >= 0
    ? frontRotation - backMagnitude
    : frontRotation + backMagnitude;

  return (
    <div className={`relative flex-shrink-0 z-10 ${className}`}>
      {/* Stacked card behind — uses inset-0 so it matches wrapper size */}
      <div
        className="absolute inset-0 bg-[#DEDBD5] rounded-[8px] shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
        style={{ transform: `rotate(${backRotation}deg)` }}
      />
      {/* Front polaroid — fills wrapper via w-full h-full */}
      <div
        className="relative w-full h-full"
        style={{ transform: `rotate(${frontRotation}deg)` }}>
        <div className="w-full h-full bg-[#F5F1EA] rounded-[8px] p-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className={`relative w-full h-full overflow-hidden rounded-[1px] ${objectFit === 'contain' ? 'bg-[#F4F1EA]' : ''}`}>
            <Image
              src={src}
              alt={alt}
              className={objectFit === 'cover' ? 'object-cover' : 'object-contain p-3'}
              fill
              sizes="(max-width: 768px) 248px, 408px"
              priority={priority}
            />
            {/* Subtle vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.08)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
