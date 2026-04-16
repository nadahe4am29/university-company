import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Footer = () => {
  const { t } = useTranslation();
  const facebookUrl = "https://www.facebook.com/ALGAMAA726/about?locale=ar_AR";
  const instagramUrl = "https://www.instagram.com";

  return (
    <footer className="mt-auto border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="text-sm font-semibold text-foreground">
              {new Date().getFullYear()} — {t("footer.allRightsReserved")}
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
            <nav
              className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium"
              aria-label="Footer"
            >
              <Link
                to="/about"
                className="text-muted-foreground transition hover:text-foreground"
              >
                {t("common.about")}
              </Link>
              <Link
                to="/services"
                className="text-muted-foreground transition hover:text-foreground"
              >
                {t("common.services")}
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground transition hover:text-foreground"
              >
                {t("common.contact")}
              </Link>
            </nav>

            <div className="flex flex-wrap items-center gap-6">
              <LanguageSwitcher />
              <div className="flex gap-4">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-border bg-card p-2.5 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                  aria-label="Facebook"
                >
                  <FaFacebook size={22} />
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-border bg-card p-2.5 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                  aria-label="Instagram"
                >
                  <FaInstagram size={22} />
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
