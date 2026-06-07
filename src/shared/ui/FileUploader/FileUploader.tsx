'use client';
import Image from 'next/image';
import { useFileUpload } from './useFileUpload';
import { Button } from '@/shared/ui/Button';
import { DownloadIcon } from '@/shared/ui/icons';
import { useEffect } from 'react';
type FileUploaderProps = {
  handleFileChange: (file: File) => void;
};

export function FileUploader({ handleFileChange }: FileUploaderProps) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] = useFileUpload({
    accept: 'image/*',
  });

  useEffect(() => {
    const file = files[0]?.file;

    if (file instanceof File) {
      handleFileChange(file);
    }
  }, [files, handleFileChange]);

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="inline-flex items-center gap-2 align-top">
        <div
          className="border-input relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border"
          aria-label={previewUrl ? 'Preview of uploaded image' : 'Default user avatar'}
        >
          {previewUrl ? (
            <Image
              className="size-full object-cover"
              src={previewUrl}
              alt="Preview of uploaded image"
              width={32}
              height={32}
            />
          ) : (
            <DownloadIcon className="opacity-60" width="16" height="16" aria-hidden="true" />
          )}
        </div>
        <div className="relative inline-block">
          <Button onClick={openFileDialog} aria-haspopup="dialog">
            {fileName ? 'Change image' : 'Upload image'}
          </Button>
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
            tabIndex={-1}
          />
        </div>
      </div>
      {fileName ? (
        <div className="inline-flex gap-2 text-xs">
          <p className="text-muted-foreground truncate" aria-live="polite">
            {fileName}
          </p>{' '}
          <button
            onClick={() => removeFile(files[0]?.id)}
            className="text-destructive cursor-pointer font-medium hover:underline"
            aria-label={`Remove ${fileName}`}
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="inline-flex gap-2 text-xs">
          <p className="text-muted-foreground truncate" aria-live="polite">
            No image attached
          </p>
        </div>
      )}
    </div>
  );
}
