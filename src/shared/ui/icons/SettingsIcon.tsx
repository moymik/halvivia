import SettingsAsset from '@/shared/assets/settings.svg';
import { IconSVGComponentProps } from '@/shared/ui/icons/types';

export function SettingsIcon(props: IconSVGComponentProps) {
  return <SettingsAsset width="19" height="19" {...props} />;
}

export default SettingsIcon;
