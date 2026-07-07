import { Image } from '@imagekit/next';
import { IMAGEKIT_URL_ENPOINT } from '@/shared/config';
import { cn } from '@/shared';

export type PosterProps = {
  posterUrl: string;
  filmName: string;
  className?: string;
};

export function Poster({ filmName, posterUrl, className = '' }: PosterProps) {
  return (
    <Image
      urlEndpoint={IMAGEKIT_URL_ENPOINT} // New prop
      src={posterUrl}
      className={cn('w-[57vw] md:w-[33vw] lg:w-75', className)}
      width={301}
      height={389}
      alt={`The ${filmName} poster`}
    />
  );
}

export default Poster;
