'use client';

import { WishlistButton } from '@/features/wishlist/ui/WishlistButton';
import {
  addBookToWishlistAction,
  removeBookFromWishlistAction,
} from '@/features/wishlist/api/actions';

type BookWishlistButtonProps = {
  bookId: string;
  isInWishlist: boolean;
  onSuccess?: () => void;
  variant?: 'default' | 'compactRemove';
};

export function BookWishlistButton({
  bookId,
  isInWishlist,
  onSuccess,
  variant,
}: BookWishlistButtonProps) {
  return (
    <WishlistButton
      isInWishlist={isInWishlist}
      onAddAction={() => addBookToWishlistAction(bookId)}
      onRemoveAction={() => removeBookFromWishlistAction(bookId)}
      onSuccess={onSuccess}
      variant={variant}
    />
  );
}
