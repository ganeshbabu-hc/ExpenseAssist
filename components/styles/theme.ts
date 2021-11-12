import {StyleSheet} from 'react-native';
import {deepOrange, deepPurple, grey, pink} from 'material-ui-colors';
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
  brandLight: string;
  brandMedium: string;
  brandMediumDark: string;
  brandDark: string;
  brandDanger: string;
  textDark: string;
  textGray: string;
  textCardGray: string;
  textLight: string;
}
interface ITheme {
  [key: string]: IColorMapping;
}

interface IColors {
  theme: ITheme;
  brand: any;
}

export let colors: IColors = {
  //old
  // brandLight: '#F6F4FF',
  // brandMedium: '#8746D6',
  // brandDark: '#3D2C8D',

  //Brand Purple-current--
  theme: {
    purple: {
      // brandLight: deepPurple[50],
      brandLight: 'hsla(230, 0%, 98%, 1)',
      brandMedium: deepPurple.A700,
      brandMediumDark: deepPurple[200],
      brandDark: deepPurple[900],
      brandDanger: pink[600],
      textDark: '#000',
      textGray: grey[500],
      textCardGray: grey[400],
      textLight: '#fff',
    },
    red: {
      // brandLight: deepPurple[50],
      brandLight: 'hsla(230, 0%, 98%, 1)',
      brandMedium: deepPurple.A700,
      brandMediumDark: deepPurple[200],
      brandDark: deepPurple[900],
      brandDanger: pink[600],
      textDark: '#f45',
      textGray: grey[500],
      textCardGray: grey[400],
      textLight: '#fff',
    },
  },
  brand: {
    // brandLight: deepPurple[50],
    brandLight: 'hsla(230, 0%, 98%, 1)',
    brandMedium: deepPurple.A700,
    brandMediumDark: deepPurple[200],
    brandDark: deepPurple[900],
    brandDanger: pink[600],
    textDark: '#000',
    textGray: grey[500],
    textCardGray: grey[400],
    textLight: '#fff',
  },
  // brand: {
  //   // brandLight: deepPurple[50],
  //   brandLight: '#131d2a',
  //   brandMedium: '#2e4765',
  //   brandMediumDark: '#172231',
  //   brandDark: '#172231',
  //   brandDanger: pink[600],
  // },

  // #131d2a
  // brand: {
  //   brandLight: `hsla(${hue}, 100%, 98%, 1)`,
  //   brandMedium: `hsla(${hue}, 100%, 65%, 1)`,
  //   brandMediumDark: `hsla(${hue}, 100%, 45%, 1)`,
  //   brandDark: `hsla(${hue}, 100%, 30%, 1)`,
  //   brandDanger: pink[600],
  // },
  // hsla(267, 100%, 50%, 1)
  //Brand Orance
  // brandLight: deepOrange[50],
  // brandMedium: deepOrange.A700,
  // brandMediumDark: deepOrange[200],
  // brandDark: deepOrange[900],
  // brandDanger: pink[600],

  //Brand Orance
  // brandLight: '#e5e5e5',
  // brandMedium: '#fca311',
  // brandMediumDark: '#14213d',
  // brandDark: '#000000',
  // brandDanger: '#E83641',

  //Brand violet
  // brandLight: '#EEF9EC',
  // brandMedium: '#3B6E91',
  // brandMediumDark: '#9BD4D6',
  // brandDark: '#1C2D4C',
  // brandDanger: '#E83641',

  //Sky blue
  // brandLight: '#f2ffff',
  // brandMedium: '#00b4d8',
  // brandMediumDark: '#023e8a',
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
};

// setTimeout(() => {
//   colors.theme[THEME] = {
//     brandLight: '#f2ffff',
//     brandMedium: '#00b4d8',
//     brandMediumDark: '#023e8a',
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
    shadowColor: colors.theme[THEME].textCardGray,
    shadowOpacity: 1,
  },
  bgWhite: {
    backgroundColor: colors.theme[THEME].textLight,
  },
};

export const ripple = {
  color: colors.theme[THEME].brandMedium,
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
    backgroundColor: colors.theme[THEME].textLight,
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
    backgroundColor: colors.theme[THEME].textLight,
    borderRadius: utils.inputRadius,
    fontSize: utils.fontSize.large,
    padding: 5,
    ...utils.inputElevation,
  },
  selectBtn: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    ...utils.inputElevation,
    backgroundColor: colors.theme[THEME].textLight,
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
    width: '100%',
  },
  button: {
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.theme[THEME].brandMedium,
    borderRadius: utils.inputRadius,
    shadowColor: colors.theme[THEME].brandMedium,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    color: colors.theme[THEME].textLight,
    fontSize: utils.fontSize.medium,
    fontFamily: utils.fontFamily.Bold,
  },
});

export const containerLeftMargin = 50;
export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.theme[THEME].brandLight,
  },
  container: {
    paddingHorizontal: 20,
    paddingLeft: containerLeftMargin,
    backgroundColor: colors.theme[THEME].brandLight,
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
      shadowColor: colors.theme[THEME].textGray,
      backgroundColor: colors.theme[THEME].textLight,
      text: {
        fontSize: utils.fontSize.small,
        color: colors.theme[THEME].textCardGray,
      },
      totalText: {
        fontFamily: utils.fontFamily.Bold,
        color: colors.theme[THEME].textDark,
      },
    },
    brandMedium: {
      elevation: 10,
      shadowColor: colors.theme[THEME].brandMedium,
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
      shadowColor: colors.theme[THEME].brandDark,
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
    shadowColor: '#52006A',
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
    height: '100%',
  },
  illustration: {},
  illustrationTitle: {
    color: colors.theme[THEME].brandMedium,
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
  // illustrationTitleIcon: {

  // }
});

export const recentList = StyleSheet.create({
  empty: {
    paddingHorizontal: commonStyles.container.paddingHorizontal,
    paddingBottom: 20,
  },
  dividerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: grey[100],
    height: 1,
    width: '80%',
  },
  swiper: {
    backgroundColor: colors.theme[THEME].brandLight,
    display: 'flex',
  },
  swipeIcon: {
    backgroundColor: colors.theme[THEME].brandLight,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeIconEdit: {
    backgroundColor: colors.theme[THEME].brandLight,
    height: '100%',
  },
  swipeIconDelete: {
    backgroundColor: colors.theme[THEME].brandLight,
    height: '100%',
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
    backgroundColor: colors.theme[THEME].brandLight,
    borderRadius: utils.inputRadius,
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
    backgroundColor: colors.theme[THEME].brandLight,
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
    fontSize: utils.fontSize.small,
    fontFamily: utils.fontFamily.Bold,
    // maxWidth: '90%',
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
    color: colors.theme[THEME].brandMedium,
  },
  modalDateAdded: {
    color: colors.theme[THEME].brandMedium,
  },
  modalDesc: {
    color: colors.theme[THEME].brandMedium,
  },
});

export const categoryList = StyleSheet.create({
  expensitureWrapper: {
    backgroundColor: colors.theme[THEME].brandLight,
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
    marginRight: 15,
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
    color: colors.theme[THEME].brandLight,
    position: 'relative',
    paddingRight: 8,
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
