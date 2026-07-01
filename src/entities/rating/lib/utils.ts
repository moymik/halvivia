export function getRatingColorClass(avg: number | null) {
  if (avg === null) return 'text-white-500';
  if (avg <= -0.5) return 'text-red-base';
  if (avg <= 0.5) return 'text-yellow-base';
  return 'text-green-base';
}
