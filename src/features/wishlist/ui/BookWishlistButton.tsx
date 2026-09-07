'use client';

import { WishlistButton } from '@/features/wishlist/ui/WishlistButton';
import {
  addBookToWishlistAction,
  removeBookFromWishlistAction,
} from '@/features/wishlist/api/actions';

type BookWishlistButtonProps = {
  bookId: string;
  isInWishlist: boolean;
};

export function BookWishlistButton({ bookId, isInWishlist }: BookWishlistButtonProps) {
  return (
    <WishlistButton
      isInWishlist={isInWishlist}
      onAddAction={() => addBookToWishlistAction(bookId)}
      onRemoveAction={() => removeBookFromWishlistAction(bookId)}
    />
  );
}
