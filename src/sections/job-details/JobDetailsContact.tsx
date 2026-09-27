import { useTranslation } from "react-i18next";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

function whatsAppHref(): string {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER ?? "201004787942";
  const digits = String(raw).replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

const JobDetailsContact = () => {
  const { t } = useTranslation();

  const rows = [
    {
      label: t("jobDetails.contact.contracts"),
      value: t("contactPage.phones.contractsNumber"),
      href: `tel:${t("contactPage.phones.contractsNumber")}`,
      icon: FiPhone,
    },
    {
      label: t("jobDetails.contact.development"),
      value: t("contactPage.phones.seekersNumber"),
      href: `tel:${t("contactPage.phones.seekersNumber")}`,
      icon: FiPhone,
    },
    {
      label: t("jobDetails.contact.email"),
      value: t("contactPage.email"),
      href: `mailto:${t("contactPage.email")}`,
      icon: FiMail,
    },
  ];

  return (
    <aside className="rounded-3xl border border-border bg-card p-6 sm:p-7">
      <h2 className="mb-6 text-xl font-bold text-foreground">
        {t("jobDetails.contact.title")}
      </h2>

      <ul className="space-y-4 text-sm">
        {rows.map((row) => (
          <li key={row.label} className="flex items-start gap-3 text-muted-foreground">
            <row.icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <div>
              <span>{row.label}: </span>
              <a href={row.href} className="text-foreground/80 hover:text-foreground" dir="ltr">
                {row.value}
              </a>
            </div>
          </li>
        ))}
      </ul>

      <a
        href={whatsAppHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
      >
        <FaWhatsapp className="h-5 w-5" aria-hidden />
        {t("common.whatsappChat")}
      </a>
    </aside>
  );
};

export default JobDetailsContact;
