import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DUMMY_JOBS } from "../sections/jobs/dummyJobs";
import { normalizeJob, type JobListing } from "../sections/jobs/types";
import JobDetailsBreadcrumb from "../sections/job-details/JobDetailsBreadcrumb";
import JobDetailsContact from "../sections/job-details/JobDetailsContact";
import JobDetailsMain from "../sections/job-details/JobDetailsMain";

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const stateJob = (location.state as { job?: JobListing } | null)?.job ?? null;
  const [job, setJob] = useState<JobListing | null>(
    stateJob ? normalizeJob(stateJob) : null,
  );
  const [loading, setLoading] = useState(!stateJob);
  const [saved, setSaved] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    if (stateJob) {
      setJob(normalizeJob(stateJob));
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 4000);

    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Job not found");
        const data = await response.json();
        if (!data) throw new Error("No job data");
        setJob(normalizeJob(data));
      } catch (error) {
        console.error("Error fetching job details:", error);
        const fallback = DUMMY_JOBS.find((item) => item._id === id) ?? null;
        setJob(fallback);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJobDetails();
    else setLoading(false);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [id, stateJob]);

  const handleApply = () => {
    navigate(`/apply/${id}`, {
      state: { isQualified: location.state?.isQualified || job?.jobType === "qualified" },
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="page-shell flex min-h-[calc(100dvh-8rem)] items-center justify-center">
        <p className="text-muted-foreground">{t("common.loadingJobDetails")}</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="page-shell flex min-h-[calc(100dvh-8rem)] items-center justify-center">
        <p className="text-muted-foreground">{t("jobsPage.noJobs")}</p>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-6xl">
        <JobDetailsBreadcrumb title={job.title} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8">
            <JobDetailsMain
              job={job}
              saved={saved}
              shareCopied={shareCopied}
              onToggleFavorite={() => setSaved((current) => !current)}
              onShare={handleShare}
              onApply={handleApply}
            />
          </div>
          <div className="lg:col-span-4">
            <JobDetailsContact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
