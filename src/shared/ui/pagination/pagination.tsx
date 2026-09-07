import { useMemo } from 'react';

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  variant?: 'default' | 'onLight';
};

export function Pagination({ page, totalPages, onChange, variant = 'default' }: PaginationProps) {
  const pagination = useMemo(() => {
    const delta = 2;
    const pages: (number | '...')[] = [];

    const rangeStart = Math.max(2, page - delta);
    const rangeEnd = Math.min(totalPages - 1, page + delta);

    pages.push(1);

    if (rangeStart > 2) {
      pages.push('...');
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }, [page, totalPages]);

  if (totalPages <= 1) return null;

  const isOnLight = variant === 'onLight';
  const controlClassName = isOnLight
    ? 'border-border-inverse-200 text-text-inverse hover:bg-bg-base-050'
    : '';
  const pageClassName = isOnLight
    ? 'bg-primary text-white hover:bg-primary-dark'
    : 'bg-black text-white';

  return (
    <div
      className={`mt-6 flex items-center justify-center gap-2 ${isOnLight ? 'text-text-inverse' : ''}`}
    >
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`rounded border px-3 py-2 disabled:opacity-50 ${controlClassName}`}
      >
        ←
      </button>

      {pagination.map((item, index) =>
        item === '...' ? (
          <span key={`dots-${index}`} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`h-10 w-10 rounded border ${
              item === page ? pageClassName : isOnLight ? controlClassName : 'hover:bg-gray-100'
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={`rounded border px-3 py-2 disabled:opacity-50 ${controlClassName}`}
      >
        →
      </button>
    </div>
  );
}
