import { BasicIcon } from './BasicIcon';
import { ICON_SRC, type IconProps } from './types/iconType';

export const DeleteIcon = ({ size, className }: IconProps) => (
  <BasicIcon src={ICON_SRC.delete} size={size} className={className} />
);
