# OpenWhisp — marketing site

The landing page for [OpenWhisp](https://github.com/initcore0/openwhisp), a local-first
dictation app for macOS. Static HTML/CSS/JS, no build step.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Served via GitHub Pages from the root of `main`. Before going live, replace the
`PLACEHOLDER_SITE_URL` token (in `index.html`, `sitemap.xml`, `robots.txt`) with the
final site URL, then enable Pages under **Settings → Pages → Branch: main / root**.

## Files

- `index.html` — the page (content + Open Graph / Twitter / JSON-LD metadata)
- `styles.css` — "Quiet Glass" design tokens + layout
- `hero.js` — the signature waveform→text animation (reduced-motion aware)
- `og-image.png` — 1200×630 social card
- `favicon-*.png`, `apple-touch-icon.png` — icons (from the app's own icon)
- `robots.txt`, `sitemap.xml`, `.nojekyll`
