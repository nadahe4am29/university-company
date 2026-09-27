import { useTranslation } from "react-i18next";
import { FiGlobe } from "react-icons/fi";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const isEnglish = i18n.language.startsWith("en");

  const toggleLanguage = () => {
    i18n.changeLanguage(isEnglish ? "ar" : "en");
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleLanguage}
        className="flex h-9 w-16 items-center justify-center gap-3 rounded-xl border border-border bg-muted text-[11px] font-bold text-foreground transition hover:bg-muted/80"
        aria-label={isEnglish ? "Switch to Arabic" : "Switch to English"}
      >
        <FiGlobe size={18} />
        {isEnglish ? "AR" : "EN"}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
