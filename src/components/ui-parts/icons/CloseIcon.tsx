import { BasicIcon } from './BasicIcon';
import { ICON_SRC, type IconProps } from './types/iconType';

export const CloseIcon = ({ size, className }: IconProps) => (
  <BasicIcon src={ICON_SRC.close} size={size} className={className} />
);
