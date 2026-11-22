import { BasicIcon } from './BasicIcon';
import { ICON_SRC, type IconProps } from './types/iconType';

export const CalendarIcon = ({ size, className }: IconProps) => (
  <BasicIcon src={ICON_SRC.calendar} size={size} className={className} />
);
