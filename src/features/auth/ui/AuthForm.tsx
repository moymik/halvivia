import { Button } from '@/shared/ui/Button';

export default async function AuthForm() {
  return (
    <form
      className={
        'border-[rgba(249, 249, 249, 0.5)] lg:bg-bg-surface flex flex-col items-center justify-center gap-11 rounded-2xl border-2 lg:min-h-[28vh] lg:min-w-[24vw]'
      }
    >
      <h2 className={'text-3xl font-bold'}>Войти</h2>
      <Button>Войти через дискорд</Button>
    </form>
  );
}
