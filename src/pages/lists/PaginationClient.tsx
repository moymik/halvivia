'use client';

import { Pagination } from '@/shared/ui/pagination/pagination';
import { useListQuery } from '@/shared/lib/url/hooks';

type Props = {
  page: number;
  totalPages: number;
};

export function PaginationClient({ page, totalPages }: Props) {
  const { updateParam } = useListQuery();

  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      onChange={(page) => updateParam('page', String(page))}
    />
  );
}
