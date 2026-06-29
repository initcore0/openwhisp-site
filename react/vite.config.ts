import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Static build → dist/ as plain HTML/CSS/JS.
// base "./" keeps asset paths relative so the output can be hosted under any
// subpath (e.g. GitHub Pages project path) without rewriting.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
