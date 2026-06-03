import { create } from 'zustand';
import { AuthModalState } from '@/features/auth/model/types';

export const useAuthModalStore = create<AuthModalState>((set) => ({
  open: false,
  openModal: () => {
    set({ open: true });
  },
  closeModal: () => set({ open: false }),
}));
