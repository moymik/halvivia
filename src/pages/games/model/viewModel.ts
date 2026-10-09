import { listGames } from '@/entities/games/api/db';
import type { GameListFilters } from '@/entities/games/model/schemas';
import type { Game } from '@/entities/games/model/types';

export type GamesPageViewModel = {
  games: Game[];
  totalCount: number;
};

export async function getGamesPageViewModel(filters: GameListFilters): Promise<GamesPageViewModel> {
  const catalog = await listGames(filters);

  return {
    games: catalog.games,
    totalCount: catalog.totalCount,
  };
}
