'use client';

import { useRouter } from 'next/navigation';
import { BookWishlistButton } from '@/features/wishlist/ui/BookWishlistButton';
import { FilmWishlistButton } from '@/features/wishlist/ui/FilmWishlistButton';

type WishlistRemoveButtonProps =
  | { type: 'book'; bookId: string }
  | { type: 'film'; filmId: string };

export function WishlistRemoveButton(props: WishlistRemoveButtonProps) {
  const router = useRouter();
  const onSuccess = () => router.refresh();

  if (props.type === 'book') {
    return (
      <BookWishlistButton
        bookId={props.bookId}
        isInWishlist
        onSuccess={onSuccess}
        variant="compactRemove"
      />
    );
  }

  return (
    <FilmWishlistButton
      filmId={props.filmId}
      isInWishlist
      onSuccess={onSuccess}
      variant="compactRemove"
    />
  );
}
