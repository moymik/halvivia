import { Skeleton } from '@/shared/ui/skeleton';
import { CardSkeleton, repeat, type SkeletonCardKind } from './cards';
import { LoadingRegion } from './LoadingRegion';

// Сетки и лейаут повторяют каталоги CinemaPage (с типом), LibraryPage (с разделом) и GamesPage
// на CatalogLayout: контент слева, панель фильтров справа от lg.
const gridStyles: Record<SkeletonCardKind, string> = {
  poster: 'grid grid-cols-2 gap-3 md:grid-cols-5',
  book: 'grid grid-cols-[repeat(auto-fill,148px)] justify-start gap-5 max-lg:grid-cols-[repeat(auto-fill,128px)] max-sm:grid-cols-[repeat(auto-fill,104px)]',
  game: 'grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 2xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]',
};

const cardsCount: Record<SkeletonCardKind, number> = {
  poster: 15,
  book: 14,
  game: 12,
};

type CatalogSkeletonProps = {
  card: SkeletonCardKind;
};

export function CatalogSkeleton({ card }: CatalogSkeletonProps) {
  return (
    <LoadingRegion className="flex min-h-full">
      <div className="flex min-w-0 flex-1 flex-col gap-6 px-4 pt-6 pb-10 lg:px-10 lg:pt-10">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-5 w-24 lg:hidden" />
        </div>
        <div className={gridStyles[card]}>
          {repeat(cardsCount[card]).map((index) => (
            <CardSkeleton key={index} kind={card} className="w-full" />
          ))}
        </div>
      </div>
      <FiltersSkeleton />
    </LoadingRegion>
  );
}

function FiltersSkeleton() {
  return (
    <div className="border-border-default bg-bg-surface hidden w-81.5 shrink-0 flex-col gap-6 border-l px-6 py-10 lg:flex">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export default CatalogSkeleton;
