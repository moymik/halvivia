'use server';

import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: `https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGEKIT_ID}`,
});

export async function getImageKitAuth() {
  const authParams = imagekit.getAuthenticationParameters();

  return authParams;
}
