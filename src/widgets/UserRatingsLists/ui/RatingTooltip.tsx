import type { RatingChartItem } from '../model/types';

import { RatingItem } from './RatingItem';

type RatingTooltipProps = {
  item: RatingChartItem;
};

export function RatingTooltip({ item }: RatingTooltipProps) {
  return (
    <div className="w-[280px] overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
      <RatingItem item={item} />
    </div>
  );
}
