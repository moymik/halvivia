'use client';

import { useState, useTransition } from 'react';

import type { ActionResult } from '@/shared/model';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config';
import WishlistIcon from '@/shared/assets/wishlist.svg';

type WishlistButtonProps = {
  isInWishlist: boolean;
  onAddAction: () => Promise<ActionResult<string>>;
  onRemoveAction: () => Promise<ActionResult<string>>;
};

export function WishlistButton({
  isInWishlist: initialIsInWishlist,
  onAddAction,
  onRemoveAction,
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
    });
  }

  const label = isInWishlist ? 'Remove from wishlist' : 'Add to wishlist';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={label}
      title={label}
    >
      <WishlistIcon
        className={isInWishlist ? 'text-[#F9F9F9]' : 'text-transparent'}
        aria-hidden="true"
      />
    </button>
  );
}
