'use client';

import { useEffect } from 'react';
import { useCurrentUserStore } from '@/entities/user/model/currentUserStore';
import { User } from '@/entities/user';

export function UserClient({ user }: { user: User | null }) {
  const setUser = useCurrentUserStore((state) => state.setCurrentUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
}
