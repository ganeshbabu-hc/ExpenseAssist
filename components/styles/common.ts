import {StyleSheet} from 'react-native';

export const utils = {
  fontFamily: 'Nunito',
  inputRadius: 15,
};

export const colors = {
  brandLight: '#F6F4FF',
  brandMedium: '#8746D6',
  brandDark: '#3D2C8D',
  black: '#000',
  white: '#fff',
  grayText: '#85848B',
  grayCardText: '#ADADAD',
};

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
    // boxShadow: '0 0 9px 0 red',
    borderRadius: 14,
    marginRight: 20,
    padding: 15,
    large: {
      height: 200,
      width: 150,
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
