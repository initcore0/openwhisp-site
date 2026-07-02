import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { renderRoute } from "./routes.tsx";

// Re-export post metadata so the prerender build step can read titles,
// descriptions, dates, and FAQ from the same SSR bundle.
export { POSTS } from "./blog/posts.tsx";

/**
 * SSR entry: built separately (`vite build --ssr src/prerender.tsx`) and run
 * once at build time by scripts/prerender.mjs to bake each route's full HTML.
 * Crawlers get real HTML; the client bundle hydrates it.
 */
export function render(path: string): string {
  return renderToString(<StrictMode>{renderRoute(path)}</StrictMode>);
}
