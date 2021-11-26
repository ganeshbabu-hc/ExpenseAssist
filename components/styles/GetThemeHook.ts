import { useSelector } from 'react-redux';
import { categoryListStyles } from './categoryListStyle';
import { commonStyle } from './commonStyles';
import { formStyle } from './formStyles';
import { colors } from './theme';
import { utilStyles } from './utils';

export const GetTheme = (coponentStyles?: any) => {
  const themeKey = useSelector(state => state.common.theme);
  // const styles = useCallback(() => {
  //   return coponentStyles ? coponentStyles(themeKey) : null;
  // }, [themeKey]);
  // const commonStyles = useCallback(() => commonStyle(themeKey), [themeKey]);
  // const utils = useCallback(() => utilStyles(themeKey), [themeKey]);

  const styles = coponentStyles ? coponentStyles(themeKey) : null;
  const themeColors = colors.theme[themeKey];
  const commonStyles = commonStyle(themeKey);
  const formStyles = formStyle(themeKey);
  const utils = utilStyles(themeKey);
  const categoryList = categoryListStyles(themeKey);

  return {
    commonStyles,
    styles,
    utils,
    colors: themeColors,
    formStyles,
    categoryList,
  };
};

export const GetStyle = (coponentStyles: any) => {
  const themeKey = useSelector(state => state.common.theme);
  return coponentStyles(themeKey);
};
