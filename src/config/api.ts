// Base URL of the backend API. Set VITE_API_URL at build time (e.g. https://api.algamaa.com.eg).
// Falls back to the local dev server.
export const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:5000").replace(/\/$/, "");
