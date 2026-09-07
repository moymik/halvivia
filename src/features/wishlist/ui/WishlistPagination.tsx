'use client';

import { useListQuery } from '@/shared/lib/url/hooks';
import { Pagination } from '@/shared/ui/pagination/pagination';

type WishlistPaginationProps = {
  page: number;
  totalPages: number;
};

export function WishlistPagination({ page, totalPages }: WishlistPaginationProps) {
  const { updateParam } = useListQuery<'page'>();

  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      variant="onLight"
      onChange={(nextPage) => updateParam('page', String(nextPage))}
    />
  );
}
