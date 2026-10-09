import { HeroSection } from './HeroSection';
import { notFound } from 'next/navigation';
import { z } from 'zod';
import { getFilmById } from '@/entities/films/api/api';
import { CommentSection } from '@/widgets/CommentSection/ui/CommentSection';

export type FilmPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function FilmPage({ params }: FilmPageProps) {
  const { id } = await params;

  // Невалидный uuid уронил бы запрос к БД, а не найденный фильм — HeroSection.
  if (!z.string().uuid().safeParse(id).success) {
    notFound();
  }

  const film = await getFilmById(id);

  if (!film) {
    notFound();
  }

  return (
    <>
      <HeroSection film={film} />
      <section className="bg-bg-inverse flex py-8">
        <CommentSection entityType={'film'} entityId={id}></CommentSection>
      </section>
    </>
  );
}
