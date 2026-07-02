import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Minimal declaration so we can read VITE_BASE at config time without pulling
// in @types/node just for one env lookup.
declare const process: { env: Record<string, string | undefined> };

// Static build → dist/ as plain HTML/CSS/JS.
//
// base: served from the root of the custom domain (openwhisp.app), so assets
// live at /. Override with VITE_BASE if hosting under a subpath again (e.g.
// the GitHub Pages project path "/openwhisp-site/").
const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
