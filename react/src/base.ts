// Base-path awareness for the two ways this site is hosted:
//   - openwhisp.app        → built with base "/"            (BASE_URL = "/")
//   - github.io mirror     → built with base "/openwhisp-site/"
//
// Vite injects the configured base as import.meta.env.BASE_URL (always with a
// trailing slash). All *internal* links are authored root-relative ("/blog/…")
// and passed through withBase() so they resolve correctly under either host.
// For the primary domain BASE_URL is "/", so withBase() is an identity no-op
// and production output is unchanged.

// Minimal ambient declaration so we can read Vite's injected base without
// pulling in the whole vite/client type surface (mirrors the hand-rolled
// `declare` in vite.config.ts).
declare global {
  interface ImportMeta {
    readonly env: { readonly BASE_URL: string };
  }
}

const BASE = import.meta.env.BASE_URL; // e.g. "/" or "/openwhisp-site/"

/**
 * Prefix a root-relative internal path with the build-time base.
 * Leaves in-page anchors ("#faq"), external URLs, and mailto: untouched.
 *
 *   withBase("/blog/")   → "/blog/"           (apex)   | "/openwhisp-site/blog/" (mirror)
 *   withBase("/")        → "/"                          | "/openwhisp-site/"
 *   withBase("/#features") → "/#features"               | "/openwhisp-site/#features"
 */
export function withBase(path: string): string {
  if (!path.startsWith("/")) return path; // "#anchor", "https://…", "mailto:…"
  // BASE always ends with "/"; drop the leading "/" of path to avoid "//".
  return BASE + path.slice(1);
}

/**
 * Inverse of withBase for the router: strip the base prefix off a browser
 * pathname so route matching sees canonical "/…" paths regardless of host.
 */
export function stripBase(pathname: string): string {
  if (BASE !== "/" && pathname.startsWith(BASE)) {
    return "/" + pathname.slice(BASE.length);
  }
  return pathname;
}
