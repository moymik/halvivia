export const USER_TABS = {
  BOOKS: 'books',
  MOVIES: 'movies',
  RATINGS: 'ratings',
  UPLOADS: 'uploads',
} as const;

export type UserTab = (typeof USER_TABS)[keyof typeof USER_TABS];

export function isUserTab(value: string): value is UserTab {
  return Object.values(USER_TABS).includes(value as UserTab);
}

export function getUserTab(value?: string): UserTab {
  if (value && isUserTab(value)) {
    return value;
  }

  return USER_TABS.BOOKS;
}
