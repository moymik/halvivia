import { getFilmGenres } from '@/entities/films/api/api';
import FilterDropdownClient from '@/pages/cinema/ui/FilterDropdownClient';

export type FilterDropdownProps = {
  className?: string;
};

export async function FilterDropdown({}: FilterDropdownProps) {
  const result = await getFilmGenres();

  return <FilterDropdownClient genresResult={result}></FilterDropdownClient>;
}

export default FilterDropdown;
