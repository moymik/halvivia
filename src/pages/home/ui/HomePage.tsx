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
        <div>
          <p>default image</p>
          <img
            src="/ravi-sharma-OZkjKLwgWX0-unsplash.jpg"
            className={'h-100 w-100 object-cover'}
            alt="sss"
          />
          <p>nextImage</p>
          <NextImage
            width={300}
            height={300}
            className={'w-1/3'}
            src={'/ravi-sharma-OZkjKLwgWX0-unsplash.jpg'}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={'img'}
          ></NextImage>
          <p>Next image webp</p>
          <NextImage
            width={300}
            height={300}
            className={'w-1/3'}
            src={'/file_example_WEBP_1500kB.webp'}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={'img'}
          ></NextImage>
          <p>imagekit</p>
          <Image
            urlEndpoint={`https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGEKIT_ID}`} // New prop
            src="/avatars/ravi-sharma-OZkjKLwgWX0-unsplash.jpg"
            ///className={cn('border-primary h-15 w-15 rounded-full border-2')}
            width={300}
            height={300}
            alt="Picture of the author"
          />
        </div>

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
