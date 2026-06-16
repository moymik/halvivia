import { HeroSection } from './HeroSection';
import { Film } from '@/entities/films/model/types';
import { getFilmByIdAction } from '@/entities/films/api/actions';

export type FilmPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function FilmPage({ params }: FilmPageProps) {
  const { id } = await params;
  const film = await getFilmByIdAction(id);

  //console.log(resolvedParams);
  return (
    <>
      <section className="page-content-width flex py-8">
        <HeroSection film={film as Film} />
      </section>
    </>
  );
}
