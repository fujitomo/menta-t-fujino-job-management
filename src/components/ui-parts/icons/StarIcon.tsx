import { BasicIcon } from './BasicIcon';
import { ICON_SRC, type IconProps } from './types/iconType';

export const StarIcon = ({ size = 'base', className }: IconProps) => (
  <BasicIcon src={ICON_SRC.star} size={size} className={className} />
);
