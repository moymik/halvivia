import { cn } from '@/shared/lib/utils';

export type SkeletonProps = {
  className?: string;
  tone?: 'dark' | 'light';
};

const toneStyles = {
  dark: 'bg-bg-inverse-100',
  light: 'bg-bg-gray-100',
};

export function Skeleton({ className, tone = 'dark' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-md', toneStyles[tone], className)}
    />
  );
}

export default Skeleton;
