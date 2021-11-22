import moment from 'moment';
import t from '../common/translations/Translation';
import {DATE_DISPLAY_FORMAT, DATE_DB_FORMAT} from './Constants';

export const dateFormatter = (date: Date): string => {
  return moment(date).format(DATE_DB_FORMAT);
};

export const displayDateFormat = (dateStr: string | undefined): string => {
  const formatted = moment(dateStr, DATE_DB_FORMAT).format(DATE_DISPLAY_FORMAT);
  if (moment(dateStr, DATE_DB_FORMAT).isSame(moment(), 'day')) {
    return t('today');
  } else if (
    moment(dateStr, DATE_DB_FORMAT).isSame(moment().subtract(1, 'd'), 'day')
  ) {
    return t('yesterday');
  }

  return formatted;
};

export const numberFormatter = (amount?: number): string => {
  if (amount && !isNaN(amount)) {
    if (amount > 0) {
      if (amount > 0 && amount <= 1000) {
        return amount.toString();
      } else if (amount > 1000 && amount <= 100000) {
        return parseFloat((amount / 1000).toString()).toFixed(2) + ' k';
      } else if (amount > 100000) {
        return parseFloat((amount / 100000).toString()).toFixed(2) + ' L';
      }
    } else {
      if (amount < 0 && amount >= -1000) {
        return amount.toString();
      } else if (amount < -1000 && amount >= -100000) {
        return parseFloat((amount / 1000).toString()).toFixed(2) + ' k';
      } else if (amount < -100000) {
        return parseFloat((amount / 100000).toString()).toFixed(2) + ' L';
      }
    }
  }

  return (0).toString();
};
