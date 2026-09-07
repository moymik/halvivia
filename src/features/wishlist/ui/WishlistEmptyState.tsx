type WishlistEmptyStateProps = {
  type: 'book' | 'film';
};

export function WishlistEmptyState({ type }: WishlistEmptyStateProps) {
  const isBook = type === 'book';

  return (
    <div className="flex min-h-48 items-center justify-center py-8 text-center">
      <div>
        <p className="text-lg font-medium text-zinc-200">
          {isBook
            ? 'В списке пока нет запланированных книг'
            : 'В списке пока нет запланированных фильмов'}
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          {isBook
            ? 'Добавьте книги в список желаний, чтобы прочитать их позже.'
            : 'Добавьте фильмы в список желаний, чтобы посмотреть их позже.'}
        </p>
      </div>
    </div>
  );
}
