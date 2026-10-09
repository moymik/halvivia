'use client';

import { useId } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import type { BookListFilters } from '@/pages/library/model/searchParams';
import { BOOK_SORT_OPTIONS } from '@/pages/library/model/searchParams';
import { BOOK_SECTIONS } from '@/entities/books/model/sections';
import { useListQuery } from '@/shared/lib/url/hooks';
import {
  FilterCheckboxList,
  FilterField,
  FilterInput,
  FilterLinkButton,
  FilterPanel,
  FilterSelect,
} from '@/widgets/CatalogFilters';

type Props = {
  filters: BookListFilters;
  categories: string[];
};

type BookFilterKey =
  | 'search'
  | 'sort'
  | 'author'
  | 'publisher'
  | 'language'
  | 'ratingFrom'
  | 'category'
  | 'section';

// Без раздела /library показывает обзор с полками, а не каталог, поэтому сброс фильтров
// разделы сохраняет — их снимают отдельно, через список «Разделы».
const RESET_KEPT_KEYS = ['section'] as const satisfies readonly BookFilterKey[];

const SECTION_OPTIONS = BOOK_SECTIONS.map((section) => ({
  value: section.id,
  label: section.label,
}));

export function BookFilterForm({ filters, categories }: Props) {
  const id = useId();
  const { updateParam, toggleArrayParam, reset } = useListQuery<BookFilterKey>();

  const debouncedUpdate = useDebouncedCallback((key: BookFilterKey, value: string) => {
    updateParam(key, value);
  }, 1000);

  const allSectionsSelected = filters.section?.length === BOOK_SECTIONS.length;

  function handleToggleAllSections() {
    if (allSectionsSelected) {
      updateParam('section', '');
      return;
    }

    updateParam('section', BOOK_SECTIONS.map((section) => section.id).join(','));
  }

  const categoryOptions = categories.map((category) => ({ value: category, label: category }));

  return (
    <FilterPanel
      onReset={() => {
        debouncedUpdate.cancel();
        reset(RESET_KEPT_KEYS);
      }}
    >
      <FilterInput
        withSearchIcon
        type="search"
        aria-label="Поиск по названию книги"
        defaultValue={filters.search ?? ''}
        placeholder="Поиск"
        onChange={(event) => debouncedUpdate('search', event.target.value)}
      />

      <FilterField label="Сортировка" htmlFor={`${id}-sort`}>
        <FilterSelect
          id={`${id}-sort`}
          options={BOOK_SORT_OPTIONS}
          value={filters.sort}
          onChange={(event) => updateParam('sort', event.target.value)}
        />
      </FilterField>

      <FilterField
        label="Разделы"
        hint="Можно выбрать один или несколько разделов."
        action={
          <FilterLinkButton onClick={handleToggleAllSections}>
            {allSectionsSelected ? 'Снять все' : 'Выбрать все'}
          </FilterLinkButton>
        }
      >
        <FilterCheckboxList
          label="Разделы"
          options={SECTION_OPTIONS}
          isChecked={(sectionId) => filters.section?.includes(sectionId) ?? false}
          onToggle={(sectionId) => toggleArrayParam('section', sectionId)}
        />
      </FilterField>

      <FilterField label="Автор" htmlFor={`${id}-author`}>
        <FilterInput
          id={`${id}-author`}
          defaultValue={filters.author ?? ''}
          placeholder="Например, Терри Пратчетт"
          onChange={(event) => debouncedUpdate('author', event.target.value)}
        />
      </FilterField>

      <FilterField label="Издатель" htmlFor={`${id}-publisher`}>
        <FilterInput
          id={`${id}-publisher`}
          defaultValue={filters.publisher ?? ''}
          placeholder="Название издателя"
          onChange={(event) => debouncedUpdate('publisher', event.target.value)}
        />
      </FilterField>

      <FilterField label="Язык" htmlFor={`${id}-language`}>
        <FilterInput
          id={`${id}-language`}
          defaultValue={filters.language ?? ''}
          placeholder="Например, ru"
          onChange={(event) => debouncedUpdate('language', event.target.value)}
        />
      </FilterField>

      <FilterField label="Рейтинг пользователей от" htmlFor={`${id}-rating`}>
        <FilterInput
          id={`${id}-rating`}
          type="number"
          min={0}
          max={10}
          step={0.1}
          defaultValue={filters.ratingFrom ?? ''}
          onChange={(event) => debouncedUpdate('ratingFrom', event.target.value)}
        />
      </FilterField>

      <FilterField label="Категории">
        <FilterCheckboxList
          label="Категории"
          options={categoryOptions}
          isChecked={(category) => filters.category?.includes(category) ?? false}
          onToggle={(category) => toggleArrayParam('category', category)}
        />
      </FilterField>
    </FilterPanel>
  );
}

export default BookFilterForm;
