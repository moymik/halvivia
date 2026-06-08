import 'server-only';

import { addFilm } from '@/entities/films/api/db';
import { KinopoiskFilm, KinopoiskSearchFIlm } from '@/features/addKinopoiskFilm/model/types';
import {
  KinopoiskFilmSchema,
  KinopoiskSearchFilmSchema,
} from '@/features/addKinopoiskFilm/model/schemas';
import { mapKinopoiskFilmToFilm } from '@/features/addKinopoiskFilm/model/mappers';
import { imagekitClient } from '@/shared/api/imagekit/client';

export async function getKinopoiskFilmById(id: number = 41519): Promise<KinopoiskFilm> {
  try {
    const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': process.env.KINOPOISK_API_PRIVATE_KEY!,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    const result = KinopoiskFilmSchema.safeParse(data);

    if (!result.success) {
      console.error('Invalid KinopoiskFilm:', result.error.issues);
      throw new Error('Kinopoisk API returned invalid data');
    }

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

//переделать через edge handlers? или перенести на клиент, но тогда будет больше перенаправлений или хотебя таймер сделать
export async function addFilmByKinopoiskId(id: number): Promise<void> {
  const kFilm = await getKinopoiskFilmById(id);

  let film = mapKinopoiskFilmToFilm(kFilm);
  let res = null;
  // пытаемся подгрузить постер
  try {
    res = await imagekitClient.files.upload({
      file: film.posterUrl,
      fileName: film.kinopoiskId.toString(),
      folder: '/posters',
    });
    if (typeof res.filePath == 'string') film.posterUrl = res.filePath;
  } catch (err) {
    film = { ...film, posterUrl: 'defaultposter.png' };
    console.log('не вышло загрузить постер');
  }

  console.log(res);
  await addFilm(film);
}
