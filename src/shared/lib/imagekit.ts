import { IMAGEKIT_URL_ENPOINT } from '@/shared/config/constraints';

export function isImageKitUrl(url: string) {
  return url.startsWith(`${IMAGEKIT_URL_ENPOINT}/`);
}
