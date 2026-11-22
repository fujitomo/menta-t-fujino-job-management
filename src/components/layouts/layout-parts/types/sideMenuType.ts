export const SIDE_MENU_LINK_IDS = {
  jobList: 'jobList',
  jobCreate: 'jobCreate',
  jobCategoryList: 'jobCategoryList',
  jobCategoryCreate: 'jobCategoryCreate',
} as const;

export type SideMenuLinkId =
  (typeof SIDE_MENU_LINK_IDS)[keyof typeof SIDE_MENU_LINK_IDS];
