import RatedBooksShelf from '@/widgets/UserRatingsLists/ui/RatedBooksShelf';
import RatedFilmsCarousel from '@/widgets/UserRatingsLists/ui/RatedFilmsCarousel';

export type UserRatingsTabProps = { userId: string };

export function UserRatings({ userId }: UserRatingsTabProps) {
  return (
    <div>
      <RatedFilmsCarousel userId={userId} />
      <RatedBooksShelf userId={userId} />
    </div>
  );
}

export default UserRatings;
