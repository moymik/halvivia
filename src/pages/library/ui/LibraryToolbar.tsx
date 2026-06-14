import AddBookDialogButton from '@/features/addBook/ui/AddBookDialogButton';
import SearchIcon from '@/shared/assets/SearchIcon.svg';
import { ArrowIcon } from '@/shared/ui/icons';

type LibraryToolbarProps = {
  canAddBooks: boolean;
};

const disabledButtonClassName =
  'flex cursor-not-allowed items-center gap-2 opacity-40 disabled:pointer-events-none';

export function LibraryToolbar({ canAddBooks }: LibraryToolbarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="text-text-secondary flex items-center gap-7 text-sm">
        <button type="button" className={disabledButtonClassName} disabled>
          Фильтры
          <span className="inline-flex h-3 w-4 flex-col justify-between">
            <span className="h-px w-full bg-current" />
            <span className="h-px w-2/3 bg-current" />
            <span className="h-px w-5/6 bg-current" />
          </span>
        </button>
        <button type="button" className={disabledButtonClassName} disabled>
          По умолчанию
          <ArrowIcon className="h-3 w-3 rotate-90" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="text-text-secondary flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full opacity-40"
          aria-label="Поиск книг"
          disabled
        >
          <SearchIcon className="h-5 w-5" />
        </button>
        {canAddBooks && <AddBookDialogButton />}
      </div>
    </div>
  );
}
