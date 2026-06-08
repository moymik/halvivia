'use server';

import { addFilmByKinopoiskId } from '@/features/addKinopoiskFilm/api/api';

export async function addKinopoiskFilmAction(id: number = 41519) {
  try {
    await addFilmByKinopoiskId(id);
    return {
      success: true,
    } as const;
  } catch (err) {
    console.error(err);

    return {
      success: false,
      error: 'FAILED_TO_CREATE_FILM',
    } as const;
  }
}
