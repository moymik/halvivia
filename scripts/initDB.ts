import { createWishListsTables } from './initSchema';

async function main() {
  await createWishListsTables();
}

const isDirectRun =
  process.argv[1]?.endsWith('initDB.ts') || process.argv[1]?.endsWith('initDB.js');

if (isDirectRun) {
  void main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
