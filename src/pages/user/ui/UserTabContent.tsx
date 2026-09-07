import { UserTab, USER_TABS } from '@/pages/user/model';
import UserRatings from '@/pages/user/ui/UserRatings';
import { FilmWishlistGrid } from '@/features/wishlist/ui/FilmsWishlist';
import { BookWishlistGrid } from '@/features/wishlist/ui/BooksWishlist';

type UserTabContentProps = {
  userId: string;
  activeTab: UserTab;
  page: number;
  canRemoveFromWishlist: boolean;
};

export function UserTabContent({
  userId,
  activeTab,
  page,
  canRemoveFromWishlist,
}: UserTabContentProps) {
  switch (activeTab) {
    case USER_TABS.BOOKS:
      return <BookWishlistGrid userId={userId} page={page} canRemove={canRemoveFromWishlist} />;

    case USER_TABS.MOVIES:
      return <FilmWishlistGrid userId={userId} page={page} canRemove={canRemoveFromWishlist} />;
    case USER_TABS.RATINGS:
      return <UserRatings userId={userId} />;
    case USER_TABS.UPLOADS:
      //return <UserUploads userId={userId} />;
      return <div>Загрузки</div>;
  }
}

export default UserTabContent;
