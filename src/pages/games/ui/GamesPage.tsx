import GameCard from '@/entities/games/ui/GameCard';
import { GAMES_PAGE_SIZE } from '@/entities/games/model/constants';
import Link from 'next/link';
import { gamesCatalogHref, parseGameListFilters } from '../model/searchParams';
import { getGamesPageViewModel } from '../model/viewModel';
import { GamesPagination } from './GamesPagination';
import { GamesFilterForm } from './GamesFilterForm';

const EMPTY_TEXT = 'В игротеке пока пусто.';
const NOT_FOUND_TEXT = 'Ничего не найдено.';
const OUT_OF_RANGE_TEXT = 'На этой странице нет игр.';

type GamesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function GamesPage({ searchParams }: GamesPageProps) {
  const filters = parseGameListFilters(await searchParams);
  const { games, totalCount } = await getGamesPageViewModel(filters);
  const totalPages = Math.max(1, Math.ceil(totalCount / GAMES_PAGE_SIZE));
  const isOutOfRange = games.length === 0 && totalCount > 0;
  const emptyText = isOutOfRange ? OUT_OF_RANGE_TEXT : filters.search ? NOT_FOUND_TEXT : EMPTY_TEXT;

  return (
    <section>
      <div className="page-content-width flex flex-col gap-6 pr-0">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="flex min-w-0 flex-col gap-6 py-6">
            <h1 className="text-2xl font-bold">Игры</h1>
            {games.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 2xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
                {games.map((game) => (
                  <GameCard key={game.id} game={game} fill />
                ))}
              </div>
            ) : (
              <div className="text-text-muted flex min-h-29 flex-col justify-center gap-3 rounded-lg border border-dashed border-white/10 px-4 text-sm">
                <p>{emptyText}</p>
                {isOutOfRange && (
                  <Link
                    href={gamesCatalogHref(filters)}
                    className="text-text-primary w-fit underline"
                  >
                    К первой странице
                  </Link>
                )}
              </div>
            )}
            <GamesPagination page={filters.page} totalPages={totalCount === 0 ? 0 : totalPages} />
          </div>
          <div className="h-full">
            <GamesFilterForm key={JSON.stringify(filters)} filters={filters} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default GamesPage;
