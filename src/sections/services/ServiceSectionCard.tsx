import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import type { IconType } from "react-icons";

type ServiceSectionCardProps = {
  sectionKey: "section1" | "section2" | "section3" | "section4";
  icon: IconType;
};

const ServiceSectionCard = ({
  sectionKey,
  icon: Icon,
}: ServiceSectionCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const items = t(`servicesPage.${sectionKey}.items`, {
    returnObjects: true,
  }) as string[];

  return (
    <article className="soft-card p-6 sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="icon-box h-11 w-11 shrink-0">
          <Icon className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-bold sm:text-xl">
          {t(`servicesPage.${sectionKey}.title`)}
        </h2>
      </div>

      <ul className="space-y-3">
        {Array.isArray(items) &&
          items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm leading-7 text-muted-foreground"
            >
              <span className="mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-secondary text-secondary">
                <FiCheck className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              <span>{item}</span>
            </li>
          ))}
      </ul>

      <button
        type="button"
        onClick={() => navigate("/contact")}
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-secondary transition hover:text-primary"
      >
        {t("servicesPage.contactUs")}
        <FiArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
      </button>
    </article>
  );
};

export default ServiceSectionCard;
