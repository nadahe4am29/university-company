import { useState } from "react";

export default function ApplyModal({
  onClose,
  jobId,
  isQualified = false,
}: {
  onClose: () => void;
  jobId: string;
  isQualified?: boolean;
}) {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [placeOfResidence, setPlaceOfResidence] = useState("");
  const [title, setTitle] = useState("");
  const [hasDrivingLicense, setHasDrivingLicense] = useState(false);
  const [phone, setPhone] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (
      !name ||
      !birthdate ||
      !maritalStatus ||
      !placeOfResidence ||
      !title ||
      !phone
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (isQualified && !cvFile) {
      alert("Please upload your CV");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = isQualified
        ? `http://localhost:5000/api/jobs/${jobId}/qualified-apply`
        : `http://localhost:5000/api/jobs/${jobId}/unqualified-apply`;

      if (isQualified) {
        // For qualified applications, use FormData to include file
        const formData = new FormData();
        formData.append("name", name);
        formData.append("birthdate", birthdate);
        formData.append("maritalStatus", maritalStatus);
        formData.append("placeOfResidence", placeOfResidence);
        formData.append("title", title);
        formData.append("hasDrivingLicense", hasDrivingLicense.toString());
        formData.append("phone", phone);
        if (cvFile) {
          formData.append("cv", cvFile);
        }

        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to submit application");
        }
      } else {
        // For unqualified applications, use JSON
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            birthdate,
            maritalStatus,
            placeOfResidence,
            title,
            hasDrivingLicense,
            phone,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to submit application");
        }
      }

      onClose();
      alert("✅ Application submitted successfully");
    } catch (error) {
      console.error("Application error:", error);
      alert(
        error instanceof Error ? error.message : "Failed to submit application"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 via-slate-800 to-emerald-500/20 rounded-3xl blur-xl"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl"></div>

        <div className="relative bg-black/40 backdrop-blur-md rounded-3xl border border-white/20 p-8 overflow-hidden max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200"
          >
            <span className="text-lg">✕</span>
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <span className="text-2xl">📝</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Apply Now</h2>
            <p className="text-white/60 text-sm">
              {isQualified
                ? "Qualified Position Application"
                : "Take the next step in your career journey"}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="text-indigo-400">👤</span>
              </div>
              <input
                type="text"
                placeholder="Full name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                required
              />
            </div>

            {/* Birthdate */}
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="text-emerald-400">📅</span>
              </div>
              <input
                type="date"
                placeholder="Birthdate *"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                required
              />
            </div>

            {/* Marital Status */}
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="text-purple-400">💑</span>
              </div>
              <select
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                required
              >
                <option value="" disabled className="bg-slate-800">
                  Marital Status *
                </option>
                <option value="Single" className="bg-slate-800">
                  Single
                </option>
                <option value="Married" className="bg-slate-800">
                  Married
                </option>
                <option value="Divorced" className="bg-slate-800">
                  Divorced
                </option>
                <option value="Widowed" className="bg-slate-800">
                  Widowed
                </option>
              </select>
            </div>

            {/* Place of Residence */}
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="text-blue-400">📍</span>
              </div>
              <input
                type="text"
                placeholder="Place of Residence *"
                value={placeOfResidence}
                onChange={(e) => setPlaceOfResidence(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                required
              />
            </div>

            {/* Title */}
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="text-yellow-400">💼</span>
              </div>
              <input
                type="text"
                placeholder="Title/Position *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-200"
                required
              />
            </div>

            {/* Driving License */}
            <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl">
              <input
                type="checkbox"
                id="drivingLicense"
                checked={hasDrivingLicense}
                onChange={(e) => setHasDrivingLicense(e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-white/10 text-indigo-600 focus:ring-2 focus:ring-indigo-500/50"
              />
              <label
                htmlFor="drivingLicense"
                className="text-white/90 cursor-pointer"
              >
                Do you have a driving license? *
              </label>
            </div>

            {/* Phone */}
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="text-emerald-400">📱</span>
              </div>
              <input
                type="tel"
                placeholder="Phone number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                required
              />
            </div>

            {/* CV Upload (only for qualified) */}
            {isQualified && (
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="text-rose-400">📄</span>
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all duration-200"
                  required
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="mt-8 w-full bg-linear-to-r from-indigo-600 to-emerald-600 text-white py-4 rounded-2xl font-semibold hover:from-indigo-700 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span>{isSubmitting ? "Submitting..." : "Submit Application"}</span>
            <span className="text-lg">{isSubmitting ? "⏳" : "🚀"}</span>
          </button>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-indigo-500/20 rounded-full flex items-center justify-center">
              <span className="text-xs">🔒</span>
            </div>
            <p className="text-xs text-white/50">
              Your information is secure and private
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
