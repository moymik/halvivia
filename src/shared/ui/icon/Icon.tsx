import * as icons from '../icons';
import { IconSVGComponent, IconSVGComponentProps } from '../icons/types';

export type IconName = keyof typeof icons;

export type IconProps = {
  name: IconName;
} & IconSVGComponentProps;

export function Icon({ name, ...props }: IconProps) {
  const IconComponent: IconSVGComponent = icons[name];

  return <IconComponent {...props} />;
}

export default Icon;
