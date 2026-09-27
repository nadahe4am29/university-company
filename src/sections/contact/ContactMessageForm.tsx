import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown } from "react-icons/fi";

const ContactMessageForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      alert(t("contactPage.form.success"));
      setFormData({ name: "", email: "", type: "inquiry", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="soft-card p-6 sm:p-8">
      <h2 className="mb-6 text-xl font-bold">{t("contactPage.formTitle")}</h2>

      <div className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground/80">
            {t("contactPage.form.name")}
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("contactPage.form.namePlaceholder")}
            className="field-input"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground/80">
            {t("contactPage.form.email")}
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("contactPage.form.emailPlaceholder")}
            className="field-input"
            required
          />
        </label>

        <label className="relative block">
          <span className="mb-2 block text-sm font-medium text-foreground/80">
            {t("contactPage.form.type")}
          </span>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="field-input"
          >
            <option value="inquiry">{t("contactPage.form.types.inquiry")}</option>
            <option value="seeker">{t("contactPage.form.types.seeker")}</option>
            <option value="employer">
              {t("contactPage.form.types.employer")}
            </option>
            <option value="consular">
              {t("contactPage.form.types.consular")}
            </option>
          </select>
          <FiChevronDown className="pointer-events-none absolute bottom-3.5 end-4 h-4 w-4 text-muted-foreground" />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground/80">
            {t("contactPage.form.message")}
          </span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t("contactPage.form.messagePlaceholder")}
            rows={5}
            className="field-input resize-none"
            required
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-signin mt-2 w-full rounded-xl py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? t("contactPage.form.sending")
            : t("contactPage.form.submit")}
        </button>
      </div>
    </form>
  );
};

export default ContactMessageForm;
