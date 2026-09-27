import { useTranslation } from "react-i18next";
import AboutIntro from "../sections/about/AboutIntro";
import AboutValues from "../sections/about/AboutValues";
import AboutWhy from "../sections/about/AboutWhy";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-10 text-center text-3xl font-extrabold leading-tight md:mb-12 md:text-4xl lg:text-[2.5rem]">
          {t("aboutPage.title")}
        </h1>
        <AboutIntro />
        <AboutValues />
        <AboutWhy />
      </div>
    </div>
  );
};

export default AboutPage;
