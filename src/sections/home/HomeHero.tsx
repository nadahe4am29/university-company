import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CompanyLogo from "../../components/CompanyLogo";
import heroBackground from "../../assets/images/background.jpg";

const HomeHero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <div className="hero-gradient absolute inset-0" />
      <img
        src={heroBackground}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-35"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:flex-row lg:justify-between lg:py-24">
        <div className="max-w-2xl text-center text-white lg:text-start">
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {t("homePage.hero.titleLine1")}
            <br />
            {t("homePage.hero.titleLine2")}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base lg:mx-0">
            {t("homePage.hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-hover"
            >
              {t("homePage.hero.jobSeeker")}
            </button>
            <button
              type="button"
              onClick={() => navigate("/post-job")}
              className="rounded-full border border-white/35 bg-white/5 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              {t("homePage.hero.employer")}
            </button>
          </div>
        </div>

        <CompanyLogo className="h-48 w-auto drop-shadow-lg sm:h-56 md:h-64" />
      </div>
    </section>
  );
};

export default HomeHero;
