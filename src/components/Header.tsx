import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "../assets/1.png";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <header className="relative h-[100px] z-10 flex items-center justify-between px-10 py-6 bg-black/30 backdrop-blur-sm">
        <img
          src={logo}
          alt={t("common.logo")}
          width={150}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
        />

        <nav className="flex items-center gap-8">
          <button
            onClick={() => navigate("/")}
            className="text-white hover:text-indigo-400 transition-colors font-medium"
          >
            {t("common.home")}
          </button>
          <button
            onClick={() => navigate("/about")}
            className="text-white hover:text-indigo-400 transition-colors font-medium"
          >
            {t("common.about")}
          </button>
          <button
            onClick={() => navigate("/services")}
            className="text-white hover:text-indigo-400 transition-colors font-medium"
          >
            {t("common.services")}
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="text-white hover:text-indigo-400 transition-colors font-medium"
          >
            {t("common.contact")}
          </button>

          <LanguageSwitcher />
        </nav>
      </header>
    </>
  );
};

export default Header;
