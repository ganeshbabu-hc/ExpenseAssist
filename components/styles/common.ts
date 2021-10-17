import {StyleSheet} from 'react-native';
import {deepPurple, grey} from 'material-ui-colors';

// https://material.io/design/color/the-color-system.html#tools-for-picking-colors
export const colors = {
  brandLight: '#F6F4FF',
  // brandMedium: '#8746D6',
  // brandDark: '#3D2C8D',
  // brandLight: deepPurple[50],
  brandMedium: deepPurple.A700,
  brandDark: deepPurple[900],
  black: '#000',
  white: '#fff',
  // grayText: '#85848B',
  // grayCardText: '#ADADAD',
  grayText: grey[500],
  grayCardText: grey[400],
};

export const utils = {
  fontFamily: 'Nunito',
  inputRadius: 15,
  inputElevation: {
    elevation: 10,
    shadowColor: colors.grayCardText,
    shadowOpacity: 1,
  },
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
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: utils.inputRadius,
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontWeight: '600',
    ...utils.inputElevation,
  },
  select: {
    backgroundColor: colors.white,
    borderRadius: utils.inputRadius,
    fontSize: 20,
    padding: 5,
    ...utils.inputElevation,
  },
  pickerItemStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
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
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: colors.brandMedium,
    borderRadius: utils.inputRadius,
    elevation: 4,
    shadowColor: colors.brandMedium,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    label: {
      color: colors.white,
      fontSize: 20,
      fontWeight: '600',
    },
  },
});

export const commonStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: colors.brandLight,
    fontFamily: utils.fontFamily,
  },
  icon: {
    width: 28,
    height: 28,
  },
  r10: {
    borderRadius: 16,
  },
  card: {
    height: 100,
    width: 50,
    display: 'flex',
    borderRadius: 14,
    marginRight: 20,
    padding: 15,
    large: {
      height: 200,
      width: 150,
    },
    medium: {
      height: 120,
      width: 130,
    },
    brandWhite: {
      backgroundColor: colors.white,
      text: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.grayCardText,
      },
      totalText: {
        color: colors.black,
      },
    },
    brandMedium: {
      backgroundColor: colors.brandMedium,
      text: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.white,
      },
      totalText: {
        color: colors.white,
      },
    },
    brandDark: {
      backgroundColor: colors.brandDark,
      text: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.white,
      },
      totalText: {
        color: colors.white,
      },
    },
  },
  title: {
    fontSize: 28,
    color: colors.black,
    fontWeight: '500',
    fontFamily: utils.fontFamily,
    marginBottom: 10,
  },
  shadowGray: {
    elevation: 1,
    shadowColor: '#52006A',
  },
});
