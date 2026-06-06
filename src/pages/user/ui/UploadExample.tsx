'use client';

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from '@imagekit/next';

import { ComponentPropsWithoutRef, useRef, useState } from 'react';
import { getUploadAuth } from '../api/ImageKitAuth';
import { setUserAvatarUrl } from '@/entities/user/api/actions';

type UploadExampleProps = {
  folder: '/avatars' | '/posters' | '/books';
} & ComponentPropsWithoutRef<'div'>;

export function UploadExample({ folder, className }: UploadExampleProps) {
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const abortController = new AbortController();

  const authenticator = async () => {
    try {
      const data = await getUploadAuth();
      const { signature, expire, token, publicKey, userId } = data;
      return { signature, expire, token, publicKey, userId };
    } catch (error) {
      console.error('Authentication error:', error);
      throw new Error('Authentication request failed');
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;

    if (!fileInput?.files?.length) {
      alert('Please select a file to upload');
      return;
    }

    const file = fileInput.files[0];

    let authParams;

    try {
      authParams = await authenticator();
    } catch (err) {
      console.error('Failed to authenticate:', err);
      return;
    }

    const { signature, expire, token, publicKey, userId } = authParams;

    try {
      const uploadResponse = await upload({
        file,
        fileName: file.name,
        signature,
        expire,
        token,
        publicKey,
        folder: folder,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortController.signal,
      });
      console.log(userId);
      if (uploadResponse.filePath && folder === '/avatars')
        await setUserAvatarUrl(uploadResponse.filePath);
      ///uploadResponse.path; user avatarurl authparams
      console.log('Upload response:', uploadResponse);
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error('Upload aborted:', error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error('Invalid request:', error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error('Network error:', error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error('Server error:', error.message);
      } else {
        console.error('Upload error:', error);
      }
    }
  };

  return (
    <div className={className}>
      <input type="file" ref={fileInputRef} />
      <button type="button" onClick={handleUpload}>
        Upload file
      </button>
      <br />
      Upload progress: <progress value={progress} max={100} />
    </div>
  );
}

export default UploadExample;
/*
*
*
* {
    "fileId": "6a2492135c7cd75eb8dec7cb",
    "name": "Magnificentws_Elephant_b-VPEgMsyP.jpg",
    "size": 190361,
    "versionInfo": {
        "id": "6a2492135c7cd75eb8dec7cb",
        "name": "Version 1"
    },
    "filePath": "/Magnificentws_Elephant_b-VPEgMsyP.jpg",
    "url": "https://ik.imagekit.io/k6zwwjwel/Magnificentws_Elephant_b-VPEgMsyP.jpg",
    "fileType": "image",
    "height": 1313,
    "width": 736,
    "thumbnailUrl": "https://ik.imagekit.io/k6zwwjwel/tr:n-ik_ml_thumbnail/Magnificentws_Elephant_b-VPEgMsyP.jpg",
    "AITags": null,
    "description": null
}
* */
