import { Icon } from '@/shared/ui/icon';
import { LoginButton } from './LoginButton';
import { HeaderDropdown } from './HeaderDropdown';
import { getCurrentAuthUser } from '@/features/auth/api/getCurrentAuthUser';

export async function HeaderUserBar() {
  const user = await getCurrentAuthUser();
  return (
    <div className="flex gap-4 lg:gap-6">
      <button
        className="transition-hover flex items-center rounded-md hover:bg-white/10"
        aria-label="Уведомления"
      >
        <Icon name={'NotificationIcon'} active={true} className="w-4 lg:w-5.5"></Icon>
      </button>

      {user ? <HeaderDropdown user={user} /> : <LoginButton />}
    </div>
  );
}

export default HeaderUserBar;
