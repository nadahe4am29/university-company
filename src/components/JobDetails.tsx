import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiShare2 } from "react-icons/fi";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  jobType?: string;
  salary?: string;
  experience?: string;
}

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [job, setJob] = useState<Job | null>(null);
  const [showShareMessage, setShowShareMessage] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`);

        if (!response.ok) {
          throw new Error("Job not found");
        }

        const data = await response.json();

        if (!data) {
          throw new Error("No job data");
        }

        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);

        if (id === "UG-726-01") {
          setJob({
            _id: "UG-726-01",
            title: t("constantJob.title"),
            description: t("constantJob.description"),
            location: t("constantJob.location"),
            jobType: "qualified",
            salary: t("constantJob.salary"),
            experience: t("constantJob.experience"),
          });
        } else {
          setJob(null);
        }
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id, t]);

  const handleApply = () => {
    navigate(`/apply/${id}`, {
      state: { isQualified: location.state?.isQualified || false },
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareMessage(true);
    setTimeout(() => setShowShareMessage(false), 2000);
  };

  if (!job) {
    return (
      <div className="page-mesh flex min-h-[calc(100dvh-8rem)] items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-muted-foreground">{t("common.loadingJobDetails")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-mesh relative min-h-screen overflow-hidden pb-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
        <nav className="mb-8" aria-label="Breadcrumb">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="transition hover:text-foreground"
            >
              {t("jobDetails.backToJobs")}
            </button>
            <span aria-hidden>›</span>
            <span className="text-foreground">{job.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-6 lg:col-span-8 lg:space-y-8">
            <div className="card-surface relative overflow-hidden p-8 sm:p-10">
              <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                      {job.title}
                    </h1>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-secondary text-2xl shadow-lg">
                    💼
                  </div>
                </div>

                <div className="mb-8 flex flex-wrap gap-2 sm:gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/80 px-3 py-2 text-sm sm:px-4">
                    <span className="text-primary" aria-hidden>
                      📍
                    </span>
                    <span>{job.location}</span>
                  </div>

                  {job.jobType && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-2 text-sm text-secondary sm:px-4">
                      <span aria-hidden>💼</span>
                      <span>{job.jobType}</span>
                    </div>
                  )}

                  {job.experience && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-2 text-sm text-accent sm:px-4">
                      <span aria-hidden>🧠</span>
                      <span>{job.experience}</span>
                    </div>
                  )}
                </div>

                {job.salary && (
                  <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-muted/50 px-5 py-3">
                    <span className="text-2xl" aria-hidden>
                      💰
                    </span>
                    <span className="text-lg font-semibold text-secondary">
                      {job.salary}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="card-surface p-8 sm:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl">
                  📋
                </div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  {t("jobDetails.description")}
                </h2>
              </div>

              <div className="prose prose-neutral max-w-none dark:prose-invert">
                <p
                  className="whitespace-pre-line break-words text-[15px] leading-relaxed text-muted-foreground"
                  style={{ overflowWrap: "anywhere" }}
                >
                  {job.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="card-surface p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    🎯
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {t("jobDetails.requirements")}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  We&apos;re looking for candidates who match the qualifications
                  and can contribute to our team&apos;s success.
                </p>
              </div>

              <div className="card-surface p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                    🚀
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {t("jobDetails.growth")}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Join a team that values professional development and career
                  advancement.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="card-surface relative overflow-hidden border-primary/20 p-8">
                <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-primary/15 blur-2xl" />

                <div className="relative z-10">
                  <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-secondary text-3xl shadow-lg">
                      🎉
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">
                      {t("jobDetails.readyToApply")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("jobDetails.takeNextStep")}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleApply}
                    className="btn-primary w-full py-4 text-base"
                  >
                    {t("jobDetails.applyNow")}
                  </button>

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="btn-secondary w-full py-3 text-sm"
                    >
                      <FiShare2 className="h-4 w-4" />
                      {showShareMessage ? "تم نسخ الرابط!" : "مشاركة الرابط"}
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span>✓</span> No CV required
                    </span>
                    <span aria-hidden>•</span>
                    <span className="flex items-center gap-1">
                      <span>✓</span> Quick process
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-surface p-6">
                <h4 className="mb-4 text-sm font-semibold text-muted-foreground">
                  Why Apply With Us
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs">
                      🔒
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Secure application process
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-xs">
                      ⚡
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Instant response
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-xs">
                      🌟
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Verified opportunities
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
