import { useTranslation } from "react-i18next";
import {
  HiBriefcase,
  HiDocument,
  HiCheckCircle,
  HiLightningBolt,
  HiLightBulb,
} from "react-icons/hi";

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
            <div className="flex items-start gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full shrink-0">
                <HiBriefcase className="w-6 h-6 text-purple-300" />
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
            <div className="flex items-start gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full shrink-0">
                <HiDocument className="w-6 h-6 text-blue-300" />
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
            <div className="flex items-start gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500 rounded-full shrink-0">
                <HiCheckCircle className="w-6 h-6 text-emerald-300" />
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
            <div className="flex items-start gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full shrink-0">
                <HiLightningBolt className="w-6 h-6 text-orange-300" />
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
            <div className="flex items-start gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full shrink-0">
                <HiLightBulb className="w-6 h-6 text-pink-300" />
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
