import NextImage, { type ImageProps } from 'next/image';
import { Image as ImageKitImage } from '@imagekit/next';
import { IMAGEKIT_URL_ENPOINT } from '@/shared/config/constraints';
import { isImageKitUrl } from '@/shared/lib/imagekit';

export type CoverImageProps = Omit<ImageProps, 'src'> & {
  src: string;
};

// Обложки из ImageKit ресайзит CDN (?tr=w-…). Внешние ссылки, которые ещё не перенесены
// в ImageKit, по-прежнему идут через оптимизатор Next.
export function CoverImage({ src, ...props }: CoverImageProps) {
  if (isImageKitUrl(src)) {
    return <ImageKitImage urlEndpoint={IMAGEKIT_URL_ENPOINT} src={src} {...props} />;
  }

  return <NextImage src={src} {...props} />;
}

export default CoverImage;
