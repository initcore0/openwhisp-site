// Typed access to the vendored changelog (src/data/changelog.json), which is
// snapshotted from the app repo by scripts/fetch-changelog.mjs. The JSON is the
// single source of truth — see initcore0/openwhisp docs/changelog/README.md.
import raw from "./data/changelog.json";

export type ChangelogCategory = "feature" | "fix" | "improvement";

export type ChangelogEntry = {
  category: ChangelogCategory;
  headline: string;
  body: string;
  tickets?: string[]; // Linear IDs, e.g. "MAK-35"
  prs?: number[]; // merged GitHub PR numbers
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
