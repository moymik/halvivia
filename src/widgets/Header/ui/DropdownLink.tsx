import { AppLink } from '@/shared/ui/app-link';
import { NavigationLink } from '@/shared/config';

import { Icon, IconName } from '@/shared/ui/icon/Icon';

export type DropdownLinkProps = React.ComponentProps<typeof AppLink> & {
  link: NavigationLink;
  icon: IconName;
  setOpen: (open: boolean) => void;
};

export function DropdownLink({ icon, setOpen, link, children, ...props }: DropdownLinkProps) {
  return (
    <AppLink
      link={link}
      className={'hover:text-primary text-text-secondary px-2 text-left text-base/tight'}
      onClick={() => {
        setOpen(false);
      }}
      {...props}
      hideLabel={true}
    >
      <Icon className={'mr-2 inline-block'} name={icon}></Icon>
      {children}
    </AppLink>
  );
}

export default DropdownLink;
