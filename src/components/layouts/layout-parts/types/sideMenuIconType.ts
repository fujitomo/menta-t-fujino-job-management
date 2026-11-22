import { ICON_SRC } from '@/components/ui-parts/icons/types/iconType';

/** サイドメニューで使用するアイコン */
export const SIDEMENU_ICONS = {
  jobList: ICON_SRC.jobList,
  jobAdd: ICON_SRC.jobAdd,
  categoryList: ICON_SRC.categoryList,
  categoryAdd: ICON_SRC.categoryAdd,
} as const;

export type SideMenuIconSrc =
  (typeof SIDEMENU_ICONS)[keyof typeof SIDEMENU_ICONS];
