import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import JobDetailsPage from "./pages/JobDetailsPage";
import HomePage from "./pages/HomePage";
import UnqualifiedHome from "./pages/UnqualifiedHome";
import PostJobPage from "./pages/PostJobPage";
import ApplyPage from "./pages/ApplyPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import Header from "./components/Header";
import WhatsAppFab from "./components/WhatsAppFab";
import FaqPage from "./pages/FaqPage";
import PrivacyPage from "./pages/PrivacyPage";
import JobsPage from "./pages/JobsPage";
import HomePartners from "./sections/home/HomePartners";

type Theme = "light" | "dark";

function AppWithNavbar({
  children,
  theme,
  toggleTheme,
}: {
  children: React.ReactNode;
  theme: Theme;
  toggleTheme: () => void;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="grow">{children}</main>
      <HomePartners />
      <Footer />
    </div>
  );
}

function readStoredTheme(): Theme {
  const storedTheme = localStorage.getItem("theme");
  const theme =
    storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  document.documentElement.classList.toggle("dark", theme === "dark");
  return theme;
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <BrowserRouter>
      <WhatsAppFab />
      <div className="flex min-h-screen flex-col bg-background">
        <Routes>
          <Route
            path="/"
            element={
              <AppWithNavbar theme={theme} toggleTheme={toggleTheme}>
                <HomePage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/unqualified-home"
            element={
              <AppWithNavbar theme={theme} toggleTheme={toggleTheme}>
                <UnqualifiedHome />
              </AppWithNavbar>
            }
          />
          <Route
            path="/post-job"
            element={
              <AppWithNavbar theme={theme} toggleTheme={toggleTheme}>
                <PostJobPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/about"
            element={
              <AppWithNavbar theme={theme} toggleTheme={toggleTheme}>
                <AboutPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/contact"
            element={
              <AppWithNavbar theme={theme} toggleTheme={toggleTheme}>
                <ContactPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/services"
            element={
              <AppWithNavbar theme={theme} toggleTheme={toggleTheme}>
                <ServicesPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/faq"
            element={
              <AppWithNavbar theme={theme} toggleTheme={toggleTheme}>
                <FaqPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/privacy"
            element={
              <AppWithNavbar theme={theme} toggleTheme={toggleTheme}>
                <PrivacyPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/jobs"
            element={
              <AppWithNavbar theme={theme} toggleTheme={toggleTheme}>
                <JobsPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <AppWithNavbar theme={theme} toggleTheme={toggleTheme}>
                <JobDetailsPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/apply/:id"
            element={
              <AppWithNavbar theme={theme} toggleTheme={toggleTheme}>
                <ApplyPage />
              </AppWithNavbar>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
