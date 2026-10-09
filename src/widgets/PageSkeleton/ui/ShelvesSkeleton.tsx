import { Skeleton } from '@/shared/ui/skeleton';
import { CardSkeleton, repeat } from './cards';
import { LoadingRegion } from './LoadingRegion';

type ShelvesSkeletonProps = {
  card: 'poster' | 'book';
  shelves?: number;
};

// Обзорные страницы /cinema и /library: несколько горизонтальных полок с карточками.
export function ShelvesSkeleton({ card, shelves = 3 }: ShelvesSkeletonProps) {
  return (
    <LoadingRegion className="page-content-width flex flex-col gap-5 py-8 lg:py-10">
      {repeat(shelves).map((shelf) =>
        card === 'poster' ? <PosterShelf key={shelf} /> : <BookShelf key={shelf} />,
      )}
    </LoadingRegion>
  );
}

// Повторяет Carousel: 2 / 5 / 6 карточек в ряд.
function PosterShelf() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6">
      <Skeleton className="h-8 w-40" />
      <div className="flex gap-3 overflow-hidden [&>*]:shrink-0 [&>*]:basis-[calc((100%-12px)/2)] md:[&>*]:basis-[calc((100%-4*12px)/5)] lg:[&>*]:basis-[calc((100%-5*12px)/6)]">
        {repeat(6).map((index) => (
          <CardSkeleton key={index} kind="poster" />
        ))}
      </div>
    </div>
  );
}

// Повторяет BookShelf.
function BookShelf() {
  return (
    <div className="flex flex-col gap-4 pb-5">
      <Skeleton className="h-8 w-48 md:h-9" />
      <div className="flex gap-3 overflow-hidden md:gap-4">
        {repeat(10).map((index) => (
          <CardSkeleton key={index} kind="book" />
        ))}
      </div>
    </div>
  );
}

export default ShelvesSkeleton;
