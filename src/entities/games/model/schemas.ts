import { z } from 'zod';
import { GAME_SORT_MAP, type GameSort } from '@/entities/games/model/constants';

export const GameSortSchema = z.enum(Object.keys(GAME_SORT_MAP) as [GameSort, ...GameSort[]]);

export const GameListFiltersSchema = z.object({
  search: z.string().trim().min(1).optional(),
  developer: z.string().trim().min(1).optional(),
  publisher: z.string().trim().min(1).optional(),
  ratingFrom: z.number().min(0).max(10).optional(),
  steamScoreFrom: z.number().int().min(0).max(100).optional(),
  sort: GameSortSchema.default('newest'),
  page: z.number().int().positive().default(1),
});

export type GameListFilters = z.infer<typeof GameListFiltersSchema>;
