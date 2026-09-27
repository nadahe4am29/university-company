import type { RefObject } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ApprovedJobs from "../../components/ApprovedJobs";

type HomeJobsListProps = {
  jobType: "qualified" | "unqualified";
  sectionRef: RefObject<HTMLDivElement | null>;
  showHeading?: boolean;
};

const HomeJobsList = ({
  jobType,
  sectionRef,
  showHeading = false,
}: HomeJobsListProps) => {
  const { t } = useTranslation();

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: jobType === "unqualified" ? 24 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.1 }}
      className="relative z-10 mx-auto w-full max-w-7xl scroll-mt-24 px-4 pb-20 sm:px-6 md:pb-28"
    >
      {showHeading && (
        <div className="mb-10 flex flex-col items-center md:mb-14">
          <div className="mb-4 h-1.5 w-16 rounded-full bg-primary" />
          <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            {t("qualifiedHome.jobsHeading") || "Latest Verified Jobs"}
          </h2>
        </div>
      )}

      <div className="rounded-4xl border border-border bg-muted/30 p-3 sm:p-6 md:p-8">
        <ApprovedJobs jobType={jobType} />
      </div>
    </motion.section>
  );
};

export default HomeJobsList;
