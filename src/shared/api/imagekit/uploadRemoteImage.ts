import 'server-only';

import { imagekitClient } from './client';

// Те же источники обложек, что разрешены в images.remotePatterns (next.config.ts).
const ALLOWED_HOSTS = new Set([
  'books.google.com',
  'covers.openlibrary.org',
  'shared.akamai.steamstatic.com',
  'store.akamai.steamstatic.com',
  'cdn.akamai.steamstatic.com',
  'cdn.cloudflare.steamstatic.com',
]);

function isAllowedRemoteImage(url: string) {
  try {
    const { protocol, hostname } = new URL(url);

    return protocol === 'https:' && ALLOWED_HOSTS.has(hostname);
  } catch {
    return false;
  }
}

type UploadRemoteImageParams = {
  url: string;
  folder: '/books' | '/games';
  fileName: string;
};

/**
 * Копирует внешнюю картинку в ImageKit (скачивает сам ImageKit) и возвращает её полный URL.
 * При ошибке возвращает null: вызывающий код оставляет исходную ссылку.
 */
export async function uploadRemoteImage({
  url,
  folder,
  fileName,
}: UploadRemoteImageParams): Promise<string | null> {
  if (!isAllowedRemoteImage(url)) {
    return null;
  }

  try {
    const result = await imagekitClient.files.upload({ file: url, fileName, folder });

    return typeof result.url === 'string' ? result.url : null;
  } catch (error) {
    console.error('ImageKit upload failed', { url, error });

    return null;
  }
}
