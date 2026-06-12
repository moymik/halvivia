import { ReactNode, Suspense } from 'react';

export function FilmPageLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={'loading'}>{children}</Suspense>;
}

export default FilmPageLayout;
