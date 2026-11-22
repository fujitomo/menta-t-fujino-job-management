import { format } from 'date-fns';

const formatDateToYearMonthDaySlashSeparated = (
  date: Date | string | null | undefined,
) => {
  if (!date) {
    return '';
  }

  return format(date, 'yyyy/MM/dd');
};

export const DateFormatUtils = {
  formatDateToYearMonthDaySlashSeparated,
};
