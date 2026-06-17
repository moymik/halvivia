import { FilmSearchByKeywordItem } from '@/features/addKinopoiskFilm/model/types';
import { addKinopoiskFilmAction } from '@/features/addKinopoiskFilm/api/actions';
import { Icon } from '@/shared/ui/icon';
import Image from 'next/image';

export type FilmPreviewProps = {
  film: FilmSearchByKeywordItem;
};

export function FilmPreview({ film }: FilmPreviewProps) {
  return (
    <div className="hover:bg-bg-gray-100 flex items-center gap-3 rounded-md border p-2">
      {/* Poster */}
      <img
        src={film.posterUrlPreview}
        alt={'Постер' + film.nameRu}
        className="h-16 w-12 rounded object-cover"
      />

      {/* Info */}
      <div className="flex flex-1 flex-col items-start gap-1">
        <h3 className="line-clamp-1 text-sm font-medium">{film.nameRu}</h3>

        {/* Secondary title */}
        {(film.nameEn || film.nameOriginal) && (
          <p className="line-clamp-1 text-xs text-gray-500">{film.nameEn || film.nameOriginal}</p>
        )}
        {/* Rating */}

        {film.rating !== 'null' && film.rating && (
          <span className="text-xs">
            <Image
              src="/kinopoisk-logo.png"
              width={14}
              height={14}
              alt={'kinopoisk logo'}
              className={'border-r-3.5 inline'}
            />

            {film.rating}
          </span>
        )}
      </div>

      {/* Action */}
      <button onClick={() => addKinopoiskFilmAction(film.filmId)}>
        <Icon name={'AddIcon'} className={'text-primary'}></Icon>
      </button>
    </div>
  );
}

export default FilmPreview;
