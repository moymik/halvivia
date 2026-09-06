'use client';

import { WishlistButton } from '@/features/wishlist/ui/WishlistButton';
import {
  addFilmToWishlistAction,
  removeFilmFromWishlistAction,
} from '@/features/wishlist/api/actions';

type FilmWishlistButtonProps = {
  filmId: string;
  isInWishlist: boolean;
};

export function FilmWishlistButton({ filmId, isInWishlist }: FilmWishlistButtonProps) {
  return (
    <WishlistButton
      isInWishlist={isInWishlist}
      onAddAction={() => addFilmToWishlistAction(filmId)}
      onRemoveAction={() => removeFilmFromWishlistAction(filmId)}
    />
  );
}
