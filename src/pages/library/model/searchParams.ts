import { z } from 'zod';
import { isBookSectionId } from '@/entities/books/model/sections';
import type { BookSectionId } from '@/entities/books/model/types';
import { ROUTES } from '@/shared/config/navigation/routes';

export const BOOKS_PAGE_SIZE = 24;

export const BOOK_SORT_OPTIONS = [
  { value: 'newest', label: 'Сначала новые' },
  { value: 'oldest', label: 'Сначала старые' },
  { value: 'title_asc', label: 'Название А–Я' },
  { value: 'title_desc', label: 'Название Я–А' },
  { value: 'rating_desc', label: 'Рейтинг ↓' },
  { value: 'rating_asc', label: 'Рейтинг ↑' },
] as const;

export const BOOK_SORT_MAP = {
  newest: 'created_at DESC',
  oldest: 'created_at ASC',
  title_asc: 'title ASC, created_at DESC',
  title_desc: 'title DESC, created_at DESC',
  rating_desc: 'halva_score DESC NULLS LAST, created_at DESC',
  rating_asc: 'halva_score ASC NULLS LAST, created_at DESC',
} as const;

export type BookSort = keyof typeof BOOK_SORT_MAP;

const BookListFiltersSchema = z.object({
  search: z.string().trim().min(1).optional(),
  author: z.string().trim().min(1).optional(),
  publisher: z.string().trim().min(1).optional(),
  language: z.string().trim().min(1).optional(),
  ratingFrom: z.number().min(0).max(10).optional(),
  category: z.array(z.string().trim().min(1)).optional(),
  section: z.array(z.string().refine(isBookSectionId)).optional(),
  sort: z
    .enum(['newest', 'oldest', 'title_asc', 'title_desc', 'rating_desc', 'rating_asc'])
    .default('newest'),
  page: z.number().int().positive().default(1),
});

export type BookListFilters = Omit<z.infer<typeof BookListFiltersSchema>, 'section'> & {
  section?: BookSectionId[];
};

type SearchParams = Record<string, string | string[] | undefined>;

function parseList(value: string | string[] | undefined) {
  if (typeof value !== 'string') return undefined;

  const items = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length ? items : undefined;
}

function parseRating(value: string | string[] | undefined) {
  if (typeof value !== 'string' || value.trim() === '') return undefined;

  const rating = Number(value);

  return Number.isFinite(rating) && rating >= 0 && rating <= 10 ? rating : undefined;
}

export function parseBookListFilters(params: SearchParams): BookListFilters {
  const pageValue = typeof params.page === 'string' ? Number(params.page) : Number.NaN;
  const page = Number.isSafeInteger(pageValue) && pageValue > 0 ? pageValue : undefined;
  const sort = typeof params.sort === 'string' ? params.sort : undefined;
  const section = parseList(params.section)?.filter(isBookSectionId);

  return BookListFiltersSchema.parse({
    search: typeof params.search === 'string' && params.search.trim() ? params.search : undefined,
    author: typeof params.author === 'string' && params.author.trim() ? params.author : undefined,
    publisher:
      typeof params.publisher === 'string' && params.publisher.trim()
        ? params.publisher
        : undefined,
    language:
      typeof params.language === 'string' && params.language.trim() ? params.language : undefined,
    ratingFrom: parseRating(params.ratingFrom),
    category: parseList(params.category),
    section,
    sort,
    page,
  });
}

export function booksCatalogHref(filters: BookListFilters, page = 1) {
  const params = new URLSearchParams();

  if (filters.section?.length) params.set('section', filters.section.join(','));
  if (filters.search) params.set('search', filters.search);
  if (filters.author) params.set('author', filters.author);
  if (filters.publisher) params.set('publisher', filters.publisher);
  if (filters.language) params.set('language', filters.language);
  if (filters.ratingFrom !== undefined) params.set('ratingFrom', String(filters.ratingFrom));
  if (filters.category?.length) params.set('category', filters.category.join(','));
  if (filters.sort !== 'newest') params.set('sort', filters.sort);
  if (page > 1) params.set('page', String(page));

  const query = params.toString();

  return query ? `${ROUTES.LIBRARY}?${query}` : ROUTES.LIBRARY;
}
