import { useTranslation } from "react-i18next";
import { FiCheck } from "react-icons/fi";

const HomeWhy = () => {
  const { t } = useTranslation();
  const whyItems = t("homePage.why.items", { returnObjects: true });

  return (
    <section className="bg-section px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-foreground md:text-4xl">
          {t("homePage.why.title")}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(whyItems) &&
            whyItems.map((item) => (
              <div
                key={item}
                className="flex items-center justify-center gap-3 rounded-full border border-border bg-card px-5 py-3.5 text-sm font-semibold text-foreground"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                  <FiCheck className="h-3 w-3" />
                </span>
                {item}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeWhy;
