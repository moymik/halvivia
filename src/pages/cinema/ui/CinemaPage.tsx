'use client';

import { getFilmByIdAction } from '@/entities/films/model/actions';
import { addKinopoiskFilmAction } from '@/features/addKinopoiskFilm/api/actions';

export function CinemaPage() {
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={async () => {
          const film = await getFilmByIdAction('e464a2fd-561d-4ffe-8660-407b82cb11c3');
          console.log('getFilmById', film);
        }}
      >
        получить фильм по id{' '}
      </button>
      <button
        onClick={async () => {
          const film = await addKinopoiskFilmAction(301);
          console.log('getFilmById', film);
        }}
      >
        добавить кинопоиск фильм по айди
      </button>
    </div>
  );
}

export default CinemaPage;
