// Переносит уже сохранённые обложки книг и картинки игр в ImageKit.
// Новые книги и игры переносятся автоматически при добавлении (mirrorBookCover / mirrorGameHeaderImage).
//
// По умолчанию только показывает, что будет перенесено. Запись в ImageKit и БД — с флагом --apply:
//   pnpm tsx scripts/mirrorCoversToImageKit.ts
//   pnpm tsx scripts/mirrorCoversToImageKit.ts --apply

import dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

import { ImageKit } from '@imagekit/nodejs';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL as string);
const imagekit = new ImageKit({ privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string });
const IMAGEKIT_PREFIX = `https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGEKIT_ID}/`;
const APPLY = process.argv.includes('--apply');
const CONCURRENCY = 3;

type Target = {
  table: 'books' | 'games';
  column: 'thumbnail_url' | 'header_image';
  folder: '/books' | '/games';
};

const TARGETS: Target[] = [
  { table: 'books', column: 'thumbnail_url', folder: '/books' },
  { table: 'games', column: 'header_image', folder: '/games' },
];

async function mirror({ table, column, folder }: Target) {
  const rows = (await sql.query(
    `SELECT id, ${column} AS url FROM ${table} WHERE ${column} IS NOT NULL AND ${column} NOT LIKE $1`,
    [`${IMAGEKIT_PREFIX}%`],
  )) as { id: string; url: string }[];

  console.log(`${table}: к переносу ${rows.length}`);

  if (!APPLY) {
    return;
  }

  let done = 0;
  let failed = 0;
  const queue = [...rows];

  async function worker() {
    for (let row = queue.shift(); row; row = queue.shift()) {
      try {
        const result = await imagekit.files.upload({ file: row.url, fileName: row.id, folder });

        if (!result.url) {
          throw new Error('ImageKit не вернул url');
        }

        await sql.query(`UPDATE ${table} SET ${column} = $1 WHERE id = $2`, [result.url, row.id]);
        done++;
      } catch (error) {
        failed++;
        console.error(`${table} ${row.id}: ${row.url}`, error);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`${table}: перенесено ${done}, ошибок ${failed}`);
}

async function main() {
  if (!process.env.NEXT_PUBLIC_IMAGEKIT_ID || !process.env.IMAGEKIT_PRIVATE_KEY) {
    throw new Error('Нет NEXT_PUBLIC_IMAGEKIT_ID или IMAGEKIT_PRIVATE_KEY в .env.local');
  }

  for (const target of TARGETS) {
    await mirror(target);
  }

  if (!APPLY) {
    console.log('Это пробный запуск. Для переноса добавьте --apply.');
    return;
  }

  // Скрипт пишет в БД мимо приложения, поэтому теги кэша не сбрасываются.
  console.log(
    'Каталоги закэшированы (cacheLife: hours): новые ссылки появятся после перезапуска сервера или в течение часа.',
  );
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
