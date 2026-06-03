'use client';

import { useAuthModalStore } from '../model/store';
type AuthModalProps = Readonly<{
  children: React.ReactNode;
}>;

export function AuthModal({ children }: AuthModalProps) {
  const { open, closeModal } = useAuthModalStore();
  if (!open) return null;

  return (
    <div
      onClick={closeModal}
      className="bg-bg-overlay z:50 backdrop-blur-2xs fixed inset-0 flex justify-center pt-[27vh] lg:z-1000"
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
