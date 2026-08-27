import { Suspense } from 'react';

export function UserPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'bg-bg-inverse'}>
      <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
    </div>
  );
}
export default UserPageLayout;
