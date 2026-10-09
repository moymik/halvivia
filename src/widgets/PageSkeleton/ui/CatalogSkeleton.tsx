import { Skeleton } from '@/shared/ui/skeleton';
import { cn } from '@/shared/lib/utils';
import { CardSkeleton, repeat, type SkeletonCardKind } from './cards';
import { LoadingRegion } from './LoadingRegion';

// Сетки повторяют каталоги CinemaPage (с типом), LibraryPage (с разделом) и GamesPage.
const gridStyles: Record<SkeletonCardKind, string> = {
  poster: 'grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
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
  filters?: 'left' | 'right' | 'none';
};

export function CatalogSkeleton({ card, filters = 'right' }: CatalogSkeletonProps) {
  const filtersPanel = filters !== 'none' && <FiltersSkeleton />;

  return (
    <LoadingRegion className="page-content-width pr-0">
      <div
        className={cn(
          'grid grid-cols-1 items-start gap-6',
          filters === 'right' && 'lg:grid-cols-[minmax(0,1fr)_280px]',
          filters === 'left' && 'lg:grid-cols-[280px_minmax(0,1fr)]',
        )}
      >
        {filters === 'left' && filtersPanel}
        <div className="flex min-w-0 flex-col gap-6 py-6">
          <Skeleton className="h-8 w-40" />
          <div className={gridStyles[card]}>
            {repeat(cardsCount[card]).map((index) => (
              <CardSkeleton key={index} kind={card} className="w-full" />
            ))}
          </div>
        </div>
        {filters === 'right' && filtersPanel}
      </div>
    </LoadingRegion>
  );
}

function FiltersSkeleton() {
  return (
    <div className="hidden flex-col gap-4 py-6 pr-4 lg:flex">
      <Skeleton className="h-6 w-24" />
      {repeat(5).map((index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
      <Skeleton className="h-11 w-full" />
    </div>
  );
}

export default CatalogSkeleton;
