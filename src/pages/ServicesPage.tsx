import { useTranslation } from "react-i18next";

const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto pt-24">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            {t("servicesPage.title")}
          </h1>
        </div>

        {/* Introduction Card */}
        <div className="mb-8">
          <div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-right leading-relaxed text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/15"
            dir="rtl"
          >
            <p>{t("servicesPage.intro")}</p>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Section 1 Card */}
          <div
            className="bg-linear-to-br from-purple-600 to-blue-600 backdrop-blur-lg rounded-2xl p-8 border border-purple-400 text-right leading-relaxed shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            dir="rtl"
          >
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-purple-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-purple-200">
                {t("servicesPage.section1.title")}
              </h3>
            </div>
            <ul className="space-y-3">
              {(
                t("servicesPage.section1.items", {
                  returnObjects: true,
                }) as string[]
              ).map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-purple-400 rounded-full mt-2 ml-3 shrink-0"></span>
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2 Card */}
          <div
            className="bg-linear-to-br from-blue-600 to-cyan-600 backdrop-blur-lg rounded-2xl p-8 border border-blue-400 text-right leading-relaxed shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            dir="rtl"
          >
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-200">
                {t("servicesPage.section2.title")}
              </h3>
            </div>
            <ul className="space-y-3">
              {(
                t("servicesPage.section2.items", {
                  returnObjects: true,
                }) as string[]
              ).map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 ml-3 shrink-0"></span>
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3 Card */}
        <div className="mb-8">
          <div
            className="bg-linear-to-br from-emerald-600 to-teal-600 backdrop-blur-lg rounded-2xl p-8 border border-emerald-400 text-right leading-relaxed shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            dir="rtl"
          >
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-emerald-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-emerald-200">
                {t("servicesPage.section3.title")}
              </h3>
            </div>
            <ul className="space-y-3">
              {(
                t("servicesPage.section3.items", {
                  returnObjects: true,
                }) as string[]
              ).map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full mt-2 ml-3 shrink-0"></span>
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Why Choose & Why Different Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Why Choose Card */}
          <div
            className="bg-linear-to-br from-orange-600 to-red-600 backdrop-blur-lg rounded-2xl p-8 border border-orange-400 text-right leading-relaxed shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            dir="rtl"
          >
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-orange-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-orange-200">
                {t("servicesPage.whyChoose.title")}
              </h3>
            </div>
            <ul className="space-y-3">
              {(
                t("servicesPage.whyChoose.items", {
                  returnObjects: true,
                }) as string[]
              ).map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-orange-400 rounded-full mt-2 ml-3 shrink-0"></span>
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Different Card */}
          <div
            className="bg-linear-to-br from-pink-600 to-rose-600 backdrop-blur-lg rounded-2xl p-8 border border-pink-400 text-right leading-relaxed shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            dir="rtl"
          >
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-pink-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-pink-200">
                {t("servicesPage.whyDifferent.title")}
              </h3>
            </div>
            <ul className="space-y-3">
              {(
                t("servicesPage.whyDifferent.items", {
                  returnObjects: true,
                }) as string[]
              ).map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-pink-400 rounded-full mt-2 ml-3 shrink-0"></span>
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
