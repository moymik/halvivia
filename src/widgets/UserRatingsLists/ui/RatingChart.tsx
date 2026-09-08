'use client';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
  type ActiveElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip);

export type RatingChartItem = {
  id: string;
  title: string;
  posterUrl: string | null;

  rating: -1 | 0 | 1 | 2;
  ratedAt: string;

  meta?: string;
  description?: string | null;
};

type RatingChartProps = {
  items: RatingChartItem[];
};

const RATING_LABELS: Record<number, string> = {
  [-1]: 'Не понравилось',
  0: 'Нейтрально',
  1: 'Понравилось',
  2: 'Очень понравилось',
};

const RATING_COLORS: Record<number, string> = {
  [-1]: '#ef4444',
  0: '#94a3b8',
  1: '#3b82f6',
  2: '#8b5cf6',
};

export function RatingChart({ items }: RatingChartProps) {
  const data: ChartData<'line'> = {
    datasets: [
      {
        label: 'Мои оценки',

        data: items.map((item) => ({
          x: new Date(item.ratedAt).getTime(),
          y: item.rating,
        })),

        borderColor: '#64748b',
        borderWidth: 2,

        tension: 0.25,

        pointRadius: 6,
        pointHoverRadius: 9,
        pointBorderWidth: 2,

        pointBackgroundColor: items.map((item) => RATING_COLORS[item.rating]),

        pointBorderColor: '#ffffff',

        fill: false,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: 'nearest',
      intersect: true,
    },

    animation: {
      duration: 250,
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: false,

        external: (context) => {
          const { chart, tooltip } = context;

          let tooltipEl = chart.canvas.parentNode?.querySelector(
            '.rating-tooltip',
          ) as HTMLDivElement | null;

          if (!tooltipEl) {
            tooltipEl = document.createElement('div');

            tooltipEl.className =
              'rating-tooltip pointer-events-none absolute z-50 opacity-0 transition-opacity duration-100';

            chart.canvas.parentNode?.appendChild(tooltipEl);
          }

          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = '0';
            return;
          }

          const point = tooltip.dataPoints?.[0];

          if (!point) {
            return;
          }

          const item = items[point.dataIndex];

          if (!item) {
            return;
          }

          const date = new Date(item.ratedAt);

          const formattedDate = date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });

          tooltipEl.innerHTML = `
            <div
              class="
                w-[280px]
                rounded-xl
                border
                border-slate-200
                bg-white
                p-3
                shadow-xl
              "
            >
              <div class="flex gap-3">
                ${
                  item.posterUrl
                    ? `
                      <img
                        src="${escapeHtml(item.posterUrl)}"
                        alt=""
                        class="
                          h-[90px]
                          w-[60px]
                          shrink-0
                          rounded-md
                          object-cover
                          bg-slate-100
                        "
                      />
                    `
                    : `
                      <div
                        class="
                          h-[90px]
                          w-[60px]
                          shrink-0
                          rounded-md
                          bg-slate-100
                        "
                      />
                    `
                }

                <div class="min-w-0">
                  <div
                    class="
                      line-clamp-2
                      text-sm
                      font-semibold
                      leading-5
                      text-slate-900
                    "
                  >
                    ${escapeHtml(item.title)}
                  </div>

                  <div
                    class="
                      mt-1
                      text-xs
                      text-slate-500
                    "
                  >
                    ${formattedDate}
                  </div>

                  <div class="mt-2 flex items-center gap-2">
                    <span
                      class="
                        inline-flex
                        h-6
                        min-w-6
                        items-center
                        justify-center
                        rounded-md
                        px-1.5
                        text-xs
                        font-bold
                        text-white
                      "
                      style="
                        background: ${RATING_COLORS[item.rating]}
                      "
                    >
                      ${item.rating}
                    </span>

                    <span
                      class="
                        text-xs
                        font-medium
                        text-slate-600
                      "
                    >
                      ${RATING_LABELS[item.rating]}
                    </span>
                  </div>
                </div>
              </div>

              ${
                item.meta
                  ? `
                    <div
                      class="
                        mt-3
                        text-xs
                        text-slate-500
                      "
                    >
                      ${escapeHtml(item.meta)}
                    </div>
                  `
                  : ''
              }

              ${
                item.description
                  ? `
                    <div
                      class="
                        mt-2
                        line-clamp-3
                        text-xs
                        leading-5
                        text-slate-500
                      "
                    >
                      ${escapeHtml(item.description)}
                    </div>
                  `
                  : ''
              }
            </div>
          `;

          const canvasRect = chart.canvas.getBoundingClientRect();
          const parentRect = chart.canvas.parentElement!.getBoundingClientRect();

          let left = canvasRect.left - parentRect.left + tooltip.caretX + 16;

          let top = canvasRect.top - parentRect.top + tooltip.caretY - 40;

          // Чтобы tooltip не вылезал справа
          if (left + 280 > parentRect.width) {
            left = canvasRect.left - parentRect.left + tooltip.caretX - 296;
          }

          // И не вылезал сверху
          if (top < 0) {
            top = 8;
          }

          tooltipEl.style.left = `${left}px`;
          tooltipEl.style.top = `${top}px`;
          tooltipEl.style.opacity = '1';
        },
      },
    },

    scales: {
      x: {
        type: 'linear',

        reverse: true,

        grid: {
          display: false,
        },

        border: {
          display: false,
        },

        ticks: {
          color: '#94a3b8',

          callback: (value) => {
            return new Date(Number(value)).toLocaleDateString('ru-RU', {
              month: 'short',
            });
          },
        },
      },

      y: {
        min: -1,
        max: 2,

        ticks: {
          stepSize: 1,
          color: '#64748b',

          padding: 8,

          callback: (value) => {
            return `${value}`;
          },
        },

        grid: {
          color: 'rgba(148, 163, 184, 0.16)',
        },

        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="relative h-[360px] w-full">
      <Line data={data} options={options} />
    </div>
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
