'use client';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { createRoot, type Root } from 'react-dom/client';
import { Line } from 'react-chartjs-2';

import type { RatingChartItem } from '@/widgets/UserRatingsLists/model/types';

import { RatingTooltip } from './RatingTooltip';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip);

type RatingHistoryChartProps = {
  items: RatingChartItem[];
};

type TooltipContentElement = HTMLDivElement & {
  __ratingTooltipRoot?: Root;
};

type TooltipElement = HTMLDivElement & {
  __ratingTooltipContent?: TooltipContentElement;
  __ratingTooltipProgress?: HTMLDivElement;
};

const RATING_COLORS: Record<RatingChartItem['rating'], string> = {
  [-1]: '#ef4444',
  [0]: '#94a3b8',
  [1]: '#3b82f6',
  [2]: '#8b5cf6',
};

const TOOLTIP_DELAY = 200;

const tooltipHideTimers = new WeakMap<HTMLDivElement, number>();

export function RatingHistoryChart({ items }: RatingHistoryChartProps) {
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
        pointBorderColor: '#ffffff',
        pointBackgroundColor: items.map((item) => RATING_COLORS[item.rating]),
        fill: false,
        clip: false,
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
      duration: 150,
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: false,

        external: ({ chart, tooltip }) => {
          const parent = chart.canvas.parentNode;

          if (!parent) {
            return;
          }

          let tooltipEl = parent.querySelector('.rating-history-tooltip') as TooltipElement | null;

          if (!tooltipEl) {
            tooltipEl = document.createElement('div') as TooltipElement;

            tooltipEl.className = ` rating-history-tooltip absolute z-50 opacity-0 transition-opacity duration-100 `;
            const contentEl = document.createElement('div') as TooltipContentElement;

            contentEl.className = 'w-[280px]';

            const progressEl = document.createElement('div');

            progressEl.className = ` pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-b-xl bg-slate-400/40 transition-transform duration-200 ease-linear `;

            tooltipEl.__ratingTooltipContent = contentEl;

            tooltipEl.__ratingTooltipProgress = progressEl;

            tooltipEl.appendChild(contentEl);
            tooltipEl.appendChild(progressEl);

            tooltipEl.style.pointerEvents = 'none';

            tooltipEl.addEventListener('mouseenter', () => {
              const timer = tooltipHideTimers.get(tooltipEl!);

              if (timer) {
                window.clearTimeout(timer);
                tooltipHideTimers.delete(tooltipEl!);
              }

              tooltipEl!.__ratingTooltipProgress?.classList.remove('scale-x-100');

              tooltipEl!.style.opacity = '1';
              tooltipEl!.style.pointerEvents = 'auto';
            });

            tooltipEl.addEventListener('mouseleave', () => {
              tooltipEl!.style.opacity = '0';
              tooltipEl!.style.pointerEvents = 'none';

              tooltipEl!.__ratingTooltipProgress?.classList.remove('scale-x-100');
            });

            parent.appendChild(tooltipEl);
          }

          if (tooltip.opacity === 0) {
            const existingTimer = tooltipHideTimers.get(tooltipEl);

            if (existingTimer) {
              window.clearTimeout(existingTimer);
              tooltipHideTimers.delete(tooltipEl);
            }

            if (tooltipEl.matches(':hover')) {
              return;
            }

            const progressEl = tooltipEl.__ratingTooltipProgress;

            if (progressEl) {
              progressEl.classList.remove('scale-x-100');

              void progressEl.offsetWidth;

              progressEl.classList.add('scale-x-100');
            }

            const timer = window.setTimeout(() => {
              if (tooltipEl!.matches(':hover')) {
                return;
              }

              tooltipEl!.style.opacity = '0';
              tooltipEl!.style.pointerEvents = 'none';

              tooltipEl!.__ratingTooltipProgress?.classList.remove('scale-x-100');

              tooltipHideTimers.delete(tooltipEl!);
            }, TOOLTIP_DELAY);

            tooltipHideTimers.set(tooltipEl, timer);

            return;
          }

          const existingTimer = tooltipHideTimers.get(tooltipEl);

          if (existingTimer) {
            window.clearTimeout(existingTimer);
            tooltipHideTimers.delete(tooltipEl);
          }

          tooltipEl.__ratingTooltipProgress?.classList.remove('scale-x-100');

          const point = tooltip.dataPoints?.[0];

          if (!point) {
            return;
          }

          const item = items[point.dataIndex];

          if (!item) {
            return;
          }

          const contentEl = tooltipEl.__ratingTooltipContent;

          if (!contentEl) {
            return;
          }

          let root = contentEl.__ratingTooltipRoot;

          if (!root) {
            root = createRoot(contentEl);
            contentEl.__ratingTooltipRoot = root;
          }

          root.render(<RatingTooltip item={item} />);

          tooltipEl.style.opacity = '1';
          tooltipEl.style.pointerEvents = 'auto';

          tooltipEl.style.left = `${chart.canvas.offsetLeft + tooltip.caretX}px`;

          tooltipEl.style.top = `${chart.canvas.offsetTop + tooltip.caretY}px`;

          tooltipEl.style.transform = 'translate(-50%, calc(-100% - 12px))';
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
          maxTicksLimit: 7,

          callback: (value) =>
            new Date(Number(value)).toLocaleDateString('ru-RU', {
              month: 'short',
              year: 'numeric',
              day: 'numeric',
            }),
        },
      },

      y: {
        min: -1,
        max: 2,

        ticks: {
          stepSize: 1,
          color: '#64748b',
          padding: 8,
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
