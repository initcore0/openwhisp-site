import type { ReactNode } from "react";

/**
 * Blog content model. Each post is authored as structured React content so it
 * shares the site's design system and gets prerendered to static HTML per URL.
 * `answer` is the lead paragraph — kept short and extractable (the first 40–80
 * words search/AI engines quote). `faq` feeds FAQPage JSON-LD.
 */
export type FaqItem = { q: string; a: string };

export type Post = {
  slug: string;
  title: string; // <title> / H1
  description: string; // meta description (~150 chars)
  keyword: string; // primary target keyword (internal note)
  datePublished: string; // ISO
  dateModified: string; // ISO
  readingTime: string;
  answer: string; // lead answer paragraph, plain text
  body: ReactNode; // the article body
  faq: FaqItem[];
  related: string[]; // slugs of sibling posts to interlink
};

const REPO = "https://github.com/initcore0/openwhisp";

// Small helpers so post bodies stay readable.
function P({ children }: { children: ReactNode }) {
  return <p className="mt-5 leading-relaxed text-text-d">{children}</p>;
}
function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight text-listen md:text-3xl">{children}</h2>;
}
function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} rel="noopener" className="border-b border-speak/40 text-speak transition-colors hover:border-speak">
      {children}
    </a>
  );
}
function UL({ children }: { children: ReactNode }) {
  return <ul className="mt-5 grid list-disc gap-2 pl-5 leading-relaxed text-text-d marker:text-speak">{children}</ul>;
}

export const POSTS: Post[] = [
  {
    slug: "wispr-flow-alternative",
    title: "OpenWhisp: a free, local Wispr Flow alternative for Mac",
    description:
      "Looking for a Wispr Flow alternative? OpenWhisp is a free, open-source Mac dictation app that runs entirely on-device — no subscription, no cloud.",
    keyword: "wispr flow alternative",
    datePublished: "2026-07-02",
    dateModified: "2026-07-02",
    readingTime: "5 min read",
    answer:
      "The best free Wispr Flow alternative for Mac is OpenWhisp: it does the same hold-to-talk dictation into any app, but runs 100% on-device, costs nothing, and is open source. Where Wispr Flow is cloud-based and $15/month, OpenWhisp keeps your audio on your Mac and never charges a subscription.",
    body: (
      <>
        <P>
          <A href="https://wisprflow.ai/">Wispr Flow</A> popularized fast, modern dictation on the Mac — hold a key,
          talk, and clean text appears in whatever app you&rsquo;re in. The friction points people hit are its price
          (<strong>$15/month</strong>), its cloud-first design (your speech is processed on their servers), and a free
          tier capped at 2,000 words a week. If any of those bother you, here&rsquo;s the honest comparison.
        </P>

        <H2>OpenWhisp vs Wispr Flow at a glance</H2>
        <UL>
          <li><strong>Price:</strong> OpenWhisp is free and open source (MIT). Wispr Flow is $15/month.</li>
          <li><strong>Where it runs:</strong> OpenWhisp transcribes on-device with Whisper models; Wispr Flow is cloud-based.</li>
          <li><strong>Privacy:</strong> With OpenWhisp your audio never leaves the Mac (unless you opt into a cloud model). Wispr Flow sends audio to its servers.</li>
          <li><strong>Platforms:</strong> Wispr Flow is cross-platform. OpenWhisp is Mac and Apple Silicon only.</li>
          <li><strong>Extras:</strong> OpenWhisp adds voice editing of selected text, offline AI cleanup, custom vocabulary, and per-app modes.</li>
        </UL>

        <H2>Where Wispr Flow is still the better pick</H2>
        <P>
          To keep this fair: if you work across Windows, iPhone, and Mac and want one polished tool that syncs
          everywhere, Wispr Flow&rsquo;s cross-platform coverage and cloud accuracy are genuinely strong. OpenWhisp is
          Mac-only by design — that&rsquo;s the trade for running entirely on your own hardware.
        </P>

        <H2>Where OpenWhisp wins</H2>
        <P>
          If you&rsquo;re on a Mac and you care about privacy or hate subscriptions, OpenWhisp is the clearer choice.
          Transcription runs locally, so it works offline and nothing is uploaded. It&rsquo;s free forever because the
          compute is your own machine. And because it&rsquo;s open source, you can read exactly what it does — or change
          it. It also goes a step beyond dictation: you can{" "}
          <A href="/blog/edit-text-by-voice-mac/">select text in any app and edit it by voice</A>, and run an{" "}
          AI cleanup pass on a small model that lives on your own disk.
        </P>

        <H2>Getting started</H2>
        <P>
          OpenWhisp needs an Apple Silicon Mac on macOS 14 or later. Download it from the{" "}
          <A href="https://openwhisp.app/">OpenWhisp site</A> or grab the source on{" "}
          <A href={REPO}>GitHub</A>. The build is currently ad-hoc signed, so on first launch you&rsquo;ll right-click the
          app and choose Open once.
        </P>
      </>
    ),
    faq: [
      {
        q: "Is there a free alternative to Wispr Flow?",
        a: "Yes. OpenWhisp is a free, open-source Mac dictation app that does hold-to-talk dictation into any app, runs entirely on-device, and has no subscription.",
      },
      {
        q: "Does OpenWhisp work offline like a local alternative?",
        a: "Yes. Transcription runs on-device with Whisper models, so OpenWhisp works with no internet connection and your audio never leaves your Mac.",
      },
      {
        q: "What's the catch with a free Wispr Flow alternative?",
        a: "OpenWhisp is Mac and Apple-Silicon only, and the downloadable build is ad-hoc signed so macOS warns on first launch. It has fewer cross-platform features than a paid cloud app.",
      },
    ],
    related: ["edit-text-by-voice-mac"],
  },

  {
    slug: "edit-text-by-voice-mac",
    title: "How to edit text by voice on a Mac (not just dictate)",
    description:
      "Most dictation apps only type new text. OpenWhisp lets you select text in any Mac app, double-tap, and rewrite it by voice — edited in place, on-device.",
    keyword: "edit text by voice",
    datePublished: "2026-07-02",
    dateModified: "2026-07-02",
    readingTime: "4 min read",
    answer:
      "To edit text by voice on a Mac, select the text in any app, double-tap OpenWhisp's hotkey, and speak an instruction like “make this more formal.” The selection is rewritten in place by an AI model — no retyping, no copy-paste. Unlike ordinary dictation, this edits text that already exists.",
    body: (
      <>
        <P>
          Dictation apps are good at one thing: turning speech into new text. But a lot of writing is{" "}
          <em>editing</em> — tightening a sentence, making an email more polite, translating a paragraph. OpenWhisp
          adds a feature most Mac dictation tools don&rsquo;t have: voice editing of text you&rsquo;ve already selected.
        </P>

        <H2>How it works</H2>
        <UL>
          <li>Highlight some text in any app.</li>
          <li>Double-tap your OpenWhisp hotkey (no dictation needed).</li>
          <li>Say what you want changed: &ldquo;make it more formal,&rdquo; &ldquo;translate to Russian,&rdquo; &ldquo;tighten this up.&rdquo;</li>
          <li>The selection is replaced in place with the rewrite.</li>
        </UL>

        <H2>It stays private</H2>
        <P>
          The selected text is read through the macOS Accessibility API, so your clipboard is left untouched, and secure
          or password fields are never read. The rewrite can run on the{" "}
          <A href="https://openwhisp.app/#models">built-in offline model</A> that lives on your own disk, so the text
          never leaves your Mac — or on your own server, or OpenAI if you prefer.
        </P>

        <H2>Why it beats copy-paste-into-a-chatbot</H2>
        <P>
          The usual workflow — copy text, switch to a chatbot, paste, read the result, copy it back — breaks your focus
          and touches the cloud. Editing in place keeps you in the document and, with the local model, keeps everything
          on your machine. It pairs naturally with{" "}
          <A href="/blog/wispr-flow-alternative/">everyday dictation</A>: talk to write, double-tap to revise.
        </P>

        <H2>Try it</H2>
        <P>
          Voice editing ships in OpenWhisp, a free, open-source dictation app for Apple Silicon Macs. Get it from the{" "}
          <A href="https://openwhisp.app/">OpenWhisp site</A> or <A href={REPO}>GitHub</A>.
        </P>
      </>
    ),
    faq: [
      {
        q: "Can I edit existing text by voice on a Mac?",
        a: "Yes. OpenWhisp lets you select text in any app, double-tap its hotkey, and speak an instruction; the selected text is rewritten in place by an AI model.",
      },
      {
        q: "Does voice editing send my text to the cloud?",
        a: "Not unless you choose to. OpenWhisp can run the rewrite on a built-in offline model on your own Mac, on your own server, or on OpenAI — your choice.",
      },
      {
        q: "Is my clipboard affected when I edit text by voice?",
        a: "No. The selection is read via the macOS Accessibility API, so your clipboard is left untouched, and secure or password fields are never read.",
      },
    ],
    related: ["wispr-flow-alternative"],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
