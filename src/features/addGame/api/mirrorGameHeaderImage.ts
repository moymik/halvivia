import 'server-only';

import { revalidateTag } from 'next/cache';
import { setGameHeaderImage } from '@/entities/games/api/db';
import type { Game } from '@/entities/games/model/types';
import { uploadRemoteImage } from '@/shared/api/imagekit/uploadRemoteImage';
import { cacheTags } from '@/shared/lib/cache';
import { isImageKitUrl } from '@/shared/lib/imagekit';

// Картинки Steam при первой оптимизации отдаются до нескольких секунд, поэтому храним копию в ImageKit (CDN).
// Вызывается через after(): пользователь не ждёт загрузку, до её окончания работает исходная ссылка.
export async function mirrorGameHeaderImage(game: Game): Promise<void> {
  if (!game.headerImage || isImageKitUrl(game.headerImage)) {
    return;
  }

  try {
    const url = await uploadRemoteImage({
      url: game.headerImage,
      folder: '/games',
      fileName: game.id,
    });

    if (!url) {
      return;
    }

    await setGameHeaderImage(game.id, url);

    revalidateTag(cacheTags.catalog('game'), 'max');
    revalidateTag(cacheTags.subject({ type: 'game', id: game.id }), 'max');
  } catch (error) {
    console.error('Failed to mirror game header image', { gameId: game.id, error });
  }
}
