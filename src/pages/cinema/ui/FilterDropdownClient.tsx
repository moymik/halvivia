'use client';
import { DbGenre } from '@/entities/films/model/types';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/Dropdown';

import FilterIcon from '@/shared/assets/FiltersIcon.svg';
import { ActionResult } from '@/shared/model';
import { useFiltersStore } from '@/pages/cinema/model/useFiltersStore';

export type FilterDropdownClientProps = {
  genresResult: ActionResult<DbGenre[]>;
};

export function FilterDropdownClient({ genresResult }: FilterDropdownClientProps) {
  const selectedGenres = useFiltersStore((s) => s.selectedGenreIds);
  const toggleGenre = useFiltersStore((s) => s.toggleGenre);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={'hover:text-text-primary transition-colors duration-200 ease-out'}>
          Фильтры &nbsp;
          <FilterIcon className={`inline ${selectedGenres.length > 0 && 'fill-primary'}`} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={'bg-bg-base-950 text-text-secondary w-fit ring-[rgb(40,40,40)] backdrop-blur-md'}
      >
        <DropdownMenuGroup className={'grid grid-cols-2 gap-x-6 gap-y-4 p-4 md:grid-cols-3'}>
          <section className={'col-span-full'}>
            <DropdownMenuLabel className={'bold text-text-primary text-lg'}>
              Жанры
            </DropdownMenuLabel>
            <DropdownMenuSeparator className={'bg-bg-inverse-500 h-px'}></DropdownMenuSeparator>
          </section>

          {genresResult.success ? (
            genresResult.data.map((genre) => (
              <DropdownMenuItem
                className={`hover:text-text-primary cursor-pointer transition-colors duration-300 ease-out ${selectedGenres.includes(genre.id) ? 'text-text-primary' : ''}`}
                onSelect={(e) => {
                  e.preventDefault();
                  toggleGenre(genre.id);
                }}
                key={genre.id}
              >
                {genre.name}
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled>Не удалось загрузить жанры</DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FilterDropdownClient;
