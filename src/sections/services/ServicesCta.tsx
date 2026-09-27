import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ServicesCta = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="hero-gradient mt-8 rounded-2xl px-6 py-10 text-center text-white sm:px-10 md:py-12">
      <h2 className="text-2xl font-extrabold leading-snug sm:text-3xl">
        {t("servicesPage.cta.title")}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
        {t("servicesPage.cta.subtitle")}
      </p>
      <button
        type="button"
        onClick={() => navigate("/contact")}
        className="mt-6 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white transition hover:bg-primary-hover"
      >
        {t("servicesPage.cta.button")}
      </button>
    </section>
  );
};

export default ServicesCta;
