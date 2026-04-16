import { useRef } from "react";
import ApprovedJobs from "../components/ApprovedJobs";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useIsRtl } from "../hooks/useIsRtl";
import {
  FiBriefcase,
  FiTarget,
  FiTrendingUp,
  FiArrowDown,
} from "react-icons/fi";

const QualifiedHome = () => {
  const { t } = useTranslation();
  const isRtl = useIsRtl();
  const jobsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToJobs = () => {
    if (!jobsSectionRef.current) return;
    const yOffset = -96;
    const y =
      jobsSectionRef.current.getBoundingClientRect().top +
      window.scrollY +
      yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const features = [
    {
      title: t("qualifiedHome.features.verifiedCompanies.title"),
      text: t("qualifiedHome.features.verifiedCompanies.description"),
      icon: <FiBriefcase className="text-primary" />,
    },
    {
      title: t("qualifiedHome.features.skillMatching.title"),
      text: t("qualifiedHome.features.skillMatching.description"),
      icon: <FiTarget className="text-secondary" />,
    },
    {
      title: t("qualifiedHome.features.careerGrowth.title"),
      text: t("qualifiedHome.features.careerGrowth.description"),
      icon: <FiTrendingUp className="text-accent" />,
    },
  ];

  return (
    <div className="page-mesh relative min-h-screen overflow-hidden">
      <section className="relative z-10 flex flex-col items-center px-4 pb-16 pt-8 text-center sm:px-6 md:pb-24 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <span className="mb-6 inline-block rounded-full border border-border bg-accent-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            {t("qualifiedHome.badge") || "Opportunities for Experts"}
          </span>
          <h1
            className="mb-8 text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            dangerouslySetInnerHTML={{ __html: t("qualifiedHome.hero.title") }}
          />
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            {t("qualifiedHome.hero.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.28 }}
          className="mt-10 sm:mt-12"
        >
          <button
            type="button"
            onClick={scrollToJobs}
            className="btn-primary group px-8 py-4 text-base"
          >
            <span>{t("qualifiedHome.exploreOpportunities")}</span>
            <FiArrowDown className="transition group-hover:translate-y-1" />
          </button>
        </motion.div>

        <div className="mt-16 grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:mt-24 md:grid-cols-3 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 16,
                x: isRtl ? 24 : -24,
              }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              transition={{
                delay: (isRtl ? features.length - 1 - index : index) * 0.04,
                duration: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className="card-surface group relative overflow-hidden p-7 text-left transition hover:border-primary/30"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-2xl ring-1 ring-border transition group-hover:scale-105">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        ref={jobsSectionRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 mx-auto w-full max-w-7xl scroll-mt-24 px-4 pb-20 sm:px-6 md:pb-28"
      >
        <div className="mb-10 flex flex-col items-center md:mb-14">
          <div className="mb-4 h-1.5 w-16 rounded-full bg-primary" />
          <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            {t("qualifiedHome.jobsHeading") || "Latest Verified Jobs"}
          </h2>
        </div>

        <div className="rounded-4xl border border-border bg-muted/30 p-3 sm:p-6 md:p-8">
          <ApprovedJobs jobType="qualified" />
        </div>
      </motion.section>
    </div>
  );
};

export default QualifiedHome;
