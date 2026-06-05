'use client';

import { useAuthModalStore } from '../model/AuthModalStore';
type AuthModalProps = Readonly<{
  children: React.ReactNode;
}>;

export function AuthModal({ children }: AuthModalProps) {
  const { open, closeModal } = useAuthModalStore();
  if (!open) return null;

  return (
    <div
      className="bg-bg-overlay z:50 backdrop-blur-2xs fixed inset-0 flex justify-center pt-[27vh] lg:z-1000"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      {children}
    </div>
  );
}
