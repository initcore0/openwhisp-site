import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import { renderRoute } from "./routes.tsx";

document.body.classList.add("grain");

const root = document.getElementById("root")!;
const app = <StrictMode>{renderRoute(window.location.pathname)}</StrictMode>;

// Production HTML is prerendered at build time (scripts/prerender.mjs), so
// hydrate it; the dev server serves an empty root and renders from scratch.
if (root.firstElementChild) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
