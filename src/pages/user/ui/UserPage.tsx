import { findUserById } from '@/entities/user';
import { verifySession } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config';
import UserAvatarMini from '@/entities/user/ui/UserAvatarMini';
import { Separator } from '@/shared/ui/separator';
import { UserTabs } from '@/pages/user/ui/UserTabs';
import UserTabContent from '@/pages/user/ui/UserTabContent';
import { getUserTab } from '@/pages/user/model';

export type UserPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    tab?: string;
  }>;
};

export async function UserPage({ params, searchParams }: UserPageProps) {
  const [session, { id }, { tab }] = await Promise.all([verifySession(), params, searchParams]);

  if (session.status === 'unauthenticated') {
    redirect(ROUTES.LOGIN);
  }

  const user = await findUserById(id);

  if (!user) {
    return <div>Пользователь не найден...</div>;
  }

  const isOwner = session.payload.userId === user.id;

  const activeTab = getUserTab(tab);

  return (
    <div className="flex w-full flex-col py-4.5 md:py-7">
      <div className="page-content-width">
        <UserAvatarMini className={'border-none lg:h-[4.9vw] lg:w-[4.9vw]'} user={user} />
        <h1 className={'text-text-inverse mt-0.5 text-xl font-semibold md:mt-1.5 md:text-2xl'}>
          {user.name}
        </h1>
      </div>
      <div> tabspan</div>

      <div className="page-content-width">
        <UserTabs userId={user.id} />
      </div>
      <Separator className={'bg-border-second w-screen'} />
      <div>
        <UserTabContent userId={user.id} activeTab={activeTab} />
      </div>
    </div>
  );
}

export default UserPage;
