import { BlogLayout } from "./BlogLayout";
import { formatDate } from "./BlogIndex";
import { getPost, POSTS, type Post } from "./posts";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

export function BlogPost({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) return null;
  const related = post.related.map(getPost).filter(Boolean) as Post[];

  return (
    <BlogLayout>
      <article className="mx-auto max-w-[720px] px-6 py-14 md:py-20">
        <a href="/blog/" className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-d hover:text-listen">
          <ArrowLeft weight="bold" className="h-3.5 w-3.5" /> All posts
        </a>

        <div className="mt-6 flex items-center gap-3 font-mono text-xs text-muted-d">
          <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
          <span className="text-line">|</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-listen md:text-[2.6rem]">
          {post.title}
        </h1>

        {/* Answer-first lead: the extractable summary engines quote. */}
        <p className="mt-6 rounded-2xl border border-speak/25 bg-speak/[0.05] p-5 text-[17px] leading-relaxed text-text-d">
          {post.answer}
        </p>

        <div className="prose-body">{post.body}</div>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-listen">Frequently asked questions</h2>
          <dl className="mt-6 grid gap-5">
            {post.faq.map((f) => (
              <div key={f.q} className="rounded-2xl border border-line bg-ink-2 p-5">
                <dt className="font-display text-[17px] font-semibold text-listen">{f.q}</dt>
                <dd className="mt-2 leading-relaxed text-muted-d">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-speak/25 bg-speak/[0.05] p-7 text-center">
          <p className="font-display text-xl font-semibold text-listen">Try OpenWhisp</p>
          <p className="mx-auto mt-2 max-w-[46ch] text-[15px] leading-relaxed text-muted-d">
            Free, open source, and 100% on-device dictation for Apple Silicon Macs.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/initcore0/openwhisp/releases/latest/download/OpenWhisp.dmg"
              className="inline-flex items-center justify-center rounded-[10px] bg-speak px-5 py-2.5 font-display text-sm font-semibold text-[#04181a] transition-all hover:shadow-[0_0_24px_-2px_color-mix(in_srgb,var(--color-speak)_55%,transparent)] active:scale-[0.98]"
            >
              Download for macOS
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-[10px] border border-line px-5 py-2.5 font-display text-sm font-semibold text-text-d transition-all hover:border-muted-d hover:bg-ink-2"
            >
              See all features
            </a>
          </div>
        </div>

        {/* Related — the interlinking that builds topical authority */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-lg font-semibold text-listen">Keep reading</h2>
            <ul className="mt-4 grid gap-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <a
                    href={`/blog/${r.slug}/`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-ink-2 p-4 transition-colors hover:border-muted-d"
                  >
                    <span className="font-display text-[15px] font-semibold text-listen">{r.title}</span>
                    <ArrowRight weight="bold" className="h-4 w-4 shrink-0 text-speak transition-transform group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </BlogLayout>
  );
}

export { POSTS };
