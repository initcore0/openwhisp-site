import { useState, type ReactNode } from "react";
import { GithubLogo, Heart, List, X, DownloadSimple } from "@phosphor-icons/react";

const REPO = "https://github.com/initcore0/openwhisp";
const DONATE = "https://buymeacoffee.com/initcore0";
const DMG = `${REPO}/releases/latest/download/OpenWhisp.dmg`;

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
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md backdrop-saturate-150">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6">
          <a href="/" className="flex items-center gap-2.5 text-listen" aria-label="OpenWhisp home">
            <BrandMark className="h-6 w-6 text-speak" />
            <span className="font-display text-lg font-semibold tracking-tight">OpenWhisp</span>
          </a>
          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-d md:flex" aria-label="Primary">
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
          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="blog-mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="-mr-1 inline-flex h-10 w-10 items-center justify-center rounded-lg text-listen transition-colors hover:bg-ink-2 md:hidden"
          >
            {menuOpen ? <X weight="bold" className="h-5 w-5" /> : <List weight="bold" className="h-5 w-5" />}
          </button>
        </div>
        {/* Mobile menu panel */}
        <div id="blog-mobile-menu" className={`border-t border-line md:hidden ${menuOpen ? "block" : "hidden"}`}>
          <nav className="mx-auto flex max-w-[1180px] flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {[
              { href: "/#features", label: "Features" },
              { href: "/blog/", label: "Blog" },
              { href: REPO, label: "GitHub", external: true },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                rel={item.external ? "noopener" : undefined}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 font-display text-[15px] font-medium text-text-d transition-colors hover:bg-ink-2 hover:text-listen"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 grid gap-2.5 border-t border-line pt-4">
              <a
                href={DMG}
                rel="noopener"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-speak px-4 py-3 font-display text-[15px] font-semibold text-[#04181a]"
              >
                <DownloadSimple weight="bold" className="h-4 w-4" /> Download for macOS
              </a>
              <a
                href={DONATE}
                rel="noopener"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-refine/40 px-4 py-3 font-display text-[15px] font-semibold text-refine transition-colors hover:bg-refine/10"
              >
                <Heart weight="fill" className="h-4 w-4" /> Support
              </a>
            </div>
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
