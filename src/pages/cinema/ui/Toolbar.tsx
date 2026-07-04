import FilmDialogButton from '@/pages/cinema/ui/FilmDialogButton';
import FilterDropdown from '@/pages/cinema/ui/FilterDropdown';

export type ToolbarProps = {
  canAddFilm: boolean;
};

export function Toolbar({ canAddFilm = false }: ToolbarProps) {
  return (
    <div className={'flex flex-row justify-between'}>
      <FilterDropdown></FilterDropdown>
      {canAddFilm && <FilmDialogButton />}
    </div>
  );
}

export default Toolbar;
