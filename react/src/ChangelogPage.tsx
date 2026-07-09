import { BlogLayout } from "./blog/BlogLayout";
import { formatDate } from "./blog/BlogIndex";
import {
  CHANGELOG,
  SECTIONS,
  prUrl,
  type ChangelogRelease,
  type ChangelogCategory,
} from "./changelog";
import { Sparkle, Wrench, ArrowsClockwise } from "@phosphor-icons/react";

const CATEGORY_ICON: Record<ChangelogCategory, React.ReactNode> = {
  feature: <Sparkle weight="duotone" className="h-4 w-4" />,
  fix: <Wrench weight="duotone" className="h-4 w-4" />,
  improvement: <ArrowsClockwise weight="duotone" className="h-4 w-4" />,
};

/** Public changelog rendered from the vendored changelog.json (single source). */
export function ChangelogPage() {
  return (
    <BlogLayout>
      <div className="mx-auto max-w-[820px] px-6 py-14 md:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-speak">Changelog</p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-listen md:text-[2.6rem]">
          What&rsquo;s shipped
        </h1>
        <p className="mt-4 max-w-[60ch] leading-relaxed text-muted-d">
          Everything that&rsquo;s landed in OpenWhisp, newest first. Every change traces to a public issue and
          a reviewed pull request you can read, run, and fork &mdash; the receipts are part of the point.
        </p>

        <div className="mt-14 grid gap-16">
          {CHANGELOG.releases.map((r) => (
            <Release key={r.id} release={r} />
          ))}
        </div>
      </div>
    </BlogLayout>
  );
}

function Release({ release }: { release: ChangelogRelease }) {
  const stats = release.stats ?? {};
  const statItems = [
    stats.changesShipped != null && { n: `${stats.changesShipped}`, label: "changes shipped" },
    stats.newFeatures != null && { n: `${stats.newFeatures}`, label: "new features" },
    stats.testsPassing != null && { n: `${stats.testsPassing}`, label: "tests passing" },
    stats.onDevicePercent != null && { n: `${stats.onDevicePercent}%`, label: "on-device" },
  ].filter(Boolean) as { n: string; label: string }[];

  return (
    <section id={release.id} className="scroll-mt-24">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-listen md:text-3xl">
          {release.title}
        </h2>
        <time dateTime={release.date} className="font-mono text-xs text-muted-d">
          {formatDate(release.date)}
        </time>
      </div>
      <p className="mt-3 max-w-[64ch] leading-relaxed text-text-d">{release.summary}</p>

      {statItems.length > 0 && (
        <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {statItems.map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-ink-2 p-4">
              <dt className="font-display text-2xl font-semibold text-speak">{s.n}</dt>
              <dd className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-d">{s.label}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-10 grid gap-10">
        {SECTIONS.map(({ key, heading }) => {
          const entries = release.entries.filter((e) => e.category === key);
          if (entries.length === 0) return null;
          return (
            <div key={key}>
              <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-speak">
                {CATEGORY_ICON[key]}
                {heading}
              </h3>
              <ul className="mt-5 grid gap-4">
                {entries.map((e) => (
                  <li key={e.headline} className="rounded-2xl border border-line bg-ink-2 p-5">
                    <h4 className="font-display text-[17px] font-semibold text-listen">{e.headline}</h4>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-d">{e.body}</p>
                    <Receipts tickets={e.tickets} prs={e.prs} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Receipts({ tickets, prs }: { tickets?: string[]; prs?: number[] }) {
  if ((!tickets || tickets.length === 0) && (!prs || prs.length === 0)) return null;
  return (
    <div className="mt-3.5 flex flex-wrap gap-2">
      {/* Linear ticket IDs are shown as static receipts — the workspace is
          private, so a link would just wall visitors at a login. PRs are public
          and readable, so those link out to GitHub. */}
      {tickets?.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
      {prs?.map((n) => (
        <Tag key={n} href={prUrl(n)}>
          PR #{n}
        </Tag>
      ))}
    </div>
  );
}

const TAG_BASE = "rounded-md border border-line bg-ink px-2 py-0.5 font-mono text-[11px] text-muted-d";

function Tag({ href, children }: { href?: string; children: React.ReactNode }) {
  if (!href) return <span className={TAG_BASE}>{children}</span>;
  return (
    <a
      href={href}
      rel="noopener"
      className={`${TAG_BASE} transition-colors hover:border-speak/50 hover:text-speak`}
    >
      {children}
    </a>
  );
}
