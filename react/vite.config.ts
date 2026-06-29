import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Minimal declaration so we can read VITE_BASE at config time without pulling
// in @types/node just for one env lookup.
declare const process: { env: Record<string, string | undefined> };

// Static build → dist/ as plain HTML/CSS/JS.
//
// base: served from a GitHub Pages *project* path, so assets live under
// /openwhisp-site/. Override with VITE_BASE for a custom domain (use "/") or
// other host. Relative "./" also works for a single-page site, but an explicit
// absolute base is unambiguous and keeps the canonical/OG URLs consistent.
const base = process.env.VITE_BASE ?? "/openwhisp-site/";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
