import { BOOK_SECTIONS } from '@/entities/books/model/sections';
import type { BookSectionId } from '@/entities/books/model/types';

type BookSectionPickerProps = {
  selectedSections: BookSectionId[];
  onChange: (sectionIds: BookSectionId[]) => void;
};

export function BookSectionPicker({ selectedSections, onChange }: BookSectionPickerProps) {
  const selectedSectionIds = new Set(selectedSections);

  function toggleSection(sectionId: BookSectionId) {
    const nextSectionIds = selectedSectionIds.has(sectionId)
      ? selectedSections.filter((selectedSectionId) => selectedSectionId !== sectionId)
      : [...selectedSections, sectionId];

    onChange(nextSectionIds.length > 0 ? nextSectionIds : [sectionId]);
  }

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-text-inverse-500 text-sm">Разделы</legend>
      <div className="flex flex-wrap gap-2">
        {BOOK_SECTIONS.map((section) => {
          const isSelected = selectedSectionIds.has(section.id);

          return (
            <button
              key={section.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggleSection(section.id)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                isSelected
                  ? 'border-primary bg-primary text-text-primary'
                  : 'border-border-inverse-200 text-text-inverse-500 hover:border-primary hover:text-text-inverse'
              }`}
            >
              {section.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
