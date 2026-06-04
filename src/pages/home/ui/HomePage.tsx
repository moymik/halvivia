import { withAuth } from '@/shared/lib/auth/dal';
import { startDiscordLinkAction } from '@/features/auth/discord/startDiscordAuthAction';
import { findUserById } from '@/entities/user/api/db';

export async function testAuthAction() {
  'use server';
  const session = await withAuth();
  console.log('SESSION:', session);

  if (session) {
    const user = await findUserById(session?.userId);
    console.log(user);
  }
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
        <form action={startDiscordLinkAction}>
          <button type="submit">ПОДКЛЮЧИТЬ ДИСКОРД АККАУНТ</button>
        </form>
        <div className={'h-240'}>home page</div>
        <div className={'h-540'}>home page</div>
      </main>
    </div>
  );
}

export default HomePage;
