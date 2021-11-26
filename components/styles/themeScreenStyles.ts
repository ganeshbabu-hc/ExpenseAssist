import { StyleSheet } from 'react-native';
import { colors, utils } from './theme';

export const themeScreenStyles = (themeCode: string) =>
  StyleSheet.create({
    themeWrapper: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-evenly',
      flex: 1,
      flexDirection: 'row',
      marginVertical: 20,
    },
    themeItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 1,
      // flexDirection: 'row',
    },
    themeName: {
      color: colors.theme[themeCode].textDark,
      fontSize: utils.fontSize.large,
      fontFamily: utils.fontFamily.Bold,
      paddingVertical: 20,
    },
    themeTypeActive: {
      borderColor: colors.theme[themeCode].brandMedium,
      borderWidth: 3,
    },
    themeType: {
      width: '90%',
      height: 200,
      borderWidth: 1,
      borderColor: colors.theme[themeCode].textCardGray,
      borderRadius: utils.inputRadius,
      backgroundColor: colors.theme[themeCode].brandMedium,
    },
  });
