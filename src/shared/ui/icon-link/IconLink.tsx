import { Icon, IconName } from '@/shared/ui/icon';
import { NavigationLink } from '@/shared/config/navigation';
import { AppLink } from '@/shared/ui/app-link';

export type IconLinkProps = {
  link: NavigationLink;
  icon: IconName;
};

export const IconLink = (props: IconLinkProps) => {
  return (
    <AppLink hideLabel link={props.link}>
      <Icon name={props.icon}></Icon>
    </AppLink>
  );
};

export default IconLink;
