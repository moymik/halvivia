import { Genre } from '@/entities/films/model/types';

export type InfoObject = {
  name: string;
  info: string;
};
export type InfoProps = {
  countries: string;
  genres?: Genre[];
  length: number | null;
  links: string[];
  additionalInfo: InfoObject[]; /// пример [{name: 'Актеры', info:'Уилл Смит, Марго Робби' }]
};

function stringFromGenres(genres: Genre[]) {
  let result = '';
  genres.forEach((genre, i) => {
    if (i === genres.length - 1) {
      result = result + ' ' + genre.genre;
    } else result = result + ' ' + genre.genre + ' ,';
  });
  return result;
}

///TODO:
export function Info({ countries, genres, length, additionalInfo }: InfoProps) {
  return (
    <ul className={'flex w-full flex-col'}>
      <li key="Страна">
        <span>Страна:</span> <span>{countries}</span>
      </li>
      {!genres ? (
        ''
      ) : (
        <li key="Жанр">
          <span>Жанр:</span> <span>{stringFromGenres(genres)}</span>
        </li>
      )}
      {!length ? (
        ''
      ) : (
        <li key="Продолжительность">
          <span>Продолжительность:</span> <span>{length}</span>
        </li>
      )}
      {additionalInfo
        ? additionalInfo.map(({ name, info }) => (
            <li key={name}>
              <span>{name}:</span> <span>{info}</span>
            </li>
          ))
        : ''}
    </ul>
  );
}

export default Info;
