import { Golos_Text, Roboto } from 'next/font/google';

export const golosText = Golos_Text({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '700'],
  variable: '--font-golos',
});

export const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-roboto',
});
