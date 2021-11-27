import { StyleSheet } from 'react-native';
import { colors, containerGutter, containerLeftMargin, utils } from './theme';

export const commonStyle = (themeCode: string) =>
  StyleSheet.create({
    mb160: {
      marginBottom: 160,
    },
    mt0: {
      marginTop: 0,
    },
    screen: {
      flex: 1,
      display: 'flex',
      backgroundColor: colors.theme[themeCode].brandBg,
    },
    container: {
      paddingHorizontal: 20,
      paddingLeft: containerLeftMargin,
      backgroundColor: colors.theme[themeCode].brandBg,
      fontFamily: utils.fontFamily,
    },
    icon: {
      width: 24,
      height: 24,
    },
    mr20: {
      marginRight: 20,
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
        shadowColor: colors.theme[themeCode].shadowBrandLight,
        backgroundColor: colors.theme[themeCode].brandLight,
        text: {
          fontSize: utils.fontSize.small,
          color: colors.theme[themeCode].textGray,
        },
        totalText: {
          fontFamily: utils.fontFamily.Bold,
          color: colors.theme[themeCode].textDark,
        },
      },
      brandMedium: {
        elevation: 10,
        shadowcolor: colors.theme[themeCode].shadowBrandMedium,
        backgroundColor: colors.theme[themeCode].brandMedium,
        text: {
          fontSize: utils.fontSize.small,
          color: colors.theme[themeCode].textLight,
        },
        totalText: {
          fontFamily: utils.fontFamily.Bold,
          color: colors.theme[themeCode].textLight,
        },
      },
      brandDark: {
        elevation: 10,
        shadowColor: colors.theme[themeCode].shadowBrandMedium,
        backgroundColor: colors.theme[themeCode].brandDark,
        text: {
          fontSize: utils.fontSize.small,
          color: colors.theme[themeCode].textLight,
        },
        totalText: {
          fontFamily: utils.fontFamily.Bold,
          color: colors.theme[themeCode].textLight,
        },
      },
    },
    title: {
      fontSize: utils.fontSize.xlarge,
      color: colors.theme[themeCode].textDark,
      fontFamily: utils.fontFamily.Bold,
    },
    shadowGray: {
      elevation: 1,
      shadowColor: colors.theme[themeCode].shadowBrandMedium,
    },
    categoryTitle: {
      color: colors.theme[themeCode].textDark,
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
      color: colors.theme[themeCode].textBrandMedium,
      fontSize: utils.fontSize.medium,
      fontFamily: utils.fontFamily.Bold,
      paddingVertical: 30,
    },
    illustrationTitleBtn: {
      backgroundColor: colors.theme[themeCode].brandDark,
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
      backgroundColor: colors.theme[themeCode].brandBg,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      elevation: 10,
      shadowcolor: colors.theme[themeCode].shadowBrandMedium,
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
      color: colors.theme[themeCode].textBrandMedium,
      fontFamily: utils.fontFamily.Bold,
      paddingVertical: 16,
    },
    bottomTabText: {
      paddingVertical: 16,
      fontSize: utils.fontSize.medium,
      color: colors.theme[themeCode].textGray,
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

export const homeScreenStyles = (themeCode: string) =>
  StyleSheet.create({
    quickMenuContainer: {
      backgroundColor: colors.theme[themeCode].brandBg,
    },
  });

export const quickMenuStyles = (themeCode: string) =>
  StyleSheet.create({
    quickMenuContainer: {
      backgroundColor: colors.theme[themeCode].brandBg,
      overflow: 'hidden',
    },
    iconWrapper: {
      borderRadius: utils.inputRadius,
      overflow: 'hidden',
      width: 40,
      height: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
    },
    typeListContainer: {
      marginTop: 10,
    },
    lightBg: {
      backgroundColor: colors.theme[themeCode].brandLight,
    },
    darKbg: {
      backgroundColor: colors.theme[themeCode].brandBg,
    },
    typeCard: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      title: {
        marginTop: 10,
        fontSize: utils.fontSize.xsmall,
        fontFamily: utils.fontFamily.Bold,
      },
    },
    list: {
      // marginTop: 20,
    },
    title: {
      marginTop: 20,
    },
    addBtnWrapper: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: 80,
    },
    addBtn: {
      borderRadius: utils.inputRadius,
      borderWidth: 2,
      borderColor: colors.theme[themeCode].textCardGray,
      borderStyle: 'dotted',
    },
  });

export const addBtnStyles = (themeCode: string) =>
  StyleSheet.create({
    btnContainer: {
      backgroundColor: colors.theme[themeCode].brandMedium,
      zIndex: 1,
      borderRadius: utils.inputRadius,
      width: 56,
      height: 56,
      position: 'relative',
      bottom: 24,
      right: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 10,
      shadowColor: colors.theme[themeCode].shadowBrandMedium,
      shadowOffset: {
        width: 10,
        height: 10,
      },
    },
  });

export const typeListStyles = (themeCode: string) =>
  StyleSheet.create({
    typeListContainer: {
      backgroundColor: colors.theme[themeCode].brandBg,
      overflow: 'hidden',
    },
    typeCard: {
      display: 'flex',
      icon: {
        marginTop: 8,
      },
      title: {
        marginTop: 10,
        fontSize: utils.fontSize.small,
        fontFamily: utils.fontFamily.Bold,
      },
    },
    list: {
      marginTop: 10,
    },
    title: {
      marginTop: 20,
    },
    addBtnWrapper: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginLeft: containerGutter,
    },
    addBtn: {
      borderRadius: utils.inputRadius,
      borderWidth: 2,
      borderColor: colors.theme[themeCode].textCardGray,
      borderStyle: 'dotted',
    },
  });

export const summaryListStyles = (themeCode: string) =>
  StyleSheet.create({
    summaryListWrapper: {
      backgroundColor: colors.theme[themeCode].brandBg,
      overflow: 'hidden',
    },
    summaryListContainer: {
      overflow: 'hidden',
      paddingBottom: 20,
    },
    summaryCard: {
      display: 'flex',
      icon: {
        marginTop: 6,
      },
      title: {
        marginTop: 6,
        fontFamily: utils.fontFamily.Bold,
        fontSize: utils.fontSize.small,
      },
      total: {
        marginTop: 4,
        fontSize: utils.fontSize.small,
        fontFamily: utils.fontFamily.Bold,
      },
    },
    currencyIcon: {
      fontSize: utils.fontSize.small,
      fontWeight: '700',
      marginTop: 16,
    },
    title: {
      marginLeft: containerGutter,
    },
  });

export const categoryStyles = (themeCode: string) =>
  StyleSheet.create({
    expenseWrapper: {
      backgroundColor: colors.theme[themeCode].brandBg,
      display: 'flex',
      flex: 1,
      marginTop: 30,
      marginVertical: 40,
    },
  });

export const weeklyCalendarStyles = (themeCode: string) =>
  StyleSheet.create({
    dateWrapper: {
      display: 'flex',
      overflow: 'scroll',
      backgroundColor: colors.theme[themeCode].brandLight,
      borderRadius: utils.inputRadius,
      minHeight: 100,
      marginBottom: 10,
    },
    dateHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      flexDirection: 'row',
      padding: 10,
      marginTop: 10,
    },
    dateBtn: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    timeBtn: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    timeIon: {
      marginLeft: 10,
    },
    btnText: {
      color: colors.theme[themeCode].textDark,
      fontSize: utils.fontSize.small,
      fontFamily: utils.fontFamily.Bold,
      marginLeft: 10,
    },
    daysContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    day: {
      marginVertical: 20,
    },
    dayName: {
      paddingHorizontal: 10,
      fontSize: utils.fontSize.small,
      color: colors.theme[themeCode].textCardGray,
      fontFamily: utils.fontFamily.Bold,
    },
    dayNumberWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      width: 40,
      height: 40,
      marginTop: 10,
      active: {
        color: colors.theme[themeCode].textLight,
        backgroundColor: colors.theme[themeCode].brandMedium,
      },
    },
    dayNumber: {
      fontSize: utils.fontSize.small,
      fontFamily: utils.fontFamily.Bold,
      color: colors.theme[themeCode].textDark,
    },
  });

export const paymentStyles = (themeCode: string) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.8)',
    },
    modalView: {
      minWidth: '75%',
      backgroundColor: 'white',
      borderRadius: utils.inputRadius,
      paddingHorizontal: 20,
      alignItems: 'flex-start',
      shadowColor: colors.theme[themeCode].shadowBrandMedium,
      paddingVertical: 10,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    paymentWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: 10,
      width: '100%',
    },
    paymentCheckWrapper: {
      marginRight: 10,
      width: 30,
    },
    paymentTitle: {
      color: colors.theme[themeCode].brandMedium,
      fontFamily: utils.fontFamily.Bold,
      fontSize: utils.fontSize.large,
      marginLeft: 10,
    },
    paymentHeader: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export const toastStyles = (themeCode: string) =>
  StyleSheet.create({
    message1Wrapper: {
      position: 'absolute',
      top: 10,
      left: 0,
      right: 0,
    },
    messageWrapper: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
    },
    message: {
      margin: 10,
      marginBottom: 5,
      color: colors.theme[themeCode].textDark,
      backgroundColor: colors.theme[themeCode].brandDark,
      padding: 20,
      borderRadius: utils.inputRadius,
      shadowcolor: colors.theme[themeCode].shadowBrandMedium,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 6,
    },
    messageText: {
      color: colors.theme[themeCode].textLight,
      marginLeft: 10,
    },
    messageIconWrapper: {},
    messageIcon: {},
  });

export const uploadMenuStyle = (themeCode: string) =>
  StyleSheet.create({
    uploadWrapper: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      display: 'flex',
      flex: 1,
      elevation: 10,
      zIndex: 100,
      shadowColor: colors.theme[themeCode].shadowBrandMedium,
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
      color: colors.theme[themeCode].textBrandMedium,
      fontSize: utils.fontSize.medium,
      fontFamily: utils.fontFamily.Bold,
      paddingTop: 20,
    },
    uploadMenuSubTitle: {
      color: colors.theme[themeCode].textCardGray,
      fontSize: utils.fontSize.xxsmall,
      fontFamily: utils.fontFamily.Bold,
      paddingBottom: 20,
    },
    uploadContainer: {
      paddingBottom: 20,
      backgroundColor: colors.theme[themeCode].brandBg,
    },
    uploadMenu: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 10,
    },
    uploadText: {
      color: colors.theme[themeCode].textBrandMedium,
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
      borderColor: colors.theme[themeCode].textBrandMedium,
      width: '100%',
      height: 120,
    },
    imageListItemRemove: {
      backgroundColor: colors.theme[themeCode].brandMedium,
      margin: 4,
      borderRadius: utils.inputRadius,
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1,
    },
  });

export const settingScreenStyle = (themeCode: string) =>
  StyleSheet.create({
    quickMenuContainer: {
      backgroundColor: colors.theme[themeCode].brandBg,
      marginTop: 10,
    },
    divider: {
      marginVertical: 0,
    },
    settingWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginVertical: 20,
    },
    settingIconWrapper: {
      marginRight: 10,
    },
    settingDesc: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    settingName: {
      color: colors.theme[themeCode].textDark,
      fontSize: utils.fontSize.medium,
      fontFamily: utils.fontFamily.Bold,
    },
    settingValueWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingValue: {
      color: colors.theme[themeCode].textDark,
      fontSize: utils.fontSize.medium,
      fontFamily: utils.fontFamily.Bold,
    },
  });

export const currencyScreenStyle = (themeCode: string) =>
  StyleSheet.create({
    iconWrapper: {},
    currencyList: {
      backgroundColor: colors.theme[themeCode].brandBg,
    },
    listWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    currencyDescWrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: 14,
    },
    currencyDesc: {},
    currencyName: {
      fontFamily: utils.fontFamily.Bold,
      color: colors.theme[themeCode].textCardGray,
    },
    currencyCode: {
      fontFamily: utils.fontFamily.Bold,
      color: colors.theme[themeCode].textDark,
    },
    currencySymbol: {
      fontFamily: utils.fontFamily.Black,
      color: colors.theme[themeCode].textDark,
    },
    inputWrapper: {
      marginVertical: 30,
    },
  });

export const helpScreenStyle = (themeCode: string) =>
  StyleSheet.create({
    helpWrapper: {
      display: 'flex',
      flex: 1,
    },
    webView: {
      backgroundColor: colors.theme[themeCode].brandBg,
      display: 'flex',
      flex: 1,
      overflow: 'scroll',
    },
  });

export const accountsScreenStyle = (themeCode: string) =>
  StyleSheet.create({
    quickMenuContainer: {
      backgroundColor: colors.theme[themeCode].brandBg,
      marginTop: 10,
    },
    divider: {
      marginVertical: 0,
    },
    settingWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginVertical: 20,
    },
    settingIconWrapper: {
      marginRight: 10,
    },
    settingDesc: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    settingName: {
      color: colors.theme[themeCode].textDark,
      fontSize: utils.fontSize.medium,
      fontFamily: utils.fontFamily.Bold,
    },
    settingValueWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingValue: {
      color: colors.theme[themeCode].textDark,
      fontSize: utils.fontSize.medium,
      fontFamily: utils.fontFamily.Bold,
    },
  });

export const categoriesScreenStyle = (themeCode: string) =>
  StyleSheet.create({
    addCategoryBtn: {
      bottom: 20,
      backgroundColor: colors.theme[themeCode].brandMedium,
      shadowColor: colors.theme[themeCode].shadowBrandMedium,
      elevation: 10,
      padding: 10,
      borderRadius: utils.inputRadius,
    },
  });

export const remindersScreenStyle = (themeCode: string) =>
  StyleSheet.create({
    repeatWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    repeatType: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: utils.inputRadius,
      borderColor: colors.theme[themeCode].textBrandMedium,
      backgroundColor: colors.theme[themeCode].brandBg,
      borderWidth: 1,
    },
    repeatTypeActive: {
      backgroundColor: colors.theme[themeCode].brandMedium,
      color: colors.theme[themeCode].textLight,
    },
    repeatLabelActive: {
      color: colors.theme[themeCode].textLight,
      fontSize: utils.fontSize.small,
      fontFamily: utils.fontFamily.Bold,
    },
    repeatLabel: {
      color: colors.theme[themeCode].textBrandMedium,
      fontSize: utils.fontSize.small,
      fontFamily: utils.fontFamily.Bold,
    },
  });

export const statsScreenStyle = (themeCode: string) =>
  StyleSheet.create({
    tabWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    chartContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    typeWrapper: {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'scroll',
    },
    pieWrapper: {},
    typeBtnText: {
      color: colors.theme[themeCode].textLight,
    },
    typeBtn: {
      padding: 20,
      backgroundColor: colors.theme[themeCode].brandMedium,
      borderRadius: utils.inputRadius,
      marginHorizontal: 20,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    statTitle: {
      color: colors.theme[themeCode].textDark,
      fontFamily: utils.fontFamily.Bold,
      fontSize: utils.fontSize.heroSubTitle,
    },
    statSubTitle: {
      color: colors.theme[themeCode].textBrandMedium,
      fontFamily: utils.fontFamily.Bold,
      fontSize: utils.fontSize.xlarge,
    },
    bar: {
      display: 'flex',
      flex: 1,
      height: 150,
      width: 120,
      // width: '50%',
    },
    pie: {
      display: 'flex',
      flex: 1,
      height: 150,
      width: 120,
      // width: '50%',
    },
  });

export const categoryStatStyle = (themeCode: string) =>
  StyleSheet.create({
    statContainer: {
      display: 'flex',
      flex: 1,
      marginTop: 30,
    },
    barWrapper: {
      // padding
      paddingVertical: 10,
    },
    barLabel: {
      color: colors.theme[themeCode].textDark,
      fontFamily: utils.fontFamily.Bold,
      fontSize: utils.fontSize.small,
    },
    barLabelContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    barLabelWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    barContainer: {
      flex: 1,
      backgroundColor: colors.theme[themeCode].textLightGray,
      height: 14,
      borderRadius: 30,
      marginTop: 6,
      overflow: 'hidden',
    },
    bar: {
      borderRadius: 30,
      flex: 1,
      height: '100%',
      width: 20,
      backgroundColor: colors.theme[themeCode].brandMedium,
      // transform: [{ scaleY: 5.0 }],
    },
    barIcon: {
      marginRight: 4,
    },
  });

export const transactionViewStyle = (themeCode: string) =>
  StyleSheet.create({
    typeLabel: {
      color: colors.theme[themeCode].textDark,
      fontFamily: utils.fontFamily.Bold,
      fontSize: utils.fontSize.xxxlarge,
    },
  });
