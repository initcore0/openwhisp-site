// Pull the canonical changelog from the app repo and vendor it into the site.
//
// The source of truth is docs/changelog/changelog.json in initcore0/openwhisp
// (see that repo's docs/changelog/README.md — "the public site consumes
// changelog.json"). We snapshot it into src/data/changelog.json so the build
// itself stays offline and deterministic; run this to refresh the snapshot.
//
//   bun scripts/fetch-changelog.mjs      # refresh from main
//
// On any network/parse failure it keeps the existing committed copy rather
// than writing a broken file — the site still builds with the last-good data.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SRC =
  "https://raw.githubusercontent.com/initcore0/openwhisp/main/docs/changelog/changelog.json";
const dest = fileURLToPath(new URL("../src/data/changelog.json", import.meta.url));

function validate(d) {
  if (!d || typeof d !== "object") throw new Error("not an object");
  if (!Array.isArray(d.releases) || d.releases.length === 0) throw new Error("no releases[]");
  for (const r of d.releases) {
    if (!r.id || !r.title || !Array.isArray(r.entries)) throw new Error(`bad release ${r.id}`);
  }
  return d;
}

try {
  const res = await fetch(SRC);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = validate(await res.json());
  const current = (() => {
    try {
      return readFileSync(dest, "utf8");
    } catch {
      return "";
    }
  })();
  const next = JSON.stringify(data, null, 2) + "\n";
  if (next === current) {
    console.log(`changelog: up to date (${data.releases.length} release(s), generated ${data.generated})`);
  } else {
    writeFileSync(dest, next);
    console.log(`changelog: updated (${data.releases.length} release(s), generated ${data.generated})`);
  }
} catch (err) {
  console.warn(`changelog: fetch failed (${err.message}) — keeping committed snapshot`);
  // Non-fatal: the build proceeds with the last-good vendored copy.
}
