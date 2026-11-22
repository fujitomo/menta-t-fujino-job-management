import { DateUtils } from '@/utils/date';
import { type Job } from '../types/job';

export const isNewJob = (startDate: Job['startDate']) => {
  const isNew = DateUtils.isDateAfterMonthsAgo(startDate, 1);

  return isNew;
};
