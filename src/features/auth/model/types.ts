export type AuthUser = {
  id: string;
  name: string;
  email: string | null;
  passwordHash: string;
};

export type RegisterUser = {
  name: string;
  email: string | null;
  passwordHash: string;
};

export type AuthModalState = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};
