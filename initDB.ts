import 'server-only';

import { createBooksTable } from './src/shared/lib/db/initSchema';

async function main() {
  await createBooksTable();
}

const isDirectRun =
  process.argv[1]?.endsWith('initDB.ts') || process.argv[1]?.endsWith('initDB.js');

if (isDirectRun) {
  void main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
