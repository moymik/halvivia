import 'server-only';

import type { AddBookInput, Book, BookSectionId } from '@/entities/books/model/types';
import { mapDbBook } from '@/entities/books/model/mappers';
import { isPgError, pool } from '@/shared/lib/db';
import {
  BOOK_SORT_MAP,
  BOOKS_PAGE_SIZE,
  type BookListFilters,
} from '@/pages/library/model/searchParams';

const UNIQUE_VIOLATION_CODE = '23505';

function escapeLike(value: string) {
  return value.replace(/[\\%_]/g, (char) => `\\${char}`);
}

export async function listBooks(
  filters: BookListFilters,
): Promise<{ books: Book[]; totalCount: number }> {
  const values: unknown[] = [];
  const where: string[] = [];

  if (filters.search) {
    values.push(`%${escapeLike(filters.search)}%`);
    where.push(
      `(title ILIKE $${values.length} ESCAPE '\\' OR subtitle ILIKE $${values.length} ESCAPE '\\')`,
    );
  }

  if (filters.author) {
    values.push(`%${escapeLike(filters.author)}%`);
    where.push(
      `EXISTS (SELECT 1 FROM unnest(authors) AS author(name) WHERE author.name ILIKE $${values.length} ESCAPE '\\')`,
    );
  }

  if (filters.publisher) {
    values.push(`%${escapeLike(filters.publisher)}%`);
    where.push(`publisher ILIKE $${values.length} ESCAPE '\\'`);
  }

  if (filters.language) {
    values.push(filters.language);
    where.push(`language ILIKE $${values.length}`);
  }

  if (filters.ratingFrom !== undefined) {
    values.push(filters.ratingFrom);
    where.push(`rating_avg >= $${values.length}`);
  }

  if (filters.category?.length) {
    values.push(filters.category);
    where.push(`categories && $${values.length}::text[]`);
  }

  if (filters.section?.length) {
    values.push(filters.section);
    where.push(`section_ids && $${values.length}::text[]`);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const offset = (filters.page - 1) * BOOKS_PAGE_SIZE;
  const pageValues = [...values, BOOKS_PAGE_SIZE, offset];

  const [countResult, pageResult] = await Promise.all([
    pool.query<{ total_count: number }>(
      `SELECT COUNT(*)::int AS total_count FROM books ${whereSql}`,
      values,
    ),
    pool.query(
      `SELECT * FROM books ${whereSql} ORDER BY ${BOOK_SORT_MAP[filters.sort]} LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
      pageValues,
    ),
  ]);

  return {
    books: pageResult.rows.map(mapDbBook),
    totalCount: Number(countResult.rows[0]?.total_count ?? 0),
  };
}

export async function getBookCategories(): Promise<string[]> {
  const { rows } = await pool.query<{ category: string }>(`
    SELECT DISTINCT trim(category) AS category
    FROM books
    CROSS JOIN LATERAL unnest(categories) AS category(name)
    WHERE trim(category.name) <> ''
    ORDER BY category
  `);

  return rows.map((row) => row.category);
}

export async function getLibraryBooks(): Promise<Book[]> {
  const { rows } = await pool.query(`
    SELECT *
    FROM books
    ORDER BY created_at DESC
    LIMIT 80
  `);

  return rows.map(mapDbBook);
}

export async function getRecentBooks(limit: number): Promise<Book[]> {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM books
    ORDER BY created_at DESC
    LIMIT $1
  `,
    [limit],
  );

  return rows.map(mapDbBook);
}

export async function getBooksBySection(sectionId: BookSectionId, limit: number): Promise<Book[]> {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM books
    WHERE section_ids @> ARRAY[$1]::text[]
    ORDER BY created_at DESC
    LIMIT $2
  `,
    [sectionId, limit],
  );

  return rows.map(mapDbBook);
}

export async function getBookById(id: string): Promise<Book | null> {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM books
    WHERE id = $1
    LIMIT 1
  `,
    [id],
  );

  return rows[0] ? mapDbBook(rows[0]) : null;
}

export async function findBookByExternalId(params: {
  googleBooksId?: string | null;
  openLibraryKey?: string | null;
}): Promise<Book | null> {
  const { googleBooksId, openLibraryKey } = params;

  if (!googleBooksId && !openLibraryKey) {
    return null;
  }

  const { rows } = await pool.query(
    `
    SELECT *
    FROM books
    WHERE ($1::text IS NOT NULL AND google_books_id = $1)
       OR ($2::text IS NOT NULL AND open_library_key = $2)
    LIMIT 1
  `,
    [googleBooksId ?? null, openLibraryKey ?? null],
  );

  return rows[0] ? mapDbBook(rows[0]) : null;
}

export async function addBook(input: AddBookInput, createdByUserId: string): Promise<Book> {
  const { book, sectionIds } = input;
  const { rows } = await pool.query(
    `
    INSERT INTO books (
      google_books_id,
      open_library_key,
      title,
      subtitle,
      authors,
      description,
      published_date,
      publisher,
      page_count,
      language,
      maturity_rating,
      info_link,
      preview_link,
      canonical_volume_link,
      thumbnail_url,
      categories,
      section_ids,
      external_ratings,
      raw_data,
      created_by_user_id
    )
    VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15,
      $16, $17, $18::jsonb, $19::jsonb, $20
    )
    RETURNING *
  `,
    [
      book.googleBooksId ?? null,
      book.openLibraryKey ?? null,
      book.title,
      book.subtitle ?? null,
      book.authors,
      book.description ?? null,
      book.publishedDate ?? null,
      book.publisher ?? null,
      book.pageCount ?? null,
      book.language ?? null,
      book.maturityRating ?? null,
      book.infoLink ?? null,
      book.previewLink ?? null,
      book.canonicalVolumeLink ?? null,
      book.thumbnailUrl ?? null,
      book.categories,
      sectionIds,
      JSON.stringify(book.externalRatings),
      JSON.stringify(book.rawData ?? {}),
      createdByUserId,
    ],
  );

  return mapDbBook(rows[0]);
}

export async function addBookOrGetExisting(
  input: AddBookInput,
  createdByUserId: string,
): Promise<{ book: Book; created: boolean }> {
  try {
    const book = await addBook(input, createdByUserId);
    return { book, created: true };
  } catch (error) {
    if (!isPgError(error) || error.code !== UNIQUE_VIOLATION_CODE) {
      throw error;
    }

    const existingBook = await findBookByExternalId({
      googleBooksId: input.book.googleBooksId,
      openLibraryKey: input.book.openLibraryKey,
    });

    if (!existingBook) {
      throw error;
    }

    return { book: existingBook, created: false };
  }
}
