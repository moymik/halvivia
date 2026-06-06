import { Icon } from '@/shared/ui/icon';
import { LoginButton } from './LoginButton';
import { HeaderDropdown } from './HeaderDropdown';
import { findUserById, User } from '@/entities/user';
import { verifySession } from '@/shared/lib/auth';
export async function HeaderUserBar() {
  const session = await verifySession();
  let user: User | null = null;
  if (session.status !== 'unauthenticated') {
    user = await findUserById(session.payload.userId);
  }

  return (
    <div className="flex gap-4 lg:gap-6">
      <button
        className="transition-hover flex items-center rounded-md hover:bg-white/10"
        aria-label="Уведомления"
      >
        <Icon name={'NotificationIcon'} active={true} className="w-4 lg:w-5.5"></Icon>
      </button>
      <LoginButton sessionStatus={session.status} />
      {user && <HeaderDropdown user={user} />}
    </div>
  );
}

export default HeaderUserBar;
