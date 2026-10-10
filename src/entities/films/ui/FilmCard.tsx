import { Image } from '@imagekit/next';
import Link from 'next/link';
import { ROUTES } from '@/shared/config';
import { CardRatingStar } from '@/entities/rating/ui/CardRatingStar';
import { cn } from '@/shared';

export type FilmCardProps = {
  id: string;
  name?: string;
  posterUrl?: string;
  ratingAvg?: number | null;
  variant?: 'grid' | 'fixed';
  className?: string;
  hoverScale?: boolean;
  children?: React.ReactNode;
  coverUrl: string;
};

const sizesByVariant = {
  grid: '16.66vw',
  fixed: '(max-width: 390px) 43vw, (max-width: 800px) 22vw, (max-width: 1400px) 17vw, 256px',
};

export function FilmCard({
  id,
  posterUrl,
  coverUrl,
  name = 'Джентльмены',
  ratingAvg = 0,
  variant = 'fixed',
  className,
  hoverScale = true,
  children,
}: FilmCardProps) {
  const isGrid = variant === 'grid';

  return (
    <Link
      href={`${ROUTES.FILM_PAGE}${id}`}
      className={cn(
        'relative block min-w-0 overflow-visible',
        isGrid ? 'w-full' : 'w-max max-w-[256px]',
        className,
      )}
    >
      <div
        className={cn(
          'group relative overflow-visible',
          'transition-transform duration-300 ease-out',
          hoverScale && 'hover:z-50 hover:scale-110',
          isGrid
            ? 'aspect-[0.7] w-full'
            : 'aspect-[0.7] w-[43vw] md:w-[22vw] xl:w-[17vw] 2xl:w-[256px]',
        )}
      >
        {children}

        <Image
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
          alt={name}
          className="absolute inset-0 h-full w-full rounded-xl border border-transparent object-cover object-center"
          width={166}
          height={237}
          src={posterUrl || coverUrl}
          loading="lazy"
          sizes={sizesByVariant[variant]}
        />

        <div className="text-text-primary bg-bg-overlay-gray absolute inset-x-0 bottom-0 z-10 flex w-full flex-col items-start justify-center gap-2.5 rounded-b-xl p-3 px-3 text-lg font-semibold opacity-0 backdrop-blur-sm transition-opacity duration-300 ease-out group-hover:opacity-100">
          <span className="w-full max-w-[80%] truncate">{name}</span>

          <span
            className={cn(
              'inline-flex items-center font-bold lg:text-xl',
              ratingAvg === null && 'hidden',
            )}
          >
            <CardRatingStar averageRating={ratingAvg} />
            <span className="hidden lg:block">&nbsp;{ratingAvg}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default FilmCard;
