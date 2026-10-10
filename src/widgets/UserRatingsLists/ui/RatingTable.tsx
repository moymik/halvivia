'use client';

import Link from 'next/link';
import { useState } from 'react';

import type { RatingTableRow } from '@/widgets/UserRatingsLists/model/types';
import { getRatingColorClass } from '@/entities/rating/lib/utils';
import { cn } from '@/shared';
import { getSubjectRef } from '@/shared/lib/utils';

type RatingTableProps = {
  items: RatingTableRow[];
};

function formatRatingDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function RatingTooltip({ item }: { item: RatingTableRow }) {
  return (
    <div
      className={cn(
        'absolute top-full left-0 z-600 mt-2 hidden w-[min(20rem,calc(100vw-2rem))]',
        'rounded-xl border border-slate-200 bg-white p-3 shadow-xl',
        'group-focus-within:flex group-hover:flex',
        'md:left-4',
      )}
    >
      <div className="flex min-w-0 gap-3">
        {item.posterUrl ? (
          <img
            src={item.posterUrl}
            alt=""
            className="h-20 w-14 shrink-0 rounded-md bg-slate-100 object-cover sm:h-24 sm:w-16"
          />
        ) : (
          <div className="h-20 w-14 shrink-0 rounded-md bg-slate-100 sm:h-24 sm:w-16" />
        )}

        <div className="min-w-0">
          <div className="line-clamp-2 text-sm font-semibold text-slate-900">{item.title}</div>

          <div className="mt-1 text-xs text-slate-500">
            {formatRatingDate(item.userRatingCreatedAt)}
          </div>

          <div className="mt-2">
            <span
              className={cn(
                'inline-flex min-w-8 items-center justify-center rounded-md px-2 py-1 text-xs font-bold',
                getRatingColorClass(Number(item.userRating)),
              )}
            >
              {item.userRating}
            </span>
          </div>

          {item.meta && <p className="mt-2 line-clamp-2 text-xs text-slate-500">{item.meta}</p>}

          {item.description && (
            <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function RatingTable({ items }: RatingTableProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-slate-200">
      <div className="overflow-visible rounded-xl">
        <table className="w-full min-w-[360px] border-collapse text-left text-xs sm:min-w-[480px] sm:text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th
                scope="col"
                className="border-b border-slate-200 px-3 py-3 font-medium text-slate-500 sm:px-5 sm:py-3.5"
              >
                Название
              </th>
              <th
                scope="col"
                className="w-[112px] border-b border-slate-200 px-2 py-3 font-medium text-slate-500 sm:w-auto sm:px-5 sm:py-3.5"
              >
                <span className="sm:hidden">Дата</span>
                <span className="hidden sm:inline">Дата оценки</span>
              </th>
              <th
                scope="col"
                className="w-[76px] border-b border-slate-200 px-2 py-3 font-medium text-slate-500 sm:w-auto sm:px-5 sm:py-3.5"
              >
                Оценка
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {items.map((item) => {
              const href = getSubjectRef({
                type: item.type,
                id: item.id,
              });

              const tooltipKey = `${item.type}-${item.id}`;

              return (
                <tr key={tooltipKey} className="transition-colors hover:bg-slate-50/80">
                  <td className="relative px-3 py-3 sm:px-5 sm:py-4">
                    <div
                      className="group relative w-fit max-w-full"
                      onMouseEnter={() => setActiveTooltip(tooltipKey)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <Link
                        href={href}
                        className="hover:text-primary line-clamp-2 font-medium break-words text-slate-900 transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none sm:line-clamp-1"
                        onFocus={() => setActiveTooltip(tooltipKey)}
                        onBlur={() => setActiveTooltip(null)}
                      >
                        {item.title}
                      </Link>

                      {activeTooltip === tooltipKey && <RatingTooltip item={item} />}
                    </div>
                  </td>

                  <td className="px-2 py-3 text-xs whitespace-nowrap text-slate-500 sm:px-5 sm:py-4 sm:text-sm">
                    {formatRatingDate(item.userRatingCreatedAt)}
                  </td>

                  <td className="px-2 py-3 sm:px-5 sm:py-4">
                    <span
                      className={cn(
                        'inline-flex min-w-9 items-center justify-center rounded-md px-2 py-1.5 font-semibold tabular-nums sm:min-w-12 sm:rounded-lg sm:px-2.5 sm:py-1.5',
                        getRatingColorClass(Number(item.userRating)),
                      )}
                    >
                      {item.userRating}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {items.length === 0 && (
        <div className="px-4 py-10 text-center text-sm text-slate-500 sm:py-14">
          Пока нет оценок
        </div>
      )}
    </div>
  );
}
