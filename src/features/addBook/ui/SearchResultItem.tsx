import type { BookSearchResultPreview } from '@/entities/books/model/types';
import { AddIcon, StarIcon } from '@/shared/ui/icons';
import Image from 'next/image';
import { getBookSubtitle } from '../model/bookSearchPreview';

type SearchResultItemProps = {
  book: BookSearchResultPreview;
  isSelected: boolean;
  onSelect: (book: BookSearchResultPreview) => void;
};

export function SearchResultItem({ book, isSelected, onSelect }: SearchResultItemProps) {
  const rating = book.externalRatings[0];

  return (
    <button
      type="button"
      onClick={() => onSelect(book)}
      className={`border-border-inverse-200 grid grid-cols-[48px_minmax(0,1fr)_24px] gap-3 border-b py-3 text-left transition-colors last:border-b-0 ${
        isSelected ? 'bg-border-inverse-200/30' : 'hover:bg-border-inverse-200/20'
      }`}
    >
      <span className="relative h-18 w-12 overflow-hidden bg-neutral-200">
        {book.thumbnailUrl ? (
          <Image
            src={book.thumbnailUrl}
            alt={book.title}
            fill
            sizes="48px"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full items-center justify-center px-1 text-center text-[9px]">
            Нет обложки
          </span>
        )}
      </span>
      <span className="min-w-0">
        <span className="line-clamp-1 text-base leading-tight font-bold">{book.title}</span>
        <span className="text-text-inverse-500 mt-1 line-clamp-1 text-sm">
          {getBookSubtitle(book) || 'Данные об авторе не найдены'}
        </span>
        {rating && (
          <span className="mt-1 flex items-center gap-1 text-sm font-medium">
            <StarIcon className="text-primary h-4 w-4" />
            {rating.value.toFixed(1)}
          </span>
        )}
      </span>
      <span className="text-primary flex items-center justify-center">
        <AddIcon className="h-4 w-4" />
      </span>
    </button>
  );
}
