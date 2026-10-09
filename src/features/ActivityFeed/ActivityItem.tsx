import { ActivityFeedItem } from '@/entities/activity/model/types';
import UserAvatarMini from '@/entities/user/ui/UserAvatarMini';
import UserLink from '@/pages/user/ui/UserLink';
import Link from 'next/link';
import { formatRelativeTime, getSubjectRef } from '@/shared/lib/utils';
import { getRatingColorClass } from '@/entities/rating/lib/utils';

type ActivityItemProps = {
  event: ActivityFeedItem;
};

export function ActivityItem({ event }: ActivityItemProps) {
  return (
    <article className="flex shrink-0 items-start gap-3">
      <UserLink userId={event.actor.id} className="shrink-0">
        <UserAvatarMini className="size-9 border-0 md:size-9" avatarUrl={event.actor.avatarUrl} />
      </UserLink>

      <div className="min-w-0 text-sm leading-4">
        <p className="text-text-primary break-words">
          <UserLink userId={event.actor.id} className="text-primary hover:underline">
            {event.actor.username}
          </UserLink>{' '}
          {renderEventText(event)}
        </p>
        <p className="text-text-secondary mt-1 text-xs leading-4">
          {formatRelativeTime(event.createdAt)}
        </p>
      </div>
    </article>
  );
}

function renderEventText(event: ActivityFeedItem) {
  const subjectHref = getSubjectRef(event.subject);

  const subjectLink = (
    <Link href={subjectHref} className="text-text-secondary hover:underline">
      {`“${
        event.subject.title.length > 30
          ? event.subject.title.slice(0, 30) + '...'
          : event.subject.title
      }”`}
    </Link>
  );

  switch (event.eventType) {
    case 'subject.created':
      return <>добавил {subjectLink}</>;

    case 'subject.rated': {
      const value = getRatingValue(event.metadata);
      return (
        <>
          оценил {subjectLink} на <span className={getRatingColorClass(value)}>{value}</span>
        </>
      );
    }

    case 'subject.commented': {
      const commentPreview = getCommentPreview(event.metadata);
      const parentCommentId = getParentCommentId(event.metadata);

      if (parentCommentId) {
        return (
          <>
            ответил на комментарий к {subjectLink}:<br />
            {commentPreview && (
              <>
                <span className="text-text-secondary">«{commentPreview}»</span>
              </>
            )}
          </>
        );
      }

      return (
        <>
          оставил комментарий к {subjectLink}:<br />
          {commentPreview && (
            <>
              <span className="text-text-secondary">«{commentPreview}»</span>
            </>
          )}
        </>
      );
    }

    case 'subject.reviewed':
      return <>написал рецензию на {subjectLink}</>;

    default:
      return null;
  }
}

function getRatingValue(metadata: Record<string, unknown>) {
  const ratingValue = metadata.ratingValue;

  return typeof ratingValue === 'number' ? ratingValue : null;
}

function getCommentPreview(metadata: Record<string, unknown>) {
  return typeof metadata.commentPreview === 'string' ? metadata.commentPreview : null;
}

function getParentCommentId(metadata: Record<string, unknown>) {
  return typeof metadata.parentCommentId === 'string' ? metadata.parentCommentId : null;
}
