import { Film } from '@/entities/films/model/types';
import Poster from '@/pages/film/Poster';
import { StarIcon } from '@/shared/ui/icons';
import Description from '@/pages/film/Description';
import Info from '@/pages/film/Info';
import RatingStarButton from '@/features/setRating/ui/RatingStarButton';

type HeroSectionProps = {
  film: Film;
};
function parseAgeLimits(age: string | null) {
  if (!age) return '';
  return age.substring(3) + '+';
}

export function HeroSection({ film }: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <Poster filmName={film.nameRu} posterUrl={film.posterUrl}></Poster>
      <div className="flex h-22 flex-col items-center gap-3">
        <h1 className="font-heading text-text-primary text-center text-2xl leading-6 font-bold">
          {film.nameRu} <br /> ({film.year ? film.year : film.startYear + '-' + film.endYear})
        </h1>

        <p className="text-text-secondary flex flex-row items-center justify-between gap-2.5">
          <span>{film.nameOriginal || film.nameEn}</span>
          <span>{parseAgeLimits(film.ratingAgeLimits)}</span>
          <StarIcon className={'inline w-4'}></StarIcon>
        </p>
      </div>
      <Description description={film.description}></Description>
      <Info
        countries={film.countries ? film.countries.join(',') : ''}
        links={[film.webUrl]}
        length={film.filmLength}
        genres={film.genres}
        additionalInfo={[{ name: 'Слоган', info: film.slogan ? film.slogan : '' }]}
      ></Info>
      <RatingStarButton subject={{ type: 'film', id: film.id }}></RatingStarButton>
    </div>
  );
}

export default HeroSection;
