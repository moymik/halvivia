import { LibraryPage } from '@/pages/library';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="bg-bg-base text-text-secondary px-4 py-10 md:px-8">
          Загружаем книги...
        </main>
      }
    >
      <LibraryPage />
    </Suspense>
  );
}
