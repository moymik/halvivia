import type { Book } from '@/entities/books/model/types';
import BookCard from '@/entities/books/ui/BookCard';
import { ArrowIcon } from '@/shared/ui/icons';

type BookShelfProps = {
  title: string;
  books: Book[];
  emptyText: string;
  muted?: boolean;
  priorityCount?: number;
};

export function BookShelf({
  title,
  books,
  emptyText,
  muted = false,
  priorityCount = 0,
}: BookShelfProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 text-2xl leading-tight font-bold md:text-3xl">
        {title}
        <ArrowIcon className="h-4 w-4" />
      </h2>
      {books.length > 0 ? (
        <div className="flex gap-3 overflow-x-auto overflow-y-visible pb-5 md:gap-4">
          {books.map((book, index) => (
            <BookCard key={book.id} book={book} priority={index < priorityCount} />
          ))}
        </div>
      ) : (
        <div
          className={`flex min-h-29 items-center rounded-lg border border-dashed px-4 text-sm ${
            muted
              ? 'text-text-muted border-white/10'
              : 'border-border-inverse-200 text-text-inverse-500'
          }`}
        >
          {emptyText}
        </div>
      )}
    </section>
  );
}
