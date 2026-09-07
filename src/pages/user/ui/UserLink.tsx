import Link from 'next/link';
import { ROUTES } from '@/shared/config';

export type UserLinkProps = {
  userId: string;
  children?: React.ReactNode;
};

export function UserLink({ userId, children }: UserLinkProps) {
  return <Link href={`${ROUTES.PROFILE}/${userId}`}>{children}</Link>;
}

export default UserLink;
