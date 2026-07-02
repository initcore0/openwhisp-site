// Post-build step: render the App to static HTML and inject it into
// dist/index.html so the page is fully indexable and paints before JS loads.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const { render } = await import(new URL("../dist-ssr/prerender.js", import.meta.url));

const htmlPath = `${root}dist/index.html`;
const html = readFileSync(htmlPath, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) {
  throw new Error(`prerender: marker ${marker} not found in dist/index.html`);
}

writeFileSync(htmlPath, html.replace(marker, `<div id="root">${render()}</div>`));
rmSync(`${root}dist-ssr`, { recursive: true, force: true });
console.log("prerender: injected static HTML into dist/index.html");
