import { findUserById } from '@/entities/user';
import { verifySession } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config';
import UserAvatar from '@/entities/user/ui/UserAvatar';

export type UserPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function UserPage({ params }: UserPageProps) {
  const session = await verifySession();
  if (session.status === 'unauthenticated') {
    redirect(ROUTES.LOGIN);
  }

  const resolvedParams = await params;
  const user = await findUserById(resolvedParams.id);
  if (!user) {
    return <>Пользователь не найден...</>;
  }

  return (
    <div className="w-full max-w-3xl space-y-6">
      {/* Profile header */}
      <div className="flex items-center gap-5 rounded-2xl bg-gray-900 p-6 shadow-lg">
        <UserAvatar user={user} className={'h-30 w-30 rounded-sm'}></UserAvatar>

        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{user.name}</h1>
          <p className="text-sm text-gray-400">{user.role}</p>
          <p className="text-sm text-gray-500">{user.email ?? 'Email не указан'}</p>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-gray-900 p-5">
          <h2 className="mb-2 text-sm text-gray-400">User ID</h2>
          <p className="text-sm break-all">{user.id}</p>
        </div>

        <div className="rounded-xl bg-gray-900 p-5">
          <h2 className="mb-2 text-sm text-gray-400">Discord ID</h2>
          <p className="text-sm">{user.discordId}</p>
        </div>

        <div className="rounded-xl bg-gray-900 p-5 md:col-span-2">
          <h2 className="mb-2 text-sm text-gray-400">Email</h2>
          <p className="text-sm">{user.email ?? 'Не привязан'}</p>
        </div>

        <div className="rounded-xl bg-gray-900 p-5 md:col-span-2">
          <h2 className="mb-2 text-sm text-gray-400">Role</h2>
          <span className="inline-block rounded-full bg-indigo-600 px-3 py-1 text-xs">
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
