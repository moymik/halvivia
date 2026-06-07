'use client';

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from '@imagekit/next';

import { ComponentPropsWithoutRef, useState } from 'react';
import { getUploadAuth } from './ImageKitAuth';
import { setUserAvatarUrl } from '@/entities/user/api/actions';
import { Folder } from './imageKitUploader.config';
import { Button } from '@/shared/ui/Button';
import { FileUploader } from '@/shared/ui/FileUploader/FileUploader';

type UploadExampleProps = {
  folder: Folder;
} & ComponentPropsWithoutRef<'div'>;

export function ImageKitUploader({ folder, className }: UploadExampleProps) {
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);

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
    let authParams;
    if (!file) return null;
    try {
      authParams = await authenticator();
    } catch (err) {
      console.error('Failed to authenticate:', err);
      return;
    }

    const { signature, expire, token, publicKey } = authParams;

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
      //TODO: тут по хорошему функцию удаление старого файла по uri нужно написать, которая будет вызываться опционально в handleUpload(через imagekit/nodejs)

      if (uploadResponse.filePath && folder === '/avatars')
        await setUserAvatarUrl(uploadResponse.filePath);
      console.log('Upload response:', uploadResponse);
      setFile(null);
      setProgress(0);
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
      <FileUploader handleFileChange={setFile} />
      {file !== null && (
        <>
          <Button type={'button'} variant={'primary'} onClick={handleUpload}>
            save
          </Button>
          <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100 shadow-inner">
            <div
              className="h-full bg-linear-to-r from-sky-400 via-blue-500 to-indigo-600 shadow-[0_0_10px_rgba(59,130,246,0.6)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ImageKitUploader;
