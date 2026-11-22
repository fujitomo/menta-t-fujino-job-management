import { BasicIcon } from './BasicIcon';
import { ICON_SRC, type IconProps } from './types/iconType';

export const ChevronDownIcon = ({ size = 'base', className }: IconProps) => (
  <BasicIcon src={ICON_SRC.chevronDown} size={size} className={className} />
);
