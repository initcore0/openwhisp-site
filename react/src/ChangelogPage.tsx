import { BlogLayout } from "./blog/BlogLayout";
import { formatDate } from "./blog/BlogIndex";
import {
  CHANGELOG,
  SECTIONS,
  prUrl,
  AVAILABILITY_LABEL,
  type ChangelogRelease,
  type ChangelogCategory,
  type ChangelogEntry,
  type HowTo,
} from "./changelog";
import { Sparkle, Wrench, ArrowsClockwise, CaretRight } from "@phosphor-icons/react";

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
          Everything that&rsquo;s landed in OpenWhisp, newest first. Expand a feature for a short how-to &mdash;
          the steps, the exact phrases to say, and whether it&rsquo;s usable today. Every change traces to a
          public issue and a reviewed pull request you can read, run, and fork.
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
                  <Entry key={e.headline} entry={e} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// An entry is a plain card, unless it carries a how-to guide — then it becomes
// a native <details> (no JS, keyboard-accessible) that expands to the guide.
function Entry({ entry }: { entry: ChangelogEntry }) {
  const { headline, body, tickets, prs, howTo } = entry;

  if (!howTo) {
    return (
      <li className="rounded-2xl border border-line bg-ink-2 p-5">
        <h4 className="font-display text-[17px] font-semibold text-listen">{headline}</h4>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted-d">{body}</p>
        <Receipts tickets={tickets} prs={prs} />
      </li>
    );
  }

  return (
    <li>
      <details className="group rounded-2xl border border-line bg-ink-2 p-5 transition-colors open:border-speak/30 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer list-none flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div>
            <h4 className="font-display text-[17px] font-semibold text-listen">{headline}</h4>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted-d">{body}</p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-2.5 sm:items-end">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-speak">
              How to use
              <CaretRight
                weight="bold"
                className="h-3.5 w-3.5 transition-transform duration-200 group-open:rotate-90"
              />
            </span>
            <Receipts tickets={tickets} prs={prs} />
          </div>
        </summary>
        <Guide howTo={howTo} />
      </details>
    </li>
  );
}

function Guide({ howTo }: { howTo: HowTo }) {
  const soon = howTo.availability === "coming-soon";
  return (
    <div className="mt-5 border-t border-line pt-5">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] ${
            soon
              ? "border-refine/40 bg-refine/[0.08] text-refine"
              : "border-speak/40 bg-speak/[0.08] text-speak"
          }`}
        >
          <span className="h-[7px] w-[7px] rounded-full bg-current" />
          {AVAILABILITY_LABEL[howTo.availability]}
        </span>
        <p className="text-[15px] leading-relaxed text-text-d">{howTo.summary}</p>
      </div>

      {howTo.steps && howTo.steps.length > 0 && (
        <ol className="mt-4 grid list-decimal gap-2 pl-5 text-[14.5px] leading-relaxed text-muted-d marker:font-mono marker:text-speak">
          {howTo.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      )}

      {howTo.say && howTo.say.length > 0 && (
        <div className="mt-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-d">Say</p>
          <ul className="mt-2 grid gap-1.5">
            {howTo.say.map((s, i) => (
              <li key={i} className="text-[14.5px] leading-relaxed text-text-d">
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {howTo.note && (
        <p
          className={`mt-4 rounded-xl border p-3.5 text-[13.5px] leading-relaxed ${
            soon ? "border-refine/25 bg-refine/[0.05] text-muted-d" : "border-line bg-ink text-muted-d"
          }`}
        >
          {howTo.note}
        </p>
      )}
    </div>
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
