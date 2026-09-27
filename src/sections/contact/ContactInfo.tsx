import { useTranslation } from "react-i18next";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import type { IconType } from "react-icons";

const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=26%20El-Sadat%20Al-Nozha%20Nasr%20City%20Cairo&hl=ar&z=16&output=embed";

function InfoIcon({ icon: Icon }: { icon: IconType }) {
  return (
    <span className="icon-box h-8 w-8 shrink-0 rounded-full">
      <Icon className="h-4 w-4" />
    </span>
  );
}

const ContactInfo = () => {
  const { t } = useTranslation();

  const phones = [
    {
      label: t("contactPage.phones.contracts"),
      number: t("contactPage.phones.contractsNumber"),
    },
    {
      label: t("contactPage.phones.seekers"),
      number: t("contactPage.phones.seekersNumber"),
    },
    {
      label: t("contactPage.phones.consular"),
      number: t("contactPage.phones.consularNumber"),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <section className="soft-card p-6 sm:p-8">
        <h2 className="mb-6 text-xl font-bold">{t("contactPage.infoTitle")}</h2>

        <div className="space-y-5 text-sm">
          <div className="flex items-start gap-3">
            <InfoIcon icon={FiMapPin} />
            <div>
              <h3 className="mb-1 font-semibold">{t("contactPage.hq.title")}</h3>
              <p className="leading-7 text-muted-foreground">
                {t("contactPage.hq.address")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <InfoIcon icon={FiClock} />
            <div>
              <h3 className="mb-1 font-semibold">
                {t("contactPage.hours.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("contactPage.hours.value")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <InfoIcon icon={FiPhone} />
            <div>
              <h3 className="mb-2 font-semibold">
                {t("contactPage.phones.title")}
              </h3>
              <ul className="space-y-1.5 text-muted-foreground">
                {phones.map((item) => (
                  <li key={item.number}>
                    {item.label}:{" "}
                    <a
                      href={`tel:${item.number}`}
                      className="text-foreground/80 hover:text-foreground"
                      dir="ltr"
                    >
                      {item.number}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <InfoIcon icon={FiMail} />
            <div>
              <h3 className="mb-1 font-semibold">
                {t("contactPage.emailLabel")}
              </h3>
              <a
                href={`mailto:${t("contactPage.email")}`}
                className="text-foreground/80 hover:text-foreground"
              >
                {t("contactPage.email")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <iframe
          title={t("contactPage.hq.address")}
          src={MAP_EMBED_SRC}
          className="h-56 w-full border-0 sm:h-64"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default ContactInfo;
