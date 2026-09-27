import logo from "../assets/images/logo.png";
import { useTranslation } from "react-i18next";

type CompanyLogoProps = {
  className?: string;
};

const CompanyLogo = ({ className = "h-12 w-auto" }: CompanyLogoProps) => {
  const { t } = useTranslation();

  return (
    <img
      src={logo}
      alt={t("common.logo")}
      className={`object-contain ${className}`}
    />
  );
};

export default CompanyLogo;
