import { LoginButton } from './LoginButton';
import { HeaderDropdown } from './HeaderDropdown';
import { getCurrentUser } from '@/features/auth/api/getCurrentUser';
import { UserClient } from '@/widgets/Header/ui/UserClient';
import { ActivityDropdown } from '@/widgets/Header/ui/ActivityDropwdown';
import AddDropDown from '@/widgets/Header/ui/AddDropDown';

export async function HeaderUserBar() {
  const user = await getCurrentUser();

  return (
    <div className="flex shrink-0 items-center gap-3 lg:gap-5">
      {/* Ниже lg кнопка «Добавить» живет во второй строке хедера */}
      <div className="hidden lg:mr-2.5 lg:block">
        <AddDropDown></AddDropDown>
      </div>
      <UserClient user={user}></UserClient>
      <ActivityDropdown></ActivityDropdown>

      {user ? <HeaderDropdown user={user} /> : <LoginButton />}
    </div>
  );
}

export default HeaderUserBar;
