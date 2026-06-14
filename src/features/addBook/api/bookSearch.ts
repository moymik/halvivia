import 'server-only';

import type {
  AddBookSelectionInput,
  BookExternalRating,
  BookSearchResult,
} from '@/entities/books/model/types';
import { suggestSections } from '@/entities/books/model/sections';
import { z } from 'zod';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';
const OPEN_LIBRARY_SEARCH_API = 'https://openlibrary.org/search.json';
const OPEN_LIBRARY_BASE_URL = 'https://openlibrary.org';
const SEARCH_RESULTS_LIMIT = 12;
const OPEN_LIBRARY_SUBJECT_LIMIT = 10;
const OPEN_LIBRARY_AUTHOR_LIMIT = 3;

const googleVolumeSchema = z
  .object({
    id: z.string(),
    volumeInfo: z
      .object({
        title: z.string().optional(),
        subtitle: z.string().optional(),
        authors: z.array(z.string()).optional(),
        publisher: z.string().optional(),
        publishedDate: z.string().optional(),
        description: z.string().optional(),
        pageCount: z.number().optional(),
        categories: z.array(z.string()).optional(),
        averageRating: z.number().optional(),
        ratingsCount: z.number().optional(),
        maturityRating: z.string().optional(),
        imageLinks: z
          .object({
            smallThumbnail: z.string().optional(),
            thumbnail: z.string().optional(),
          })
          .optional(),
        language: z.string().optional(),
        previewLink: z.string().optional(),
        infoLink: z.string().optional(),
        canonicalVolumeLink: z.string().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

const googleBooksResponseSchema = z
  .object({
    items: z.array(googleVolumeSchema).optional(),
  })
  .passthrough();

const openLibraryDocSchema = z
  .object({
    key: z.string().optional(),
    title: z.string().optional(),
    author_name: z.array(z.string()).optional(),
    first_publish_year: z.number().optional(),
    publisher: z.array(z.string()).optional(),
    cover_i: z.number().optional(),
    subject: z.array(z.string()).optional(),
    language: z.array(z.string()).optional(),
    ratings_average: z.number().optional(),
    ratings_count: z.number().optional(),
    isbn: z.array(z.string()).optional(),
  })
  .passthrough();

const openLibraryResponseSchema = z
  .object({
    docs: z.array(openLibraryDocSchema).optional(),
  })
  .passthrough();

const openLibraryDescriptionSchema = z.union([
  z.string(),
  z.object({ value: z.string().optional() }).passthrough(),
]);

const openLibraryWorkSchema = z
  .object({
    key: z.string().optional(),
    title: z.string().optional(),
    description: openLibraryDescriptionSchema.optional(),
    subjects: z.array(z.string()).optional(),
    covers: z.array(z.number()).optional(),
    first_publish_date: z.string().optional(),
    authors: z
      .array(
        z
          .object({
            author: z
              .object({
                key: z.string().optional(),
              })
              .passthrough()
              .optional(),
          })
          .passthrough(),
      )
      .optional(),
  })
  .passthrough();

const openLibraryAuthorSchema = z
  .object({
    name: z.string().optional(),
    personal_name: z.string().optional(),
  })
  .passthrough();

type GoogleVolume = z.infer<typeof googleVolumeSchema>;
type OpenLibraryDoc = z.infer<typeof openLibraryDocSchema>;
type OpenLibraryWork = z.infer<typeof openLibraryWorkSchema>;

function normalizeImageUrl(url?: string | null) {
  return url ? url.replace(/^http:/, 'https:') : null;
}

function compactStrings(values: Array<string | null | undefined>) {
  return values.filter((value): value is string => Boolean(value && value.trim().length > 0));
}

function getOpenLibraryUrl(path: string) {
  return `${OPEN_LIBRARY_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function getBookDedupKeys(book: BookSearchResult) {
  const keys: string[] = [];

  if (book.googleBooksId) {
    keys.push(`google:${book.googleBooksId}`);
  }

  if (book.openLibraryKey) {
    keys.push(`open-library:${book.openLibraryKey}`);
  }

  keys.push(
    `content:${book.title.toLowerCase().trim()}:${book.authors.join(',').toLowerCase().trim()}`,
  );

  return keys;
}

function deduplicateBooks(books: BookSearchResult[]) {
  const seenKeys = new Set<string>();
  const uniqueBooks: BookSearchResult[] = [];

  for (const book of books) {
    const keys = getBookDedupKeys(book);

    if (keys.some((key) => seenKeys.has(key))) continue;

    keys.forEach((key) => seenKeys.add(key));
    uniqueBooks.push(book);
  }

  return uniqueBooks;
}

async function fetchJson(url: string, init?: RequestInit) {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`Book provider request failed with ${response.status}: ${url}`);
  }

  return response.json();
}

function mapGoogleVolume(volume: GoogleVolume): BookSearchResult | null {
  const info = volume.volumeInfo;

  if (!info?.title) {
    return null;
  }

  const categories = info.categories ?? [];
  const externalRatings: BookExternalRating[] =
    typeof info.averageRating === 'number'
      ? [
          {
            source: 'google-books',
            label: 'Google Books',
            value: info.averageRating,
            votesCount: info.ratingsCount ?? null,
            url: info.infoLink ?? null,
          },
        ]
      : [];

  return {
    externalId: `google:${volume.id}`,
    source: 'google-books',
    googleBooksId: volume.id,
    openLibraryKey: null,
    title: info.title,
    subtitle: info.subtitle ?? null,
    authors: info.authors ?? [],
    description: info.description ?? null,
    publishedDate: info.publishedDate ?? null,
    publisher: info.publisher ?? null,
    pageCount: info.pageCount ?? null,
    language: info.language ?? null,
    maturityRating: info.maturityRating ?? null,
    infoLink: info.infoLink ?? null,
    previewLink: info.previewLink ?? null,
    canonicalVolumeLink: info.canonicalVolumeLink ?? null,
    thumbnailUrl: normalizeImageUrl(info.imageLinks?.thumbnail ?? info.imageLinks?.smallThumbnail),
    categories,
    externalRatings,
    suggestedSectionIds: suggestSections(categories),
    rawData: volume,
  };
}

function mapOpenLibraryDoc(doc: OpenLibraryDoc): BookSearchResult | null {
  if (!doc.key || !doc.title) {
    return null;
  }

  const categories = (doc.subject ?? []).slice(0, OPEN_LIBRARY_SUBJECT_LIMIT);
  const coverUrl = doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : null;
  const ratings: BookExternalRating[] =
    typeof doc.ratings_average === 'number'
      ? [
          {
            source: 'open-library',
            label: 'Open Library',
            value: Number(doc.ratings_average.toFixed(1)),
            votesCount: doc.ratings_count ?? null,
            url: getOpenLibraryUrl(doc.key),
          },
        ]
      : [];

  return {
    externalId: `open-library:${doc.key}`,
    source: 'open-library',
    googleBooksId: null,
    openLibraryKey: doc.key,
    title: doc.title,
    subtitle: null,
    authors: doc.author_name ?? [],
    description: null,
    publishedDate: doc.first_publish_year ? String(doc.first_publish_year) : null,
    publisher: doc.publisher?.[0] ?? null,
    pageCount: null,
    language: doc.language?.[0] ?? null,
    maturityRating: null,
    infoLink: getOpenLibraryUrl(doc.key),
    previewLink: null,
    canonicalVolumeLink: getOpenLibraryUrl(doc.key),
    thumbnailUrl: coverUrl,
    categories,
    externalRatings: ratings,
    suggestedSectionIds: suggestSections(categories),
    rawData: doc,
  };
}

function getOpenLibraryDescription(description: OpenLibraryWork['description']) {
  if (typeof description === 'string') {
    return description;
  }

  return description?.value ?? null;
}

async function getOpenLibraryAuthorNames(work: OpenLibraryWork) {
  const authorKeys = (work.authors ?? [])
    .map((author) => author.author?.key)
    .filter((key): key is string => Boolean(key))
    .slice(0, OPEN_LIBRARY_AUTHOR_LIMIT);

  const authors = await Promise.all(
    authorKeys.map(async (key) => {
      try {
        const data = await fetchJson(`${getOpenLibraryUrl(key)}.json`, {
          next: { revalidate: 60 * 60 },
        });
        const author = openLibraryAuthorSchema.parse(data);
        return author.name ?? author.personal_name ?? null;
      } catch (error) {
        console.error(error);
        return null;
      }
    }),
  );

  return compactStrings(authors);
}

async function mapOpenLibraryWork(work: OpenLibraryWork): Promise<BookSearchResult | null> {
  if (!work.key || !work.title) {
    return null;
  }

  const categories = (work.subjects ?? []).slice(0, OPEN_LIBRARY_SUBJECT_LIMIT);
  const coverId = work.covers?.find((cover) => cover > 0);
  const authors = await getOpenLibraryAuthorNames(work);

  return {
    externalId: `open-library:${work.key}`,
    source: 'open-library',
    googleBooksId: null,
    openLibraryKey: work.key,
    title: work.title,
    subtitle: null,
    authors,
    description: getOpenLibraryDescription(work.description),
    publishedDate: work.first_publish_date ?? null,
    publisher: null,
    pageCount: null,
    language: null,
    maturityRating: null,
    infoLink: getOpenLibraryUrl(work.key),
    previewLink: null,
    canonicalVolumeLink: getOpenLibraryUrl(work.key),
    thumbnailUrl: coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : null,
    categories,
    externalRatings: [],
    suggestedSectionIds: suggestSections(categories),
    rawData: work,
  };
}

async function searchGoogleBooks(query: string): Promise<BookSearchResult[]> {
  const params = new URLSearchParams({
    q: query,
    maxResults: String(SEARCH_RESULTS_LIMIT),
    printType: 'books',
    orderBy: 'relevance',
  });

  if (process.env.GOOGLE_BOOKS_API_KEY) {
    params.set('key', process.env.GOOGLE_BOOKS_API_KEY);
  }

  const data = await fetchJson(`${GOOGLE_BOOKS_API}?${params.toString()}`, {
    next: { revalidate: 60 * 60 },
  });
  const parsedData = googleBooksResponseSchema.parse(data);

  return (parsedData.items ?? [])
    .map(mapGoogleVolume)
    .filter((book): book is BookSearchResult => Boolean(book));
}

async function getGoogleBookById(googleBooksId: string): Promise<BookSearchResult | null> {
  const params = new URLSearchParams();

  if (process.env.GOOGLE_BOOKS_API_KEY) {
    params.set('key', process.env.GOOGLE_BOOKS_API_KEY);
  }

  const suffix = params.size > 0 ? `?${params.toString()}` : '';
  const data = await fetchJson(`${GOOGLE_BOOKS_API}/${googleBooksId}${suffix}`, {
    next: { revalidate: 60 * 60 },
  });
  const parsedData = googleVolumeSchema.parse(data);

  return mapGoogleVolume(parsedData);
}

async function searchOpenLibrary(query: string): Promise<BookSearchResult[]> {
  const params = new URLSearchParams({
    q: query,
    limit: String(SEARCH_RESULTS_LIMIT),
    fields: compactStrings([
      'key',
      'title',
      'author_name',
      'first_publish_year',
      'publisher',
      'cover_i',
      'subject',
      'language',
      'ratings_average',
      'ratings_count',
      'isbn',
    ]).join(','),
  });

  const data = await fetchJson(`${OPEN_LIBRARY_SEARCH_API}?${params.toString()}`, {
    headers: {
      'User-Agent': 'HalvaPovidlo/0.1 (library search)',
    },
    next: { revalidate: 60 * 60 },
  });
  const parsedData = openLibraryResponseSchema.parse(data);

  return (parsedData.docs ?? [])
    .map(mapOpenLibraryDoc)
    .filter((book): book is BookSearchResult => Boolean(book));
}

async function getOpenLibraryBookByKey(openLibraryKey: string): Promise<BookSearchResult | null> {
  const data = await fetchJson(`${getOpenLibraryUrl(openLibraryKey)}.json`, {
    headers: {
      'User-Agent': 'HalvaPovidlo/0.1 (library import)',
    },
    next: { revalidate: 60 * 60 },
  });
  const parsedData = openLibraryWorkSchema.parse(data);

  return mapOpenLibraryWork(parsedData);
}

export async function getExternalBookBySelection(
  input: AddBookSelectionInput,
): Promise<BookSearchResult | null> {
  if (input.source === 'google-books' && input.googleBooksId) {
    return getGoogleBookById(input.googleBooksId);
  }

  if (input.source === 'open-library' && input.openLibraryKey) {
    return getOpenLibraryBookByKey(input.openLibraryKey);
  }

  return null;
}

export async function searchExternalBooks(query: string): Promise<BookSearchResult[]> {
  const normalizedQuery = query.trim();

  if (normalizedQuery.length < 2) {
    return [];
  }

  const results = await Promise.allSettled([
    searchGoogleBooks(normalizedQuery),
    searchOpenLibrary(normalizedQuery),
  ]);

  const successfulResults = results.flatMap((result) =>
    result.status === 'fulfilled' ? result.value : [],
  );

  for (const result of results) {
    if (result.status === 'rejected') {
      console.error(result.reason);
    }
  }

  if (successfulResults.length === 0 && results.every((result) => result.status === 'rejected')) {
    throw new Error('All book providers failed');
  }

  return deduplicateBooks(successfulResults).slice(0, SEARCH_RESULTS_LIMIT);
}
