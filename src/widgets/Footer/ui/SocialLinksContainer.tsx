import clsx from 'clsx';

type SocialLinksProps = {
  className?: string;
};

import { socialLinks } from '../model/footerNavigation';
import { IconLink } from '@/shared/ui/icon-link/';

export function SocialLinksContainer({ className }: SocialLinksProps) {
  return (
    <div className={clsx('flex w-18 gap-5', className)}>
      {socialLinks.map((SocialLink) => (
        <IconLink
          key={SocialLink.link.id}
          link={SocialLink.link}
          iconName={SocialLink.iconName}
        ></IconLink>
      ))}
    </div>
  );
}
