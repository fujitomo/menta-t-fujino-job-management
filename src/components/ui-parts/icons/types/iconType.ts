/** public/svg 内のアイコンファイルパス */
export const ICON_SRC = {
  chevronRight: '/svg/chevron_right.svg',
  chevronDown: '/svg/chevron_down.svg',
  calendar: '/svg/calendar.svg',
  close: '/svg/close.svg',
  delete: '/svg/delete.svg',
  jobList: '/svg/job_list.svg',
  jobAdd: '/svg/job_add.svg',
  categoryList: '/svg/category_list.svg',
  categoryAdd: '/svg/category_add.svg',
  star: '/svg/star.svg',
  work: '/svg/work.svg',
} as const;

export type IconSrc = (typeof ICON_SRC)[keyof typeof ICON_SRC];

export type IconSize = 'sm' | 'base' | 'md' | 'lg';

/**
 * アイコン共通の props。
 * 色は親の text-* （currentColor）を継承する。
 */
export interface IconProps {
  size?: IconSize;
  className?: string;
}
