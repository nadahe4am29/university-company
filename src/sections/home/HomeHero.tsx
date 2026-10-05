import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CompanyLogo from "../../components/CompanyLogo";
import heroBackground from "../../assets/images/background.jpg";

const HomeHero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[32rem] overflow-hidden sm:min-h-[38rem] lg:min-h-[44rem]">
      <div className="hero-gradient absolute inset-0" />
      <img
        src={heroBackground}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom opacity-40"
      />

      <div className="relative mx-auto flex min-h-[32rem] max-w-7xl flex-col-reverse items-center justify-center gap-12 px-4 py-14 sm:min-h-[38rem] sm:px-6 sm:py-16 lg:min-h-[44rem] lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-8 lg:py-20">
        <div className="w-full max-w-3xl text-center text-white lg:max-w-[40rem] lg:shrink-0 lg:text-start">
          <h1 className="text-3xl font-extrabold leading-[1.45] sm:text-4xl lg:text-[2.45rem]">
            <span className="block text-balance lg:text-wrap">
              {t("homePage.hero.titleLine1")}
            </span>
            <span className="mt-2 block text-balance lg:text-wrap">
              {t("homePage.hero.titleLine2")}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base lg:mx-0">
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

        <CompanyLogo className="h-52 w-auto shrink-0 drop-shadow-lg sm:h-60 lg:h-72" />
      </div>
    </section>
  );
};

export default HomeHero;
