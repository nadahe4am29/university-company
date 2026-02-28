import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);

    // Update document direction for RTL/LTR support
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors text-white"
    >
      <span className="text-sm font-medium">
        {i18n.language === "en" ? "العربية" : "English"}
      </span>
      <div className="w-6 h-6 rounded-full overflow-hidden">
        {i18n.language === "en" ? (
          <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
            EN
          </div>
        ) : (
          <div className="w-full h-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">
            AR
          </div>
        )}
      </div>
    </button>
  );
};

export default LanguageSwitcher;
