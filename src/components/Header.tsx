import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import LanguageSwitcher from "./LanguageSwitcher";

type HeaderProps = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const Header = ({ theme, toggleTheme }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { path: "/", label: t("nav.home") },
    { path: "/services", label: t("nav.services") },
    { path: "/jobs", label: t("nav.jobs") },
    { path: "/about", label: t("nav.about") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

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

  const navButtonClass = (active: boolean, compact = true) =>
    `rounded-full font-semibold transition-colors ${
      compact ? "px-5 py-2 text-sm" : "px-4 py-3 text-start text-base"
    } ${
      active
        ? "bg-[#1a2e5b] text-white"
        : "text-foreground/70 hover:bg-muted hover:text-foreground"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
        <div className="flex h-18 w-full items-center px-4 py-2">
          <nav
            className="hidden items-center gap-3 lg:flex w-full justify-center px-4"
            aria-label="Main"
          >
            {menuItems.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={navButtonClass(isActive(item.path))}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center justify-end w-full gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition hover:text-foreground"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="btn-signin hidden rounded-lg p-2 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:brightness-110 md:block"
            >
              {t("nav.register")}
            </button>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground lg:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-18 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-x-0 top-18 z-50 max-h-[calc(100dvh-18px)] overflow-y-auto border-b border-border bg-card px-5 py-5 lg:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {menuItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className={navButtonClass(active, false)}
                  >
                    {item.label}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => navigate("/jobs")}
                className="btn-signin mt-3 rounded-full px-4 py-3 text-base font-semibold text-white ring-1 ring-white/10"
              >
                {t("nav.register")}
              </button>

              <div className="mt-4 border-t border-border pt-4 sm:hidden">
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
