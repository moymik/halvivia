'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export type SessionRefreshProps = {
  enabled: boolean;
};

export function SessionRefresh({ enabled }: SessionRefreshProps) {
  const router = useRouter();
  const refreshInFlightRef = useRef(false);

  useEffect(() => {
    if (!enabled || refreshInFlightRef.current) {
      return;
    }

    refreshInFlightRef.current = true;

    fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'same-origin',
    })
      .catch((error: unknown) => console.error(error))
      .finally(() => {
        refreshInFlightRef.current = false;
        router.refresh();
      });
  }, [enabled, router]);

  return null;
}

export default SessionRefresh;
