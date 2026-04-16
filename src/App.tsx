import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import JobDetails from "./components/JobDetails";
import QualificationPage from "./pages/QualificationPage";
import QualifiedHome from "./pages/QualifiedHome";
import UnqualifiedHome from "./pages/UnqualifiedHome";
import PostJobPage from "./pages/PostJobPage";
import ApplyPage from "./pages/ApplyPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import Header from "./components/Header";
import WhatsAppFab from "./components/WhatsAppFab";

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
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="grow pt-24 sm:pt-28">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    } else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

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
                <QualificationPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/qualified-home"
            element={
              <AppWithNavbar theme={theme} toggleTheme={toggleTheme}>
                <QualifiedHome />
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
            path="/jobs/:id"
            element={
              <AppWithNavbar theme={theme} toggleTheme={toggleTheme}>
                <JobDetails />
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
