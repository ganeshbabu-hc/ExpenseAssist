import { StyleSheet } from 'react-native';
import { colors, containerGutter, utils } from './theme';

export const recentListStyles = (themeCode: string) =>
  StyleSheet.create({
    empty: {
      paddingHorizontal: containerGutter,
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
      // borderBottomColor: colors.theme[themeCode].textBrandMedium,
      // left: '20%',
      // width: '30%',
    },
    swiper: {
      backgroundColor: colors.theme[themeCode].brandBg,
      display: 'flex',
    },
    swipeIcon: {
      backgroundColor: colors.theme[themeCode].brandBg,
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
      backgroundColor: colors.theme[themeCode].brandBg,
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
      color: colors.theme[themeCode].textDark,
      paddingVertical: 16,
    },
    listWrapper: {
      // backgroundColor: colors.theme[themeCode].textLight,
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
      backgroundColor: colors.theme[themeCode].brandBg,
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
      color: colors.theme[themeCode].textDark,
      fontSize: utils.fontSize.medium,
      fontFamily: utils.fontFamily.Bold,
      flex: 1,
      // maxWidth: '90%',
    },
    listItemInfoWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      // flex: 1,
    },
    listItemInfoIcon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // minWidth: 40,
    },
    listItemAmountWrapper: {
      // marginRight: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    listItemDate: {
      marginTop: 4,
      color: colors.theme[themeCode].textGray,
      fontSize: utils.fontSize.xsmall,
      fontFamily: utils.fontFamily.SemiBold,
    },
    listItemAmount: {
      color: colors.theme[themeCode].textDark,
      fontSize: utils.fontSize.small,
      fontFamily: utils.fontFamily.Bold,
    },
    listItemPayment: {
      color: colors.theme[themeCode].textGray,
      fontSize: utils.fontSize.xsmall,
      fontFamily: utils.fontFamily.SemiBold,
      marginTop: 4,
    },
    modalPayment: {
      color: colors.theme[themeCode].textBrandMedium,
    },
    modalDateAdded: {
      color: colors.theme[themeCode].textBrandMedium,
    },
    modalDesc: {
      color: colors.theme[themeCode].textBrandMedium,
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
