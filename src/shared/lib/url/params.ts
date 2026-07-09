import { ReadonlyURLSearchParams } from 'next/navigation';

export function createSearchParams(searchParams: ReadonlyURLSearchParams | null) {
  return new URLSearchParams(searchParams?.toString() ?? '');
}

export function setParam(params: URLSearchParams, key: string, value?: string) {
  if (!value) {
    params.delete(key);
  } else {
    params.set(key, value);
  }

  return params;
}

export function toggleArrayParam(params: URLSearchParams, key: string, value: string) {
  const current = params.get(key)?.split(',').filter(Boolean) ?? [];

  const next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];

  if (next.length) {
    params.set(key, next.join(','));
  } else {
    params.delete(key);
  }

  return params;
}
