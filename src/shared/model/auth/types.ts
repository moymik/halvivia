export type UserRole = 'MEMBER' | 'GUEST' | null;
export type SessionPayload = {
  userId: string;
  role: UserRole;
};
