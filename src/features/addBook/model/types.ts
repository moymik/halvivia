export type AddBookStatus =
  | { type: 'idle' }
  | { type: 'error'; message: string }
  | { type: 'success'; message: string; bookId: string }
  | { type: 'duplicate'; bookId: string };
