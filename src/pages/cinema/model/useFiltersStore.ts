import { create } from 'zustand';

type FiltersState = {
  selectedGenreIds: number[];
  toggleGenre: (id: number) => void;
  clearGenres: () => void;
};

export const useFiltersStore = create<FiltersState>((set, get) => ({
  selectedGenreIds: [],

  toggleGenre: (id) => {
    const current = get().selectedGenreIds;

    const next = current.includes(id) ? current.filter((g) => g !== id) : [...current, id];

    set({
      selectedGenreIds: next.sort((a, b) => a - b),
    });
  },

  clearGenres: () => {
    set({ selectedGenreIds: [] });
  },
}));
