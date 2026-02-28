import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function AppWithNavbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1a1f2e] text-white flex flex-col">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#1a1f2e] text-white flex flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <QualificationPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/qualified-home"
            element={
              <AppWithNavbar>
                <QualifiedHome />
              </AppWithNavbar>
            }
          />
          <Route
            path="/unqualified-home"
            element={
              <AppWithNavbar>
                <UnqualifiedHome />
              </AppWithNavbar>
            }
          />
          <Route
            path="/post-job"
            element={
              <AppWithNavbar>
                <PostJobPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/about"
            element={
              <AppWithNavbar>
                <AboutPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/contact"
            element={
              <AppWithNavbar>
                <ContactPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/services"
            element={
              <AppWithNavbar>
                <ServicesPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <AppWithNavbar>
                <JobDetails />
              </AppWithNavbar>
            }
          />
          <Route
            path="/apply/:id"
            element={
              <AppWithNavbar>
                <ApplyPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/contact"
            element={
              <AppWithNavbar>
                <ContactPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/services"
            element={
              <AppWithNavbar>
                <ServicesPage />
              </AppWithNavbar>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <AppWithNavbar>
                <JobDetails />
              </AppWithNavbar>
            }
          />
          <Route
            path="/apply/:id"
            element={
              <AppWithNavbar>
                <ApplyPage />
              </AppWithNavbar>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
