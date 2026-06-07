import { withAuth } from '@/shared/lib/auth';

import { findUserById } from '@/entities/user';
import { Image } from '@imagekit/next';
import NextImage from 'next/image';

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
        <h1 className={'text text-[min(10vw,70px)]'}>home page</h1>

        <form action={testAuthAction}>
          <button type="submit">Test Auth</button>
        </form>
        <img
          src={`https://ik.imagekit.io/k6zwwjwel/default-image.jpg?updatedAt=1779799773460`}
        ></img>
      </main>
    </div>
  );
}

export default HomePage;
