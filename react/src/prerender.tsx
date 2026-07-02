import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App.tsx";

/**
 * SSR entry: built separately (`vite build --ssr src/prerender.tsx`) and run
 * once at build time by scripts/prerender.mjs to bake the full page into
 * dist/index.html. Crawlers get real HTML; the client bundle hydrates it.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
