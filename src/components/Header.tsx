import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "../assets/1.png";

type HeaderProps = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const Header = ({ theme, toggleTheme }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);

  const menuItems = [
    { path: "/about", label: t("common.about") },
    { path: "/services", label: t("common.services") },
    { path: "/contact", label: t("common.contact") },
  ];

  const jobsOptions = [
    {
      path: "/qualified-home",
      label: t("qualificationPage.withQualification.title"),
    },
    {
      path: "/unqualified-home",
      label: t("qualificationPage.withoutQualification.title"),
    },
  ];

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (!jobsDropdownOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setJobsDropdownOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jobsDropdownOpen]);

  useEffect(() => {
    if (!jobsDropdownOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest("[data-jobs-dropdown]")) {
        setJobsDropdownOpen(false);
      }
    };
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  }, [jobsDropdownOpen]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-5">
        <header className="flex w-full max-w-6xl items-center justify-between gap-3 rounded-2xl border border-border bg-surface-elevated/85 px-4 py-3 shadow-lg shadow-foreground/5 backdrop-blur-xl sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={logo}
              alt={t("common.logo")}
              className="h-9 w-auto shrink-0 cursor-pointer object-contain transition hover:opacity-90 sm:h-10"
              onClick={() => navigate("/")}
            />
          </div>

          <nav
            className="hidden items-center gap-1 rounded-xl border border-border/80 bg-muted/50 p-1 md:flex"
            aria-label="Main"
          >
            {menuItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg bg-card shadow-sm ring-1 ring-border"
                      transition={{
                        type: "spring",
                        stiffness: 520,
                        damping: 38,
                      }}
                    />
                  )}
                </button>
              );
            })}

            {/* Jobs Dropdown */}
            <div className="relative" data-jobs-dropdown>
              <button
                type="button"
                onClick={() => setJobsDropdownOpen(!jobsDropdownOpen)}
                className={`relative flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  location.pathname.startsWith("/qualified") ||
                  location.pathname.startsWith("/unqualified")
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("common.jobs")}
                <FiChevronDown
                  size={16}
                  className={`transition-transform ${
                    jobsDropdownOpen ? "rotate-180" : ""
                  }`}
                />
                {(location.pathname.startsWith("/qualified") ||
                  location.pathname.startsWith("/unqualified")) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-card shadow-sm ring-1 ring-border"
                    transition={{
                      type: "spring",
                      stiffness: 520,
                      damping: 38,
                    }}
                  />
                )}
              </button>

              {jobsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 rounded-lg border border-border bg-background shadow-lg shadow-foreground/10">
                  <div className="p-1">
                    {jobsOptions.map((option) => {
                      const active = location.pathname === option.path;
                      return (
                        <button
                          key={option.path}
                          type="button"
                          onClick={() => {
                            navigate(option.path);
                            setJobsDropdownOpen(false);
                          }}
                          className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                            active
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Employer Button */}
            <button
              type="button"
              onClick={() => navigate("/post-job")}
              className="hidden rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/30 md:block"
            >
              {t("qualificationPage.postJob.title")}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-xl border border-border bg-muted/80 p-2.5 text-foreground transition hover:bg-muted"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <button
              type="button"
              className="flex rounded-xl border border-border bg-muted/80 p-2.5 text-foreground md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </header>
      </div>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-18 z-40 bg-foreground/40 backdrop-blur-sm md:hidden"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-x-0 top-18 z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-border bg-background/98 px-5 pb-8 pt-4 shadow-xl backdrop-blur-xl md:hidden">
            <nav
              className="mx-auto flex max-w-md flex-col gap-1"
              aria-label="Mobile"
            >
              {menuItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className={`rounded-xl px-4 py-3 text-left text-base font-semibold ${
                      active
                        ? "bg-muted text-foreground ring-1 ring-border"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Mobile Jobs Dropdown */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setJobsDropdownOpen(!jobsDropdownOpen)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-semibold ${
                    location.pathname.startsWith("/qualified") ||
                    location.pathname.startsWith("/unqualified")
                      ? "bg-muted text-foreground ring-1 ring-border"
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {t("common.jobs")}
                  <FiChevronDown
                    size={18}
                    className={`transition-transform ${
                      jobsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {jobsDropdownOpen && (
                  <div className="ml-4 space-y-1">
                    {jobsOptions.map((option) => {
                      const active = location.pathname === option.path;
                      return (
                        <button
                          key={option.path}
                          type="button"
                          onClick={() => {
                            navigate(option.path);
                            setJobsDropdownOpen(false);
                          }}
                          className={`w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors ${
                            active
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile Employer Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/post-job");
                    setMobileOpen(false);
                  }}
                  className="w-full rounded-xl bg-primary px-4 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
                >
                  {t("qualificationPage.postJob.title")}
                </button>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
