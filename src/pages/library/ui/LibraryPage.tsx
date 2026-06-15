import { connection } from 'next/server';
import { getLibraryPageViewModel } from '../model/viewModel';
import { BookShelf } from './BookShelf';
import { LibraryToolbar } from './LibraryToolbar';

const RECENT_BOOKS_TITLE = 'Новинки';
const PLANNED_BOOKS_TITLE = 'Планирую прочитать';
const RECENT_EMPTY_TEXT = 'Книги появятся здесь после добавления.';
const PLANNED_EMPTY_TEXT = 'Planned Books пока не реализован.';
const SHELF_EMPTY_TEXT = 'В этом разделе пока пусто.';
const PRIORITY_BOOK_COVERS_COUNT = 4;

export async function LibraryPage() {
  await connection();
  const { recentBooks, plannedBooks, sectionShelves, canAddBooks } =
    await getLibraryPageViewModel();

  return (
    <div className="bg-bg-base text-text-primary">
      <section className="bg-bg-inverse text-text-inverse">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-5 px-4 py-8 md:px-8 lg:py-9">
          <BookShelf
            title={RECENT_BOOKS_TITLE}
            books={recentBooks}
            emptyText={RECENT_EMPTY_TEXT}
            priorityCount={PRIORITY_BOOK_COVERS_COUNT}
          />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-42 bg-[url('/library-vector.png')] [background-size:100%_auto] bg-bottom bg-no-repeat opacity-45 md:h-52" />
        <div className="relative mx-auto flex w-full max-w-[1100px] flex-col gap-10 px-4 py-8 md:px-8 lg:py-9">
          <LibraryToolbar canAddBooks={canAddBooks} />

          <BookShelf
            title={PLANNED_BOOKS_TITLE}
            books={plannedBooks}
            emptyText={PLANNED_EMPTY_TEXT}
            muted
          />

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
    </div>
  );
}

export default LibraryPage;
