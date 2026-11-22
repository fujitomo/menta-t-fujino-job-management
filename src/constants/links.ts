const guest = {
  GUEST_LOGIN: '/',
  GUEST_EXAMPLE: '/example',
};
const member = {
  MEMBER_JOB_LIST: '/member/job/list',
  MEMBER_JOB_CATEGORY_LIST: '/member/job-category/list',
  MEMBER_JOB_CREATE: '/member/job/create',
  MEMBER_JOB_DETAIL: (jobId: number) => `/member/job/detail/${jobId}`,
  MEMBER_JOB_EDIT: (jobId: number) => `/member/job/edit/${jobId}`,
  MEMBER_JOB_CATEGORY_CREATE: '/member/job-category/create',
  MEMBER_JOB_CATEGORY_DETAIL: (jobCategoryId: number) =>
    `/member/job-category/detail/${jobCategoryId}`,
  MEMBER_JOB_CATEGORY_EDIT: (jobCategoryId: number) =>
    `/member/job-category/edit/${jobCategoryId}`,
};
const external = {};

export const Links = {
  ...guest,
  ...member,
  ...external,
} as const;
