import clsx from 'clsx';

type SocialLinksProps = {
  className?: string;
};

import { SOCIAL_LINKS } from '../config/footer.config';
import { IconLink } from '@/shared/ui/icon-link/';

export function SocialLinksContainer({ className }: SocialLinksProps) {
  return (
    <div className={clsx('flex w-18 gap-5', className)}>
      {SOCIAL_LINKS.map((SocialLink) => (
        <IconLink
          key={SocialLink.link.id}
          link={SocialLink.link}
          iconName={SocialLink.iconName}
        ></IconLink>
      ))}
    </div>
  );
}
