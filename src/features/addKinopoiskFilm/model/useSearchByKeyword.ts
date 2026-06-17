'use client';

import { useCallback, useState } from 'react';
import { FilmSearchByKeywordItem } from '@/features/addKinopoiskFilm/model/types';
import { getFilmsByKeywordAction } from '@/features/addKinopoiskFilm/api/actions';

type State = {
  data: FilmSearchByKeywordItem[] | null;
  loading: boolean;
  error: string | null;
};

export function useSearchByKeyword() {
  const [state, setState] = useState<State>({
    data: null,
    loading: false,
    error: null,
  });

  const search = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    setState((p) => ({ ...p, loading: true, error: null }));

    const res = await getFilmsByKeywordAction(keyword);

    if (!res.success) {
      setState({
        data: null,
        loading: false,
        error: res.error,
      });
      return;
    }

    setState({
      data: res.data,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    search,
  };
}
