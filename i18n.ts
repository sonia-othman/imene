
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locale/en.json';
import ku from './locale/ku.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ku: { translation: ku },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already escapes
    },
  });

export default i18n;
