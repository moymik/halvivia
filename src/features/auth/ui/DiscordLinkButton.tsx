'use client';

import { Button } from '@/shared/ui/Button';
import { startDiscordLinkAction } from '@/features/auth';

export function DiscordLinkButton() {
  return (
    <Button onClick={startDiscordLinkAction} variant={'primary'}>
      Подключить дискорд аккаунт
    </Button>
  );
}

export default DiscordLinkButton;
