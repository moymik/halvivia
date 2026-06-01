import { NavigationLink } from '@/shared/config/navigation';
import { Icon, type IconName } from '../icon/Icon';
import { AppLink } from '../app-link';

export type IconLinkProps = {
  link: NavigationLink;
  iconName: IconName;
};

export function IconLink(props: IconLinkProps) {
  return (
    <AppLink hideLabel link={props.link}>
      <Icon name={props.iconName}></Icon>
    </AppLink>
  );
}

export default IconLink;
