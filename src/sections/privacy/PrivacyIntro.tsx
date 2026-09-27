import { useTranslation } from "react-i18next";

const PrivacyIntro = () => {
  const { t } = useTranslation();

  return (
    <section className="soft-card px-6 py-8 text-center sm:px-10 sm:py-10">
      <p className="mx-auto max-w-3xl text-sm leading-8 text-muted-foreground sm:text-base md:leading-9">
        {t("privacyPage.intro")}
      </p>
    </section>
  );
};

export default PrivacyIntro;
