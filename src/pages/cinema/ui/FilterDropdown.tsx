import { getFilmGenresAction } from '@/entities/films/api/actions';
import FilterDropdownClient from '@/pages/cinema/ui/FilterDropdownClient';

export type FilterDropdownProps = {
  className?: string;
};

export async function FilterDropdown({}: FilterDropdownProps) {
  const result = await getFilmGenresAction();

  return <FilterDropdownClient genresResult={result}></FilterDropdownClient>;
}

export default FilterDropdown;
