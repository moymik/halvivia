import { NextRequest, NextResponse } from 'next/server';
import 'server-only';

import { pool } from '@/shared/lib/db';
import { getSubjectRef } from '@/shared/lib/utils';

const LIMIT = 5;
const MIN_QUERY_LENGTH = 2;
const MAX_QUERY_LENGTH = 100;

function escapeLike(value: string) {
  return value.replace(/[\\%_]/g, (char) => `\\${char}`);
}

export async function GET(request: NextRequest) {
  const rawQuery = request.nextUrl.searchParams.get('q') ?? '';
  const query = rawQuery.trim();

  if (query.length < MIN_QUERY_LENGTH) {
    return NextResponse.json({
      films: [],
      books: [],
      games: [],
    });
  }

  if (query.length > MAX_QUERY_LENGTH) {
    return NextResponse.json({ error: 'Слишком длинный поисковый запрос' }, { status: 400 });
  }

  const pattern = `%${escapeLike(query)}%`;

  try {
    const [filmsResult, booksResult, gamesResult] = await Promise.all([
      pool.query<{
        id: string;
        name_ru: string;
        name_en: string | null;
        year: number | null;
        poster_url_preview: string;
      }>(
        `
SELECT id, name_ru, name_en, year, poster_url_preview
FROM films
WHERE name_ru ILIKE $1 ESCAPE '\\'
OR name_en ILIKE $1 ESCAPE '\\'
OR name_original ILIKE $1 ESCAPE '\\'
ORDER BY
CASE WHEN name_ru ILIKE $2 ESCAPE '\\' THEN 0 ELSE 1 END,
    rating_avg DESC NULLS LAST
LIMIT $3
    `,
        [pattern, `${escapeLike(query)}%`, LIMIT],
      ),

      pool.query<{
        id: string;
        title: string;
        subtitle: string | null;
        authors: string[];
        thumbnail_url: string | null;
      }>(
        `
SELECT id, title, subtitle, authors, thumbnail_url
FROM books
WHERE title ILIKE $1 ESCAPE '\\'
OR subtitle ILIKE $1 ESCAPE '\\'
ORDER BY
CASE WHEN title ILIKE $2 ESCAPE '\\' THEN 0 ELSE 1 END,
    created_at DESC
LIMIT $3
    `,
        [pattern, `${escapeLike(query)}%`, LIMIT],
      ),

      pool.query<{
        id: string;
        name: string;
        header_image: string | null;
        release_date: string | null;
      }>(
        `
SELECT id, name, header_image, release_date
FROM games
WHERE name ILIKE $1 ESCAPE '\\'
ORDER BY
CASE WHEN name ILIKE $2 ESCAPE '\\' THEN 0 ELSE 1 END,
    created_at DESC
LIMIT $3
    `,
        [pattern, `${escapeLike(query)}%`, LIMIT],
      ),
    ]);

    return NextResponse.json({
      films: filmsResult.rows.map((film) => ({
        id: film.id,
        type: 'film' as const,
        title: film.name_ru,
        subtitle: [film.name_en, film.year].filter(Boolean).join(' · '),
        image: film.poster_url_preview,
        href: getSubjectRef({ type: 'film', id: film.id }),
      })),

      books: booksResult.rows.map((book) => ({
        id: book.id,
        type: 'book' as const,
        title: book.title,
        subtitle: book.authors.join(', '),
        image: book.thumbnail_url,
        href: getSubjectRef({ type: 'book', id: book.id }),
      })),

      games: gamesResult.rows.map((game) => ({
        id: game.id,
        type: 'game' as const,
        title: game.name,
        subtitle: game.release_date ?? '',
        image: game.header_image,
        href: getSubjectRef({ type: 'game', id: game.id }),
      })),
    });
  } catch (error) {
    console.error('Header search failed:', error);

    return NextResponse.json({ error: 'Не удалось выполнить поиск' }, { status: 500 });
  }
}
