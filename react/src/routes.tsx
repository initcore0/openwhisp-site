import type { ReactNode } from "react";
import { App } from "./App";
import { BlogIndex } from "./blog/BlogIndex";
import { BlogPost } from "./blog/BlogPost";
import { POSTS } from "./blog/posts";

/**
 * Path → page component. Used by both the client entry (main.tsx) and the
 * build-time prerender, so a route renders identically on the server and in the
 * browser. Trailing slashes are normalized.
 */
export function renderRoute(pathname: string): ReactNode {
  const path = normalize(pathname);
  if (path === "/") return <App />;
  if (path === "/blog") return <BlogIndex />;
  const m = path.match(/^\/blog\/([a-z0-9-]+)$/);
  if (m) return <BlogPost slug={m[1]} />;
  return <App />; // fallback (shouldn't happen: every real route is prerendered)
}

function normalize(pathname: string): string {
  const p = pathname.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

/** Every URL the site prerenders (used by the prerender loop and sitemap). */
export function allRoutes(): string[] {
  return ["/", "/blog/", ...POSTS.map((p) => `/blog/${p.slug}/`)];
}
