export type JobListing = {
  _id: string;
  title: string;
  location: string;
  description?: string;
  jobType?: "qualified" | "unqualified";
  sector?: string;
  salary?: string;
  education?: string;
  experience?: string;
  code?: string;
  requirements?: string[];
  benefits?: string[];
};

export function normalizeJob(job: JobListing): JobListing {
  return {
    ...job,
    sector:
      job.sector ||
      (job.jobType === "unqualified" ? "خدمات منزلية" : "خدمات"),
  };
}
