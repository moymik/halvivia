import { HeroSection } from './HeroSection';
import { Film } from '@/entities/films/model/types';
import { getFilmById } from '@/entities/films/api/api';
import { CommentSection } from '@/widgets/CommentSection/ui/CommentSection';

export type FilmPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function FilmPage({ params }: FilmPageProps) {
  const { id } = await params;
  const film = await getFilmById(id);
  return (
    <>
      <HeroSection film={film as Film} />
      <section className="bg-bg-inverse flex py-8">
        <CommentSection entityType={'film'} entityId={id}></CommentSection>
      </section>
    </>
  );
}
