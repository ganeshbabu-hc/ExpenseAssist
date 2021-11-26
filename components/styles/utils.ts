import { colors } from './theme';

export const utilStyles = (themeCode: string) => {
  return {
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
    fontFamily: {
      Thin: 'Brandon_thin',
      Light: 'Brandon_light',
      Regular: 'Brandon_reg',
      SemiBold: 'Brandon_med',
      Bold: 'Brandon_bld',
      Black: 'Brandon_blk',
    },
    inputRadius: 15,
    inputElevation: 10,
  };
};
