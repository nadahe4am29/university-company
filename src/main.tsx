import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import { installLocalizedValidation } from "./i18n/formValidation";
import App from "./App.tsx";

installLocalizedValidation();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
