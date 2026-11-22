import { queryOptions, useQuery } from '@tanstack/react-query';
import { Endpoints } from '@/constants';
import { type QueryConfig } from '@/types';
import { ApiUtils, type FetchError } from '@/utils/api';
import { type JobCategory } from '../types/jobCategory';

export const getPublicJobCategories = async () => {
  const response = await ApiUtils.get<JobCategory[]>(
    Endpoints.PUBLIC_JOB_CATEGORY,
  );

  return response;
};

export const getPublicJobCategoriesQueryOptions = () => {
  return queryOptions<JobCategory[], FetchError>({
    queryKey: ['get-public-job-categories-key'],
    queryFn: () => getPublicJobCategories(),
  });
};

interface UseGetPublicJobCategoriesOptions {
  config?: QueryConfig<typeof getPublicJobCategoriesQueryOptions>;
}

export const useGetPublicJobCategories = ({
  config,
}: UseGetPublicJobCategoriesOptions = {}) => {
  return useQuery<JobCategory[], FetchError>({
    ...getPublicJobCategoriesQueryOptions(),
    ...config,
  });
};
