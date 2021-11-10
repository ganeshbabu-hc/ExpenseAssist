import {StyleSheet} from 'react-native';
import {deepOrange, deepPurple, grey, pink} from 'material-ui-colors';
import color from 'material-ui-colors/dist/amber';

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
export let colors = {
  //old
  // brandLight: '#F6F4FF',
  // brandMedium: '#8746D6',
  // brandDark: '#3D2C8D',

  //Brand Purple
  brand: {
    // brandLight: deepPurple[50],
    brandLight: 'hsla(230, 0%, 98%, 1)',
    brandMedium: deepPurple.A700,
    brandMediumDark: deepPurple[200],
    brandDark: deepPurple[900],
    brandDanger: pink[600],
  },
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

  black: '#000',
  white: '#fff',
  // grayText: '#85848B',
  // grayCardText: '#ADADAD',
  gray50: grey[50],
  grayText: grey[500],
  grayCardText: grey[400],
  transparent: 'rgba(255,255,255,0)',
};

// setTimeout(() => {
//   colors.brand = {
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
    shadowColor: colors.grayCardText,
    shadowOpacity: 1,
  },
  bgWhite: {
    backgroundColor: colors.white,
  },
};

export const ripple = {
  color: colors.brand.brandMedium,
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
    color: colors.black,
    marginBottom: 10,
    fontSize: utils.fontSize.small,
    fontFamily: utils.fontFamily.Bold,
  },
  input: {
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: utils.inputRadius,
    fontSize: utils.fontSize.medium,
    fontFamily: utils.fontFamily.Bold,
    paddingHorizontal: 20,
    paddingVertical: 16,
    ...utils.inputElevation,
  },
  inputError: {
    color: colors.brand.brandDanger,
    paddingVertical: 6,
    fontFamily: utils.fontFamily.Bold,
    fontSize: utils.fontSize.small,
  },
  select: {
    backgroundColor: colors.white,
    borderRadius: utils.inputRadius,
    fontSize: utils.fontSize.large,
    padding: 5,
    ...utils.inputElevation,
  },
  selectBtn: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    ...utils.inputElevation,
    backgroundColor: colors.white,
    borderRadius: utils.inputRadius,
  },
  selectBtnLabel: {
    color: colors.black,
    fontSize: utils.fontSize.medium,
    fontFamily: utils.fontFamily.Bold,
  },
  pickerItemStyle: {
    fontSize: utils.fontSize.large,
    color: colors.black,
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
    backgroundColor: colors.brand.brandMedium,
    borderRadius: utils.inputRadius,
    shadowColor: colors.brand.brandMedium,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    color: colors.white,
    fontSize: utils.fontSize.medium,
    fontFamily: utils.fontFamily.Bold,
  },
});

export const containerLeftMargin = 50;
export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.brand.brandLight,
  },
  container: {
    paddingHorizontal: 20,
    paddingLeft: containerLeftMargin,
    backgroundColor: colors.brand.brandLight,
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
      shadowColor: colors.grayText,
      backgroundColor: colors.white,
      text: {
        fontSize: utils.fontSize.small,
        color: colors.grayCardText,
      },
      totalText: {
        fontFamily: utils.fontFamily.Bold,
        color: colors.black,
      },
    },
    brandMedium: {
      elevation: 10,
      shadowColor: colors.brand.brandMedium,
      backgroundColor: colors.brand.brandMedium,
      text: {
        fontSize: utils.fontSize.small,
        color: colors.white,
      },
      totalText: {
        fontFamily: utils.fontFamily.Bold,
        color: colors.white,
      },
    },
    brandDark: {
      elevation: 10,
      shadowColor: colors.brand.brandDark,
      backgroundColor: colors.brand.brandDark,
      text: {
        fontSize: utils.fontSize.small,
        color: colors.white,
      },
      totalText: {
        fontFamily: utils.fontFamily.Bold,
        color: colors.white,
      },
    },
  },
  title: {
    fontSize: utils.fontSize.xlarge,
    color: colors.black,
    fontFamily: utils.fontFamily.Bold,
  },
  shadowGray: {
    elevation: 1,
    shadowColor: '#52006A',
  },
  categoryTitle: {
    color: colors.black,
    marginTop: 20,
    fontSize: utils.fontSize.small,
    fontFamily: utils.fontFamily.Bold,
    marginLeft: containerLeftMargin,
  },
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
    backgroundColor: colors.white,
    display: 'flex',
  },
  swipeIcon: {
    backgroundColor: colors.brand.brandLight,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeIconEdit: {
    backgroundColor: colors.white,
    height: '100%',
  },
  swipeIconDelete: {
    backgroundColor: colors.white,
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
    backgroundColor: colors.brand.brandLight,
    borderRadius: utils.inputRadius,
  },
  listHeaderIcon: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  listTitle: {
    // fontSize: utils.fontSize.large,
    // fontFamily: utils.fontFamily.Bold,
    color: colors.black,
    paddingVertical: 16,
  },
  listWrapper: {
    backgroundColor: colors.white,
    // paddingHorizontal: 10,
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
    backgroundColor: colors.brand.brandLight,
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
    color: colors.black,
    fontSize: utils.fontSize.small,
    fontFamily: utils.fontFamily.Bold,
    maxWidth: '90%',
  },
  listItemAmountWrapper: {
    // marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  listItemDate: {
    marginTop: 4,
    color: colors.grayText,
    fontSize: utils.fontSize.xsmall,
    fontFamily: utils.fontFamily.SemiBold,
  },
  listItemAmount: {
    color: colors.black,
    fontSize: utils.fontSize.small,
    fontFamily: utils.fontFamily.Bold,
  },
  listItemPayment: {
    color: colors.grayText,
    fontSize: utils.fontSize.xsmall,
    fontFamily: utils.fontFamily.SemiBold,
    marginTop: 4,
  },
  modalPayment: {
    color: colors.brand.brandMedium,
  },
  modalDateAdded: {
    color: colors.brand.brandMedium,
  },
  modalDesc: {
    color: colors.brand.brandMedium,
  },
});

export const categoryList = StyleSheet.create({
  expensitureWrapper: {
    backgroundColor: colors.brand.brandLight,
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
    borderColor: colors.grayCardText,
    borderStyle: 'dotted',
    width: 80,
    paddingVertical: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCategory: {
    color: colors.brand.brandLight,
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
    backgroundColor: colors.brand.brandMedium,
    marginHorizontal: 6,
    borderRadius: utils.inputRadius,
    dark: {
      backgroundColor: colors.brand.brandMedium,
    },
    light: {
      backgroundColor: colors.brand.brandDark,
    },
  },
  categoryTitle: {
    color: colors.white,
    fontSize: utils.fontSize.small,
    fontFamily: utils.fontFamily.Bold,
    marginLeft: 10,
  },
});
