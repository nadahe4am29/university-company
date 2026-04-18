import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaBriefcase, FaClock } from "react-icons/fa";
import axios from "axios";

interface Job {
  _id: string;
  title: string;
  company?: string;
  location: string;
  jobType: "qualified" | "unqualified";
  createdAt: string;
  description: string;
  salary?: string;
}

const LatestJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        // Fetch both qualified and unqualified jobs
        const [qualifiedResponse, unqualifiedResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/jobs/qualified"),
          axios.get("http://localhost:5000/api/jobs/unqualified"),
        ]);

        const qualifiedJobs = qualifiedResponse.data || [];
        const unqualifiedJobs = unqualifiedResponse.data || [];

        // Combine and sort by creation date (newest first)
        let allJobs = [...qualifiedJobs, ...unqualifiedJobs]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 5); // Get only the latest 5 jobs

        // If no jobs from API, use dummy data
        if (allJobs.length === 0) {
          allJobs = getDummyJobs();
        }

        setJobs(allJobs);
      } catch (error) {
        console.error("Error fetching latest jobs:", error);
        // Use dummy data if API fails
        setJobs(getDummyJobs());
      } finally {
        setLoading(false);
      }
    };

    fetchLatestJobs();
  }, []);

  const getDummyJobs = (): Job[] => {
    return [
      {
        _id: "dummy-1",
        title: "محاسب مالي",
        company: "شركة النخبة",
        location: "الرياض، المملكة العربية السعودية",
        jobType: "qualified",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        description: "مطلوب محاسب مالي بخبرة 5 سنوات للعمل في الرياض",
        salary: "8,000 - 12,000 ريال",
      },
      {
        _id: "dummy-2",
        title: "مندوب مبيعات",
        company: "شركة الأفق",
        location: "جدة، المملكة العربية السعودية",
        jobType: "unqualified",
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        description: "مطلوب مندوب مبيعات للعمل في جدة بدون خبرة مطلوبة",
      },
      {
        _id: "dummy-3",
        title: "مطور واجهات أمامية",
        company: "شركة التقنية المتقدمة",
        location: "الدمام، المملكة العربية السعودية",
        jobType: "qualified",
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        description: "مطلوب مطور واجهات أمامية بخبرة 3 سنوات",
        salary: "10,000 - 15,000 ريال",
      },
      {
        _id: "dummy-4",
        title: "موظف استقبال",
        company: "شركة الخدمات المتكاملة",
        location: "مكة المكرمة، المملكة العربية السعودية",
        jobType: "unqualified",
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        description: "مطلوب موظف استقبال للعمل في مكة",
      },
      {
        _id: "dummy-5",
        title: "مدير موارد بشرية",
        company: "شركة المستقبل",
        location: "الخبر، المملكة العربية السعودية",
        jobType: "qualified",
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        description: "مطلوب مدير موارد بشرية بخبرة 7 سنوات",
        salary: "15,000 - 20,000 ريال",
      },
    ];
  };

  const handleJobClick = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "منذ قليل";
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `منذ ${diffInDays} يوم`;
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-border bg-card p-6 shadow-lg"
      >
        <div className="mb-6">
          <h3 className="text-xl font-bold text-card-foreground mb-2">
            أحدث الوظائف
          </h3>
          <p className="text-muted-foreground">
            آخر 5 وظائف مضافة، سواء مؤهلة أو بدون مؤهلات
          </p>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-24 bg-muted rounded-xl"></div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-border bg-card p-6 shadow-lg"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-card-foreground mb-2">
          أحدث الوظائف
        </h3>
        <p className="text-muted-foreground">
          آخر 5 وظائف مضافة، سواء مؤهلة أو بدون مؤهلات
        </p>
      </div>

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => handleJobClick(job._id)}
            className="cursor-pointer rounded-xl border border-border bg-background p-4 transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-card-foreground">
                    {job.title}
                  </h4>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      job.jobType === "qualified"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {job.jobType === "qualified" ? "مؤهل" : "بدون مؤهل"}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {job.company && (
                    <span className="flex items-center gap-1">
                      <FaBriefcase className="text-xs" />
                      {job.company}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-xs" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-xs" />
                    {formatTimeAgo(job.createdAt)}
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {job.description}
                </p>

                {job.salary && (
                  <div className="mt-2 text-sm font-medium text-primary">
                    {job.salary}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LatestJobs;
