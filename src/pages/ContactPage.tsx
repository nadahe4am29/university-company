import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="page-mesh relative min-h-screen overflow-hidden">
      <section className="relative z-10 flex flex-col items-center px-4 pb-12 pt-8 text-center sm:px-6 md:pb-16 md:pt-12">
        <h1 className="mb-4 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          {t("contactPage.title")}
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
          {t("contactPage.subtitle")}
        </p>
      </section>

      <section className="relative z-10 px-4 pb-16 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-2xl">
          <div className="card-surface p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center sm:left-4">
                  <span className="text-primary" aria-hidden>
                    👤
                  </span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("contactPage.form.name")}
                  className="input-field pl-11 sm:pl-12"
                  required
                />
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center sm:left-4">
                  <span className="text-secondary" aria-hidden>
                    ✉️
                  </span>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contactPage.form.email")}
                  className="input-field pl-11 sm:pl-12"
                  required
                />
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-3.5 sm:left-4 sm:top-4">
                  <span className="text-accent" aria-hidden>
                    💬
                  </span>
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contactPage.form.message")}
                  rows={6}
                  className="input-field resize-none pl-11 pt-3 sm:pl-12 sm:pt-4"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>
                  {isSubmitting ? "Sending..." : t("contactPage.form.submit")}
                </span>
                <span className="text-lg" aria-hidden>
                  {isSubmitting ? "⏳" : "🚀"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-border bg-muted/30 px-4 py-16 backdrop-blur-sm sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 md:mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-primary md:text-3xl">
              العنوان الرئيسي
            </h2>
            <div className="card-surface p-6 text-right sm:p-8" dir="rtl">
              <div className="mb-6 flex items-start gap-4">
                <span className="text-3xl" aria-hidden>
                  📍
                </span>
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-secondary">
                    المقر الرئيسي
                  </h3>
                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    مصر، القاهرة، مدينة نصر، برج الحجاز 19، الدور الرابع، شارع
                    الشيخ محمد متولي الشعراوي (بجوار مستشفى الماسة)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    موعد الزيارة: من الأحد إلى الخميس، 10:00 ص - 7:00 م
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary rounded-full px-6 py-3 text-sm"
                >
                  <span aria-hidden>🗺️</span>
                  <span>Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-12 md:mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-primary md:text-3xl">
              قنوات التواصل السريع
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
              <div className="card-surface p-6 text-right" dir="rtl">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl" aria-hidden>
                    📞
                  </span>
                  <h3 className="text-lg font-semibold text-primary">
                    قسم العقود
                  </h3>
                </div>
                <p className="mb-2 text-muted-foreground">أصحاب الأعمال</p>
                <a
                  href="tel:01100611116"
                  className="text-xl font-bold text-foreground transition hover:text-primary"
                >
                  01100611116
                </a>
              </div>

              <div className="card-surface p-6 text-right" dir="rtl">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl" aria-hidden>
                    💼
                  </span>
                  <h3 className="text-lg font-semibold text-secondary">
                    قسم التوظيف
                  </h3>
                </div>
                <p className="mb-2 text-muted-foreground">الباحثين عن عمل</p>
                <a
                  href="tel:01004787942"
                  className="text-xl font-bold text-foreground transition hover:text-secondary"
                >
                  01004787942
                </a>
              </div>

              <div className="card-surface p-6 text-right" dir="rtl">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl" aria-hidden>
                    🤝
                  </span>
                  <h3 className="text-lg font-semibold text-accent">
                    الخدمات القنصلية ومساند
                  </h3>
                </div>
                <p className="mb-2 text-muted-foreground">الدعم الفني</p>
                <a
                  href="tel:0223822840"
                  className="text-xl font-bold text-foreground transition hover:text-accent"
                >
                  0223822840
                </a>
              </div>
            </div>
          </div>

          <div className="mb-12 md:mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-primary md:text-3xl">
              المراسلات الرسمية
            </h2>
            <div className="card-surface p-8 text-center">
              <div className="mb-4 flex items-center justify-center gap-4">
                <span className="text-3xl" aria-hidden>
                  ✉️
                </span>
                <h3 className="text-xl font-semibold text-accent">
                  البريد الإلكتروني الرسمي
                </h3>
              </div>
              <a
                href="mailto:info@algamaa.com.eg"
                className="text-2xl font-bold text-foreground transition hover:text-accent"
              >
                info@algamaa.com.eg
              </a>
              <p className="mt-2 text-sm text-muted-foreground">
                (للشكاوى والاقتراحات)
              </p>
            </div>
          </div>

          <div className="mb-12 md:mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-primary md:text-3xl">
              كن قريبا منا
            </h2>
            <div className="flex justify-center gap-4 sm:gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-primary transition hover:border-primary/40 hover:bg-muted"
                aria-label="Facebook"
              >
                <FaFacebook className="h-7 w-7" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-primary transition hover:border-primary/40 hover:bg-muted"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-7 w-7" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-accent transition hover:border-accent/40 hover:bg-muted"
                aria-label="Instagram"
              >
                <FaInstagram className="h-7 w-7" />
              </a>
            </div>
            <p className="mt-4 text-center text-muted-foreground">
              لمتابعة أخبار الوظائف والعقود
            </p>
          </div>

          <div>
            <h2 className="mb-8 text-center text-2xl font-bold text-primary md:text-3xl">
              لماذا تتواصل معنا؟
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="card-surface p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted ring-1 ring-border transition group-hover:bg-muted/80">
                  <span className="text-2xl" aria-hidden>
                    ⚡
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-primary">
                  استجابة فورية
                </h3>
                <p className="text-muted-foreground">
                  فريقنا يعمل بنظام الدعم الفني السريع للرد على استفساراتكم.
                </p>
              </div>

              <div className="card-surface p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted ring-1 ring-border">
                  <span className="text-2xl" aria-hidden>
                    🔍
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-secondary">
                  شفافية كاملة
                </h3>
                <p className="text-muted-foreground">
                  نحرص على تقديم نحرص على تقديم معلومات دقيقة حول الإجراءات
                  والرسوم الرسمية
                </p>
              </div>

              <div className="card-surface p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted ring-1 ring-border">
                  <span className="text-2xl" aria-hidden>
                    🤝
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-accent">
                  دعم ممتد
                </h3>
                <p className="text-muted-foreground">
                  خدماتنا لا تنتهي بمجرد سفر الكادر، نحن معك دائماً.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
