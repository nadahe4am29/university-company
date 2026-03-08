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

        // If job ID matches our constant job, show the constant job details
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
      <div className="relative min-h-screen bg-[#1a1f2e] flex items-center justify-center">
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white/70">{t("common.loadingJobDetails")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#1a1f2e] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-400/10 via-slate-800 to-emerald-400/10" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-300/10 rounded-full blur-[180px] animate-blob" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-emerald-300/10 rounded-full blur-[180px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-200px] right-1/4 w-[600px] h-[600px] bg-purple-300/8 rounded-full blur-[180px] animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <span className="hover:text-white transition-colors cursor-pointer">
              {t("jobDetails.backToJobs")}
            </span>
            <span>›</span>
            <span className="text-white/70">{job.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT – MAIN CONTENT */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header Card */}
            <div className="relative bg-black/30 backdrop-blur-md rounded-3xl border border-white/10 p-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-linear-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                      {job.title}
                    </h1>
                  </div>
                  <div className="ml-6">
                    <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <span className="text-2xl">💼</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-8">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/20">
                    <span className="text-indigo-400">📍</span>
                    <span className="text-white/90">{job.location}</span>
                  </div>

                  {job.jobType && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 backdrop-blur-sm px-4 py-2 border border-emerald-500/30">
                      <span>💼</span>
                      <span className="text-emerald-300">{job.jobType}</span>
                    </div>
                  )}

                  {job.experience && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 backdrop-blur-sm px-4 py-2 border border-purple-500/30">
                      <span>🧠</span>
                      <span className="text-purple-300">{job.experience}</span>
                    </div>
                  )}
                </div>

                {job.salary && (
                  <div className="inline-flex items-center gap-3 rounded-2xl bg-linear-to-r from-emerald-500/20 to-indigo-500/20 backdrop-blur-sm px-6 py-3 border border-emerald-500/30">
                    <span className="text-2xl">💰</span>
                    <span className="text-emerald-300 font-semibold text-lg">
                      {job.salary}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-black/30 backdrop-blur-md rounded-3xl border border-white/10 p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-xl">📋</span>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {t("jobDetails.description")}
                </h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p
                  className="text-white/80 leading-8 text-[15px] whitespace-pre-line break-word"
                  style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                >
                  {job.description}
                </p>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <span>🎯</span>
                  </div>
                  <h3 className="text-lg font-semibold">
                    {t("jobDetails.requirements")}
                  </h3>
                </div>
                <p className="text-white/60 text-sm">
                  We're looking for candidates who match the qualifications and
                  can contribute to our team's success.
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <span>🚀</span>
                  </div>
                  <h3 className="text-lg font-semibold">
                    {t("jobDetails.growth")}
                  </h3>
                </div>
                <p className="text-white/60 text-sm">
                  Join a team that values professional development and career
                  advancement.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT – APPLY CARD */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              {/* Apply Now Card */}
              <div className="relative bg-linear-to-br from-indigo-500/20 to-emerald-500/20 backdrop-blur-md rounded-3xl border border-white/20 p-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-indigo-400/30 to-transparent rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-linear-to-br from-indigo-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                      <span className="text-3xl">🎉</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {t("jobDetails.readyToApply")}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {t("jobDetails.takeNextStep")}
                    </p>
                  </div>

                  <button
                    onClick={handleApply}
                    className="w-full rounded-2xl bg-linear-to-r from-indigo-600 to-emerald-600 py-4 text-white text-lg font-semibold hover:from-indigo-700 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
                  >
                    {t("jobDetails.applyNow")}
                  </button>

                  <div className="mt-3">
                    <button
                      onClick={handleShare}
                      className="w-full rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 py-3 text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FiShare2 className="w-4 h-4" />
                      {showShareMessage ? "تم نسخ الرابط!" : "مشاركة الرابط"}
                    </button>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-4 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <span>✓</span> No CV required
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span>✓</span> Quick process
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                <h4 className="text-sm font-semibold text-white/70 mb-4">
                  Why Apply With Us
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-xs">🔒</span>
                    </div>
                    <span className="text-white/60 text-sm">
                      Secure application process
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-xs">⚡</span>
                    </div>
                    <span className="text-white/60 text-sm">
                      Instant response
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-xs">🌟</span>
                    </div>
                    <span className="text-white/60 text-sm">
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
