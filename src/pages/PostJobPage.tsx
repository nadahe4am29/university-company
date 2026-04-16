import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import JobForm from "../components/JobForm";

const PostJobPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="page-mesh relative min-h-screen overflow-hidden">
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-8rem)] max-w-2xl flex-col justify-center px-4 py-12 sm:px-6 md:py-16">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="btn-secondary mb-8 w-fit gap-2 self-start px-4 py-2.5 text-sm"
        >
          <FaArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("common.backToSelection")}
        </button>

        <div className="mb-8 text-center">
          <h1 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            {t("postJobPage.title")}
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            {t("postJobPage.subtitle")}
          </p>
        </div>

        <JobForm mode="create" onClose={() => navigate("/")} />
      </div>
    </div>
  );
};

export default PostJobPage;
