import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useMemo } from "react";

export const TNAME_EXPENSE = 'EXPENSE';
export const TNAME_TRANSACTIONS = 'TRANSACTIONS';
export const TNAME_TRANSACTION_CATEGORIES = 'TRANSACTION_CATEGORIES';
export const TNAME_TRANSACTION_IMAGES = 'TRANSACTION_IMAGES';
export const TNAME_INCOME = 'INCOME';
export const TNAME_CONFIGURATION = 'CONFIGURATION';
export const TNAME_INCOME_CATEGORIES = 'INCOME_CATEGORIES';
export const TNAME_CURRENCY_TYPES = 'CURRENCY_TYPES';
export const TNAME_PAYMENT_TYPES = 'PAYMENT_TYPES';
export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const DAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
export const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const EXPENSE_QUERY_LIMIT = 20;
export const INCOME_QUERY_LIMIT = 5;
export const DATE_DB_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_DISPLAY_FORMAT = 'DD MMM YY';

export let THEME = 'yellow';

export const DEBOUNCE_RATE = 300;
const setTheme = async () => {
  await AsyncStorage.setItem('@themekey', 'purple');
  const result = await AsyncStorage.getItem('@themekey');
  global.THEME = result;
  return result ?? 'red';
};
// x();
setTheme();
// export let THEME = 'deepPurple';

// export let THEME = 'purple';
// const x = async () => {
//   await AsyncStorage.setItem('@themekey', 'purple');
//   const result = await AsyncStorage.getItem('@themekey');

//   return result ?? 'red';
// };
// const setTheme = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('@themekey');
//     THEME = jsonValue ?? 'red';
//   } catch (e) {
//     // read error
//   }
// };
// setTheme();

// const setTheme = (key?: string) => {
//   await 
//   THEME = key ?? 'purple';
// };

// const storeData = async (value) => {
//   try {
//     await AsyncStorage.setItem('@storage_Key', value)
//   } catch (e) {
//     // saving error
//   }
// }

// const getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('@storage_Key')
//     if(value !== null) {
//       // value previously stored
//     }
//   } catch(e) {
//     // error reading value
//   }
// }

// export THEME;
