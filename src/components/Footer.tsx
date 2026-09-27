import { FaFacebook, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CompanyLogo from "./CompanyLogo";

const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=26%20El-Sadat%20Al-Nozha%20Nasr%20City%20Cairo&hl=ar&z=16&output=embed";

const Footer = () => {
  const { t } = useTranslation();
  const facebookUrl = "https://www.facebook.com/ALGAMAA726/about?locale=ar_AR";
  const phone = t("footer.phone");
  const email = t("footer.email");

  const quickLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/jobs", label: t("nav.jobs") },
    { to: "/about", label: t("nav.about") },
    { to: "/faq", label: t("nav.faq") },
    { to: "/contact", label: t("nav.contact") },
    { to: "/privacy", label: t("nav.privacy") },
  ];

  return (
    <footer className="hero-gradient mt-auto text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-extrabold leading-snug sm:text-3xl md:text-4xl">
            {t("footer.headline")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
            {t("footer.subheadline")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-3">
            <CompanyLogo className="h-20 w-auto" />
            <p className="text-sm leading-relaxed text-white/85">
              {t("footer.companyName")}
            </p>
            <p className="text-sm text-white/70">{t("footer.license")}</p>
          </div>

          <div>
            <h3 className="mb-4 text-base font-bold">{t("footer.quickLinks")}</h3>
            <nav className="flex flex-col gap-2 text-sm" aria-label="Footer">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white/75 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-base font-bold">{t("footer.followUs")}</h3>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Facebook"
            >
              <FaFacebook size={18} />
            </a>
          </div>

          <div>
            <h3 className="mb-4 text-base font-bold">{t("footer.contactUs")}</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="shrink-0 text-white/70" />
                <a href={`tel:${phone}`} className="hover:text-white" dir="ltr">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="shrink-0 text-white/70" />
                <a href={`mailto:${email}`} className="hover:text-white">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-white/70" />
                <span>{t("footer.address")}</span>
              </li>
            </ul>
            <div className="mt-4 overflow-hidden rounded-xl border border-white/15 bg-white shadow-lg">
              <iframe
                title={t("footer.address")}
                src={MAP_EMBED_SRC}
                className="h-32 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-white/70">
        © {new Date().getFullYear()} {t("footer.copyright")}
      </div>
    </footer>
  );
};

export default Footer;
