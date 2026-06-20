import 'client-only';
import { User } from '@/entities/user/model/types';
import { create } from 'zustand';
type currentUserStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  updateCurrentUser: (data: Partial<User>) => void;
};

export const useCurrentUserStore = create<currentUserStore>((set) => ({
  currentUser: null,

  setCurrentUser: (user) => set({ currentUser: user }),

  updateCurrentUser: (data) =>
    set((state) => {
      if (!state.currentUser) {
        return state;
      }

      return {
        currentUser: {
          ...state.currentUser,
          ...data,
        },
      };
    }),
}));
