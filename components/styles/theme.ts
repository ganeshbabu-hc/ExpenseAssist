import { ColorSchemeName, StatusBarStyle, StyleSheet } from 'react-native';
import { deepOrange, deepPurple, grey, pink } from 'material-ui-colors';
import color from 'material-ui-colors/dist/amber';
import { THEME } from '../utils/Constants';

// https://material.io/design/color/the-color-system.html#tools-for-picking-colors

// export const hue = 286; //#c300ff
// export const hue = 337; //#ff0062
// export const hue = 197; //#00b7ff
// export const hue = 348; //#f03
// export const hue = 110; //#6eff00
// export const hue = 6; //#ff1a00
// export const hue = 49; //#ffd000
// export const hue = 280; //#a0f
// export const hue = 297; //#f200ff

interface IColorMapping {
  content: StatusBarStyle;
  brandLight: string;
  brandBg: string;
  brandMedium: string;
  brandLightMedium: string;
  brandDark: string;
  brandDanger: string;
  textDark: string;
  textGray: string;
  textCardGray: string;
  textLight: string;
  bgLight: string;
  graphColorScheme: string[];
  textBrandMedium: string;
  textBrandLightMedium: string;
  textBrandDark: string;
  textLightGray: string;
  shadowBrandLight: string;
  shadowBrandMedium: string;
  shadowBrandDark: string;
}
interface ITheme {
  [key: string]: IColorMapping;
}

interface IColors {
  theme: ITheme;
  // brand: any;
}

export let colors: IColors = {
  //old
  // brandLight: '#F6F4FF',
  // brandMedium: '#8746D6',
  // brandDark: '#3D2C8D',

  //Brand Purple-current--
  theme: {
    // darkPurple: {
    //   content: 'light-content',
    //   // brandLight: deepPurple[50],
    //   brandBg: '#212121',
    //   brandLight: '#2f2f2f',
    //   brandMedium: '#19161b',
    //   brandLightMedium: '#251e2d',
    //   brandDark: '#121212',
    //   brandDanger: pink[600],
    //   textDark: '#fff',
    //   textGray: grey[500],
    //   textCardGray: grey[400],
    //   textLight: '#fff',
    //   bgLight: '#292929',
    //   textBrandLightMedium: deepPurple[200],
    //   textBrandMedium: deepPurple[200],
    //   textBrandDark: deepPurple[900],
    //   shadowBrandLight: '#212121',
    //   shadowBrandMedium: '#19161b',
    //   shadowBrandDark: '#121212',
    //   graphColorScheme: [
    //     // deepPurple[900],
    //     // deepPurple[800],
    //     deepPurple[900],
    //     deepPurple[700],
    //     deepPurple[500],
    //     deepPurple[300],
    //     deepPurple[100],
    //     deepPurple[600],
    //     deepPurple[700],
    //   ],
    // },
    yellow: {
      content: 'light-content',
      // brandLight: deepPurple[50],
      brandBg: '#212328',
      brandLight: '#2b3137',
      brandMedium: '#fdd42a',
      brandLightMedium: '#251e2d',
      brandDark: '#fee890',
      brandDanger: pink[600],
      textDark: '#fff',
      textGray: grey[500],
      textCardGray: grey[400],
      textLight: '#000',
      textLightGray: 'hsla(0, 0%, 100%, 0.15)',
      bgLight: '#292929',
      textBrandLightMedium: '#feeca4',
      textBrandMedium: '#fdd42a',
      textBrandDark: deepPurple[900],
      shadowBrandLight: '#212121',
      shadowBrandMedium: '#19161b',
      shadowBrandDark: '#121212',
      graphColorScheme: [
        // deepPurple[900],
        // deepPurple[800],
        deepPurple[900],
        deepPurple[700],
        deepPurple[500],
        deepPurple[300],
        deepPurple[100],
        deepPurple[600],
        deepPurple[700],
      ],
    },
    purple: {
      content: 'dark-content',
      // brandLight: deepPurple[50],
      brandBg: 'hsla(230, 0%, 98%, 1)',
      brandLight: '#fff',
      brandMedium: deepPurple.A700,
      brandLightMedium: deepPurple[200],
      brandDark: deepPurple[900],
      brandDanger: pink[600],
      textDark: '#000',
      textGray: grey[500],
      textCardGray: grey[400],
      textLight: '#fff',
      textLightGray: 'hsla(0, 0%, 100%, 0.15)',
      bgLight: '#fff',
      textBrandMedium: deepPurple.A700,
      textBrandDark: deepPurple[900],
      textBrandLightMedium: deepPurple[200],
      shadowBrandLight: grey[400],
      shadowBrandMedium: deepPurple[900],
      shadowBrandDark: deepPurple.A700,
      graphColorScheme: [
        // deepPurple[900],
        // deepPurple[800],
        deepPurple[900],
        deepPurple[700],
        deepPurple[500],
        deepPurple[300],
        deepPurple[100],
        deepPurple[600],
        deepPurple[700],
      ],
    },
    //   red: {
    //     // brandLight: deepPurple[50],
    //     brandLight: 'hsla(230, 0%, 98%, 1)',
    //     brandMedium: deepPurple.A700,
    //     brandLightMedium: deepPurple[200],
    //     brandDark: deepPurple[900],
    //     brandDanger: pink[600],
    //     textDark: '#f45',
    //     textGray: grey[500],
    //     textCardGray: grey[400],
    //     textLight: '#fff',
    //     bgLight: '#fff',
    //     graphColorScheme: [
    //       'hsla(251, 69%, 5%, 1)',
    //       'hsla(251, 69%, 10%, 1)',
    //       'hsla(251, 69%, 15%, 1)',
    //       'hsla(251, 69%, 20%, 1)',
    //       'hsla(251, 69%, 25%, 1)',
    //       'hsla(251, 69%, 23%, 1)',
    //       'hsla(251, 69%, 35%, 1)',
    //       'hsla(251, 69%, 40%, 1)',
    //       'hsla(251, 69%, 45%, 1)',
    //       'hsla(251, 69%, 50%, 1)',
    //       'hsla(251, 69%, 55%, 1)',
    //       'hsla(251, 69%, 60%, 1)',
    //       'hsla(251, 69%, 65%, 1)',
    //       'hsla(251, 69%, 70%, 1)',
    //       'hsla(251, 69%, 75%, 1)',
    //       'hsla(251, 69%, 80%, 1)',
    //       'hsla(251, 69%, 85%, 1)',
    //       'hsla(251, 69%, 90%, 1)',
    //     ],
    //   },
    // },
    // brand: {
    //   // brandLight: deepPurple[50],
    //   brandLight: 'hsla(230, 0%, 98%, 1)',
    //   brandMedium: deepPurple.A700,
    //   brandLightMedium: deepPurple[200],
    //   brandDark: deepPurple[900],
    //   brandDanger: pink[600],
    //   textDark: '#000',
    //   textGray: grey[500],
    //   textCardGray: grey[400],
    //   textLight: '#fff',
    //   graphColorScheme: [
    //     'hsla(251, 69%, 5%, 1)',
    //     'hsla(251, 69%, 10%, 1)',
    //     'hsla(251, 69%, 15%, 1)',
    //     'hsla(251, 69%, 20%, 1)',
    //     'hsla(251, 69%, 25%, 1)',
    //     'hsla(251, 69%, 23%, 1)',
    //     'hsla(251, 69%, 35%, 1)',
    //     'hsla(251, 69%, 40%, 1)',
    //     'hsla(251, 69%, 45%, 1)',
    //     'hsla(251, 69%, 50%, 1)',
    //     'hsla(251, 69%, 55%, 1)',
    //     'hsla(251, 69%, 60%, 1)',
    //     'hsla(251, 69%, 65%, 1)',
    //     'hsla(251, 69%, 70%, 1)',
    //     'hsla(251, 69%, 75%, 1)',
    //     'hsla(251, 69%, 80%, 1)',
    //     'hsla(251, 69%, 85%, 1)',
    //     'hsla(251, 69%, 90%, 1)',
    //   ],
    // },
    // brand: {
    //   // brandLight: deepPurple[50],
    //   brandLight: '#131d2a',
    //   brandMedium: '#2e4765',
    //   brandLightMedium: '#172231',
    //   brandDark: '#172231',
    //   brandDanger: pink[600],
    // },

    // #131d2a
    // brand: {
    //   brandLight: `hsla(${hue}, 100%, 98%, 1)`,
    //   brandMedium: `hsla(${hue}, 100%, 65%, 1)`,
    //   brandLightMedium: `hsla(${hue}, 100%, 45%, 1)`,
    //   brandDark: `hsla(${hue}, 100%, 30%, 1)`,
    //   brandDanger: pink[600],
    // },
    // hsla(267, 100%, 50%, 1)
    //Brand Orance
    // brandLight: deepOrange[50],
    // brandMedium: deepOrange.A700,
    // brandLightMedium: deepOrange[200],
    // brandDark: deepOrange[900],
    // brandDanger: pink[600],

    //Brand Orance
    // brandLight: '#e5e5e5',
    // brandMedium: '#fca311',
    // brandLightMedium: '#14213d',
    // brandDark: '#000000',
    // brandDanger: '#E83641',

    //Brand violet
    // brandLight: '#EEF9EC',
    // brandMedium: '#3B6E91',
    // brandLightMedium: '#9BD4D6',
    // brandDark: '#1C2D4C',
    // brandDanger: '#E83641',

    //Sky blue
    // brandLight: '#f2ffff',
    // brandMedium: '#00b4d8',
    // brandLightMedium: '#023e8a',
    // brandDark: '#03045e',
    // brandDanger: '#E83641',

    // black: '#000',
    // white: '#fff',
    // grayText: '#85848B',
    // grayCardText: '#ADADAD',
    // gray50: grey[50],
    // grayText: grey[500],
    // grayCardText: grey[400],
    // transparent: 'rgba(255,255,255,0)',
  },
};

// setTimeout(() => {
//   colors.theme[THEME] = {
//     brandLight: '#f2ffff',
//     brandMedium: '#00b4d8',
//     brandLightMedium: '#023e8a',
//     brandDark: '#03045e',
//     brandDanger: '#E83641',
//   };
// }, 5000);

export const utils = {
  fontSize: {
    xxsmall: 10,
    xsmall: 12,
    small: 14,
    medium: 16,
    large: 18,
    xlarge: 20,
    xxlarge: 24,
    xxxlarge: 28,
    heroSubTitle: 32,
    heroTitle: 40,
  },
  // fontFamily: {
  //   ExtraLight: 'Nunito-ExtraLight',
  //   Light: 'Nunito-Light',
  //   Regular: 'Nunito-Regular',
  //   SemiBold: 'Nunito-SemiBold',
  //   Bold: 'Nunito-Bold',
  //   ExtraBold: 'Nunito-ExtraBold',
  //   Black: 'Nunito-Black',
  // },
  fontFamily: {
    Thin: 'Brandon_thin',
    Light: 'Brandon_light',
    Regular: 'Brandon_reg',
    // Medium: 'Brandon_med',
    SemiBold: 'Brandon_med',
    Bold: 'Brandon_bld',
    Black: 'Brandon_blk',
  },
  // fontFamily: {
  //   ExtraLight: 'WorkSans-Thin',
  //   Light: 'WorkSans-Light',
  //   Medium: 'WorkSans-Medium',
  //   Regular: 'WorkSans-Regular',
  //   SemiBold: 'WorkSans-SemiBold',
  //   Bold: 'WorkSans-Bold',
  //   ExtraBold: 'WorkSans-ExtraBold',
  //   Black: 'WorkSans-Black',
  // },
  // fontFamily: {
  //   Light: 'OpenSans-Light',
  //   Medium: 'OpenSans-Medium',
  //   Regular: 'OpenSans-Regular',
  //   SemiBold: 'OpenSans-SemiBold',
  //   Bold: 'OpenSans-Bold',
  //   ExtraBold: 'OpenSans-ExtraBold',
  //   // Black: 'OpenSans-Black',
  // },
  inputRadius: 15,
  inputElevation: {
    elevation: 10,
    shadowColor: colors.theme[THEME].shadowBrandLight,
    shadowOpacity: 1,
  },
  bgWhite: {
    backgroundColor: colors.theme[THEME].textLight,
  },
};

export const ripple = {
  color: colors.theme[THEME].textBrandDark,
};

export const formStyles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 10,
  },
  inputLabel: {
    color: colors.theme[THEME].textDark,
    marginBottom: 10,
    fontSize: utils.fontSize.small,
    fontFamily: utils.fontFamily.Bold,
  },
  input: {
    color: colors.theme[THEME].textDark,
    backgroundColor: colors.theme[THEME].brandLight,
    borderRadius: utils.inputRadius,
    fontSize: utils.fontSize.medium,
    fontFamily: utils.fontFamily.Bold,
    paddingHorizontal: 20,
    paddingVertical: 16,
    ...utils.inputElevation,
  },
  inputError: {
    color: colors.theme[THEME].brandDanger,
    paddingVertical: 6,
    fontFamily: utils.fontFamily.Bold,
    fontSize: utils.fontSize.small,
  },
  select: {
    backgroundColor: colors.theme[THEME].brandLight,
    borderRadius: utils.inputRadius,
    fontSize: utils.fontSize.large,
    padding: 5,
    ...utils.inputElevation,
  },
  selectBtn: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    ...utils.inputElevation,
    backgroundColor: colors.theme[THEME].brandLight,
    borderRadius: utils.inputRadius,
  },
  selectBtnLabel: {
    color: colors.theme[THEME].textDark,
    fontSize: utils.fontSize.medium,
    fontFamily: utils.fontFamily.Bold,
  },
  pickerItemStyle: {
    fontSize: utils.fontSize.large,
    color: colors.theme[THEME].textDark,
    paddingHorizontal: 20,
  },
  inputDivider: {
    width: '4%',
  },
  halfWidth: {
    width: '48%',
  },
  fullWidth: {
    flex: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.theme[THEME].brandMedium,
    borderRadius: utils.inputRadius,
    shadowColor: colors.theme[THEME].shadowBrandMedium,
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
  },
  actionBtn: {
    padding: 8,
    marginRight: 10,
  },
  pinnedActive: {
    borderRadius: utils.inputRadius,
    borderColor: colors.theme[THEME].textBrandMedium,
    borderWidth: 1,
  },
  pinnedInactive: {
    borderRadius: utils.inputRadius,
    borderColor: colors.theme[THEME].textBrandMedium,
    borderWidth: 1,
  },
  saveButton: {
    marginVertical: 20,
  },
  buttonLabel: {
    color: colors.theme[THEME].textLight,
    fontSize: utils.fontSize.medium,
    fontFamily: utils.fontFamily.Bold,
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionQuickmenu: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export const containerLeftMargin = 50;
export const commonStyles = StyleSheet.create({
  mb160: {
    marginBottom: 160,
  },
  mt0: {
    marginTop: 0,
  },
  screen: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.theme[THEME].brandBg,
  },
  container: {
    paddingHorizontal: 20,
    paddingLeft: containerLeftMargin,
    backgroundColor: colors.theme[THEME].brandBg,
    fontFamily: utils.fontFamily,
  },
  icon: {
    width: 24,
    height: 24,
  },
  mr20: {
    marginRight: 20,
  },
  r10: {
    borderRadius: 16,
  },
  card: {
    height: 100,
    width: 50,
    display: 'flex',
    borderRadius: 14,
    marginLeft: 20,
    padding: 15,
    marginVertical: 20,
    firstCard: {
      marginLeft: containerLeftMargin,
    },
    large: {
      height: 170,
      width: 140,
    },
    medium: {
      height: 120,
      width: 110,
    },
    brandWhite: {
      elevation: 10,
      shadowColor: colors.theme[THEME].shadowBrandLight,
      backgroundColor: colors.theme[THEME].brandLight,
      text: {
        fontSize: utils.fontSize.small,
        color: colors.theme[THEME].textGray,
      },
      totalText: {
        fontFamily: utils.fontFamily.Bold,
        color: colors.theme[THEME].textDark,
      },
    },
    brandMedium: {
      elevation: 10,
      shadowcolor: colors.theme[THEME].shadowBrandMedium,
      backgroundColor: colors.theme[THEME].brandMedium,
      text: {
        fontSize: utils.fontSize.small,
        color: colors.theme[THEME].textLight,
      },
      totalText: {
        fontFamily: utils.fontFamily.Bold,
        color: colors.theme[THEME].textLight,
      },
    },
    brandDark: {
      elevation: 10,
      shadowColor: colors.theme[THEME].shadowBrandMedium,
      backgroundColor: colors.theme[THEME].brandDark,
      text: {
        fontSize: utils.fontSize.small,
        color: colors.theme[THEME].textLight,
      },
      totalText: {
        fontFamily: utils.fontFamily.Bold,
        color: colors.theme[THEME].textLight,
      },
    },
  },
  title: {
    fontSize: utils.fontSize.xlarge,
    color: colors.theme[THEME].textDark,
    fontFamily: utils.fontFamily.Bold,
  },
  shadowGray: {
    elevation: 1,
    shadowColor: colors.theme[THEME].shadowBrandMedium,
  },
  categoryTitle: {
    color: colors.theme[THEME].textDark,
    marginTop: 20,
    fontSize: utils.fontSize.small,
    fontFamily: utils.fontFamily.Bold,
    marginLeft: containerLeftMargin,
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flex: 1,
  },
  illustration: {
    height: '100%',
    width: '100%',
    aspectRatio: 1,
  },
  illustrationTitle: {
    color: colors.theme[THEME].textBrandMedium,
    fontSize: utils.fontSize.medium,
    fontFamily: utils.fontFamily.Bold,
    paddingVertical: 30,
  },
  illustrationTitleBtn: {
    backgroundColor: colors.theme[THEME].brandDark,
    borderRadius: utils.inputRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 20,
  },
  bottomTabContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.theme[THEME].brandBg,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 10,
    shadowcolor: colors.theme[THEME].shadowBrandMedium,
    shadowOffset: {
      width: -10,
      height: -10,
    },
  },
  bottomTab: {
    // padding: 14,
  },
  bottomTabTextActive: {
    fontSize: utils.fontSize.medium,
    color: colors.theme[THEME].textBrandMedium,
    fontFamily: utils.fontFamily.Bold,
    paddingVertical: 16,
  },
  bottomTabText: {
    paddingVertical: 16,
    fontSize: utils.fontSize.medium,
    color: colors.theme[THEME].textGray,
    fontFamily: utils.fontFamily.Bold,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  searchWrapper: {
    margin: 20,
    marginLeft: containerLeftMargin,
  },
});

export const uploadMenu = StyleSheet.create({
  uploadWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    flex: 1,
    elevation: 10,
    zIndex: 100,
    shadowColor: colors.theme[THEME].shadowBrandMedium,
    shadowOffset: {
      width: -10,
      height: -10,
    },
  },
  elevationWrapper: {
    display: 'flex',
    flex: 1,
    height: 10,
    elevation: 10,
  },
  uploadMenuHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  uploadMenuTitle: {
    color: colors.theme[THEME].textBrandMedium,
    fontSize: utils.fontSize.medium,
    fontFamily: utils.fontFamily.Bold,
    paddingTop: 20,
  },
  uploadMenuSubTitle: {
    color: colors.theme[THEME].textCardGray,
    fontSize: utils.fontSize.xxsmall,
    fontFamily: utils.fontFamily.Bold,
    paddingBottom: 20,
  },
  uploadContainer: {
    paddingBottom: 20,
    backgroundColor: colors.theme[THEME].brandBg,
  },
  uploadMenu: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  uploadText: {
    color: colors.theme[THEME].textBrandMedium,
    fontSize: utils.fontSize.medium,
    marginLeft: 10,
    fontFamily: utils.fontFamily.Bold,
  },
  uploadMenuClose: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 60,
    padding: 6,
    // backgroundColor: colors.theme[THEME].brandMedium,
    borderTopLeftRadius: utils.inputRadius,
    borderTopRightRadius: utils.inputRadius,
  },
  imageListWrapper: {
    marginTop: 20,
  },
  imageListContainer: {
    marginVertical: 10,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  imageListItemWrapper: {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
  imageListItem: {
    borderRadius: utils.inputRadius,
    // borderWidth: 1,
    borderColor: colors.theme[THEME].textBrandMedium,
    // marginBottom: 10,
    // marginRight: 10,
    width: '100%',
    height: 120,
  },
  imageListItemRemove: {
    backgroundColor: colors.theme[THEME].brandMedium,
    margin: 4,
    borderRadius: utils.inputRadius,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
});

export const recentList = StyleSheet.create({
  empty: {
    paddingHorizontal: commonStyles.container.paddingHorizontal,
    paddingBottom: 20,
  },
  dividerMargin: {
    paddingTop: 16,
  },
  dividerWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 1,
    marginVertical: 8,
    opacity: 0.05,
  },
  divider: {
    // textAlign: 'left',
    // borderBottomWidth: 1,
    // borderBottomColor: colors.theme[THEME].textBrandMedium,
    // left: '20%',
    // width: '30%',
  },
  swiper: {
    backgroundColor: colors.theme[THEME].brandBg,
    display: 'flex',
  },
  swipeIcon: {
    backgroundColor: colors.theme[THEME].brandBg,
    position: 'relative',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  listHeaderIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.theme[THEME].brandBg,
    borderRadius: utils.inputRadius,
    paddingLeft: 10,
  },
  listHeaderIcon: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  listTitle: {
    // fontSize: utils.fontSize.large,
    // fontFamily: utils.fontFamily.Bold,
    color: colors.theme[THEME].textDark,
    paddingVertical: 16,
  },
  listWrapper: {
    // backgroundColor: colors.theme[THEME].textLight,
    // paddingHorizontal: 10,
    marginTop: 10,
    display: 'flex',
    flex: 1,
    height: '100%',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  listItemInfo: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  listItemIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.theme[THEME].brandBg,
    marginVertical: 10,
    marginRight: 20,
    borderRadius: utils.inputRadius,
    padding: 10,
    width: 44,
    height: 44,
  },
  listItemDescription: {
    display: 'flex',
    flexDirection: 'row',
  },
  listItemTitle: {
    color: colors.theme[THEME].textDark,
    fontSize: utils.fontSize.medium,
    fontFamily: utils.fontFamily.Bold,
    // maxWidth: '90%',
  },
  listItemInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  listItemInfoIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemAmountWrapper: {
    // marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  listItemDate: {
    marginTop: 4,
    color: colors.theme[THEME].textGray,
    fontSize: utils.fontSize.xsmall,
    fontFamily: utils.fontFamily.SemiBold,
  },
  listItemAmount: {
    color: colors.theme[THEME].textDark,
    fontSize: utils.fontSize.small,
    fontFamily: utils.fontFamily.Bold,
  },
  listItemPayment: {
    color: colors.theme[THEME].textGray,
    fontSize: utils.fontSize.xsmall,
    fontFamily: utils.fontFamily.SemiBold,
    marginTop: 4,
  },
  modalPayment: {
    color: colors.theme[THEME].textBrandMedium,
  },
  modalDateAdded: {
    color: colors.theme[THEME].textBrandMedium,
  },
  modalDesc: {
    color: colors.theme[THEME].textBrandMedium,
  },
  txActionWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  mb50: {
    marginBottom: 50,
  },
});

export const categoryList = StyleSheet.create({
  expensitureWrapper: {
    backgroundColor: colors.theme[THEME].brandBg,
    display: 'flex',
    overflow: 'scroll',
    marginLeft: -commonStyles.container.paddingLeft,
    marginRight: -commonStyles.container.paddingHorizontal,
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
    borderColor: colors.theme[THEME].textCardGray,
    borderStyle: 'dotted',
    width: 80,
    paddingVertical: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCategory: {
    color: colors.theme[THEME].brandBg,
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
    backgroundColor: colors.theme[THEME].brandMedium,
    marginHorizontal: 6,
    borderRadius: utils.inputRadius,
    dark: {
      backgroundColor: colors.theme[THEME].brandMedium,
    },
    light: {
      backgroundColor: colors.theme[THEME].brandDark,
    },
  },
  categoryTitle: {
    color: colors.theme[THEME].textLight,
    fontSize: utils.fontSize.small,
    fontFamily: utils.fontFamily.Bold,
    marginLeft: 10,
  },
});
