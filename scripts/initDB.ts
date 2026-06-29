import { addBookRatingsFields, addFilmRatingsFields } from './initSchema';
import { addBook } from '@/entities/books/api/db';

async function main() {
  await addFilmRatingsFields();
  await addBookRatingsFields();
}

const isDirectRun =
  process.argv[1]?.endsWith('initDB.ts') || process.argv[1]?.endsWith('initDB.js');

if (isDirectRun) {
  void main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
