import { BlogLayout } from "./BlogLayout";
import { POSTS } from "./posts";
import { ArrowRight } from "@phosphor-icons/react";

/** The /blog index: lists every post, newest first. */
export function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
  return (
    <BlogLayout>
      <div className="mx-auto max-w-[760px] px-6 py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-speak">OpenWhisp blog</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-listen md:text-[2.5rem]">
          Local, private dictation — guides &amp; comparisons
        </h1>
        <p className="mt-4 leading-relaxed text-muted-d">
          Honest write-ups on dictating and editing text by voice on a Mac, keeping it on-device, and how OpenWhisp
          compares to the alternatives.
        </p>

        <ul className="mt-12 grid gap-4">
          {posts.map((p) => (
            <li key={p.slug}>
              <a
                href={`/blog/${p.slug}/`}
                className="group block rounded-2xl border border-line bg-ink-2 p-6 transition-colors hover:border-muted-d"
              >
                <div className="flex items-center gap-3 font-mono text-xs text-muted-d">
                  <time dateTime={p.datePublished}>{formatDate(p.datePublished)}</time>
                  <span className="text-line">|</span>
                  <span>{p.readingTime}</span>
                </div>
                <h2 className="mt-2 font-display text-xl font-semibold text-listen">{p.title}</h2>
                <p className="mt-2 leading-relaxed text-muted-d">{p.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-speak">
                  Read <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </BlogLayout>
  );
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${months[m - 1]} ${d}, ${y}`;
}
