import { findUserById } from '@/entities/user';
import { verifySession } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config';
import { UserAvatarFull } from '@/entities/user/ui/userAvatarFull';
import DiscordLinkButton from '@/features/auth/ui/DiscordLinkButton';
import { UploadExample } from './UploadExample';

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
    <div className="flex w-full flex-col gap-5 space-y-6 md:flex-row">
      {/* Profile header */}
      <div className="flex w-max flex-col items-center gap-5 rounded-2xl bg-gray-900 p-6 shadow-lg">
        <div className={'flex-col'}>
          <UserAvatarFull user={user}></UserAvatarFull>
          <h1 className="text-xl font-semibold">{user.name}</h1>
          <p className="text-sm text-gray-400">{user.role}</p>
          <p className="text-sm text-gray-500">{user.email ?? 'Email не указан'}</p>
        </div>
        <UploadExample folder={'/avatars'} />
      </div>
      {/* Info cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-gray-900 p-5">
          <h2 className="mb-2 text-sm text-gray-400">User ID</h2>
          <p className="text-sm break-all">{user.id}</p>
        </div>

        <div className="flex flex-col gap-5 rounded-xl bg-gray-900 p-5">
          <h2 className="mb-2 text-sm text-gray-400">Discord ID</h2>
          <p className="text-sm">{user.discordId}</p>
          <DiscordLinkButton />
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
