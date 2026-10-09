import { Skeleton } from '@/shared/ui/skeleton';
import { CardSkeleton, repeat } from './cards';
import { LoadingRegion } from './LoadingRegion';

// Повторяет UserPage: аватар с именем, вкладки и полку с карточками на светлом фоне.
export function ProfileSkeleton() {
  return (
    <LoadingRegion className="flex w-full flex-col gap-6 py-4.5 md:py-7">
      <div className="page-content-width flex flex-col gap-2">
        <Skeleton tone="light" className="size-10 rounded-full md:size-17" />
        <Skeleton tone="light" className="h-7 w-40" />
      </div>
      <div className="page-content-width flex gap-5 lg:gap-15">
        {repeat(4).map((index) => (
          <Skeleton key={index} tone="light" className="h-6 w-24 lg:w-40" />
        ))}
      </div>
      <div className="page-content-width flex min-h-40 gap-3 overflow-hidden md:gap-4">
        {repeat(8).map((index) => (
          <CardSkeleton key={index} kind="book" tone="light" />
        ))}
      </div>
    </LoadingRegion>
  );
}

export default ProfileSkeleton;
