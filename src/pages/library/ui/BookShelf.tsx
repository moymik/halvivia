import type { Book } from '@/entities/books/model/types';
import BookCard from '@/entities/books/ui/BookCard';
import { ArrowIcon } from '@/shared/ui/icons';
import { BookWithUserRating, isBookWithRating } from '@/widgets/UserRatingsLists/model';

type BookShelfProps = {
  title: string;
  books: Book[] | BookWithUserRating[];
  emptyText: string;
  muted?: boolean;
  priorityCount?: number;
  variant?: 'base' | 'onLight';
};

export function BookShelf({
  title,
  books,
  emptyText,
  muted = false,
  priorityCount = 0,
  variant = 'base',
}: BookShelfProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2
        className={`flex items-center gap-2 text-2xl leading-tight font-bold md:text-3xl ${variant === 'onLight' && 'text-text-inverse'}`}
      >
        {title}
        <ArrowIcon className="h-4 w-4" />
      </h2>
      {books.length > 0 ? (
        <div className="flex gap-3 overflow-x-auto overflow-y-visible pb-5 md:gap-4">
          {books.map((book, index) => (
            <BookCard key={book.id} book={book} priority={index < priorityCount}>
              {isBookWithRating(book) && book.userRating != null && (
                <div className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-sm font-bold text-white">
                  {book.userRating}
                </div>
              )}
            </BookCard>
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
