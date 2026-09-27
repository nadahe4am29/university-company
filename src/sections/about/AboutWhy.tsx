import { useTranslation } from "react-i18next";
import { FiCheck, FiClock, FiHeart, FiZap } from "react-icons/fi";
import type { IconType } from "react-icons";
import type { AboutCopyItem } from "./types";

const WHY_ICONS: IconType[] = [FiZap, FiHeart, FiClock];

const AboutWhy = () => {
  const { t } = useTranslation();
  const items = t("aboutPage.whyChooseUs.items", {
    returnObjects: true,
  }) as AboutCopyItem[];

  return (
    <section className="mt-16 md:mt-20">
      <h2 className="mb-8 text-center text-2xl font-extrabold md:mb-10 md:text-3xl">
        {t("aboutPage.whyChooseUs.title")}
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {Array.isArray(items) &&
          items.map((item, index) => {
            const Icon = WHY_ICONS[index] ?? FiZap;
            return (
              <article key={item.title} className="soft-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="icon-box h-10 w-10 shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            );
          })}
      </div>

      <article className="soft-card mt-5 p-6 sm:p-8">
        <div className="mb-3 flex items-center gap-3">
          <div className="icon-box h-10 w-10 shrink-0">
            <FiCheck className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold">{t("aboutPage.closing.title")}</h3>
        </div>
        <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
          {t("aboutPage.closing.body")}
        </p>
      </article>
    </section>
  );
};

export default AboutWhy;
