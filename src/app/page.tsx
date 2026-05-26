import Image from 'next/image';
import { get } from '@vercel/blob';

export default function Home() {
  const BoysImageSrc = `https://${process.env.BLOB_STORE_ID}.public.blob.vercel-storage.com/movies/posters/the_boys.webp`;
  return (
    <div>
      <main>
        <div className={'h-40'}>home page</div>
        <Image
          src={'https://i.pinimg.com/736x/23/9d/be/239dbe4741f5a709132647fc737c83db.jpg'}
          width={640}
          height={851}
          alt="girl"
          loading={'eager'}
        ></Image>
        d
        <Image
          src={`https://${process.env.NEXT_PUBLIC_BLOB_ID}.public.blob.vercel-storage.com/movies/posters/the_boys.webp`}
          alt="User avatar"
          width={600}
          height={900}
          unoptimized
        />
        <img
          src={`https://ik.imagekit.io/k6zwwjwel/default-image.jpg?updatedAt=1779799773460`}
        ></img>
        <div className={'h-240'}>home page</div>
        <div className={'h-540'}>home page</div>
      </main>
    </div>
  );
}
