import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Footer = () => {
  const { t } = useTranslation();
  const facebookUrl = "https://www.facebook.com/ALGAMAA726/about?locale=ar_AR";
  const instagramUrl = "https://www.instagram.com"; // You can update this with your Instagram link

  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              {new Date().getFullYear()} {t("footer.allRightsReserved")}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex space-x-6">
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                {t("common.about")}
              </Link>
              <Link
                to="/services"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                {t("common.services")}
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                {t("common.contact")}
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              <LanguageSwitcher />
              <div className="flex space-x-6">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebook size={24} />
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
