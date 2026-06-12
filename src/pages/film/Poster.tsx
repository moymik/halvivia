import { Image } from '@imagekit/next';
import { IMAGEKIT_URL_ENPOINT } from '@/shared/config';

export type PosterProps = {
  posterUrl: string;
  filmName: string;
};

export function Poster({ filmName, posterUrl }: PosterProps) {
  return (
    <Image
      urlEndpoint={IMAGEKIT_URL_ENPOINT} // New prop
      src={posterUrl}
      className={'w-[57vw] md:w-[33vw] lg:w-75'}
      width={301}
      height={389}
      alt={`The ${filmName} poster`}
    />
  );
}

export default Poster;
