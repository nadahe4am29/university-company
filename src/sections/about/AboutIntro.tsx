import { useTranslation } from "react-i18next";

const AboutIntro = () => {
  const { t } = useTranslation();

  return (
    <section className="soft-card px-6 py-8 text-center sm:px-10 sm:py-10 md:px-16 md:py-12">
      <div className="mx-auto max-w-4xl space-y-6 text-sm leading-8 text-muted-foreground sm:text-base md:text-[17px] md:leading-9">
        <p>{t("aboutPage.intro.p1")}</p>
        <p>{t("aboutPage.intro.p2")}</p>
        <p>{t("aboutPage.intro.p3")}</p>
      </div>
    </section>
  );
};

export default AboutIntro;
