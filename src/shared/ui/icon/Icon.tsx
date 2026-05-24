import * as icons from '@/shared/icons';
import { IconSVGComponent, IconSVGComponentProps } from '@/shared/icons/types';

export type IconName = keyof typeof icons;

export type IconProps = {
  name: IconName;
} & IconSVGComponentProps;

export const Icon = ({ name, ...props }: IconProps) => {
  const IconComponent: IconSVGComponent = icons[name];

  return <IconComponent {...props} />;
};

export default Icon;
