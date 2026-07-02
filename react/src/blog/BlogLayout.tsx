import type { ReactNode } from "react";
import { GithubLogo, Heart } from "@phosphor-icons/react";

const REPO = "https://github.com/initcore0/openwhisp";
const DONATE = "https://buymeacoffee.com/initcore0";

function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="currentColor">
      <rect x="5" y="17" width="3" height="6" rx="1.5" />
      <rect x="11" y="13" width="3" height="14" rx="1.5" />
      <rect x="17" y="8" width="3" height="24" rx="1.5" />
      <rect x="23" y="11" width="3" height="18" rx="1.5" />
      <rect x="29" y="15" width="3" height="10" rx="1.5" />
      <rect x="35" y="18" width="2.5" height="4" rx="1.25" />
    </svg>
  );
}

/** Shared chrome for blog pages: sticky nav + footer, matching the home page. */
export function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md backdrop-saturate-150">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6">
          <a href="/" className="flex items-center gap-2.5 text-listen" aria-label="OpenWhisp home">
            <BrandMark className="h-6 w-6 text-speak" />
            <span className="font-display text-lg font-semibold tracking-tight">OpenWhisp</span>
          </a>
          <nav className="flex items-center gap-7 text-sm font-medium text-muted-d" aria-label="Primary">
            <a className="transition-colors hover:text-listen" href="/#features">Features</a>
            <a className="transition-colors hover:text-listen" href="/blog/">Blog</a>
            <a className="transition-colors hover:text-listen" href={REPO} rel="noopener">GitHub</a>
            <a
              className="group inline-flex items-center gap-1.5 text-refine/80 transition-colors hover:text-refine"
              href={DONATE}
              rel="noopener"
            >
              <Heart weight="fill" className="h-4 w-4 transition-transform group-hover:scale-110" />
              Support
            </a>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-line py-10">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-8 gap-y-4 px-6">
          <div className="flex items-center gap-2.5 font-display font-semibold text-listen">
            <BrandMark className="h-5 w-5 text-speak" />
            OpenWhisp
          </div>
          <nav className="flex gap-6 text-sm text-muted-d" aria-label="Footer">
            <a className="hover:text-listen" href="/">Home</a>
            <a className="hover:text-listen" href="/blog/">Blog</a>
            <a className="hover:text-listen" href={REPO} rel="noopener">GitHub</a>
            <a className="inline-flex items-center gap-1.5 hover:text-refine" href={DONATE} rel="noopener">
              <GithubLogo className="hidden" />Support
            </a>
          </nav>
          <p className="ml-auto text-[13px] text-muted-d">Free &amp; open source &middot; MIT licensed.</p>
        </div>
      </footer>
    </>
  );
}
