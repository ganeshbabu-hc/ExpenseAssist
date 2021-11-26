import { StyleSheet } from 'react-native';
import { colors, utils } from './theme';

export const formStyle = (themeCode: string) =>
  StyleSheet.create({
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
      color: colors.theme[themeCode].textDark,
      marginBottom: 10,
      fontSize: utils.fontSize.small,
      fontFamily: utils.fontFamily.Bold,
    },
    input: {
      color: colors.theme[themeCode].textDark,
      backgroundColor: colors.theme[themeCode].brandLight,
      borderRadius: utils.inputRadius,
      fontSize: utils.fontSize.medium,
      fontFamily: utils.fontFamily.Bold,
      paddingHorizontal: 20,
      paddingVertical: 16,
      elevation: utils.inputElevation,
      shadowColor: colors.theme[themeCode].shadowBrandLight,
      shadowOpacity: 1,
    },
    inputError: {
      color: colors.theme[themeCode].brandDanger,
      paddingVertical: 6,
      fontFamily: utils.fontFamily.Bold,
      fontSize: utils.fontSize.small,
    },
    select: {
      backgroundColor: colors.theme[themeCode].brandLight,
      borderRadius: utils.inputRadius,
      fontSize: utils.fontSize.large,
      padding: 5,
      elevation: utils.inputElevation,
      shadowColor: colors.theme[themeCode].shadowBrandLight,
      shadowOpacity: 1,
    },
    selectBtn: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      elevation: utils.inputElevation,
      shadowColor: colors.theme[themeCode].shadowBrandLight,
      shadowOpacity: 1,
      backgroundColor: colors.theme[themeCode].brandLight,
      borderRadius: utils.inputRadius,
    },
    selectBtnLabel: {
      color: colors.theme[themeCode].textDark,
      fontSize: utils.fontSize.medium,
      fontFamily: utils.fontFamily.Bold,
    },
    pickerItemStyle: {
      fontSize: utils.fontSize.large,
      color: colors.theme[themeCode].textDark,
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
      backgroundColor: colors.theme[themeCode].brandMedium,
      borderRadius: utils.inputRadius,
      shadowColor: colors.theme[themeCode].shadowBrandMedium,
      display: 'flex',
      justifyContent: 'center',
      flex: 1,
      overflow: 'hidden',
      alignItems: 'center',
    },
    actionBtn: {
      padding: 8,
      marginRight: 10,
      backgroundColor: colors.theme[themeCode].brandLight,
    },
    pinnedActive: {
      borderRadius: utils.inputRadius,
      borderColor: colors.theme[themeCode].textBrandMedium,
      borderWidth: 1,
    },
    pinnedInactive: {
      borderRadius: utils.inputRadius,
      borderColor: colors.theme[themeCode].textBrandMedium,
      borderWidth: 1,
    },
    saveButton: {
      marginVertical: 20,
    },
    buttonLabel: {
      color: colors.theme[themeCode].textLight,
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
