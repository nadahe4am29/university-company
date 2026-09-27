import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";

type Mode = "create" | "edit";

interface JobFormProps {
  mode?: Mode;
  job?: any;
  isQualified?: boolean;
  onClose?: () => void;
}

const JobForm = ({
  mode = "create",
  job,
  isQualified,
  onClose,
}: JobFormProps) => {
  const { t } = useTranslation();
  const [jobType, setJobType] = useState<"qualified" | "unqualified" | "">(
    isQualified !== undefined
      ? isQualified
        ? "qualified"
        : "unqualified"
      : "",
  );

  const [title, setTitle] = useState(job?.title || "");
  const [description, setDescription] = useState(job?.description || "");
  const [location, setLocation] = useState(job?.location || "");
  const [employmentType, setEmploymentType] = useState(
    job?.employmentType || "Full-time",
  );
  const [salary, setSalary] = useState(job?.salary || "");
  const [experience, setExperience] = useState(job?.experience || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!jobType) {
      alert(t("postJobPage.form.selectJobType"));
      setLoading(false);
      return;
    }

    const payload = {
      title,
      description,
      location,
      jobType: jobType,
      employmentType,
      salary,
      experience,
    };

    const res = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      alert(t("postJobPage.form.jobSubmitted"));
      setTitle("");
      setDescription("");
      setLocation("");
      setEmploymentType("Full-time");
      setSalary("");
      setExperience("");
      setJobType("");
      if (onClose) onClose();
    } else {
      alert(data.message || t("postJobPage.form.submitFailed"));
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="post-job-form"
      className="card-surface mx-auto max-w-xl space-y-5 p-6 sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-card-foreground sm:text-2xl">
          {mode === "create"
            ? t("postJobPage.title")
            : t("postJobPage.form.editJob")}
        </h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <IoClose size={24} />
          </button>
        )}
      </div>

      {isQualified === undefined && (
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            {t("postJobPage.form.jobType")} *
          </label>
          <select
            className="input-field"
            value={jobType}
            onChange={(e) =>
              setJobType(e.target.value as "qualified" | "unqualified")
            }
            required
          >
            <option value="" className="text-muted-foreground">
              {t("postJobPage.form.selectJobType")}
            </option>
            <option value="qualified">{t("postJobPage.form.qualified")}</option>
            <option value="unqualified">
              {t("postJobPage.form.unqualified")}
            </option>
          </select>
        </div>
      )}

      {isQualified !== undefined && (
        <div className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
          Posting as:{" "}
          <span className="font-semibold text-foreground">
            {isQualified ? "Qualified" : "Unqualified"}
          </span>{" "}
          job
        </div>
      )}

      <input
        placeholder={t("postJobPage.form.titlePlaceholder")}
        className="input-field"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder={t("postJobPage.form.descriptionPlaceholder")}
        rows={5}
        className="input-field resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        placeholder={t("postJobPage.form.locationPlaceholder")}
        className="input-field"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <select
        className="input-field"
        value={employmentType}
        onChange={(e) => setEmploymentType(e.target.value)}
      >
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Internship</option>
        <option>Contract</option>
      </select>

      <input
        placeholder={t("postJobPage.form.experience")}
        className="input-field"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <input
        placeholder={t("postJobPage.form.salaryPlaceholder")}
        className="input-field"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <button
        type="submit"
        className="btn-primary w-full disabled:opacity-50"
        disabled={loading}
      >
        {loading
          ? t("postJobPage.form.creating")
          : t("postJobPage.form.createJob")}
      </button>
    </form>
  );
};

export default JobForm;
