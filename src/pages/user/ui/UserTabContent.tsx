import { UserTab, USER_TABS } from '@/pages/user/model';

type UserTabContentProps = {
  userId: string;
  activeTab: UserTab;
};

export function UserTabContent({ userId, activeTab }: UserTabContentProps) {
  switch (activeTab) {
    case USER_TABS.BOOKS:
      //return <PlannedBooks userId={userId} />;
      return <div>Книги</div>;

    case USER_TABS.MOVIES:
      //return <PlannedMovies userId={userId} />;
      return <div>Фильмы</div>;
    case USER_TABS.RATINGS:
      //return <UserRatings userId={userId} />;
      return <div>Рейтинг</div>;
    case USER_TABS.UPLOADS:
      //return <UserUploads userId={userId} />;
      return <div>Загрузки</div>;
  }
}

export default UserTabContent;
