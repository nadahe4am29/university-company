import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();

  const coreItems = t("aboutPage.coreValues.items", { returnObjects: true });
  const whyItems = t("aboutPage.whyChooseUs.items", { returnObjects: true });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1a1f2e] text-white">
      {/* Background (styling only) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-400/20 via-slate-800 to-emerald-400/20" />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-[180px] animate-blob" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-emerald-300/20 rounded-full blur-[180px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-200px] left-1/4 w-[600px] h-[600px] bg-purple-300/15 rounded-full blur-[180px] animate-blob animation-delay-4000" />
      </div>

      <main className="relative z-10 px-6 pt-28 pb-20">
        {/* Title */}
        <section className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            {t("aboutPage.title")}
          </h1>
          <p className="text-xl md:text-2xl text-indigo-300 font-semibold">
            {t("aboutPage.subtitle")}
          </p>
        </section>

        {/* Intro */}
        <section className="max-w-5xl mx-auto space-y-6">
          <p className="text-lg md:text-xl text-white/85 leading-relaxed">
            {t("aboutPage.intro.p1")}
          </p>
          <p className="text-lg md:text-xl text-white/85 leading-relaxed">
            {t("aboutPage.intro.p2")}
          </p>
        </section>

        {/* Core Values */}
        <section className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {t("aboutPage.coreValues.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(coreItems) &&
              coreItems.map((item) => (
                <div
                  key={item.title}
                  className="bg-black/30 backdrop-blur-md rounded-3xl border border-white/15 p-8"
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-indigo-200 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="max-w-5xl mx-auto mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {t("aboutPage.whyChooseUs.title")}
          </h2>

          <ol className="space-y-4 text-lg text-white/85 leading-relaxed list-decimal">
            {Array.isArray(whyItems) &&
              whyItems.map((line) => <li key={line}>{line}</li>)}
          </ol>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
