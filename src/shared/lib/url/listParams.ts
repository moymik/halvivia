import { ReadonlyURLSearchParams } from 'next/navigation';
import { createSearchParams, setParam, toggleArrayParam } from '@/shared/lib/url/params';

export function updateListParam(
  searchParams: ReadonlyURLSearchParams | null,
  key: string,
  value?: string,
) {
  const params = createSearchParams(searchParams);

  setParam(params, key, value);

  if (key !== 'page') {
    params.delete('page');
  }

  return params;
}

export function toggleListArrayParam(
  searchParams: ReadonlyURLSearchParams | null,
  key: string,
  value: string,
) {
  const params = createSearchParams(searchParams);

  toggleArrayParam(params, key, value);

  params.delete('page');

  return params;
}
