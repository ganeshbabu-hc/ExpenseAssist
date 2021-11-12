import I18n from 'react-native-i18n';
I18n.fallbacks = true;
I18n.translations = {
  kn: {
    currency: 'ಕರೆನ್ಸಿ',
    theme: 'ಥೀಮ್',
    categories: 'ವರ್ಗಗಳು',
    payments: 'ಪಾವತಿಗಳು',
  },
  hi: {
    currency: 'मुद्रा',
    theme: 'थीम',
    categories: 'श्रेणियाँ',
    payments: 'भुगतान',
  },
  ta: {
    currency: 'நாணயம்',
    theme: 'தீம்',
    categories: 'வகைகள்',
    payments: 'கட்டணங்கள்',
  },
  fr: {
    currency: 'Devise',
    theme: 'Thème',
    categories: 'Catégories',
    payments: 'paiements',
  },
  ml: {
    currency: 'കറൻസി',
    theme: 'തീം',
    categories: 'വിഭാഗങ്ങൾ',
    payments: 'പേയ്‌മെന്റുകൾ',
  },
};
const t = (name: string, defaultValue?: string) => {
  const translation = I18n.t(name);
  return translation ?? defaultValue;
};

export default t;
