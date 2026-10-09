import { Skeleton } from '@/shared/ui/skeleton';
import { repeat } from './cards';
import { LoadingRegion } from './LoadingRegion';

// Нейтральный скелетон для страниц без собственного loading.tsx.
export function PageSkeleton() {
  return (
    <LoadingRegion className="page-content-width flex flex-col gap-6 py-8 lg:py-10">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="flex flex-col gap-3">
        {repeat(3).map((index) => (
          <Skeleton key={index} className="h-4 w-full" />
        ))}
        <Skeleton className="h-4 w-2/3" />
      </div>
    </LoadingRegion>
  );
}

export default PageSkeleton;
