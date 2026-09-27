import { useTranslation } from "react-i18next";
import {
  HiOutlineBriefcase,
  HiOutlineDocumentText,
  HiOutlineGlobe,
  HiOutlineHome,
} from "react-icons/hi";
import type { IconType } from "react-icons";
import ServiceSectionCard from "../sections/services/ServiceSectionCard";
import ServicesCta from "../sections/services/ServicesCta";

const SECTIONS: {
  key: "section1" | "section2" | "section3" | "section4";
  icon: IconType;
}[] = [
  { key: "section1", icon: HiOutlineBriefcase },
  { key: "section2", icon: HiOutlineDocumentText },
  { key: "section3", icon: HiOutlineGlobe },
  { key: "section4", icon: HiOutlineHome },
];

const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold md:text-4xl">
            {t("servicesPage.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            {t("servicesPage.subtitle")}
          </p>
        </div>

        <div className="space-y-5">
          {SECTIONS.map((section) => (
            <ServiceSectionCard
              key={section.key}
              sectionKey={section.key}
              icon={section.icon}
            />
          ))}
        </div>

        <ServicesCta />
      </div>
    </div>
  );
};

export default ServicesPage;
