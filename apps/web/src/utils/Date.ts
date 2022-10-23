import { format, formatDistance } from 'date-fns';

import { DateFormatEnums } from '../enums/DateFormat';

export function formatDate(
  date: number | Date | string,
  formatType: DateFormatEnums
): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return format(date, formatType);
}

export function calculateYearDifference(date: number | Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return formatDistance(date, new Date(), { addSuffix: true });
}
