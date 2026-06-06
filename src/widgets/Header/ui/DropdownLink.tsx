import { AppLink } from '@/shared/ui/app-link';

import { Icon, IconName } from '@/shared/ui/icon/Icon';

export type DropdownLinkProps = React.ComponentProps<typeof AppLink> & {
  icon: IconName;
  setOpen: (open: boolean) => void;
};

export function DropdownLink({ icon, setOpen, children, href, ...props }: DropdownLinkProps) {
  return (
    <AppLink
      href={href}
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
