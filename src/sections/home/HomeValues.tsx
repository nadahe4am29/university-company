import { useTranslation } from "react-i18next";
import { FiShield, FiTrendingUp, FiUser } from "react-icons/fi";
import type { IconType } from "react-icons";

const VALUES: { key: string; icon: IconType }[] = [
  { key: "trust", icon: FiShield },
  { key: "excellence", icon: FiUser },
  { key: "success", icon: FiTrendingUp },
];

const HomeValues = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-background px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
            {t("homePage.values.title")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            {t("homePage.values.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {VALUES.map((value) => (
            <article
              key={value.key}
              className="rounded-2xl border border-border bg-card p-8 text-center"
            >
              <div className="icon-box mx-auto mb-4 h-12 w-12">
                <value.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                {t(`homePage.values.items.${value.key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(`homePage.values.items.${value.key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeValues;
