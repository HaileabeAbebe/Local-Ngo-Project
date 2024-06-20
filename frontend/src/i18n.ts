import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as en from "./locales/en.json";
import * as am from "./locales/am.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    am: { translation: am },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
