import { parseGameListFilters } from './searchParams';

describe('parseGameListFilters', () => {
  it('falls back when the page is not a safe positive integer', () => {
    expect(parseGameListFilters({ page: '1e16', sort: 'name_asc', search: 'halo' })).toEqual({
      search: 'halo',
      sort: 'name_asc',
      page: 1,
    });

    expect(parseGameListFilters({ page: '9999999999999999' })).toEqual({
      sort: 'newest',
      page: 1,
    });

    expect(parseGameListFilters({ page: '0' }).page).toBe(1);
    expect(parseGameListFilters({ page: '-3' }).page).toBe(1);
    expect(parseGameListFilters({ page: '1.5' }).page).toBe(1);
    expect(parseGameListFilters({ page: 'nope' }).page).toBe(1);
  });

  it('keeps a safe page and ignores an unknown sort', () => {
    expect(parseGameListFilters({ page: '2', sort: 'not-a-sort' })).toEqual({
      sort: 'newest',
      page: 2,
    });
  });

  it('parses supported game-specific filters and ignores invalid values', () => {
    expect(
      parseGameListFilters({
        developer: 'Valve',
        publisher: 'Steam',
        ratingFrom: '8.5',
        steamScoreFrom: '90',
      }),
    ).toEqual({
      developer: 'Valve',
      publisher: 'Steam',
      ratingFrom: 8.5,
      steamScoreFrom: 90,
      sort: 'newest',
      page: 1,
    });

    expect(parseGameListFilters({ ratingFrom: '11', steamScoreFrom: '80.5' })).toEqual({
      sort: 'newest',
      page: 1,
    });
  });
});
