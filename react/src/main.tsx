import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import { renderRoute } from "./routes.tsx";
import { stripBase } from "./base";

document.body.classList.add("grain");

const root = document.getElementById("root")!;
// Under the github.io mirror the pathname is prefixed with the base
// (/openwhisp-site/…); strip it so route matching sees canonical "/…" paths.
const app = <StrictMode>{renderRoute(stripBase(window.location.pathname))}</StrictMode>;

// Production HTML is prerendered at build time (scripts/prerender.mjs), so
// hydrate it; the dev server serves an empty root and renders from scratch.
if (root.firstElementChild) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
