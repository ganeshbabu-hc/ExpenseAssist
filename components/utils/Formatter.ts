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
