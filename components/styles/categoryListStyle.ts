import { StyleSheet } from 'react-native';
import { colors, containerGutter, containerLeftMargin, utils } from './theme';

export const categoryListStyles = (themeCode: string) => StyleSheet.create({
    expensitureWrapper: {
      backgroundColor: colors.theme[themeCode].brandBg,
      display: 'flex',
      overflow: 'scroll',
      marginLeft: -containerLeftMargin,
      marginRight: -containerGutter,
    },
    categoryAddBtnWrapper: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginVertical: 10,
      marginRight: 8,
    },
    categoryAddBtn: {
      borderRadius: utils.inputRadius,
      borderWidth: 2,
      borderColor: colors.theme[themeCode].textCardGray,
      borderStyle: 'dotted',
      width: 80,
      paddingVertical: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeCategory: {
      color: colors.theme[themeCode].brandBg,
      position: 'relative',
      marginRight: 8,
    },
    categoryItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginVertical: 20,
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: colors.theme[themeCode].brandMedium,
      marginHorizontal: 6,
      borderRadius: utils.inputRadius,
      dark: {
        backgroundColor: colors.theme[themeCode].brandMedium,
      },
      light: {
        backgroundColor: colors.theme[themeCode].brandDark,
      },
    },
    categoryTitle: {
      color: colors.theme[themeCode].textLight,
      fontSize: utils.fontSize.small,
      fontFamily: utils.fontFamily.Bold,
      marginLeft: 10,
    },
  });