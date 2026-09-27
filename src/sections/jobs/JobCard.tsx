import { useTranslation } from "react-i18next";
import {
  FiBookOpen,
  FiBriefcase,
  FiClock,
  FiCreditCard,
  FiHeart,
  FiMapPin,
} from "react-icons/fi";
import { ExperienceText, SalaryText } from "./formatters";
import type { JobListing } from "./types";

type JobCardProps = {
  job: JobListing;
  saved: boolean;
  onToggleFavorite: () => void;
  onLearnMore: () => void;
  onApply: () => void;
};

const JobCard = ({
  job,
  saved,
  onToggleFavorite,
  onLearnMore,
  onApply,
}: JobCardProps) => {
  const { t } = useTranslation();

  return (
    <article
      data-testid={`job-card-${job._id}`}
      className="flex flex-col rounded-2xl border border-border bg-card p-5"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="text-lg font-bold text-foreground">{job.title}</h2>
        <button
          type="button"
          onClick={onToggleFavorite}
          className={`shrink-0 rounded-full p-1 ${saved ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          aria-label="Favorite"
        >
          <FiHeart className={`h-5 w-5 ${saved ? "fill-current" : ""}`} />
        </button>
      </div>

      <ul className="space-y-2.5 text-sm text-muted-foreground">
        {job.sector && (
          <li className="flex items-center gap-2">
            <FiBriefcase className="h-4 w-4 shrink-0 text-muted-foreground/70" />
            {job.sector}
          </li>
        )}
        <li className="flex items-center gap-2">
          <FiMapPin className="h-4 w-4 shrink-0 text-muted-foreground/70" />
          {job.location}
        </li>
        {job.salary && (
          <li className="flex items-center gap-2">
            <FiCreditCard className="h-4 w-4 shrink-0 text-muted-foreground/70" />
            <SalaryText value={job.salary} />
          </li>
        )}
        {job.education && (
          <li className="flex items-center gap-2">
            <FiBookOpen className="h-4 w-4 shrink-0 text-muted-foreground/70" />
            {job.education}
          </li>
        )}
        {job.experience && (
          <li className="flex items-center gap-2">
            <FiClock className="h-4 w-4 shrink-0 text-muted-foreground/70" />
            <ExperienceText value={job.experience} />
          </li>
        )}
      </ul>

      <div className="mt-auto flex gap-3 pt-6">
        <button
          type="button"
          onClick={onLearnMore}
          data-testid={`job-learn-more-${job._id}`}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
        >
          <span>{t("jobsPage.learnMore")}</span>
          <span aria-hidden>--</span>
        </button>
        <button
          type="button"
          onClick={onApply}
          data-testid={`job-apply-${job._id}`}
          className="flex-1 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
        >
          {t("jobsPage.applyNow")}
        </button>
      </div>
    </article>
  );
};

export default JobCard;
