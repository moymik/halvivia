import { ROUTES } from '@/shared/config';
import { redirect } from 'next/navigation';

export async function HomePage() {
  redirect(ROUTES.CINEMA);
}

export default HomePage;
