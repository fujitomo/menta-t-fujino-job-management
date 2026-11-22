import { isValid, startOfDay, subMonths } from 'date-fns';

const isDateAfterMonthsAgo = (
  // 「指定した日付が、今から N か月前以降かどうか」を判定する関数
  date: Date | string | null | undefined,
  months: number,
) => {
  if (!date || months < 0 || !Number.isFinite(months)) {
    return false;
  }

  const targetDate = new Date(date);

  if (!isValid(targetDate)) {
    return false;
  }

  const monthsAgo = startOfDay(subMonths(new Date(), months));

  return targetDate >= monthsAgo;
};

export const DateCompareUtils = {
  isDateAfterMonthsAgo,
};
