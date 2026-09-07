'use client';

import { WishlistButton } from '@/features/wishlist/ui/WishlistButton';
import {
  addFilmToWishlistAction,
  removeFilmFromWishlistAction,
} from '@/features/wishlist/api/actions';

type FilmWishlistButtonProps = {
  filmId: string;
  isInWishlist: boolean;
  onSuccess?: () => void;
  variant?: 'default' | 'compactRemove';
};

export function FilmWishlistButton({
  filmId,
  isInWishlist,
  onSuccess,
  variant,
}: FilmWishlistButtonProps) {
  return (
    <WishlistButton
      isInWishlist={isInWishlist}
      onAddAction={() => addFilmToWishlistAction(filmId)}
      onRemoveAction={() => removeFilmFromWishlistAction(filmId)}
      onSuccess={onSuccess}
      variant={variant}
    />
  );
}
