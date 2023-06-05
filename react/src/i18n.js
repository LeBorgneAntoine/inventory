import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
 
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
 
i18n

  .use(Backend)
  
  .use(LanguageDetector)

  .use(initReactI18next)

  .init({
    lng: 'en',
    backend: {
      loadPath: process.env.PUBLIC_URL +'/assets/i18n/{{lng}}.json'
    },
    fallbackLng: 'en',
    debug: true,
    detection: {
        checkWhitelist: true, // options for language detection
    },
    whitelist: ['en', 'fr'],
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      wait: true
    }
  });
 
export default i18n;