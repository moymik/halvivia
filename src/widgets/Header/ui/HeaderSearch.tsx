'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

import { cn } from '@/shared';

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

type HeaderSearchProps = {
  autoFocus?: boolean;
  // Вызывается после перехода к результату (мобильная строка поиска при этом закрывается).
  onNavigate?: () => void;
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

export function HeaderSearch({ autoFocus = false, onNavigate }: HeaderSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResponse>(EMPTY_RESULTS);
  const [resultsQuery, setResultsQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [focused, setFocused] = useState(autoFocus);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const normalizedQuery = query.trim();
  const shouldSearch = normalizedQuery.length >= 2;
  const isOpen = focused && shouldSearch;

  // Показываем результаты только для текущего поискового запроса.
  const visibleResults = shouldSearch && resultsQuery === normalizedQuery ? results : EMPTY_RESULTS;

  const isLoading = shouldSearch && loading;
  const hasError = shouldSearch && error;

  // Плоский список для навигации стрелками — в том же порядке, что и на экране.
  const flatItems = SECTIONS.flatMap((section) => visibleResults[section.key]);
  const totalResults = flatItems.length;
  const sectionOffsets = SECTIONS.map((_, sectionIndex) =>
    SECTIONS.slice(0, sectionIndex).reduce(
      (sum, section) => sum + visibleResults[section.key].length,
      0,
    ),
  );

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
        setActiveIndex(-1);
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

  function resetSearch() {
    setFocused(false);
    setQuery('');
    setActiveIndex(-1);
    onNavigate?.();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      setFocused(false);
      inputRef.current?.blur();
      return;
    }

    if (!isOpen || totalResults === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % totalResults);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? totalResults - 1 : index - 1));
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      router.push(flatItems[activeIndex].href);
      resetSearch();
    }
  }

  return (
    <div ref={rootRef} className="relative w-full min-w-0 flex-1" onKeyDown={handleKeyDown}>
      <div className="group relative">
        <Search
          aria-hidden="true"
          strokeWidth={1.75}
          className={cn(
            'pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 transition-colors duration-200',
            query
              ? 'text-text-primary'
              : 'text-text-secondary group-focus-within:text-text-primary',
          )}
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(event) => {
            setQuery(event.target.value);
            setFocused(true);
          }}
          onFocus={() => setFocused(true)}
          placeholder="Поиск"
          aria-label="Поиск фильмов, книг и игр"
          aria-expanded={isOpen}
          aria-controls="header-search-results"
          aria-activedescendant={
            isOpen && activeIndex >= 0 ? `header-search-option-${activeIndex}` : undefined
          }
          role="combobox"
          autoComplete="off"
          className="border-border-default bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-border-white h-10 w-full rounded-lg border pr-10 pl-10 text-base transition-colors duration-200 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
        />
        {query && (
          <button
            type="button"
            aria-label="Очистить поиск"
            // Не уводим фокус с поля, чтобы можно было сразу набрать новый запрос.
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              setQuery('');
              setActiveIndex(-1);
              inputRef.current?.focus();
            }}
            className="text-text-secondary group-focus-within:text-text-primary hover:text-text-primary absolute top-1/2 right-3 flex size-6 -translate-y-1/2 items-center justify-center rounded-md transition-colors duration-200"
          >
            <X className="size-4" strokeWidth={2} aria-hidden="true" />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          id="header-search-results"
          role="listbox"
          className="border-border-default bg-bg-surface absolute top-full left-0 z-600 mt-2 max-h-[70vh] w-full overflow-y-auto rounded-lg border py-2 shadow-xl"
        >
          {isLoading && <p className="text-text-secondary px-4 py-2 text-sm">Ищем...</p>}

          {!isLoading && hasError && (
            <p className="text-error px-4 py-2 text-sm">
              Не удалось выполнить поиск. Попробуйте ещё раз.
            </p>
          )}

          {!isLoading && !hasError && totalResults === 0 && (
            <p className="text-text-secondary px-4 py-2 text-sm">Ничего не найдено</p>
          )}

          {!isLoading &&
            !hasError &&
            SECTIONS.map((section, sectionIndex) => {
              const items = visibleResults[section.key];

              if (items.length === 0) {
                return null;
              }

              return (
                <section key={section.key} className="py-1">
                  <h3 className="text-text-secondary px-4 py-2 text-xs font-medium tracking-wider uppercase">
                    {section.label}
                  </h3>

                  <ul>
                    {items.map((item, indexInSection) => {
                      const index = sectionOffsets[sectionIndex] + indexInSection;
                      const active = index === activeIndex;

                      return (
                        <li
                          key={`${item.type}-${item.id}`}
                          id={`header-search-option-${index}`}
                          role="option"
                          aria-selected={active}
                        >
                          <Link
                            href={item.href}
                            onClick={resetSearch}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={cn(
                              'flex items-center gap-3 px-4 py-2 transition-colors duration-200 focus-visible:outline-none',
                              active && 'bg-bg-hover',
                            )}
                          >
                            {item.image ? (
                              <img
                                src={item.image}
                                alt=""
                                loading="lazy"
                                className="bg-bg-hover h-12 w-9 shrink-0 rounded object-cover"
                              />
                            ) : (
                              <div
                                aria-hidden="true"
                                className="bg-bg-hover h-12 w-9 shrink-0 rounded"
                              />
                            )}

                            <span className="min-w-0 flex-1">
                              <span className="text-text-primary block truncate text-sm font-medium">
                                {item.title}
                              </span>

                              {item.subtitle && (
                                <span className="text-text-secondary mt-0.5 block truncate text-xs">
                                  {item.subtitle}
                                </span>
                              )}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
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
