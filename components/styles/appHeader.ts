import { StyleSheet } from 'react-native';
import { colors, containerLeftMargin, utils } from './theme';

export const headerStyles = (themeCode: string) =>
  StyleSheet.create({
    homeMenuIcon: {
      transform: [{ rotateZ: '90deg' }],
    },
    icon: {
      paddingVertical: 10,
      paddingRight: 10,
    },
    headerContainer: {
      zIndex: 1,
      position: 'relative',
      elevation: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,
      shadowcolor: colors.theme[themeCode].shadowBrandMedium,
      shadowOffset: {
        width: 20,
        height: 20,
      },
      img: {
        width: 50,
        height: 90,
        borderRadius: 16,
      },
    },
    appTitle: {
      fontSize: utils.fontSize.xlarge,
      fontFamily: utils.fontFamily.Bold,
      color: colors.theme[themeCode].textDark,
    },
    headerDesc: {
      paddingVertical: 20,
    },
    headerDescTitle: {
      color: colors.theme[themeCode].textDark,
      fontSize: utils.fontSize.xxlarge,
      fontFamily: utils.fontFamily.Bold,
    },
    headerDescSubTitle: {
      color: colors.theme[themeCode].textCardGray,
      fontSize: utils.fontSize.xsmall,
      fontFamily: utils.fontFamily.Regular,
    },
  });
