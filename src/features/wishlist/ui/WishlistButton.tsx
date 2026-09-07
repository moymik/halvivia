'use client';

import { useState, useTransition } from 'react';

import type { ActionResult } from '@/shared/model';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config';
import WishlistIcon from '@/shared/assets/wishlist.svg';
import { CrossIcon } from '@/shared/ui/icons/CrossIcon';

type WishlistButtonProps = {
  isInWishlist: boolean;
  onAddAction: () => Promise<ActionResult<string>>;
  onRemoveAction: () => Promise<ActionResult<string>>;
  onSuccess?: () => void;
  variant?: 'default' | 'compactRemove';
};

export function WishlistButton({
  isInWishlist: initialIsInWishlist,
  onAddAction,
  onRemoveAction,
  onSuccess,
  variant = 'default',
}: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const result = isInWishlist ? await onRemoveAction() : await onAddAction();

      if (!result.success) {
        console.error(
          isInWishlist ? 'Failed to remove from wishlist' : 'Failed to add to wishlist',
          result.error,
        );

        if (result.error === 'UNAUTHORIZED') {
          redirect(ROUTES.LOGIN);
        }

        return;
      }

      setIsInWishlist((current) => !current);
      onSuccess?.();
    });
  }

  const label = isInWishlist ? 'Remove from wishlist' : 'Add to wishlist';
  const isCompactRemove = variant === 'compactRemove';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={label}
      title={label}
      className={
        isCompactRemove
          ? 'flex size-5 items-center justify-center rounded-full bg-black/35 text-white/70 opacity-60 transition-[background-color,color,opacity] duration-200 hover:bg-black/55 hover:text-white hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
          : undefined
      }
    >
      {isCompactRemove ? (
        <CrossIcon className="[&_path]:stroke-opacity-100 h-2.5 w-2.5" aria-hidden="true" />
      ) : (
        <WishlistIcon
          className={isInWishlist ? 'text-[#F9F9F9]' : 'text-transparent'}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
