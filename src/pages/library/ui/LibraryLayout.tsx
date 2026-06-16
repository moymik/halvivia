import { ReactNode, Suspense } from 'react';

export function LibraryLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<>Загружаем книги...</>}>{children}</Suspense>;
}

export default LibraryLayout;
