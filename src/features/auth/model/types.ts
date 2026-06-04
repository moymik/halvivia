export type AuthUser = {
  role: 'MEMBER' | 'GUEST' | null;
  id: string;
  name: string;
  email: string | null;
  passwordHash: string;
};

export type RegisterUser = {
  name: string;
  email: string | null;
  passwordHash: string;
  role: 'USER' | 'GUEST' | null;
};

export type AuthModalState = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};
