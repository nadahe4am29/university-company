import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const isEnglish = i18n.language.startsWith("en");

  const toggleLanguage = () => {
    i18n.changeLanguage(isEnglish ? "ar" : "en");
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex items-center gap-2 rounded-xl border border-border bg-muted/80 px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
    >
      <span>{isEnglish ? "العربية" : "English"}</span>
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
        aria-hidden
      >
        {isEnglish ? "EN" : "AR"}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
