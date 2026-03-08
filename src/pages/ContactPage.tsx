import { useState } from "react";
import { useTranslation } from "react-i18next";

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
    } catch (error) {
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
    <div className="relative min-h-screen overflow-hidden bg-[#1a1f2e] text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-400/20 via-slate-800 to-emerald-400/20" />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-[180px] animate-blob" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-emerald-300/20 rounded-full blur-[180px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-200px] left-1/4 w-[600px] h-[600px] bg-purple-300/15 rounded-full blur-[180px] animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl mb-6">
          {t("contactPage.title")}
        </h1>
        <p className="text-xl text-white/70 max-w-2xl">
          {t("contactPage.subtitle")}
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-black/40 backdrop-blur-md rounded-3xl border border-white/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="text-indigo-400">👤</span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("contactPage.form.name")}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="text-emerald-400">✉️</span>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contactPage.form.email")}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <div className="absolute top-4 left-4 pointer-events-none">
                  <span className="text-purple-400">💬</span>
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contactPage.form.message")}
                  rows={6}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-indigo-600 to-emerald-600 text-white py-4 rounded-2xl font-semibold hover:from-indigo-700 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span>
                  {isSubmitting ? "Sending..." : t("contactPage.form.submit")}
                </span>
                <span className="text-lg">{isSubmitting ? "⏳" : "🚀"}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="relative z-10 bg-black/40 py-20 backdrop-blur-md px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Office Address */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-indigo-300">
              العنوان الرئيسي
            </h2>
            <div
              className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 p-8 text-right"
              dir="rtl"
            >
              <div className="flex items-start gap-4 mb-6">
                <span className="text-3xl">📍</span>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-emerald-400">
                    المقر الرئيسي
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-4">
                    مصر، القاهرة، مدينة نصر، برج الحجاز 19، الدور الرابع، شارع
                    الشيخ محمد متولي الشعراوي (بجوار مستشفى الماسة)
                  </p>
                  <p className="text-white/70 text-sm">
                    موعد الزيارة: من الأحد إلى الخميس، 10:00 ص - 7:00 م
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors"
                >
                  <span>🗺️</span>
                  <span>Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Contact Channels */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-indigo-300">
              قنوات التواصل السريع
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-right"
                dir="rtl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📞</span>
                  <h3 className="text-lg font-semibold text-blue-400">
                    قسم العقود
                  </h3>
                </div>
                <p className="text-white/70 mb-2">أصحاب الأعمال</p>
                <a
                  href="tel:01100611116"
                  className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
                >
                  01100611116
                </a>
              </div>

              <div
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-right"
                dir="rtl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💼</span>
                  <h3 className="text-lg font-semibold text-emerald-400">
                    قسم التوظيف
                  </h3>
                </div>
                <p className="text-white/70 mb-2">الباحثين عن عمل</p>
                <a
                  href="tel:01004787942"
                  className="text-xl font-bold text-white hover:text-emerald-400 transition-colors"
                >
                  01004787942
                </a>
              </div>

              <div
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-right"
                dir="rtl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🤝</span>
                  <h3 className="text-lg font-semibold text-purple-400">
                    الخدمات القنصلية ومساند
                  </h3>
                </div>
                <p className="text-white/70 mb-2">الدعم الفني</p>
                <a
                  href="tel:0223822840"
                  className="text-xl font-bold text-white hover:text-purple-400 transition-colors"
                >
                  0223822840
                </a>
              </div>
            </div>
          </div>

          {/* Official Correspondence */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-indigo-300">
              المراسلات الرسمية
            </h2>
            <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 p-8 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-3xl">✉️</span>
                <h3 className="text-xl font-semibold text-yellow-400">
                  البريد الإلكتروني الرسمي
                </h3>
              </div>
              <a
                href="mailto:info@algamaa.com.eg"
                className="text-2xl font-bold text-white hover:text-yellow-400 transition-colors"
              >
                info@algamaa.com.eg
              </a>
              <p className="text-white/70 mt-2 text-sm">
                (للشكاوى والاقتراحات)
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-indigo-300">
              كن قريبا منا
            </h2>
            <div className="flex justify-center gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-blue-600/20 hover:bg-blue-600/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-blue-500/30"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-5.373-12-12-12c0-6.627 5.373-12 12 12 0 0 12 5.373 12 12 12zm-3.158 4.729v10.538c0-1.175-.496-3.058-1.555-3.058-3.058-1.555 0-3.058 1.555 3.058 1.555 3.058v10.538c0 1.175.496 3.058 1.555 3.058 3.058 1.555 3.058zm1.474 5.79c.465-.433.895-1.413 1.413-1.413-.895 1.414-1.414 1.414z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-blue-700/20 hover:bg-blue-700/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-blue-600/30"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-3.586c0-4.517-3.872-3.108-9.089-3.108-9.089s3.108-9.089 3.108-9.089h3.554v3.586h-3.554c-4.517 0-8.335 3.872-3.108 9.089-3.108 9.089 3.108 8.335 3.108 9.089 9.089v3.586h3.554zm-3.61-3.586v8.416c0 4.964 4.027 9.089 9.089s9.089-4.027-9.089-9.089h-4.982c0-3.586-3.108-6.516-3.108-6.516s-3.108 6.516-3.108 6.516v8.416z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-linear-to-br from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-purple-500/30"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 6.912 2.833 7.5 2.833s-3.204-2.833-7.5-2.833-7.5 2.833-2.833-2.833c0-3.063 1.426-4.667 4.25-4.667s-4.667-4.25-4.667-4.25-4.667c0-2.879 1.151-5.583 3.428-5.583s-5.583-3.428-5.583-3.428c0-2.009 1.492-4.315 3.428-4.315s-4.315-3.428-4.315-3.428c0-2.38 1.823-4.381 3.428-4.381s-4.381-3.428-4.381-3.428v-1.796c0-2.699-2.175-4.891-4.565-4.891s-4.891-4.565-4.891-4.565c0-3.179 1.362-4.565 3.857-4.565s-4.565-3.857-4.565-3.857c0-2.833 1.226-4.565 3.857-4.565s-4.565-3.857-4.565-3.857c0-2.52 1.09-4.565 3.857-4.565s-4.565-3.857-4.565-3.857c0-2.433 1.004-4.565 3.857-4.565s-4.565-3.857-4.565-3.857c0-2.196 1.009-4.565 3.857-4.565s-4.565-3.857-4.565-3.857c0-2.455 1.009-4.565 3.857-4.565s-4.565-3.857-4.565-3.857c0-2.274 1.009-4.565 3.857-4.565s-4.565-3.857-4.565-3.857c0-1.856.642-3.857 3.857-3.857s-3.857-3.857-3.857-3.857c0-1.423.727-3.857 3.857-3.857s-3.857-3.857-3.857-3.857c0-.931.273-3.857 3.857-3.857s-3.857-3.857-3.857-3.857z" />
                </svg>
              </a>
            </div>
            <p className="text-center text-white/70 mt-4">
              لمتابعة أخبار الوظائف والعقود
            </p>
          </div>

          {/* Why Contact Us */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center text-indigo-300">
              لماذا تتواصل معنا؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-indigo-500/20 rounded-full flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-300">
                  استجابة فورية
                </h3>
                <p className="text-white/70">
                  فريقنا يعمل بنظام الدعم الفني السريع للرد على استفساراتكم.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-emerald-300">
                  شفافية كاملة
                </h3>
                <p className="text-white/70">
                  نحرص على تقديم نحرص على تقديم معلومات دقيقة حول الإجراءات
                  والرسوم الرسمية
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-purple-300">
                  دعم ممتد
                </h3>
                <p className="text-white/70">
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
