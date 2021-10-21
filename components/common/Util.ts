import Snackbar from 'react-native-snackbar';
import {colors} from '../styles/common';
export const ShowSnackBar = (title: string) => {
  Snackbar.show({
    text: title,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: colors.brandDark,
    textColor: colors.white,
  });
};
