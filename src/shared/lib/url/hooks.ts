'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { toggleListArrayParam, updateListParam } from '@/shared/lib/url/listParams';

export function useListQuery<TKey extends string = string>() {
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const searchParams = useSearchParams();

  function pushParams(params: URLSearchParams) {
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return {
    searchParams,

    // Теперь ключ строго привязан к типу TKey
    updateParam(key: TKey, value?: string) {
      pushParams(updateListParam(searchParams, key, value));
    },

    // Здесь ключ также автоматически становится типом TKey
    toggleArrayParam(key: TKey, value: string) {
      pushParams(toggleListArrayParam(searchParams, key, value));
    },

    reset() {
      router.push(pathname);
    },
  };
}
