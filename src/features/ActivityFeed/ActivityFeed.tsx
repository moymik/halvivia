import { getRecentActivity } from '@/entities/activity/api/db';
import { ActivityItem } from '@/features/ActivityFeed/ActivityItem';
import { OpenAuthModalButton } from '@/features/auth';
import { verifySession } from '@/shared/lib/auth';

type ActivityFeedProps = {
  limit?: number;
};

export async function ActivityFeed({ limit = 25 }: ActivityFeedProps) {
  const session = await verifySession();

  return (
    // Высоты из макета: 305px до lg, 255px на десктопе. Список скроллится до самой нижней
    // кромки панели — нижний отступ живет внутри скролла, а не режет видимую область.
    <div className="flex max-h-76.25 flex-col lg:max-h-63.75">
      <div className="px-4 pt-4">
        <h2 className="font-heading border-border-default border-b pb-2.5 text-base leading-5 font-medium">
          Уведомления
        </h2>
      </div>

      <ActivityFeedBody limit={limit} authenticated={session.status !== 'unauthenticated'} />
    </div>
  );
}

async function ActivityFeedBody({
  limit,
  authenticated,
}: {
  limit: number;
  authenticated: boolean;
}) {
  if (!authenticated) {
    return (
      <p className="text-text-secondary px-4 pt-3 pb-4 text-sm">
        <OpenAuthModalButton className="text-primary hover:underline">Войдите</OpenAuthModalButton>,
        чтобы посмотреть последнюю активность
      </p>
    );
  }

  const events = await getRecentActivity(limit);
  if (events.length === 0) {
    return <p className="text-text-secondary px-4 pt-3 pb-4 text-sm">Пока нет активности</p>;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4">
      {events.map((event) => (
        <ActivityItem key={event.id} event={event} />
      ))}
    </div>
  );
}
