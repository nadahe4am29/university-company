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
        // If no jobs from backend, show constant job for qualified positions
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
        // If backend fails, show constant job for qualified positions
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
    <section className="relative py-20 bg-black/55 w-full border-t border-white/10 h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">
          {t("approvedJobs.title")}
        </h2>
        <p className="text-gray-400 mt-2 text-lg">
          {t("approvedJobs.subtitle")}
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-400">{t("approvedJobs.loading")}</p>
      )}

      {/* Empty state */}
      {!loading && jobs.length === 0 && (
        <p className="text-center text-gray-400">{t("approvedJobs.noJobs")}</p>
      )}

      {/* Jobs Grid */}
      <div className="w-full mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-slate-900/90 backdrop-blur-md border border-white/10
             rounded-2xl p-6 shadow-lg hover:shadow-2xl
             hover:-translate-y-1 transition-all duration-200"
          >
            <h3 className="text-2xl font-semibold text-white mb-3">
              {job.title}
            </h3>

            <div className="flex items-center text-gray-400 mb-4">
              <FaMapPin className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-sm">{job.location}</span>
            </div>

            <p className="text-gray-300 text-start mb-6 line-clamp-2">
              {job.description}
            </p>

            <button
              onClick={() =>
                navigate(`/jobs/${job._id}`, {
                  state: { isQualified: jobType === "qualified" },
                })
              }
              className="cursor-pointer w-full rounded-xl bg-black/80 text-white py-3 px-4 font-medium hover:bg-black transition-colors duration-200"
            >
              {t("approvedJobs.viewDetails")}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
