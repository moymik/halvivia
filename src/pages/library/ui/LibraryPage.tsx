import { connection } from 'next/server';
import { getLibraryPageViewModel } from '../model/viewModel';
import { BookShelf } from './BookShelf';
import PlannedBooksShelf from '@/features/wishlist/ui/PlannedBooksShelf';
import { getBookCategories, listBooks } from '@/entities/books/api/db';
import { parseBookListFilters, BOOKS_PAGE_SIZE, booksCatalogHref } from '../model/searchParams';
import { BookFilterForm } from './BookFilterForm';
import { PaginationClient } from '@/pages/lists/PaginationClient';
import { BookCard } from '@/entities/books/ui/BookCard';
import Link from 'next/link';

const RECENT_BOOKS_TITLE = 'Новинки';
const RECENT_EMPTY_TEXT = 'Книги появятся здесь после добавления.';
const SHELF_EMPTY_TEXT = 'В этом разделе пока пусто.';
const PRIORITY_BOOK_COVERS_COUNT = 4;

type LibraryPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function LibraryPage({ searchParams }: LibraryPageProps) {
  await connection();

  const filters = parseBookListFilters(await searchParams);

  if (filters.section?.length) {
    const [{ books, totalCount }, categories] = await Promise.all([
      listBooks(filters),
      getBookCategories(),
    ]);
    const totalPages = Math.ceil(totalCount / BOOKS_PAGE_SIZE);

    return (
      <section className="page-content-width pr-0">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="flex min-w-0 flex-col gap-6 py-4 lg:py-6">
            <h1 className="text-2xl font-bold">{getSectionTitle(filters.section)}</h1>

            {books.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fill,148px)] justify-start gap-5 max-lg:grid-cols-[repeat(auto-fill,128px)] max-sm:grid-cols-[repeat(auto-fill,104px)]">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-text-muted rounded-lg border border-dashed border-white/10 p-4 text-sm">
                Ничего не найдено.{' '}
                {filters.page > 1 && (
                  <Link href={booksCatalogHref(filters)} className="text-text-primary underline">
                    Вернуться к первой странице
                  </Link>
                )}
              </div>
            )}

            <PaginationClient page={filters.page} totalPages={totalPages} />
          </div>

          <aside className="h-full w-full min-w-0 lg:justify-self-end">
            <BookFilterForm
              key={JSON.stringify(filters)}
              filters={filters}
              categories={categories}
            />
          </aside>
        </div>
      </section>
    );
  }

  const { recentBooks, sectionShelves, canAddBooks } = await getLibraryPageViewModel();

  return (
    <>
      <section className="bg-bg-base text-text-primary">
        <div className="page-content-width flex flex-col gap-5 py-8 lg:py-9">
          <BookShelf
            title={RECENT_BOOKS_TITLE}
            books={recentBooks}
            emptyText={RECENT_EMPTY_TEXT}
            priorityCount={PRIORITY_BOOK_COVERS_COUNT}
          />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-42 bg-[url('/library-vector.png')] bg-size-[100%_auto] bg-bottom bg-no-repeat opacity-45 md:h-52" />
        <div className="page-content-width relative flex flex-col gap-10 py-8 lg:py-9">
          <PlannedBooksShelf></PlannedBooksShelf>
          {sectionShelves.map((section) => (
            <BookShelf
              key={section.id}
              title={section.title}
              books={section.books}
              emptyText={SHELF_EMPTY_TEXT}
              muted
            />
          ))}
        </div>
      </section>
    </>
  );
}

function getSectionTitle(sectionIds: string[]) {
  const sectionTitles: Record<string, string> = {
    fiction: 'Художественная литература',
    comics: 'Комиксы и манга',
    nonfiction: 'Нон-фикшн',
    'it-design': 'IT и дизайн',
    classic: 'Классика',
  };

  return sectionIds.length === 1 ? (sectionTitles[sectionIds[0]] ?? 'Книги') : 'Книги';
}

export default LibraryPage;
