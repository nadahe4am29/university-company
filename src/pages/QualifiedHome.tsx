import { useRef } from "react";
import ApprovedJobs from "../components/ApprovedJobs";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const QualifiedHome = () => {
  const { t } = useTranslation();
  const jobsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToJobs = () => {
    if (!jobsSectionRef.current) return;

    const yOffset = -100;
    const y =
      jobsSectionRef.current.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const features = [
    {
      title: t("qualifiedHome.features.verifiedCompanies.title"),
      text: t("qualifiedHome.features.verifiedCompanies.description"),
      icon: "🏢",
    },
    {
      title: t("qualifiedHome.features.skillMatching.title"),
      text: t("qualifiedHome.features.skillMatching.description"),
      icon: "🎯",
    },
    {
      title: t("qualifiedHome.features.careerGrowth.title"),
      text: t("qualifiedHome.features.careerGrowth.description"),
      icon: "📈",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
      {/* Background (Same Layering as Unqualified) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-400/10 via-slate-800 to-emerald-400/10" />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-300/15 rounded-full blur-[180px] animate-blob" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-emerald-300/15 rounded-full blur-[180px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-200px] left-1/4 w-[600px] h-[600px] bg-purple-300/10 rounded-full blur-[180px] animate-blob animation-delay-4000" />
      </div>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-8">
        <h1
          className="text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl"
          dangerouslySetInnerHTML={{ __html: t("qualifiedHome.hero.title") }}
        />

        <p className="mt-6 text-lg text-white/70 max-w-2xl">
          {t("qualifiedHome.hero.subtitle")}
        </p>

        {/* CTA */}
        <div className="mt-12 flex gap-6 flex-wrap justify-center">
          <button
            onClick={scrollToJobs}
            className="cursor-pointer px-10 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 transition font-semibold text-lg shadow-2xl"
          >
            {t("qualifiedHome.exploreOpportunities")}
          </button>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-indigo-500/20 rounded-full flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Animated Jobs Section (Same as Unqualified) */}
      <motion.section
        ref={jobsSectionRef}
        initial={{ opacity: 0, translateY: 40 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        layout={false}
        className="relative z-10 flex flex-col items-center text-center pt-12 scroll-mt-24"
      >
        <ApprovedJobs jobType="qualified" />
      </motion.section>
    </div>
  );
};

export default QualifiedHome;
