import moment from 'moment';
import {DATE_DISPLAY_FORMAT, DATE_DB_FORMAT} from './Constants';

export const dateFormatter = (date: Date): string => {
  return moment(date).format(DATE_DB_FORMAT);
};

export const displayDateFormat = (dateStr: string | undefined): string => {
  const formatted = moment(dateStr, DATE_DB_FORMAT).format(DATE_DISPLAY_FORMAT);
  if (moment(dateStr, DATE_DB_FORMAT).isSame(moment(), 'day')) {
    return 'Today';
  } else if (
    moment(dateStr, DATE_DB_FORMAT).isSame(moment().subtract(1, 'd'), 'day')
  ) {
    return 'Yesterday';
  }

  return formatted;
};

export const numberFormatter = (amount?: number): string => {
  if (amount && amount > 0 && !isNaN(amount)) {
    if (amount > 0 && amount <= 1000) {
      return amount.toString();
    } else if (amount > 1000 && amount <= 100000) {
      // return Math.round(amount * 100 + Number.EPSILON) / 100 / 1000 + ' k';
      return parseFloat((amount / 1000).toString()).toFixed(2) + ' k';
    } else if (amount > 100000) {
      return parseFloat((amount / 100000).toString()).toFixed(2) + ' L';
    }
  }

  return (0).toString();
};
