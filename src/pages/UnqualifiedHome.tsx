import { useRef } from "react";
import ApprovedJobs from "../components/ApprovedJobs";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const UnqualifiedHome = () => {
  const { t } = useTranslation();
  const jobsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToJobs = () => {
    jobsSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // const features = [
  //   {
  //     title: t("unqualifiedHome.features.entryLevel.title"),
  //     text: t("unqualifiedHome.features.entryLevel.description"),
  //   },
  //   {
  //     title: t("unqualifiedHome.features.skillDevelopment.title"),
  //     text: t("unqualifiedHome.features.skillDevelopment.description"),
  //   },
  //   {
  //     title: t("unqualifiedHome.features.careerFoundation.title"),
  //     text: t("unqualifiedHome.features.careerFoundation.description"),
  //   },
  // ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-8">
        <h1
          className="text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl"
          dangerouslySetInnerHTML={{ __html: t("unqualifiedHome.hero.title") }}
        />

        {/* <p className="mt-6 text-lg text-white/70 max-w-2xl">
          {t("unqualifiedHome.hero.subtitle")}
        </p> */}

        <div className="mt-12 flex gap-6 flex-wrap justify-center">
          <button
            onClick={scrollToJobs}
            className="cursor-pointer px-10 py-4 rounded-full bg-purple-600 hover:bg-purple-700 transition font-semibold text-lg shadow-2xl"
          >
            {t("common.exploreEntryLevelJobs")}
          </button>
        </div>

        {/* <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.text}</p>
            </div>
          ))}
        </div> */}
      </section>

      {/* Animated Jobs Section */}
      <motion.section
        ref={jobsSectionRef}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 flex flex-col items-center h-screen text-center pt-12 scroll-mt-24"
      >
        <ApprovedJobs jobType="unqualified" />
      </motion.section>
    </div>
  );
};

export default UnqualifiedHome;
