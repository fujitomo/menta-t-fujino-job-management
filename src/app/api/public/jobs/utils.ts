import { PUBLIC_USER_ID } from '@/app/api/_utils/user-scope';
import {
  type JobWithCategories as PublicJobWithCategories,
  fetchJobByIdWithScope,
} from '@/app/api/jobs/utils';

export type { PublicJobWithCategories };

export const fetchPublicJobById = (id: number) =>
  fetchJobByIdWithScope(id, PUBLIC_USER_ID);
