import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { DUMMY_JOBS } from "../sections/jobs/dummyJobs";
import JobCard from "../sections/jobs/JobCard";
import JobsFilters from "../sections/jobs/JobsFilters";
import { normalizeJob, type JobListing } from "../sections/jobs/types";

const JobsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");
  const [sector, setSector] = useState("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const [qualifiedRes, unqualifiedRes] = await Promise.all([
          axios.get("http://localhost:5000/api/jobs/qualified", {
            timeout: 2000,
          }),
          axios.get("http://localhost:5000/api/jobs/unqualified", {
            timeout: 2000,
          }),
        ]);

        const qualified = ((qualifiedRes.data || []) as JobListing[]).map(
          (job) => ({ ...job, jobType: "qualified" as const }),
        );
        const unqualified = ((unqualifiedRes.data || []) as JobListing[]).map(
          (job) => ({ ...job, jobType: "unqualified" as const }),
        );

        const all = [...qualified, ...unqualified].map(normalizeJob);
        setJobs(all.length > 0 ? all : DUMMY_JOBS);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs(DUMMY_JOBS);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const cities = useMemo(() => {
    return [...new Set(jobs.map((job) => job.location).filter(Boolean))];
  }, [jobs]);

  const sectors = useMemo(() => {
    return [
      ...new Set(jobs.map((job) => job.sector).filter(Boolean)),
    ] as string[];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        (job.sector || "").toLowerCase().includes(q) ||
        (job.description || "").toLowerCase().includes(q);
      const matchesCity = city === "all" || job.location === city;
      const matchesSector = sector === "all" || job.sector === sector;
      return matchesQuery && matchesCity && matchesSector;
    });
  }, [jobs, query, city, sector]);

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openDetails = (job: JobListing) => {
    navigate(`/jobs/${job._id}`, {
      state: { job, isQualified: job.jobType === "qualified" },
    });
  };

  const applyNow = (job: JobListing) => {
    navigate(`/apply/${job._id}`, {
      state: { isQualified: job.jobType === "qualified" },
    });
  };

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-extrabold md:text-4xl">
          {t("jobsPage.title")}
        </h1>

        <JobsFilters
          query={query}
          city={city}
          sector={sector}
          cities={cities}
          sectors={sectors}
          onQueryChange={setQuery}
          onCityChange={setCity}
          onSectorChange={setSector}
        />

        <p className="mt-5 mb-6 text-end text-sm text-muted-foreground">
          {loading
            ? t("approvedJobs.loading")
            : t("jobsPage.availableCount", { count: filteredJobs.length })}
        </p>

        {!loading && filteredJobs.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            {t("jobsPage.noJobs")}
          </p>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              saved={favorites.has(job._id)}
              onToggleFavorite={() => toggleFavorite(job._id)}
              onLearnMore={() => openDetails(job)}
              onApply={() => applyNow(job)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
