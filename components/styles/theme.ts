import { StatusBarStyle } from 'react-native';
import { deepPurple, grey, pink } from 'material-ui-colors';

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
    darkYellow: {
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
    lightPurple: {
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

export const containerLeftMargin = 50;
export const containerGutter = 20;
// export const themeCode = 'lightPurple';

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

// export const ripple = {
//   color: colors.theme[THEME].textBrandDark,
// };
