import { create } from 'zustand';

export type AddSubjectDialog = 'film' | 'book' | 'game' | null;

type AddSubjectDialogStore = {
  openedDialog: AddSubjectDialog;
  openDialog: (dialog: Exclude<AddSubjectDialog, null>) => void;
  closeDialog: () => void;
};

export const useAddSubjectDialogStore = create<AddSubjectDialogStore>((set) => ({
  openedDialog: null,
  openDialog: (dialog) => set({ openedDialog: dialog }),
  closeDialog: () => set({ openedDialog: null }),
}));
