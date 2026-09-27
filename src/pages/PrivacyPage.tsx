import { useTranslation } from "react-i18next";
import PrivacyIntro from "../sections/privacy/PrivacyIntro";
import PrivacySection from "../sections/privacy/PrivacySection";

type PrivacySectionCopy = {
  title: string;
  items: string[];
};

const PrivacyPage = () => {
  const { t } = useTranslation();
  const sections = t("privacyPage.sections", {
    returnObjects: true,
  }) as PrivacySectionCopy[];

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 text-center md:mb-10">
          <h1 className="text-3xl font-extrabold md:text-4xl">
            {t("privacyPage.title")}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            {t("privacyPage.updated")}{" "}
            <span dir="ltr">{t("privacyPage.updatedDate")}</span>
          </p>
        </header>

        <div className="space-y-5">
          <PrivacyIntro />
          {Array.isArray(sections) &&
            sections.map((section, index) => (
              <PrivacySection
                key={section.title}
                index={index + 1}
                title={section.title}
                items={section.items}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
