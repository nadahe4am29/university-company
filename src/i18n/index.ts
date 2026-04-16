import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

function syncDocumentLanguage(lng: string) {
  const isAr = lng.startsWith("ar");
  document.documentElement.lang = isAr ? "ar" : "en";
  document.documentElement.dir = isAr ? "rtl" : "ltr";
}

i18n.use(initReactI18next).init({
  resources,
  lng: "ar",
  fallbackLng: "ar",

  interpolation: {
    escapeValue: false, // React already escapes
  },

  react: {
    useSuspense: false,
  },
});

i18n.on("languageChanged", syncDocumentLanguage);
syncDocumentLanguage(i18n.language);

export default i18n;
