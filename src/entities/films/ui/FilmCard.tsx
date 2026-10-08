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
        'relative block overflow-visible',
        isGrid ? 'w-full' : 'w-max max-w-[256px]',
        className,
      )}
    >
      <div
        className={cn(
          'group relative flex flex-col gap-1 overflow-visible',
          'transition-transform duration-300 ease-out',
          hoverScale && 'hover:z-50 hover:scale-110',
          isGrid ? 'aspect-[0.7] w-full' : 'w-[43vw] md:w-[22vw] xl:w-[17vw] 2xl:w-[256px]',
        )}
      >
        {children}

        <Image
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
          alt={name}
          className="h-full w-full rounded-xl border border-transparent object-cover object-center"
          width={166}
          height={93}
          src={posterUrl || coverUrl}
          loading="lazy"
          sizes={sizesByVariant[variant]}
        />

        <div className="lg:bg-bg-overlay-gray flex w-full flex-row items-center justify-between px-1 py-1 transition-opacity duration-300 ease-out lg:absolute lg:bottom-0 lg:min-h-[25%] lg:px-3 lg:font-semibold lg:opacity-0 lg:backdrop-blur-sm lg:group-hover:opacity-100">
          <span className="line-clamp-2">{name}</span>

          <span className={cn('inline-flex items-center', ratingAvg === null && 'hidden')}>
            <CardRatingStar averageRating={ratingAvg} />

            <span className="hidden lg:block">
              &nbsp;
              {ratingAvg}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default FilmCard;
