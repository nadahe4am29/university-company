import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

/** Digits only, international (e.g. Egypt 201004787942). Override with VITE_WHATSAPP_NUMBER in .env */
function whatsAppHref(): string {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER ?? "201004787942";
  const digits = String(raw).replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export default function WhatsAppFab() {
  const { t } = useTranslation();
  const href = whatsAppHref();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 end-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-foreground/15 ring-2 ring-white/30 transition duration-150 ease-out hover:scale-110 hover:bg-[#20bd5a] hover:shadow-xl focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:ring-black/25"
      aria-label={t("common.whatsappChat")}
    >
      <FaWhatsapp className="h-8 w-8 drop-shadow-sm" aria-hidden />
    </a>
  );
}
