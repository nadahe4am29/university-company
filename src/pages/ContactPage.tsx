import { useTranslation } from "react-i18next";
import ContactMessageForm from "../sections/contact/ContactMessageForm";
import ContactInfo from "../sections/contact/ContactInfo";

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold md:text-4xl">
            {t("contactPage.title")}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            {t("contactPage.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ContactMessageForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
