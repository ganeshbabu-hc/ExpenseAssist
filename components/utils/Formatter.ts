import {DATE_FORMAT} from './Constants';

export const dateFormatter = (date: Date): string => {
  let formatPlaceholder = DATE_FORMAT;
  formatPlaceholder = formatPlaceholder.replace(
    'yyyy',
    date.getFullYear().toString(),
  );
  formatPlaceholder = formatPlaceholder.replace(
    'mm',
    (date.getMonth() + 1).toString(),
  );
  formatPlaceholder = formatPlaceholder.replace(
    'dd',
    date.getDate().toString(),
  );
  formatPlaceholder = formatPlaceholder.replace(
    'hh',
    date.getHours().toString(),
  );
  formatPlaceholder = formatPlaceholder.replace(
    'mm',
    date.getMinutes().toString(),
  );
  formatPlaceholder = formatPlaceholder.replace(
    'ss',
    date.getSeconds().toString(),
  );
  return formatPlaceholder;
};
