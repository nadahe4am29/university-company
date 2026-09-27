import { useTranslation } from "react-i18next";
import { FiShield, FiTrendingUp, FiUser } from "react-icons/fi";
import type { IconType } from "react-icons";
import type { AboutCopyItem } from "./types";

const VALUE_ICONS: IconType[] = [FiShield, FiUser, FiTrendingUp];

const AboutValues = () => {
  const { t } = useTranslation();
  const items = t("aboutPage.coreValues.items", {
    returnObjects: true,
  }) as AboutCopyItem[];

  return (
    <section className="mt-16 md:mt-20">
      <h2 className="mb-8 text-center text-2xl font-extrabold md:mb-10 md:text-3xl">
        {t("aboutPage.coreValues.title")}
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {Array.isArray(items) &&
          items.map((item, index) => {
            const Icon = VALUE_ICONS[index] ?? FiShield;
            return (
              <article
                key={item.title}
                className="soft-card px-6 py-8 text-center"
              >
                <div className="icon-box mx-auto mb-5 h-12 w-12">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-bold">{item.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            );
          })}
      </div>
    </section>
  );
};

export default AboutValues;
