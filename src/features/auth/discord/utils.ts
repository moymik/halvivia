import { DiscordGuild } from '@/features/auth/discord/types';

export function generateRandomPassword(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
export function isMember(guilds: DiscordGuild[]): boolean {
  const HALVA_ID = '623964456929591297';
  return guilds.some((g) => g.id === HALVA_ID);
}
