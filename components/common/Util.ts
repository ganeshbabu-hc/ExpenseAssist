import Snackbar from 'react-native-snackbar';
import {colors} from '../styles/theme';
import {THEME} from '../utils/Constants';
export const ShowSnackBar = (title: string) => {
  Snackbar.show({
    text: title,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: colors.theme[THEME].brandDark,
    textColor: colors.theme[THEME].textLight,
  });
};
