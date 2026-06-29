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

The base path defaults to `/openwhisp-site/` (the GitHub Pages project path). Override it
with `VITE_BASE` — e.g. `VITE_BASE=/ bun run build` for a custom domain at the root.

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds `react/` and publishes
`react/dist/` to GitHub Pages. Pages must be set to the **GitHub Actions** source
(Settings → Pages → Build and deployment → Source).

## Structure

```
react/
├── index.html              # document head: title, meta, Open Graph, JSON-LD
├── src/
│   ├── App.tsx             # the page, section by section
│   ├── index.css           # Tailwind v4 theme tokens + animations
│   └── components/         # Waveform, EditDemo, Reveal, MagneticButton
└── public/                 # favicons, og-image, robots.txt, sitemap.xml, .nojekyll
.github/workflows/deploy.yml
```
