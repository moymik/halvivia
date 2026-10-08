import FilmDialogButton from '@/pages/cinema/ui/FilmDialogButton';
import { verifySession } from '@/shared/lib/auth';

export async function Toolbar() {
  const session = await verifySession();
  const canAddFilm = session.status != 'unauthenticated' && session.payload.role == 'MEMBER';

  if (!canAddFilm) return null;

  return (
    <div className="flex justify-end">
      <FilmDialogButton />
    </div>
  );
}

export default Toolbar;
