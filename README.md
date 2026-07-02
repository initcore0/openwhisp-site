# OpenWhisp — marketing site

The landing page for [OpenWhisp](https://github.com/initcore0/openwhisp), a local-first
dictation app for macOS. Built with Bun + Vite + React + TypeScript + Tailwind v4, and
deployed as a static site to GitHub Pages.

## Develop

```bash
cd react
bun install
bun run dev      # http://localhost:5173
```

## Build

```bash
cd react
bun run build    # static output → react/dist/
bun run preview  # serve the built output locally
```

The build prerenders the page: after the client bundle is built, `scripts/prerender.mjs`
renders the App to static HTML and injects it into `dist/index.html`, so crawlers get the
full page content and the browser paints before JavaScript loads. The client bundle then
hydrates the markup.

The base path defaults to `/` (the site is served from the root of the custom domain
**openwhisp.app**). Override it with `VITE_BASE` if hosting under a subpath again —
e.g. `VITE_BASE=/openwhisp-site/ bun run build` for the GitHub Pages project path.
The custom domain is set via `react/public/CNAME`.

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds `react/` and publishes
`react/dist/` to GitHub Pages. Pages must be set to the **GitHub Actions** source
(Settings → Pages → Build and deployment → Source).

## Structure

```
react/
├── index.html              # document head: title, meta, Open Graph, JSON-LD, @font-face
├── scripts/prerender.mjs   # build step: bake each route to its own index.html + gen sitemap
├── src/
│   ├── App.tsx             # the home page, section by section
│   ├── routes.tsx          # path -> page component (home, /blog/, /blog/<slug>/)
│   ├── prerender.tsx       # SSR entry used by scripts/prerender.mjs
│   ├── index.css           # Tailwind v4 theme tokens + animations
│   ├── components/         # Waveform, EditDemo, Reveal, MagneticButton
│   └── blog/               # posts.tsx (content), BlogIndex, BlogPost, BlogLayout
└── public/                 # favicons, og-image, self-hosted fonts, robots.txt, CNAME
.github/workflows/deploy.yml
```

## Adding a blog post

Add an entry to `react/src/blog/posts.tsx` (slug, title, description, keyword,
dates, an answer-first lead, the body, FAQ, and related slugs). The build
prerenders it to `/blog/<slug>/index.html` with per-page title/canonical/OG and
BlogPosting + BreadcrumbList + FAQPage JSON-LD, and adds it to `sitemap.xml`
automatically. Posts live on this domain (canonical); syndicate to Medium/Dev.to
with their canonical-import so the SEO credit stays here.

## Analytics

The domain is proxied through Cloudflare with Web Analytics in **Automatic**
mode, so traffic is measured at the edge — no client-side script, no cookies,
no consent banner. The site ships zero third-party scripts. View stats in the
Cloudflare dashboard (Analytics → Web Analytics → openwhisp.app).
