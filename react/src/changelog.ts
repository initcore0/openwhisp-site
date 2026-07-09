// Typed access to the vendored changelog (src/data/changelog.json), which is
// snapshotted from the app repo by scripts/fetch-changelog.mjs. The JSON is the
// single source of truth — see initcore0/openwhisp docs/changelog/README.md.
import raw from "./data/changelog.json";

export type ChangelogCategory = "feature" | "fix" | "improvement";

// Whether the feature is usable in the shipping app TODAY. This is a truth
// contract, not a marketing label (see the app repo's changelog README): most
// core-first features ship their tested engine as "coming-soon" before the
// Settings/UI wiring lands, and the `note` says what's still pending.
export type Availability = "live" | "coming-soon";

// Optional per-feature how-to guide: teaches the feature (steps / spoken
// phrases), not just announces it. Revealed on click in the UI.
export type HowTo = {
  availability: Availability;
  summary: string; // one line: how you use it
  steps?: string[]; // ordered how-to
  say?: string[]; // spoken phrases, if any
  note?: string; // caveat — e.g. what's still landing / a manual workaround
};

export type ChangelogEntry = {
  category: ChangelogCategory;
  headline: string;
  body: string;
  tickets?: string[]; // Linear IDs, e.g. "MAK-35"
  prs?: number[]; // merged GitHub PR numbers
  howTo?: HowTo; // usually only on features
};

export type ChangelogRelease = {
  id: string; // stable slug, e.g. "2026-07"
  title: string; // e.g. "July 2026"
  date: string; // ISO
  summary: string;
  stats?: {
    changesShipped?: number;
    newFeatures?: number;
    testsPassing?: number;
    onDevicePercent?: number;
  };
  entries: ChangelogEntry[];
};

export type Changelog = {
  project: string;
  generated: string; // ISO
  releases: ChangelogRelease[]; // newest first
};

export const CHANGELOG = raw as Changelog;

// Where the "receipts" point. The app repo is public; PRs link to GitHub, and
// Linear ticket IDs link to the public Linear issue.
export const REPO = "https://github.com/initcore0/openwhisp";
export const prUrl = (n: number) => `${REPO}/pull/${n}`;
export const ticketUrl = (id: string) => `https://linear.app/issue/${id}`;

// Section metadata: order + plural heading per category.
export const SECTIONS: { key: ChangelogCategory; heading: string }[] = [
  { key: "feature", heading: "New features" },
  { key: "fix", heading: "Fixes" },
  { key: "improvement", heading: "Improvements" },
];

// Human label for the availability pill (matches the reference render's wording).
export const AVAILABILITY_LABEL: Record<Availability, string> = {
  live: "Available now",
  "coming-soon": "Landing next",
};
