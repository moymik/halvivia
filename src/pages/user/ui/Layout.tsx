import { Suspense } from 'react';

export function UserPageLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div>loading...</div>}>{children}</Suspense>;
}
export default UserPageLayout;
