'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/shared/ui/Input';

type SearchItem = {
  id: string;
  type: 'film' | 'book' | 'game';
  title: string;
  subtitle: string;
  image: string | null;
  href: string;
};

type SearchResponse = {
  films: SearchItem[];
  books: SearchItem[];
  games: SearchItem[];
};

const SECTIONS = [
  { key: 'films', label: 'Фильмы' },
  { key: 'books', label: 'Книги' },
  { key: 'games', label: 'Игры' },
] as const;

const EMPTY_RESULTS: SearchResponse = {
  films: [],
  books: [],
  games: [],
};

export function HeaderSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResponse>(EMPTY_RESULTS);
  const [resultsQuery, setResultsQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [focused, setFocused] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  const normalizedQuery = query.trim();
  const shouldSearch = normalizedQuery.length >= 2;
  const isOpen = focused && shouldSearch;

  // Показываем результаты только для текущего поискового запроса.
  const visibleResults = shouldSearch && resultsQuery === normalizedQuery ? results : EMPTY_RESULTS;

  const isLoading = shouldSearch && loading;
  const hasError = shouldSearch && error;

  const totalResults =
    visibleResults.films.length + visibleResults.books.length + visibleResults.games.length;

  useEffect(() => {
    if (!shouldSearch) {
      return;
    }

    const controller = new AbortController();

    const timeoutId = window.setTimeout(async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(normalizedQuery)}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const data = (await response.json()) as SearchResponse;

        if (controller.signal.aborted) {
          return;
        }

        setResults(data);
        setResultsQuery(normalizedQuery);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        if (controller.signal.aborted) {
          return;
        }

        setResults(EMPTY_RESULTS);
        setResultsQuery(normalizedQuery);
        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [normalizedQuery, shouldSearch]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setFocused(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative w-full"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setFocused(false);
        }
      }}
    >
      <div className="relative">
        <Input
          type="search"
          variant="dark"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Поиск"
          aria-label="Поиск фильмов, книг и игр"
          aria-expanded={isOpen}
          aria-controls="header-search-results"
          autoComplete="off"
          searchIcon="always"
        />
      </div>

      {isOpen && (
        <div
          id="header-search-results"
          className="border-border-default bg-bg-surface absolute top-full left-0 z-[600] mt-2 max-h-[70vh] w-full min-w-[320px] overflow-y-auto rounded-xl border shadow-xl"
        >
          {isLoading && <p className="px-4 py-3 text-sm opacity-60">Ищем...</p>}

          {!isLoading && hasError && (
            <p className="px-4 py-3 text-sm text-red-500">
              Не удалось выполнить поиск. Попробуйте ещё раз.
            </p>
          )}

          {!isLoading && !hasError && totalResults === 0 && (
            <p className="px-4 py-3 text-sm opacity-60">Ничего не найдено</p>
          )}

          {!isLoading &&
            !hasError &&
            SECTIONS.map((section) => {
              const items = visibleResults[section.key];

              if (items.length === 0) {
                return null;
              }

              return (
                <section key={section.key} className="py-2">
                  <h3 className="px-4 py-2 text-xs font-semibold tracking-wider uppercase opacity-60">
                    {section.label}
                  </h3>

                  <ul>
                    {items.map((item) => (
                      <li
                        key={`${item.type}-${item.id}`}
                        className="hover:bg-primary transition-colors duration-300 ease-in"
                      >
                        <Link
                          href={item.href}
                          onClick={() => {
                            setFocused(false);
                            setQuery('');
                          }}
                          className="focus-visible:bg-bg-surface-hover flex items-center gap-3 px-4 py-2 transition focus-visible:outline-none"
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt=""
                              loading="lazy"
                              className="h-12 w-9 shrink-0 rounded bg-black/10 object-cover"
                            />
                          ) : (
                            <div
                              aria-hidden="true"
                              className="h-12 w-9 shrink-0 rounded bg-black/10"
                            />
                          )}

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium">{item.title}</span>

                            {item.subtitle && (
                              <span className="mt-0.5 block truncate text-xs opacity-60">
                                {item.subtitle}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default HeaderSearch;
