import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to the top of the page whenever the route changes (except links to an #anchor). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
}
