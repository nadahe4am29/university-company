import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type JobDetailsBreadcrumbProps = {
  title: string;
};

const JobDetailsBreadcrumb = ({ title }: JobDetailsBreadcrumbProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="transition hover:text-foreground"
          >
            {t("nav.home")}
          </button>
        </li>
        <li aria-hidden>›</li>
        <li>
          <button
            type="button"
            onClick={() => navigate("/jobs")}
            className="transition hover:text-foreground"
          >
            {t("nav.jobs")}
          </button>
        </li>
        <li aria-hidden>›</li>
        <li className="text-foreground">{title}</li>
      </ol>
    </nav>
  );
};

export default JobDetailsBreadcrumb;
