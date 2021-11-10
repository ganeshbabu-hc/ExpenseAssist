import Snackbar from 'react-native-snackbar';
import {colors} from '../styles/theme';
export const ShowSnackBar = (title: string) => {
  Snackbar.show({
    text: title,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: colors.brand.brandDark,
    textColor: colors.white,
  });
};
