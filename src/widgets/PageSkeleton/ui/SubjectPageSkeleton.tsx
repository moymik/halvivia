import { Skeleton } from '@/shared/ui/skeleton';
import { cn } from '@/shared/lib/utils';
import { repeat } from './cards';
import { LoadingRegion } from './LoadingRegion';

type SubjectMedia = 'poster' | 'book' | 'game';

// Колонки и обложки повторяют HeroSection (фильм), BookPage и GamePage.
const gridStyles: Record<SubjectMedia, string> = {
  poster: 'md:grid-cols-[auto_1fr]',
  book: 'md:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)]',
  game: 'md:grid-cols-[minmax(0,420px)_1fr]',
};

const mediaStyles: Record<SubjectMedia, string> = {
  poster: 'aspect-[301/389] w-[57vw] md:w-[33vw] lg:w-75',
  book: 'aspect-104/171 w-full max-w-55',
  game: 'aspect-video w-full',
};

type SubjectPageSkeletonProps = {
  media: SubjectMedia;
};

export function SubjectPageSkeleton({ media }: SubjectPageSkeletonProps) {
  return (
    <LoadingRegion>
      <div
        className={cn(
          'page-content-width grid grid-cols-1 items-start gap-y-6 py-8 md:gap-x-8 lg:py-10',
          gridStyles[media],
        )}
      >
        <Skeleton className="h-4 w-40 md:col-span-2" />
        <Skeleton
          className={cn(
            'justify-self-center rounded-none md:justify-self-start',
            mediaStyles[media],
          )}
        />

        <div className="flex w-full flex-col items-center gap-5 md:items-start">
          <div className="flex w-full flex-col items-center gap-3 md:items-start">
            <Skeleton className="h-8 w-3/4 max-w-96" />
            <Skeleton className="h-5 w-1/2 max-w-64" />
          </div>
          <div className="hidden w-full max-w-xl flex-col gap-3 md:flex">
            {repeat(5).map((index) => (
              <Skeleton key={index} className="h-5 w-full" />
            ))}
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-11 w-36" />
            <Skeleton className="h-11 w-36" />
          </div>
        </div>
      </div>

      <section className="bg-bg-inverse py-10">
        <div className="page-content-width flex flex-col gap-3">
          <Skeleton tone="light" className="h-7 w-40" />
          {repeat(4).map((index) => (
            <Skeleton key={index} tone="light" className="h-4 w-full" />
          ))}
          <Skeleton tone="light" className="h-4 w-2/3" />
        </div>
      </section>
    </LoadingRegion>
  );
}

export default SubjectPageSkeleton;
