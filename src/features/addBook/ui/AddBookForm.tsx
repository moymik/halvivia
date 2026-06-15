'use client';

import type { BookSearchResultPreview } from '@/entities/books/model/types';
import { Button } from '@/shared/ui/Button';
import Input from '@/shared/ui/Input/Input';
import { FormEvent } from 'react';
import { useAddBook } from '../model/useAddBook';
import { useBookSearch } from '../model/useBookSearch';
import { AddBookStatusMessage } from './AddBookStatusMessage';
import { BookSectionPicker } from './BookSectionPicker';
import { SearchResultsPanel } from './SearchResultsPanel';

type AddBookFormProps = {
  onAdded?: () => void;
};

export function AddBookForm({ onAdded }: AddBookFormProps) {
  const {
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
  } = useBookSearch();
  const { status, isAdding, addSelectedBook, resetStatus } = useAddBook({ onAdded });

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetStatus();
    void searchBooks(query);
  }

  function handleQueryChange(value: string) {
    resetStatus();
    updateQuery(value);
  }

  function handleSelect(book: BookSearchResultPreview) {
    resetStatus();
    selectBook(book);
  }

  return (
    <div className="text-text-inverse flex w-full flex-col gap-3">
      <form className="flex" onSubmit={handleSearch}>
        <Input
          searchIcon
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
          aria-label="Поиск книги"
          placeholder="Название, автор или ISBN"
          className="h-10 rounded-lg pr-8 text-sm"
        />
      </form>

      <SearchResultsPanel
        results={results}
        selectedBook={selectedBook}
        isSearching={isSearching}
        onSelect={handleSelect}
      />

      {selectedBook && (
        <BookSectionPicker selectedSections={selectedSections} onChange={setSelectedSections} />
      )}

      {errorMessage && <p className="text-error text-sm">{errorMessage}</p>}
      <AddBookStatusMessage status={status} />

      <Button
        disabled={!selectedBook || isAdding}
        type="button"
        variant="primaryOnLight"
        className="w-full"
        onClick={() => void addSelectedBook(selectedBook, selectedSections)}
      >
        {isAdding ? 'Добавление...' : 'Добавить'}
      </Button>
    </div>
  );
}

export default AddBookForm;
