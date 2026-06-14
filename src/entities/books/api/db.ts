import 'server-only';

import type { AddBookInput, Book, BookSectionId } from '@/entities/books/model/types';
import { mapDbBook } from '@/entities/books/model/mappers';
import { isPgError, pool } from '@/shared/lib/db';

const UNIQUE_VIOLATION_CODE = '23505';

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
