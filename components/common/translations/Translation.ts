import I18n from 'react-native-i18n';
import en from './languages/en';
import kn from './languages/kn';
// import en-IN from './languages/en-IN';

I18n.fallbacks = true;
I18n.defaultLocale = 'em';
// I18n.locale = 'kn';
// const locale = I18n.currentLocale();
//TODO enable for prod
// I18n.missingBehaviour = 'guess';

I18n.translations = {
  en,
  'en-IN': en,
  kn,
};

/**
 * FUnction to create and send the translation Value
 * @param name transalation name
 * @param params dynamic values
 * @returns translation string
 */
const t = (name: string, ...params: any): string => {
  // const tokens: string[] = name.split(' ');
  // let newName: string = name;
  // // let newName: string = name.toUpperCase();
  // if (tokens.length > 1) {
  //   tokens.forEach((token: string, index: number) => {
  //     if (index === 0) {
  //       newName += token.toLowerCase();
  //     } else {
  //       newName += token;
  //     }
  //   });
  // }
  const translation = I18n.t(name, ...params);
  return translation;
};

export default t;
