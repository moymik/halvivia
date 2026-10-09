import 'server-only';

import { revalidateTag } from 'next/cache';
import { setBookThumbnailUrl } from '@/entities/books/api/db';
import type { Book } from '@/entities/books/model/types';
import { uploadRemoteImage } from '@/shared/api/imagekit/uploadRemoteImage';
import { cacheTags } from '@/shared/lib/cache';
import { isImageKitUrl } from '@/shared/lib/imagekit';

// Обложки OpenLibrary отдаются по 4–5 секунд, поэтому храним копию в ImageKit (CDN).
// Вызывается через after(): пользователь не ждёт загрузку, до её окончания работает исходная ссылка.
export async function mirrorBookCover(book: Book): Promise<void> {
  if (!book.thumbnailUrl || isImageKitUrl(book.thumbnailUrl)) {
    return;
  }

  try {
    const url = await uploadRemoteImage({
      url: book.thumbnailUrl,
      folder: '/books',
      fileName: book.id,
    });

    if (!url) {
      return;
    }

    await setBookThumbnailUrl(book.id, url);

    revalidateTag(cacheTags.catalog('book'), 'max');
    revalidateTag(cacheTags.subject({ type: 'book', id: book.id }), 'max');
    revalidateTag('activity-feed', 'max');
  } catch (error) {
    console.error('Failed to mirror book cover', { bookId: book.id, error });
  }
}
