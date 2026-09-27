import { useTranslation } from "react-i18next";
import {
  FiBriefcase,
  FiCalendar,
  FiCheck,
  FiClock,
  FiCreditCard,
  FiHeart,
  FiHome,
  FiMapPin,
  FiSend,
  FiShare2,
  FiShield,
} from "react-icons/fi";
import { ExperienceText, SalaryText, jobCode } from "../jobs/formatters";
import type { JobListing } from "../jobs/types";

const BENEFIT_ICONS = [FiHome, FiSend, FiCalendar, FiShield];

type JobDetailsMainProps = {
  job: JobListing;
  saved: boolean;
  shareCopied: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
  onApply: () => void;
};

const JobDetailsMain = ({
  job,
  saved,
  shareCopied,
  onToggleFavorite,
  onShare,
  onApply,
}: JobDetailsMainProps) => {
  const { t } = useTranslation();
  const requirements =
    job.requirements ??
    ([job.education, job.experience].filter(Boolean) as string[]);
  const benefits =
    job.benefits ?? (t("jobDetails.defaultBenefits", { returnObjects: true }) as string[]);

  return (
    <article className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
            {job.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
            {jobCode(job._id, job.code)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onShare}
            className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label={t("jobDetails.share")}
          >
            <FiShare2 className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onToggleFavorite}
            className={`rounded-full p-2 transition ${
              saved ? "text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            aria-label={t("jobDetails.favorite")}
          >
            <FiHeart className={`h-5 w-5 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {shareCopied && (
        <p className="mt-2 text-xs text-secondary">{t("jobDetails.linkCopied")}</p>
      )}

      <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <FiBriefcase className="h-4 w-4 shrink-0" aria-hidden />
          {t("jobDetails.service")}
        </li>
        <li className="flex items-center gap-2">
          <FiMapPin className="h-4 w-4 shrink-0" aria-hidden />
          {job.location}
        </li>
        {job.experience && (
          <li className="flex items-center gap-2">
            <FiClock className="h-4 w-4 shrink-0" aria-hidden />
            <ExperienceText value={job.experience} />
          </li>
        )}
        {job.salary && (
          <li className="flex items-center gap-2">
            <FiCreditCard className="h-4 w-4 shrink-0" aria-hidden />
            <SalaryText value={job.salary} />
          </li>
        )}
      </ul>

      <hr className="my-6 border-border" />

      {job.description && (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-foreground">
            {t("jobDetails.description")}
          </h2>
          <p className="whitespace-pre-line text-[15px] leading-8 text-muted-foreground">
            {job.description}
          </p>
        </section>
      )}

      {requirements.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-foreground">
            {t("jobDetails.requirements")}
          </h2>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {requirements.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <FiCheck className="h-4 w-4 shrink-0 text-secondary" aria-hidden />
                {item.startsWith("+") ? <ExperienceText value={item} /> : item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {benefits.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-foreground">
            {t("jobDetails.benefits")}
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
              return (
                <li
                  key={benefit}
                  className="flex items-center gap-2 rounded-xl bg-muted/70 px-4 py-3 text-sm text-foreground"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  {benefit}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <button
        type="button"
        onClick={onApply}
        className="w-full rounded-xl bg-[#1a2e5b] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#152547]"
      >
        {t("jobsPage.applyNow")}
      </button>
    </article>
  );
};

export default JobDetailsMain;
