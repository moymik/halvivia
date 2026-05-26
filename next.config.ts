import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      new URL('https://i.pinimg.com/**'),
      new URL(`https://${process.env.NEXT_PUBLIC_BLOB_ID}.public.blob.vercel-storage.com/**`),
    ],
  },
  /* config options here */
};

export default nextConfig;
