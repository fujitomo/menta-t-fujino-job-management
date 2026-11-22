import { BasicIcon } from './BasicIcon';
import { ICON_SRC, type IconProps } from './types/iconType';

export const WorkIcon = ({ size = 'base', className }: IconProps) => (
  <BasicIcon src={ICON_SRC.work} size={size} className={className} />
);
