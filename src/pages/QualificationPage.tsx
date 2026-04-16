import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { FaUserTie, FaBuilding, FaArrowRight } from "react-icons/fa";
import logo from "../assets/logo.jpeg";
import ImageSlider from "../components/ImageSlider";
import { useIsRtl } from "../hooks/useIsRtl";
import LogoCarousel from "../components/LogoSlider";

const SNAPPY_SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 28,
  mass: 0.65,
};

const QualificationPage = () => {
  const [showQualificationOptions, setShowQualificationOptions] =
    useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isRtl = useIsRtl();

  // Hero slider images
  const heroImages = [
    "/src/assets/logo/2.png",
    "/src/assets/2.png",
    "/src/assets/3.png",
  ];

  const headerVariants: Variants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ...SNAPPY_SPRING, delay: 0.03 },
    },
  };

  const leftCardVariants: Variants = useMemo(() => {
    const m = isRtl ? -1 : 1;
    return {
      hidden: { x: -60 * m, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: { ...SNAPPY_SPRING, delay: 0.07 },
      },
    };
  }, [isRtl]);

  const rightCardVariants: Variants = useMemo(() => {
    const m = isRtl ? -1 : 1;
    return {
      hidden: { x: 60 * m, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: { ...SNAPPY_SPRING, delay: 0.12 },
      },
    };
  }, [isRtl]);

  return (
    <div className="page-mesh relative min-h-screen overflow-hidden">
      {/* Hero Image Slider */}
      <section className="relative h-[60vh] sm:h-[70vh]">
        <ImageSlider
          images={heroImages}
          autoPlay={true}
          interval={5000}
          showDots={true}
          showArrows={true}
          className="h-full"
        />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl px-4 text-center text-white sm:px-6"
          >
            <div className="mb-6 inline-block rounded-2xl border border-white/30 bg-white/20 p-1 shadow-lg backdrop-blur-sm ring-1 ring-white/60">
              <img
                src={logo}
                alt="logo"
                className="h-20 w-20 rounded-xl object-contain sm:h-24 sm:w-24"
              />
            </div>
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              {t("qualificationPage.title")}
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              {t("qualificationPage.subtitle")}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.28 }}
              className="mt-8"
            >
              <button
                type="button"
                onClick={() => navigate("/qualified-home")}
                className="btn-primary group px-8 py-4 text-base bg-white text-gray-900 hover:bg-gray-100 transition-colors"
              >
                سجل سيرتك الذاتية
                <FaArrowRight className="mr-2 text-xs transition group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 flex min-h-[calc(100vh-60vh)] flex-col items-center justify-center px-4 py-16 sm:px-6">
        <div className="relative z-10 grid w-full max-w-4xl gap-5 sm:grid-cols-2 sm:gap-6">
          <motion.div
            variants={leftCardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              y: -4,
              transition: { type: "spring", stiffness: 450, damping: 32 },
            }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setShowQualificationOptions(true)}
            className="group card-surface cursor-pointer p-7 transition hover:border-primary/40 hover:shadow-md sm:p-8"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <FaUserTie className="text-2xl" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-card-foreground">
              {t("qualificationPage.choosePath")}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              {t("qualificationPage.choosePathDescription")}
            </p>
            <div className="flex items-center gap-2 text-sm font-bold text-primary">
              ابدأ الآن
              <FaArrowRight className="text-xs transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </div>
          </motion.div>

          <motion.div
            variants={rightCardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              y: -4,
              transition: { type: "spring", stiffness: 450, damping: 32 },
            }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate("/post-job")}
            className="group card-surface cursor-pointer p-7 transition hover:border-secondary/50 hover:shadow-md sm:p-8"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition group-hover:bg-secondary group-hover:text-secondary-foreground">
              <FaBuilding className="text-2xl" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-card-foreground">
              {t("qualificationPage.postJob.title")}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              {t("qualificationPage.postJob.description")}
            </p>
            <div className="flex items-center gap-2 text-sm font-bold text-secondary">
              أعلن عن وظيفة
              <FaArrowRight className="text-xs transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Partners Section */}
      <section className="relative z-10 px-4 pb-16 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <div className="mb-4 h-1.5 w-16 rounded-full bg-primary mx-auto" />
            <h2 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              {
                "\u0634\u0631\u0643\u0627\u0621 \u0627\u0644\u0646\u062c\u0627\u062d"
              }
            </h2>
            <p className="mt-4 text-muted-foreground">
              {
                "\u0646\u0641\u062e\u0631 \u0628\u0627\u0644\u0639\u0645\u0644 \u0645\u0639 \u0623\u0641\u0636\u0644 \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0641\u064a \u0627\u0644\u0645\u0646\u0637\u0642\u0629"
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border p-8"
          >
            <LogoCarousel />
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showQualificationOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 z-80 flex items-center justify-center p-4"
          >
            <button
              type="button"
              className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
              aria-label="Close"
              onClick={() => setShowQualificationOptions(false)}
            />
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="card-surface relative z-10 w-full max-w-lg p-8 shadow-2xl"
            >
              <h2 className="mb-8 text-center text-2xl font-bold text-card-foreground">
                {t("qualificationPage.selectOption")}
              </h2>
              <div className="grid gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/qualified-home")}
                  className="group rounded-xl border border-border bg-muted/50 p-5 text-left transition hover:border-primary/40 hover:bg-primary/5"
                >
                  <span className="block font-bold text-card-foreground group-hover:text-primary">
                    {t("qualificationPage.withQualification.title")}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/unqualified-home")}
                  className="group rounded-xl border border-border bg-muted/50 p-5 text-left transition hover:border-secondary/40 hover:bg-secondary/5"
                >
                  <span className="block font-bold text-card-foreground group-hover:text-secondary">
                    {t("qualificationPage.withoutQualification.title")}
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QualificationPage;
