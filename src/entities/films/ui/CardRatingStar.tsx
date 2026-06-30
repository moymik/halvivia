import { StarIcon } from '@/shared/ui/icons';

type Props = React.ComponentProps<typeof StarIcon> & {
  averageRating: number | null;
  fillColor?: string;
};

export function CardRatingStar({ averageRating, fillColor = '#F9F9F9', ...props }: Props) {
  if (averageRating === null) {
    averageRating = -1;
  }

  const percent = ((averageRating + 1) / 3) * 100;
  return (
    <div className="relative inline-block">
      <div className={`absolute inset-0 overflow-hidden`} style={{ width: `${percent}%` }}>
        <StarIcon
          {...props}
          style={{
            color: fillColor,
            fill: fillColor,
          }}
        />
      </div>

      <StarIcon {...props} />
    </div>
  );
}
