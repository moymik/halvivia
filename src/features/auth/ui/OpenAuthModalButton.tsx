'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useAuthModalStore } from '@/features/auth/model/AuthModalStore';

type OpenAuthModalButtonProps = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode;
};

export function OpenAuthModalButton({ children, onClick, ...props }: OpenAuthModalButtonProps) {
  const openModal = useAuthModalStore((state) => state.openModal);

  return (
    <button
      type="button"
      {...props}
      onClick={(event) => {
        onClick?.(event);
        openModal();
      }}
    >
      {children}
    </button>
  );
}

export default OpenAuthModalButton;
