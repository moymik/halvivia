'use client';

import type { BookSearchResultPreview, BookSectionId } from '@/entities/books/model/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { searchBooksAction } from '../api/actions';
import { getInitialSections } from './bookSearchPreview';

const SEARCH_DEBOUNCE_MS = 450;

export function useBookSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BookSearchResultPreview[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookSearchResultPreview | null>(null);
  const [selectedSections, setSelectedSections] = useState<BookSectionId[]>(
    getInitialSections(null),
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const requestIdRef = useRef(0);

  const resetSearch = useCallback(() => {
    requestIdRef.current += 1;
    setResults([]);
    setSelectedBook(null);
    setSelectedSections(getInitialSections(null));
    setErrorMessage(null);
    setIsSearching(false);
  }, []);

  const searchBooks = useCallback(async (nextQuery: string) => {
    const normalizedQuery = nextQuery.trim();
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    if (normalizedQuery.length < 2) {
      setResults([]);
      setSelectedBook(null);
      setErrorMessage('Введи хотя бы два символа');
      return;
    }

    setErrorMessage(null);
    setIsSearching(true);

    try {
      const response = await searchBooksAction(normalizedQuery);

      if (requestId !== requestIdRef.current) {
        return;
      }

      if (!response.success) {
        setResults([]);
        setSelectedBook(null);
        setErrorMessage(
          {
            QUERY_TOO_SHORT: 'Введи хотя бы два символа',
            QUERY_TOO_LONG: 'Запрос слишком длинный',
            RATE_LIMITED: 'Слишком много запросов, попробуй чуть позже',
            UNAUTHORIZED: 'Поиск книг доступен только участникам сообщества',
            SEARCH_FAILED: 'Не удалось найти книги',
          }[response.error],
        );
        return;
      }

      const firstBook = response.books[0] ?? null;
      setResults(response.books);
      setSelectedBook(firstBook);
      setSelectedSections(getInitialSections(firstBook));
      setErrorMessage(response.books.length === 0 ? 'Ничего не нашлось' : null);
    } finally {
      if (requestId === requestIdRef.current) {
        setIsSearching(false);
      }
    }
  }, []);

  const updateQuery = useCallback(
    (value: string) => {
      setQuery(value);

      if (value.trim().length < 2) {
        resetSearch();
      }
    },
    [resetSearch],
  );

  const selectBook = useCallback((book: BookSearchResultPreview) => {
    setSelectedBook(book);
    setSelectedSections(getInitialSections(book));
    setErrorMessage(null);
  }, []);

  useEffect(() => {
    const normalizedQuery = query.trim();

    if (normalizedQuery.length < 2) {
      return;
    }

    const timeout = window.setTimeout(() => {
      void searchBooks(normalizedQuery);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [query, searchBooks]);

  return {
    query,
    results,
    selectedBook,
    selectedSections,
    errorMessage,
    isSearching,
    searchBooks,
    selectBook,
    setSelectedSections,
    updateQuery,
  };
}
