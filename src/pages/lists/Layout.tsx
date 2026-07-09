import { Suspense } from 'react';

export type LayoutProps = { children: React.ReactNode };

export function Layout({ children }: LayoutProps) {
  return <Suspense>{children}</Suspense>;
}

export default Layout;
