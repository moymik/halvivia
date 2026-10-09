import { ReactNode } from 'react';

type LoadingRegionProps = {
  children: ReactNode;
  className?: string;
};

export function LoadingRegion({ children, className }: LoadingRegionProps) {
  return (
    <div role="status" aria-busy="true" className={className}>
      <span className="sr-only">Загрузка…</span>
      {children}
    </div>
  );
}

export default LoadingRegion;
