import type { Book } from '@/entities/books/model/types';
import { ROUTES } from '@/shared/config';
import { StarIcon } from '@/shared/ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { CardRatingStar } from '@/entities/rating/ui/CardRatingStar';

type BookCardProps = {
  book: Book;
  priority?: boolean;
};

function getRating(book: Book) {
  return book.externalRatings[0]?.value ?? null;
}

export function BookCard({ book, priority = false }: BookCardProps) {
  const rating = book.ratingAvg;

  return (
    <Link
      href={`${ROUTES.LIBRARY}/${book.id}`}
      className="group focus-visible:ring-primary relative block shrink-0 overflow-hidden bg-neutral-900 shadow-[0_12px_28px_rgba(0,0,0,0.22)] transition-transform duration-300 ease-out outline-none hover:z-20 hover:-translate-y-1 focus-visible:ring-2"
    >
      <div className="relative aspect-104/171 w-26 sm:w-32 lg:w-37">
        {book.thumbnailUrl ? (
          <Image
            fill
            src={book.thumbnailUrl}
            alt={book.title}
            sizes="(max-width: 800px) 104px, (max-width: 1280px) 128px, 148px"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-200 p-3 text-center text-xs font-semibold text-neutral-700">
            {book.title}
          </div>
        )}
      </div>
      <div className="bg-bg-overlay-gray text-text-primary absolute right-0 bottom-0 left-0 flex min-h-15 translate-y-full items-end justify-between gap-2 px-3 py-2 opacity-0 backdrop-blur-sm transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        <span className="line-clamp-2 text-base leading-tight font-bold lg:text-lg">
          {book.title}
        </span>
        {rating !== null && (
          <CardRatingStar
            className={'hidden inline-flex h-4 w-4'}
            averageRating={rating}
          ></CardRatingStar>
        )}
      </div>
    </Link>
  );
}

export default BookCard;
