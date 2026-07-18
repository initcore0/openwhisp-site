// Post-build step: render every route to its own static index.html so each URL
// is fully indexable and paints before JS loads. Runs after `vite build`
// (client) and `vite build --ssr` (server bundle).
//
//   /                -> dist/index.html            (home; head already authored)
//   /blog/           -> dist/blog/index.html
//   /blog/<slug>/    -> dist/blog/<slug>/index.html
//
// Blog routes get a per-route <head> (title, description, canonical, OG) and
// BlogPosting + BreadcrumbList + FAQPage JSON-LD, built from the post data.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const { render, POSTS, CHANGELOG } = await import(new URL("../dist-ssr/prerender.js", import.meta.url));

const SITE = "https://openwhisp.app";
const OG = `${SITE}/og-image.png`;
const marker = '<div id="root"></div>';
const template = readFileSync(`${root}dist/index.html`, "utf8");
if (!template.includes(marker)) throw new Error("prerender: root marker not found in dist/index.html");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Rewrite the shared head for a route and optionally inject extra JSON-LD.
function headFor({ title, description, canonical, jsonld, article }) {
  let h = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${esc(canonical)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${esc(canonical)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(description)}$2`);
  if (article) {
    h = h.replace('<meta property="og:type" content="website" />', '<meta property="og:type" content="article" />');
    h = h.replace(
      "</head>",
      `<meta property="article:published_time" content="${esc(article.published)}" />\n` +
        `<meta property="article:modified_time" content="${esc(article.modified)}" />\n</head>`,
    );
  }
  if (jsonld) {
    h = h.replace("</head>", `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>\n</head>`);
  }
  return h;
}

function writePage(relPath, html) {
  const outDir = relPath === "/" ? `${root}dist` : `${root}dist${relPath}`.replace(/\/$/, "");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/index.html`, html);
}

// Home — keep its hand-authored head, just inject the rendered app.
writeFileSync(`${root}dist/index.html`, template.replace(marker, `<div id="root">${render("/")}</div>`));
console.log("prerender: /");

// Blog index.
writePage(
  "/blog/",
  headFor({
    title: "OpenWhisp blog — local, private dictation guides",
    description:
      "Guides and honest comparisons on dictating and editing text by voice on a Mac — on-device, private, and free.",
    canonical: `${SITE}/blog/`,
  }).replace(marker, `<div id="root">${render("/blog/")}</div>`),
);
console.log("prerender: /blog/");

// Changelog — rendered from the vendored changelog.json (single source).
{
  const latest = CHANGELOG.releases[0];
  const canonical = `${SITE}/changelog/`;
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#changelog`,
    name: "OpenWhisp changelog",
    description: "What's shipped in OpenWhisp — new features, fixes, and improvements, newest first.",
    url: canonical,
    dateModified: CHANGELOG.generated,
    isPartOf: { "@type": "WebSite", name: "OpenWhisp", url: `${SITE}/` },
  };
  writePage(
    "/changelog/",
    headFor({
      title: "OpenWhisp changelog — what's shipped",
      description: latest
        ? `${latest.title}: ${latest.summary}`
        : "What's shipped in OpenWhisp — new features, fixes, and improvements, newest first.",
      canonical,
      jsonld,
    }).replace(marker, `<div id="root">${render("/changelog/")}</div>`),
  );
  console.log("prerender: /changelog/");
}

// Posts.
for (const p of POSTS) {
  const canonical = `${SITE}/blog/${p.slug}/`;
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        headline: p.title,
        description: p.description,
        datePublished: p.datePublished,
        dateModified: p.dateModified,
        url: canonical,
        image: OG,
        author: { "@type": "Organization", name: "OpenWhisp", url: SITE },
        publisher: { "@type": "Organization", name: "OpenWhisp", url: SITE },
        mainEntityOfPage: canonical,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog/` },
          { "@type": "ListItem", position: 3, name: p.title, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: p.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  writePage(
    `/blog/${p.slug}/`,
    headFor({
      title: p.title,
      description: p.description,
      canonical,
      jsonld,
      article: { published: p.datePublished, modified: p.dateModified },
    }).replace(
      marker,
      `<div id="root">${render(`/blog/${p.slug}/`)}</div>`,
    ),
  );
  console.log(`prerender: /blog/${p.slug}/`);
}

// Regenerate sitemap.xml from the real route list (home + blog + every post).
const changelogDate = (CHANGELOG.generated || "").slice(0, 10);
const latestPostDate = POSTS.map((p) => p.dateModified).sort().at(-1);
const routes = [
  { path: "/", lastmod: [changelogDate, latestPostDate].sort().at(-1) },
  { path: "/changelog/", lastmod: changelogDate },
  { path: "/blog/", lastmod: latestPostDate },
  ...POSTS.map((p) => ({ path: `/blog/${p.slug}/`, lastmod: p.dateModified })),
];
const urls = routes
  .map((r) => {
    const lastmod = r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : "";
    return `  <url>\n    <loc>${SITE}${r.path}</loc>${lastmod}\n  </url>`;
  })
  .join("\n");
writeFileSync(
  `${root}dist/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log(`prerender: sitemap.xml (${routes.length} urls)`);

// Atom feed for the blog — one more discovery channel for crawlers and readers.
{
  const posts = [...POSTS].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
  const updated = posts.map((p) => p.dateModified).sort().at(-1);
  const entries = posts
    .map((p) => {
      const url = `${SITE}/blog/${p.slug}/`;
      return [
        "  <entry>",
        `    <title>${esc(p.title)}</title>`,
        `    <link href="${url}"/>`,
        `    <id>${url}</id>`,
        `    <published>${p.datePublished}T00:00:00Z</published>`,
        `    <updated>${p.dateModified}T00:00:00Z</updated>`,
        `    <summary>${esc(p.description)}</summary>`,
        "  </entry>",
      ].join("\n");
    })
    .join("\n");
  writeFileSync(
    `${root}dist/feed.xml`,
    `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>OpenWhisp blog</title>
  <subtitle>Guides and honest comparisons on dictating and editing text by voice on a Mac — on-device, private, and free.</subtitle>
  <link href="${SITE}/feed.xml" rel="self"/>
  <link href="${SITE}/blog/"/>
  <id>${SITE}/blog/</id>
  <updated>${updated}T00:00:00Z</updated>
  <author><name>OpenWhisp</name></author>
${entries}
</feed>
`,
  );
  console.log(`prerender: feed.xml (${posts.length} entries)`);
}

rmSync(`${root}dist-ssr`, { recursive: true, force: true });
console.log("prerender: done");
