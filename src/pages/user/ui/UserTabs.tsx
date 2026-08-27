'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/shared';

export function UserTabs({ userId }: { userId: string }) {
  const searchParams = useSearchParams();

  const activeTab = searchParams?.get('tab') ?? 'books';

  const tabs = [
    {
      value: 'books',
      label: 'Планирую прочитать',
    },
    {
      value: 'movies',
      label: 'Планирую посмотреть',
    },
    {
      value: 'ratings',
      label: 'Мои оценки',
    },
    {
      value: 'uploads',
      label: 'Мои загрузки',
    },
  ];

  return (
    <div className="flex gap-5 lg:gap-15">
      {tabs.map((tab) => (
        <Link
          key={tab.value}
          href={`/user/${userId}?tab=${tab.value}`}
          className={cn(
            'text-text-inverse-500 text-base font-medium lg:text-lg',
            activeTab === tab.value && 'text-text-inverse border-border-default border-b-3',
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
