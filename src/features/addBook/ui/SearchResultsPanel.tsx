import type { BookSearchResultPreview } from '@/entities/books/model/types';
import { SearchResultItem } from './SearchResultItem';

type SearchResultsPanelProps = {
  results: BookSearchResultPreview[];
  selectedBook: BookSearchResultPreview | null;
  isSearching: boolean;
  onSelect: (book: BookSearchResultPreview) => void;
};

export function SearchResultsPanel({
  results,
  selectedBook,
  isSearching,
  onSelect,
}: SearchResultsPanelProps) {
  return (
    <div className="border-border-inverse-200 flex max-h-[360px] min-h-[220px] flex-col overflow-hidden rounded-lg border bg-white">
      <p className="text-text-inverse-500 px-4 pt-4 pb-2 text-sm">Результаты поиска</p>
      <div className="flex flex-1 flex-col overflow-y-auto px-4">
        {results.length === 0 ? (
          <div className="text-text-inverse-500 flex flex-1 items-center justify-center text-center text-sm">
            {isSearching ? 'Ищем книги...' : 'Начни поиск по названию, автору или ISBN'}
          </div>
        ) : (
          results.map((book) => (
            <SearchResultItem
              key={book.externalId}
              book={book}
              isSelected={selectedBook?.externalId === book.externalId}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
      <p className="text-text-inverse-500 px-4 py-3 text-center text-xs">
        Не нашел нужную книгу? Попробуй уточнить автора или ISBN
      </p>
    </div>
  );
}
