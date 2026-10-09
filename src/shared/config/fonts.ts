import { Roboto, TikTok_Sans } from 'next/font/google';

export const tiktokSans = TikTok_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-tiktok',
  // У Next нет метрик TikTok Sans для подстройки fallback-шрифта — без этого сыплет ошибками в лог.
  adjustFontFallback: false,
});

export const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-roboto',
});
