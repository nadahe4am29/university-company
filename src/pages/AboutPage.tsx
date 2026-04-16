import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();

  const coreItems = t("aboutPage.coreValues.items", { returnObjects: true });
  const whyItems = t("aboutPage.whyChooseUs.items", { returnObjects: true });

  return (
    <div className="page-mesh relative min-h-screen overflow-hidden">
      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6 md:pb-28 md:pt-12">
        <section className="mb-12 text-center md:mb-16">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            {t("aboutPage.title")}
          </h1>
          <p className="text-lg font-semibold text-primary sm:text-xl md:text-2xl">
            {t("aboutPage.subtitle")}
          </p>
        </section>

        <section className="mx-auto max-w-5xl space-y-6">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            {t("aboutPage.intro.p1")}
          </p>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            {t("aboutPage.intro.p2")}
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-6xl md:mt-20">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:mb-12 md:text-3xl">
            {t("aboutPage.coreValues.title")}
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
            {Array.isArray(coreItems) &&
              coreItems.map((item) => (
                <div key={item.title} className="card-surface p-6 md:p-8">
                  <h3 className="mb-3 text-lg font-semibold text-primary md:text-xl">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-5xl md:mt-20">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground md:mb-10 md:text-3xl">
            {t("aboutPage.whyChooseUs.title")}
          </h2>

          <ol className="card-surface list-decimal space-y-4 p-6 text-base leading-relaxed text-muted-foreground sm:p-8 sm:text-lg md:ps-10">
            {Array.isArray(whyItems) &&
              whyItems.map((line) => <li key={line}>{line}</li>)}
          </ol>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
