import { BasicIcon } from './BasicIcon';
import { ICON_SRC, type IconProps } from './types/iconType';

export const ChevronRightIcon = ({ size = 'sm', className }: IconProps) => (
  <BasicIcon src={ICON_SRC.chevronRight} size={size} className={className} />
);
