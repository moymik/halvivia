import { withAuth } from '@/shared/lib/auth/dal';
import Link from 'next/link';
import { NAVIGATION_LINKS } from '@/shared/config';
import { AppLink } from '@/shared/ui/app-link';
import { Button } from '@/shared/ui/Button';

export async function testAuthAction() {
  'use server';
  const session = await withAuth();

  console.log('SESSION:', session);
}
export function HomePage() {
  return (
    <div>
      <main>
        <div className={'h-40'}>home page</div>
        <form action={testAuthAction}>
          <button type="submit">Test Auth</button>
        </form>
        <img
          src={`https://ik.imagekit.io/k6zwwjwel/default-image.jpg?updatedAt=1779799773460`}
        ></img>
        <a href={NAVIGATION_LINKS.DISCORD_LINK_ACCOUNT.href}>ПОДКЛЮЧИТЬ ДИСКОРД АККАУНТ</a>
        <div className={'h-240'}>home page</div>
        <div className={'h-540'}>home page</div>
      </main>
    </div>
  );
}

export default HomePage;
