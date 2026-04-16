import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapPin } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  status: "pending" | "approved" | "rejected";
  jobType?: "qualified" | "unqualified";
}

interface ApprovedJobsProps {
  jobType: "qualified" | "unqualified";
}

export default function ApprovedJobs({ jobType }: ApprovedJobsProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const endpoint = `http://localhost:5000/api/jobs/${jobType}`;

    axios
      .get(endpoint)
      .then((res) => res.data)
      .then((data: Job[]) => {
        if (data.length === 0 && jobType === "qualified") {
          setJobs([
            {
              _id: "UG-726-01",
              title: t("constantJob.title"),
              description: t("constantJob.description"),
              location: t("constantJob.location"),
              status: "approved",
              jobType: "qualified",
            },
          ]);
        } else {
          setJobs(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error fetching ${jobType} jobs:`, err);
        if (jobType === "qualified") {
          setJobs([
            {
              _id: "UG-726-01",
              title: t("constantJob.title"),
              description: t("constantJob.description"),
              location: t("constantJob.location"),
              status: "approved",
              jobType: "qualified",
            },
          ]);
        } else {
          setJobs([]);
        }
        setLoading(false);
      });
  }, [jobType, t]);

  return (
    <section className="relative w-full py-8 sm:py-12">
      <div className="mb-8 text-center sm:mb-10">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          {t("approvedJobs.title")}
        </h2>
        <p className="mt-2 text-base text-muted-foreground sm:text-lg">
          {t("approvedJobs.subtitle")}
        </p>
      </div>

      {loading && (
        <p className="text-center text-muted-foreground">
          {t("approvedJobs.loading")}
        </p>
      )}

      {!loading && jobs.length === 0 && (
        <p className="text-center text-muted-foreground">
          {t("approvedJobs.noJobs")}
        </p>
      )}

      <div className="mx-auto grid w-full max-w-7xl gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {jobs.map((job) => (
          <article
            key={job._id}
            className="card-surface flex flex-col p-6 transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg"
          >
            <h3 className="mb-3 text-xl font-semibold text-card-foreground">
              {job.title}
            </h3>

            <div className="mb-4 flex items-center gap-2 text-muted-foreground">
              <FaMapPin className="h-4 w-4 shrink-0 text-accent" />
              <span className="text-sm">{job.location}</span>
            </div>

            <p className="mb-6 line-clamp-3 flex-1 text-start text-sm leading-relaxed text-muted-foreground">
              {job.description}
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(`/jobs/${job._id}`, {
                  state: { isQualified: jobType === "qualified" },
                })
              }
              className="btn-primary w-full py-3 text-sm"
            >
              {t("approvedJobs.viewDetails")}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
