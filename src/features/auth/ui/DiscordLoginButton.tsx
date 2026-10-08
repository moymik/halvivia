import { Button } from '@/shared/ui/Button';
import { startDiscordLoginAction } from '@/features/auth';
import { DiscordIcon } from '@/shared/ui/icons';

export function DiscordLoginButton() {
  return (
    <form action={startDiscordLoginAction}>
      <Button
        type="submit"
        className="bg-bg-inverse text-primary hover:bg-bg-inverse/90 flex w-full justify-center transition-colors duration-200"
      >
        Войти через Discord
        <DiscordIcon className="transition-colors duration-200" />
      </Button>
    </form>
  );
}

export default DiscordLoginButton;
