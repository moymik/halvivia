export function isPgError(e: unknown): e is { code: string; detail?: string } {
  return typeof e === 'object' && e !== null && 'code' in e;
}
