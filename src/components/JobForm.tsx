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
  const [experience, setExperience] = useState(job?.experience || "Junior");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate job type is selected
    if (!jobType) {
      alert(t("postJobPage.form.selectJobType"));
      setLoading(false);
      return;
    }

    const payload = {
      title,
      description,
      location,
      jobType: jobType, // Use the selected type
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
      // Reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setEmploymentType("Full-time");
      setSalary("");
      setExperience("Junior");
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
      className="bg-[#1a1f2e]/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl space-y-6 border border-white/10 max-w-xl mx-auto"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">
          {mode === "create"
            ? t("postJobPage.title")
            : t("postJobPage.form.editJob")}
        </h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-white/60 hover:text-white transition-colors"
          >
            <IoClose size={24} />
          </button>
        )}
      </div>

      {/* Job Type Dropdown - Show if isQualified is undefined */}
      {isQualified === undefined && (
        <div>
          <label className="block text-white font-medium mb-2">
            {t("postJobPage.form.jobType")} *
          </label>
          <select
            className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-white focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all"
            value={jobType}
            onChange={(e) =>
              setJobType(e.target.value as "qualified" | "unqualified")
            }
            required
          >
            <option value="" className="bg-[#1a1f2e] text-white/50">
              {t("postJobPage.form.selectJobType")}
            </option>
            <option value="qualified" className="bg-[#1a1f2e]">
              {t("postJobPage.form.qualified")}
            </option>
            <option value="unqualified" className="bg-[#1a1f2e]">
              {t("postJobPage.form.unqualified")}
            </option>
          </select>
        </div>
      )}

      {/* Job Type Indicator - Show if isQualified is provided */}
      {isQualified !== undefined && (
        <div className="text-sm text-white/70 bg-white/5 px-4 py-2 rounded-lg">
          Posting as:{" "}
          <span className="font-semibold text-white">
            {isQualified ? "Qualified" : "Unqualified"}
          </span>{" "}
          job
        </div>
      )}

      <input
        placeholder={t("postJobPage.form.titlePlaceholder")}
        className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder={t("postJobPage.form.descriptionPlaceholder")}
        rows={5}
        className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        placeholder={t("postJobPage.form.locationPlaceholder")}
        className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <select
        className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-white focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all"
        value={employmentType}
        onChange={(e) => setEmploymentType(e.target.value)}
      >
        <option className="bg-[#1a1f2e]">Full-time</option>
        <option className="bg-[#1a1f2e]">Part-time</option>
        <option className="bg-[#1a1f2e]">Internship</option>
        <option className="bg-[#1a1f2e]">Contract</option>
      </select>

      <input
        placeholder={t("postJobPage.form.experience")}
        className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <input
        placeholder={t("postJobPage.form.salaryPlaceholder")}
        className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <button
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
