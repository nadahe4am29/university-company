import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import JobForm from "../components/JobForm";

const PostJobPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050508]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-[#0a0f2c] via-[#050508] to-[#001018]" />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-[160px] animate-blob" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-emerald-400/25 rounded-full blur-[160px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-200px] left-1/3 w-[600px] h-[600px] bg-purple-500/25 rounded-full blur-[160px] animate-blob animation-delay-4000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="mb-6 flex items-center text-white/70 hover:text-white transition-colors"
          >
            <FaArrowLeft className="w-5 h-5 mr-2" />
            {t("common.backToSelection")}
          </button>

          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              {t("postJobPage.title")}
            </h1>
            <p className="text-lg text-white/70">{t("postJobPage.subtitle")}</p>
          </div>

          {/* Job Form */}
          <JobForm mode="create" onClose={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;
