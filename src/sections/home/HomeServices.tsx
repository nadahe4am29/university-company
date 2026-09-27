import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  HiOutlineBriefcase,
  HiOutlineDocumentText,
  HiOutlineGlobe,
  HiOutlineHome,
} from "react-icons/hi";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import type { IconType } from "react-icons";

const SERVICES: { key: string; icon: IconType }[] = [
  { key: "recruitment", icon: HiOutlineBriefcase },
  { key: "visas", icon: HiOutlineDocumentText },
  { key: "attestation", icon: HiOutlineGlobe },
  { key: "musaned", icon: HiOutlineHome },
];

const HomeServices = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section id="services" className="bg-section px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
            {t("homePage.services.title")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            {t("homePage.services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            const points = t(`homePage.services.items.${service.key}.points`, {
              returnObjects: true,
            }) as string[];

            return (
              <article
                key={service.key}
                className="flex flex-col rounded-2xl border border-border bg-card p-6"
              >
                <div className="icon-box mb-5 h-12 w-12">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-lg font-bold text-foreground">
                  {t(`homePage.services.items.${service.key}.title`)}
                </h3>
                <ul className="space-y-3">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-secondary text-secondary">
                        <FiCheck className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => navigate("/services")}
                  className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-secondary transition hover:text-primary"
                >
                  {t("common.learnMore")}
                  <FiArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
