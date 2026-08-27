import { Suspense } from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div>loading...</div>}>{children}</Suspense>;
}
export default Layout;
