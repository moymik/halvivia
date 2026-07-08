import { HeroSection } from './HeroSection';
import { Film } from '@/entities/films/model/types';
import { getFilmByIdAction } from '@/entities/films/api/actions';
import { CommentSection } from '@/widgets/CommentSection/ui/CommentSection';

export type FilmPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function FilmPage({ params }: FilmPageProps) {
  const { id } = await params;
  const film = await getFilmByIdAction(id);
  return (
    <>
      <HeroSection film={film as Film} />
      <section className="bg-bg-inverse flex py-8">
        <CommentSection entityType={'film'} entityId={id}></CommentSection>
      </section>
    </>
  );
}
