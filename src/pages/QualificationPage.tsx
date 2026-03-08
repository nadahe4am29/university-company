import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowDown, FaPlus } from "react-icons/fa";
import logo from "../assets/logo.jpeg";

const QualificationPage = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showQualificationOptions, setShowQualificationOptions] =
    useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#c0c0ce]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-[#c0c0ce] via-[#001018] to-[#c0c0ce]" />
        <div className="absolute -top-40 -left-40 w-150 h-150 bg-blue-500/30 rounded-full blur-[160px] animate-blob" />
        <div className="absolute top-1/3 -right-40 w-150 h-150 bg-emerald-400/25 rounded-full blur-[160px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-50 left-1/3 w-150 h-150 bg-purple-500/25 rounded-full blur-[160px] animate-blob animation-delay-4000" />

        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-soft-light" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full">
          {/* Header section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center bg-[#c0c0ce] backdrop-blur-sm rounded-full mb-6">
              <img src={logo} alt="logo" className="rounded w-60 h-60" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              {t("qualificationPage.title")}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {t("qualificationPage.subtitle")}
            </p>
          </div>

          {/* Options cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Combined Qualification Card */}
            <div className="relative h-50">
              <div
                onClick={() => setShowQualificationOptions(true)}
                className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundImage: `url(/src/assets/world.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>

                <div className="relative h-55 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-400 to-emerald-400 rounded-full flex items-center justify-center">
                      <FaArrowDown className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 ml-4">
                      {t("qualificationPage.choosePath")}
                    </h3>
                  </div>

                  <p className="text-gray-900">
                    {t("qualificationPage.choosePathDescription")}
                  </p>
                </div>
              </div>
            </div>
            {/* Post Job Card */}
            <div
              className={`relative h-50 group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                selectedOption === "post-job" ? "scale-105" : ""
              }`}
              onClick={() => {
                setSelectedOption("post-job");
                navigate("/post-job");
              }}
            >
              <div
                className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                  selectedOption === "post-job" ? "opacity-100" : "opacity-80"
                } group-hover:opacity-100`}
                style={{
                  backgroundImage: `url(/src/assets/world.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div
                className={`relative bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-8 ${
                  selectedOption === "post-job" ? "border-white/50" : ""
                }`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                    <FaPlus className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 ml-4">
                    {t("qualificationPage.postJob.title")}
                  </h3>
                </div>
                <p className="text-gray-900 mb-6 leading-relaxed">
                  {t("qualificationPage.postJob.description")}
                </p>
                {/* <div className="flex items-center text-gray-900 text-sm">
                  <FaCheckCircle className="w-4 h-4 mr-2" />
                  {t("qualificationPage.postJob.benefit")}
                </div> */}
              </div>
            </div>
            {showQualificationOptions && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Background overlay */}
                <div
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setShowQualificationOptions(false)}
                ></div>

                {/* Modal content */}
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 w-[90%] max-w-3xl animate-fadeIn">
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    {t("qualificationPage.selectOption")}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Qualified */}
                    <div
                      onClick={() => navigate("/qualified-home")}
                      className="cursor-pointer p-6 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {t("qualificationPage.withQualification.title")}
                      </h3>
                      <p className="text-white/80">
                        {t("qualificationPage.withQualification.description")}
                      </p>
                    </div>

                    {/* Unqualified */}
                    <div
                      onClick={() => navigate("/unqualified-home")}
                      className="cursor-pointer p-6 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {t("qualificationPage.withoutQualification.title")}
                      </h3>
                      <p className="text-white/80">
                        {t(
                          "qualificationPage.withoutQualification.description",
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationPage;
