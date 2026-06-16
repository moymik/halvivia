import { Image } from '@imagekit/next';
import { StarIcon } from '@/shared/ui/icons';
import Link from 'next/link';
import { ROUTES } from '@/shared/config';

export type FilmCardProps = {
  id: string;
  name?: string;
  posterUrl?: string;
  ///averageRating
};

export function FilmCard({
  id = 'e9339093-33db-4dc8-b465-381efbf712eb',
  posterUrl = '/posters/1143242_FgX7h_vrI',
  name = 'Джентльмены ',
}: FilmCardProps) {
  return (
    <Link
      href={`${ROUTES.CINEMA}/${id}`}
      className="relative block w-max overflow-visible hover:z-50"
    >
      <div
        className={`group default relative flex w-[43vw] flex-col gap-1 overflow-visible transition-transform duration-300 ease-out hover:scale-110 md:w-[22vw] xl:w-[17vw] 2xl:w-64.25`}
      >
        <Image
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
          alt="alt"
          className={`aspect-video h-full w-full object-cover object-center`}
          width={166}
          height={93}
          src={posterUrl}
          loading={'lazy'}
          sizes={
            '(max-width:390) 42vw,(max-width:800) 22vw, (max-width:1400)17vw,(max-width:1920)15vw'
          }
        ></Image>
        <div
          className={`lg:font-heading lg:bg-bg-overlay-gray flex w-full flex-row items-center justify-between backdrop-opacity-40 transition-opacity duration-300 ease-out lg:absolute lg:bottom-0 lg:min-h-[25%] lg:px-3 lg:font-semibold lg:opacity-0 lg:backdrop-blur-sm lg:group-hover:opacity-100`}
        >
          <span className={'my-1 block w-2/3 overflow-hidden text-ellipsis'}>{name}</span>
          <StarIcon className={'hidden lg:block'}></StarIcon>
        </div>
      </div>
    </Link>
  );
}

export default FilmCard;
