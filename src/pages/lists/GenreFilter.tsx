import { getFilmGenres } from '@/entities/films/api/api';
import FilterDropdownClient from '@/pages/cinema/ui/FilterDropdownClient';

export async function GenreFilter() {
  const res = await getFilmGenres();
  if (!res.success) return <>Не удалось загрузить жанры</>;
  return <FilterDropdownClient genresResult={res}></FilterDropdownClient>;
}

export default GenreFilter;
