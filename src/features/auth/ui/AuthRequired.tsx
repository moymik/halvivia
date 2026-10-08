'use client';

import { useEffect } from 'react';
import { useAuthModalStore } from '@/features/auth/model/AuthModalStore';

export function AuthRequired() {
  const openModal = useAuthModalStore((state) => state.openModal);

  useEffect(() => {
    openModal();
  }, [openModal]);

  return null;
}

export default AuthRequired;
