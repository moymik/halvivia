import { Skeleton, type SkeletonProps } from '@/shared/ui/skeleton';
import { cn } from '@/shared/lib/utils';

export type SkeletonCardKind = 'poster' | 'book' | 'game';

// Размеры повторяют FilmCard (grid), BookCard и GameCard, чтобы при подмене не было скачка вёрстки.
const cardStyles: Record<SkeletonCardKind, string> = {
  poster: 'aspect-[0.7] w-full rounded-xl',
  book: 'aspect-104/171 w-26 shrink-0 rounded-none sm:w-32 lg:w-37',
  game: 'aspect-video w-full rounded-none',
};

type CardSkeletonProps = {
  kind: SkeletonCardKind;
  className?: string;
  tone?: SkeletonProps['tone'];
};

export function CardSkeleton({ kind, className, tone }: CardSkeletonProps) {
  return <Skeleton tone={tone} className={cn(cardStyles[kind], className)} />;
}

export function repeat(count: number) {
  return Array.from({ length: count }, (_, index) => index);
}
