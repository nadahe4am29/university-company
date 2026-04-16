import { useRef } from "react";
import ApprovedJobs from "../components/ApprovedJobs";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiCompass } from "react-icons/fi";

const UnqualifiedHome = () => {
  const { t } = useTranslation();
  const jobsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToJobs = () => {
    jobsSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="page-mesh relative min-h-screen overflow-hidden">
      <section className="relative z-10 flex flex-col items-center px-4 pb-12 pt-8 text-center sm:px-6 md:pb-20 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-accent-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <FiCompass className="text-base" />
            Entry paths
          </span>
          <h1
            className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl"
            dangerouslySetInnerHTML={{
              __html: t("unqualifiedHome.hero.title"),
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.28 }}
          className="mt-10 flex flex-wrap justify-center gap-4 sm:mt-12"
        >
          <button
            type="button"
            onClick={scrollToJobs}
            className="btn-primary px-10 py-4 text-base"
          >
            {t("common.exploreEntryLevelJobs")}
          </button>
        </motion.div>
      </section>

      <motion.section
        ref={jobsSectionRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 mx-auto w-full max-w-7xl scroll-mt-24 px-4 pb-20 sm:px-6 md:pb-28"
      >
        <div className="rounded-4xl border border-border bg-muted/30 p-3 sm:p-6 md:p-8">
          <ApprovedJobs jobType="unqualified" />
        </div>
      </motion.section>
    </div>
  );
};

export default UnqualifiedHome;
