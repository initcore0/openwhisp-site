import type { ReactNode } from "react";
import { withBase } from "../base";

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
function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 font-display text-xl font-semibold tracking-tight text-listen">{children}</h3>;
}
// A visually-set-apart callout — used to flag forward-looking/vision content
// so it can't be mistaken for a shipped feature.
function Note({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-refine/30 bg-refine/[0.06] p-5 text-[15px] leading-relaxed text-text-d">
      {children}
    </div>
  );
}
function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={withBase(href)} rel="noopener" className="border-b border-speak/40 text-speak transition-colors hover:border-speak">
      {children}
    </a>
  );
}
function UL({ children }: { children: ReactNode }) {
  return <ul className="mt-5 grid list-disc gap-2 pl-5 leading-relaxed text-text-d marker:text-speak">{children}</ul>;
}
function Pre({ children }: { children: ReactNode }) {
  return (
    <pre className="mt-5 overflow-x-auto rounded-2xl border border-line bg-[#06080c] p-5 font-mono text-[13px] leading-[1.8] text-text-d">
      <code>{children}</code>
    </pre>
  );
}
function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded-md border border-b-2 border-line bg-ink px-1.5 py-0.5 font-mono text-[0.85em] text-text-d">
      {children}
    </kbd>
  );
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
          <li><strong>Where it runs:</strong> OpenWhisp transcribes on-device with WhisperKit on Apple&rsquo;s Neural Engine; Wispr Flow is cloud-based.</li>
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
          <A href={REPO}>GitHub</A>. The download is signed and notarized by Apple, so it opens with a double-click.
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
        a: "Yes. Transcription runs on-device with WhisperKit on Apple's Neural Engine (whisper.cpp is available as a fallback), so OpenWhisp works with no internet connection and your audio never leaves your Mac.",
      },
      {
        q: "What's the catch with a free Wispr Flow alternative?",
        a: "OpenWhisp is Mac and Apple-Silicon only, so there's no Windows, iPhone, or Android version. It also has fewer cross-platform and sync features than a paid cloud app like Wispr Flow.",
      },
    ],
    related: ["superwhisper-alternative", "best-mac-dictation-apps"],
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
    related: ["private-on-device-ai-dictation", "best-mac-dictation-apps"],
  },

  {
    slug: "best-mac-dictation-apps",
    title: "The best local & private dictation apps for Mac (2026)",
    description:
      "A practical guide to Mac dictation apps in 2026 — local vs cloud, free vs paid, and which to pick if privacy or price matters most.",
    keyword: "mac dictation app",
    datePublished: "2026-07-03",
    dateModified: "2026-07-03",
    readingTime: "7 min read",
    answer:
      "The best Mac dictation app depends on what you value. For privacy and price, a local-first, open-source tool like OpenWhisp is the strongest pick — it transcribes on-device and is free. For a polished cross-platform cloud app, Wispr Flow leads; for a paid local app with a lifetime license, Superwhisper is the standout.",
    body: (
      <>
        <P>
          Dictation on the Mac has come a long way from &ldquo;computer, comma, new paragraph.&rdquo; Modern apps let
          you hold a key, talk, and drop clean text into any app. But they split along two lines that matter more than
          any feature list: <strong>local vs cloud</strong>, and <strong>free vs paid</strong>. This guide maps the
          landscape so you can pick fast.
        </P>

        <H2>The two questions that decide it</H2>
        <UL>
          <li>
            <strong>Does your audio leave the Mac?</strong> Cloud apps send your speech to a server; local apps keep it
            on-device. If you dictate anything sensitive &mdash; legal, medical, financial &mdash; local wins by default.
          </li>
          <li>
            <strong>Subscription or one-time?</strong> Cloud apps almost always charge monthly. Local apps can be a
            one-time purchase, or free, because the compute is your own hardware.
          </li>
        </UL>

        <H2>The main options in 2026</H2>
        <P>
          <strong>OpenWhisp</strong> &mdash; free, open source, and 100% on-device. Hold-to-talk into any app, plus{" "}
          <A href="/blog/edit-text-by-voice-mac/">voice editing of selected text</A> and offline AI cleanup. Mac and
          Apple Silicon only. Best if you want privacy and no subscription. See the full{" "}
          <A href="/blog/wispr-flow-alternative/">OpenWhisp vs Wispr Flow</A> and{" "}
          <A href="/blog/superwhisper-alternative/">OpenWhisp vs Superwhisper</A> comparisons.
        </P>
        <P>
          <strong>Wispr Flow</strong> &mdash; cloud-based, polished, cross-platform (Mac, Windows, iPhone), ~$15/month.
          Best if you want one synced tool everywhere and don&rsquo;t mind the subscription or the cloud.
        </P>
        <P>
          <strong>Superwhisper</strong> &mdash; local-first with a lifetime-license option (~$249) or ~$8.49/month.
          Wide model choice and custom modes. Best if you want a powerful local app and prefer paying once. Closed source.
        </P>
        <P>
          <strong>MacWhisper</strong> &mdash; excellent for transcribing <em>files</em> (podcasts, meetings) at a
          one-time price; dictation is secondary. <strong>Apple Dictation</strong> &mdash; free, native, private, but
          minimal: no AI cleanup, custom vocabulary, or per-app behavior.
        </P>

        <H2>How to choose</H2>
        <UL>
          <li><strong>Privacy first, no subscription:</strong> OpenWhisp (free, local, open source).</li>
          <li><strong>One polished app across devices:</strong> Wispr Flow.</li>
          <li><strong>Powerful local app, pay once:</strong> Superwhisper.</li>
          <li><strong>Mostly transcribing recordings:</strong> MacWhisper.</li>
          <li><strong>Occasional, zero-setup dictation:</strong> Apple Dictation.</li>
        </UL>

        <P>
          If privacy is the deciding factor, it&rsquo;s worth understanding what &ldquo;local&rdquo; really means &mdash;
          see <A href="/blog/dictate-on-mac-offline/">how to dictate on a Mac completely offline</A> and{" "}
          <A href="/blog/private-on-device-ai-dictation/">private, on-device AI dictation with no cloud</A>.
        </P>
      </>
    ),
    faq: [
      {
        q: "What is the best dictation app for Mac in 2026?",
        a: "It depends on your priorities. For privacy and price, OpenWhisp (free, open source, on-device) is the strongest pick. For a polished cross-platform cloud app, Wispr Flow leads. For a paid local app with a lifetime license, Superwhisper is the standout.",
      },
      {
        q: "Is there a free dictation app for Mac?",
        a: "Yes. OpenWhisp is free and open source, and Apple's built-in Dictation is free but minimal. Some paid apps also offer limited free tiers.",
      },
      {
        q: "Which Mac dictation apps work fully offline?",
        a: "Local-first apps like OpenWhisp and Superwhisper can transcribe on-device with no internet. Apple Dictation also runs on-device. Cloud apps like Wispr Flow require a connection.",
      },
    ],
    related: ["wispr-flow-alternative", "superwhisper-alternative", "dictate-on-mac-offline"],
  },

  {
    slug: "superwhisper-alternative",
    title: "OpenWhisp vs Superwhisper: a free, open-source alternative",
    description:
      "Comparing OpenWhisp and Superwhisper for Mac dictation — free and open source vs paid and closed, both fully on-device. An honest look.",
    keyword: "superwhisper alternative",
    datePublished: "2026-07-03",
    dateModified: "2026-07-03",
    readingTime: "5 min read",
    answer:
      "OpenWhisp is a free, open-source alternative to Superwhisper. Both run Whisper-class models on-device on a Mac, so both keep your audio private. The difference is cost and openness: OpenWhisp is free and MIT-licensed, while Superwhisper is a paid app (about $8.49/month or a $249 lifetime license) that's closed source.",
    body: (
      <>
        <P>
          Superwhisper is a well-built local dictation app, and it&rsquo;s a fair benchmark. Both it and OpenWhisp
          transcribe on your Mac rather than in the cloud, so on the core privacy question they&rsquo;re similar. Where
          they differ is <strong>price</strong> and <strong>openness</strong>.
        </P>

        <H2>OpenWhisp vs Superwhisper at a glance</H2>
        <UL>
          <li><strong>Price:</strong> OpenWhisp is free. Superwhisper is ~$8.49/month or ~$249 lifetime.</li>
          <li><strong>Source:</strong> OpenWhisp is open source (MIT) &mdash; you can read and change it. Superwhisper is closed.</li>
          <li><strong>On-device:</strong> Both transcribe locally, so both keep audio on your machine.</li>
          <li><strong>Voice editing:</strong> OpenWhisp can <A href="/blog/edit-text-by-voice-mac/">rewrite selected text by voice</A> in place.</li>
          <li><strong>Offline AI cleanup:</strong> OpenWhisp bundles a small on-device model for refinement with no server to run.</li>
        </UL>

        <H2>Where Superwhisper is the better pick</H2>
        <P>
          To be fair: Superwhisper is mature, has a wide model selection and a polished modes system, and offers a
          lifetime license if you dislike subscriptions but are happy to pay once. If you want a commercially supported
          product with lots of built-in configuration, it&rsquo;s a strong choice.
        </P>

        <H2>Where OpenWhisp wins</H2>
        <P>
          OpenWhisp is free and open source, so there&rsquo;s no price and no black box &mdash; you can inspect exactly
          what it does with your audio. It adds voice editing of existing text, and an offline AI cleanup model that
          runs with zero setup. If &ldquo;free, private, and hackable&rdquo; matters more than a commercial feature
          catalog, OpenWhisp is the pick. It&rsquo;s Mac and Apple Silicon only.
        </P>

        <P>
          New to the category? Start with the overview of{" "}
          <A href="/blog/best-mac-dictation-apps/">the best Mac dictation apps</A>.
        </P>
      </>
    ),
    faq: [
      {
        q: "Is there a free alternative to Superwhisper?",
        a: "Yes. OpenWhisp is a free, open-source Mac dictation app that, like Superwhisper, transcribes on-device — but it has no subscription and no purchase price.",
      },
      {
        q: "Is OpenWhisp as private as Superwhisper?",
        a: "Both transcribe locally on your Mac, so audio stays on your machine in both cases. OpenWhisp is additionally open source, so you can verify its behavior directly.",
      },
      {
        q: "Does OpenWhisp have a lifetime license like Superwhisper?",
        a: "OpenWhisp is free and MIT-licensed, so there's nothing to buy — no subscription and no one-time fee.",
      },
    ],
    related: ["wispr-flow-alternative", "best-mac-dictation-apps"],
  },

  {
    slug: "dictate-on-mac-offline",
    title: "How to dictate on a Mac completely offline",
    description:
      "You can dictate on a Mac with no internet at all. Here's how on-device transcription works and how to set up fully offline voice typing.",
    keyword: "offline dictation mac",
    datePublished: "2026-07-03",
    dateModified: "2026-07-03",
    readingTime: "4 min read",
    answer:
      "To dictate on a Mac completely offline, use an app that transcribes on-device instead of in the cloud. Install OpenWhisp, let it download a Whisper model once, and after that you can hold-to-talk and have your speech typed into any app with no internet connection — your audio never leaves the Mac.",
    body: (
      <>
        <P>
          Most dictation apps need a connection because they send your audio to a server to transcribe it. That means no
          signal, no dictation &mdash; and your voice leaving your machine. On-device apps flip that: the speech model
          runs locally, so dictation works on a plane, in a basement, or with Wi-Fi off entirely.
        </P>

        <H2>How offline dictation works</H2>
        <P>
          Apps like OpenWhisp run <A href="https://github.com/argmaxinc/WhisperKit">WhisperKit</A> (Whisper on Apple&rsquo;s
          Neural Engine) directly on your Mac. The model file lives on your disk. Once it&rsquo;s downloaded, transcription
          happens entirely on the device &mdash; no round trip to a server, and nothing to upload.
        </P>

        <H2>Set it up in three steps</H2>
        <UL>
          <li>Download and open OpenWhisp (Apple Silicon Mac, macOS 14+).</li>
          <li>Let it download a speech model on first use &mdash; this one step needs the internet, like installing any app.</li>
          <li>After that, turn Wi-Fi off if you like. Hold your push-to-talk key, speak, release, and the text lands in the focused app.</li>
        </UL>

        <H2>Why bother going offline</H2>
        <UL>
          <li><strong>Privacy:</strong> your audio never leaves the Mac, so there&rsquo;s nothing to intercept or store.</li>
          <li><strong>Reliability:</strong> it works anywhere, with no dependency on a service being up.</li>
          <li><strong>No subscription:</strong> local compute is yours, so tools like OpenWhisp can be free.</li>
        </UL>

        <P>
          Want the AI cleanup pass to be offline too? See{" "}
          <A href="/blog/private-on-device-ai-dictation/">private, on-device AI dictation with no cloud</A>. Comparing
          tools? Here&rsquo;s <A href="/blog/best-mac-dictation-apps/">the best Mac dictation apps</A>.
        </P>
      </>
    ),
    faq: [
      {
        q: "Can you dictate on a Mac without internet?",
        a: "Yes. With an on-device app like OpenWhisp, the speech model runs locally, so after a one-time model download you can dictate with no internet connection at all.",
      },
      {
        q: "Does offline dictation send my voice anywhere?",
        a: "No. On-device transcription processes your audio locally on the Mac; nothing is uploaded, and the recording is deleted after each transcription.",
      },
      {
        q: "Do I need the internet at all for offline dictation?",
        a: "Only once, to download the speech model the first time — the same as installing any app. After that it works fully offline.",
      },
    ],
    related: ["private-on-device-ai-dictation", "best-mac-dictation-apps"],
  },

  {
    slug: "private-on-device-ai-dictation",
    title: "Private, on-device AI dictation with no cloud",
    description:
      "Dictate and refine text with AI that runs entirely on your Mac. No account, no server, no audio or text sent to the cloud — here's how.",
    keyword: "private dictation",
    datePublished: "2026-07-03",
    dateModified: "2026-07-03",
    readingTime: "5 min read",
    answer:
      "Private, on-device AI dictation means both the speech-to-text and the optional AI cleanup run on your own Mac, so nothing is uploaded. OpenWhisp does this: it transcribes with WhisperKit locally and can refine your text with a small AI model that lives on your disk — no account, no server, no cloud.",
    body: (
      <>
        <P>
          &ldquo;AI dictation&rdquo; usually means your voice, and often your text, goes to someone else&rsquo;s
          servers. For anyone handling sensitive material, that&rsquo;s a non-starter. The alternative is dictation where
          <em> every</em> step runs on your own machine &mdash; and in 2026 that&rsquo;s fully practical on a Mac.
        </P>

        <H2>What &ldquo;on-device&rdquo; actually covers</H2>
        <UL>
          <li>
            <strong>Transcription:</strong> the speech-to-text model runs locally (OpenWhisp uses{" "}
            <A href="https://github.com/argmaxinc/WhisperKit">WhisperKit</A> on the Apple Neural Engine), so your audio
            never leaves the Mac.
          </li>
          <li>
            <strong>AI cleanup:</strong> the optional rewrite pass runs on a small open-weights model that OpenWhisp{" "}
            <A href="https://openwhisp.app/#models">downloads to your disk</A> &mdash; no API key, no server, nothing
            uploaded.
          </li>
        </UL>

        <H2>How OpenWhisp keeps it private</H2>
        <UL>
          <li>Audio is recorded locally and the recording is deleted after each transcription.</li>
          <li>The default AI cleanup runs on the built-in on-device model &mdash; text stays on your Mac.</li>
          <li>The only time anything leaves your machine is if you deliberately choose the OpenAI provider instead.</li>
          <li>Selected-text editing reads via the Accessibility API and never touches secure or password fields.</li>
        </UL>

        <H2>Who this is for</H2>
        <P>
          If you work in law, medicine, finance, or just prefer your words to stay yours, on-device AI dictation removes
          the cloud from the equation entirely. It&rsquo;s also free and open source in OpenWhisp&rsquo;s case, so you
          can verify the privacy claims in the code rather than taking them on faith.
        </P>

        <P>
          Related: <A href="/blog/dictate-on-mac-offline/">dictate on a Mac completely offline</A> and{" "}
          <A href="/blog/edit-text-by-voice-mac/">edit text by voice</A>.
        </P>
      </>
    ),
    faq: [
      {
        q: "Can AI dictation run entirely on my Mac?",
        a: "Yes. OpenWhisp transcribes with WhisperKit on-device and can run its AI cleanup on a small model stored on your disk, so both steps happen locally with nothing sent to the cloud.",
      },
      {
        q: "Does private dictation need an account or API key?",
        a: "No. OpenWhisp works with no account and no API key. The optional cloud provider (OpenAI) is the only thing that would need a key, and it's off by default.",
      },
      {
        q: "How do I know my dictation is actually private?",
        a: "OpenWhisp is open source, so you can read exactly how it handles audio and text. Audio is deleted after each transcription and transcripts are never written to log files.",
      },
    ],
    related: ["local-ai-is-enough-for-dictation", "dictate-on-mac-offline", "edit-text-by-voice-mac"],
  },

  {
    slug: "talk-to-claude-code-by-voice",
    title: "Talk to Claude Code by voice: OpenWhisp is now an MCP server",
    description:
      "OpenWhisp's Agent Bridge turns it into a local MCP server: Claude Code, Cursor, and other coding agents can ask you questions by voice — fully on-device.",
    keyword: "claude code voice input",
    datePublished: "2026-07-04",
    dateModified: "2026-07-04",
    readingTime: "6 min read",
    answer:
      "To talk to Claude Code by voice, enable OpenWhisp's Agent Bridge and run one command: openwhisp setup claude-code. It registers OpenWhisp as an MCP server and adds the agent instruction for you. From then on your agent asks questions out loud — the voice overlay opens, you speak, and when you go quiet the transcript returns to the agent. Everything runs on your Mac; no cloud, no API key.",
    body: (
      <>
        <P>
          If you use a coding agent, you know the rhythm: it works for a while, then stops to ask a question —
          &ldquo;deploy to staging or production?&rdquo;, &ldquo;which of these three approaches do you
          prefer?&rdquo; — and you type a paragraph back into a chat box. OpenWhisp&rsquo;s new{" "}
          <strong>Agent Bridge</strong> closes that loop with your voice: the agent asks out loud, you answer
          out loud, and it keeps working. No other dictation app ships this.
        </P>

        <H2>What the Agent Bridge is</H2>
        <P>
          OpenWhisp now doubles as a local{" "}
          <A href="https://modelcontextprotocol.io">Model Context Protocol</A> server — the standard way tools
          plug into agents like Claude Code, Cursor, Hermes, and OpenClaw. Register it once and your agent gets
          three new tools:
        </P>
        <UL>
          <li>
            <strong>openwhisp_dictate</strong> — the agent asks you a question by voice. OpenWhisp&rsquo;s
            overlay opens with the prompt, you speak, and the transcript returns to the agent.
          </li>
          <li>
            <strong>openwhisp_refine</strong> — the agent rewrites text using the same on-device AI model as
            your refine hotkey. No other dictation app exposes this to agents at all.
          </li>
          <li>
            <strong>openwhisp_history</strong> — the agent reads your recent dictations (text, timestamp,
            target app), stored only on your Mac.
          </li>
        </UL>

        <H2>Set it up in one command</H2>
        <P>
          Turn the bridge on in <strong>Settings &rarr; Agent Bridge</strong> (it&rsquo;s off by default —
          nothing listens until you enable it), then let OpenWhisp wire itself up:
        </P>
        <Pre>{`openwhisp setup claude-code`}</Pre>
        <P>
          That does two things: registers OpenWhisp as an MCP server (via{" "}
          <code className="font-mono text-[0.9em] text-speak">claude mcp add</code>), and appends a standing
          instruction to your <code className="font-mono text-[0.9em] text-speak">~/.claude/CLAUDE.md</code>{" "}
          telling the agent to ask questions through{" "}
          <code className="font-mono text-[0.9em] text-speak">openwhisp_dictate</code> instead of plain text.
          The instruction line matters — agents only reach for tools they&rsquo;re told to prefer. Both steps
          are idempotent, so re-running is safe, and{" "}
          <code className="font-mono text-[0.9em] text-speak">--print</code> previews the changes without
          writing anything.
        </P>
        <P>
          <code className="font-mono text-[0.9em] text-speak">openwhisp setup cursor</code> merges the server
          into your project&rsquo;s <code className="font-mono text-[0.9em] text-speak">.cursor/mcp.json</code>{" "}
          without disturbing other servers you have; Hermes and OpenClaw get printed instructions. The first
          time an agent connects, OpenWhisp asks you to approve it — once, always, or only while the app runs.
        </P>

        <H2>Example 1: answer your agent without touching the keyboard</H2>
        <P>
          You ask Claude Code to ship a release. Mid-task it needs a decision, so instead of parking the
          question in the terminal and waiting for you to notice, it calls{" "}
          <code className="font-mono text-[0.9em] text-speak">openwhisp_dictate</code>:
        </P>
        <Pre>{`● openwhisp_dictate("Tests pass. Deploy to staging or production?")
  ↳ the OpenWhisp overlay opens — you say:
    "production, and tag it v1.4"
  ↳ you go quiet — the answer is sent on its own
● Deploying to production, tagging v1.4…`}</Pre>
        <P>
          You were reading a doc in another window; you answered in three seconds without switching apps or
          pressing a single key — when you stop talking, OpenWhisp detects the silence and ends the turn for
          you (a natural pause between words won&rsquo;t cut you off; toggleable in Settings). Prefer an
          explicit finish? <code className="font-mono text-[0.9em] text-speak">openwhisp dictate --stop</code>{" "}
          from any shell sends what was captured, and{" "}
          <code className="font-mono text-[0.9em] text-speak">--cancel</code> discards it. This is the
          difference between an agent that <em>waits for typed input</em> and one you can <em>talk to</em>.
        </P>

        <H2>Example 2: brain-dump a bug report, let the agent file it</H2>
        <P>
          Describing a bug is faster out loud than in prose. Tell your agent &ldquo;ask me about the bug, then
          file a GitHub issue&rdquo; and it will interview you by voice — what happened, how to reproduce it,
          what you expected — then turn your rambling answers into a clean, structured issue. You talk for
          ninety seconds; it writes the report.
        </P>

        <H2>Example 3: your dictation AI, in any shell pipeline</H2>
        <P>
          The bridge also ships an agent-callable CLI, which means the refine step works anywhere you can pipe
          text — no agent required:
        </P>
        <Pre>{`# make the clipboard formal, in place
pbpaste | openwhisp refine -i "make it formal" | pbcopy

# tighten a commit message before you commit
git log -1 --format=%B | openwhisp refine -i "tighten this up"`}</Pre>
        <P>
          The rewrite runs on the same on-device model as OpenWhisp&rsquo;s refine hotkey — your prompts, your
          machine, <A href="/blog/private-on-device-ai-dictation/">nothing sent anywhere</A>.
        </P>

        <H2>Example 4: turn your dictation history into a standup</H2>
        <P>
          Everything you dictate is already in OpenWhisp&rsquo;s local, searchable history. With{" "}
          <code className="font-mono text-[0.9em] text-speak">openwhisp_history</code>, your agent can use it:
          &ldquo;read my dictations from this morning and draft a standup update&rdquo; — and the notes you
          spoke into tickets, commit messages, and chats all day become a summary you didn&rsquo;t have to
          write.
        </P>

        <H2>Built so agents can&rsquo;t go rogue</H2>
        <P>
          Handing agents a microphone and an AI model deserves paranoia, so the bridge is engineered around
          consent:
        </P>
        <UL>
          <li>
            <strong>Off by default.</strong> No socket exists until you enable the bridge in Settings.
          </li>
          <li>
            <strong>You approve every client.</strong> Each agent is approved the first time it connects, and
            you can revoke any of them in Settings.
          </li>
          <li>
            <strong>Local, signed connections only.</strong> The transport is a private UNIX socket on your
            Mac — not a TCP port — and by default only OpenWhisp&rsquo;s own code-signed CLI may connect, so
            browser pages and random processes can&rsquo;t reach it.
          </li>
          <li>
            <strong>The cloud gate.</strong> If your AI provider is OpenAI, agent-initiated refinement is
            blocked unless you explicitly allow it — a prompt-injected agent can&rsquo;t exfiltrate text
            through your API key. Local models are unaffected.
          </li>
          <li>
            <strong>The human always wins the mic.</strong> Pressing your dictation hotkey during an agent
            session cancels it — the agent gets nothing — and starts your own. Agent microphone use always
            shows the overlay, and password fields are never dictated into.
          </li>
        </UL>

        <P>
          The full design is documented in{" "}
          <A href={`${REPO}/blob/main/docs/AGENT_BRIDGE.md`}>docs/AGENT_BRIDGE.md</A> — and because OpenWhisp
          is open source, you can read the implementation rather than take the security story on faith.
        </P>
      </>
    ),
    faq: [
      {
        q: "Does voice input work with Cursor and other agents, not just Claude Code?",
        a: "Yes. Any MCP-capable agent can use the bridge — run `openwhisp setup <agent>` for Cursor, Hermes, or OpenClaw. Short tool-call timeouts aren't a problem either: while a dictation waits for you, OpenWhisp streams MCP progress notifications so agents like Cursor (which caps tool calls near 60 seconds) don't give up mid-answer.",
      },
      {
        q: "Is my voice sent to the cloud when an agent asks me a question?",
        a: "No. The agent's question and your spoken answer are handled entirely on your Mac — transcription runs on-device, and the bridge itself is a local UNIX socket, not a network service. Cloud AI is only involved if you explicitly allow agents to use a cloud provider for refinement.",
      },
      {
        q: "Can any process on my Mac connect to the Agent Bridge?",
        a: "No. The bridge is off by default, the socket is only readable by your user account, and by default only OpenWhisp's own code-signed CLI may connect. On top of that, every agent must be approved by you the first time it connects.",
      },
    ],
    related: ["human-in-the-loop-for-a-swarm-of-agents", "private-on-device-ai-dictation", "edit-text-by-voice-mac"],
  },

  {
    slug: "human-in-the-loop-for-a-swarm-of-agents",
    title: "The human in the loop for a swarm of agents",
    description:
      "As people run many coding agents at once, the bottleneck becomes human attention. Here's why OpenWhisp could become the place a swarm of agents reaches you — a thesis, not a shipped feature.",
    keyword: "human in the loop multi-agent",
    datePublished: "2026-07-05",
    dateModified: "2026-07-05",
    readingTime: "7 min read",
    answer:
      "As you run more coding agents in parallel, the bottleneck stops being any agent's speed and becomes your attention — you're the thing they all wait on. This is a thesis about where OpenWhisp could go, not a feature we've shipped: because it already owns the microphone, the overlay, and a private per-agent channel on your Mac, OpenWhisp is well-placed to become the endpoint where a swarm of agents reaches the human — the star at the center, not the wire the agents talk to each other on.",
    body: (
      <>
        <Note>
          <strong>This is a vision piece, not a changelog.</strong> Everything below describes where we think
          OpenWhisp <em>could</em> go and why the architecture fits — it is <em>not</em> a description of
          features that exist today. What ships today is the{" "}
          <A href="/blog/talk-to-claude-code-by-voice/">Agent Bridge</A>: a single agent can ask you a
          question by voice. The multi-agent ideas here are unbuilt. We&rsquo;re writing it down to think in
          public and to invite disagreement.
        </Note>

        <P>
          Something changes when you stop running one coding agent and start running several. One Claude Code
          in a terminal, a second refactoring a different package, a background reviewer, a Cursor window on a
          third thing. Each is fast. The system is not — because the moment any of them needs a decision, it
          waits for the same scarce resource: <strong>you</strong>, noticing, context-switching, and
          answering.
        </P>
        <P>
          Add more agents and you don&rsquo;t get more throughput. You get a longer queue at a single
          checkout lane. The bottleneck has moved off the machines and onto the one human they all depend on.
          That is the real unsolved problem of multi-agent work, and it is an <em>attention</em> problem
          before it is a coordination problem.
        </P>

        <H2>The tempting wrong answer: &ldquo;build a bus&rdquo;</H2>
        <P>
          The obvious reframing is: if there are many agents and a human, they need a shared channel to talk —
          a message bus — and the human plugs into it. And since OpenWhisp already sits between agents and the
          person, maybe OpenWhisp <em>is</em> that bus.
        </P>
        <P>
          We want to argue against that, out loud, because it&rsquo;s the version of this idea we find
          seductive and think is a trap.
        </P>
        <UL>
          <li>
            <strong>A bus and a consent gate are opposites.</strong> Everything that makes a local agent
            bridge trustworthy is about <em>isolation</em>: a private per-connection channel, signed clients
            only, per-scope consent, no way for one agent to reach another through the trusted process. A bus
            does the reverse — its whole job is to route messages between parties. The instant OpenWhisp
            relays Agent A&rsquo;s message to Agent B, a prompt-injected agent can reach other agents through a
            process that holds microphone and accessibility permissions. You&rsquo;d be dismantling the
            isolation to add the routing.
          </li>
          <li>
            <strong>A bus is a commodity; a voice endpoint is not.</strong> If agents just need pub/sub to
            talk to each other, that problem is crowded and unspecial — a queue, a shared file, an
            orchestrator, an agent-to-agent protocol. None of it needs a microphone or on-device
            transcription. Competing there means fighting on plumbing where OpenWhisp has no advantage.
          </li>
          <li>
            <strong>It quietly turns you into a different product.</strong> A bus is always-on, stateful, and
            long-lived. Bolt that onto a dictation app and you either lose the &ldquo;costs nothing when
            it&rsquo;s off&rdquo; property that your main audience relies on, or you grow a second product
            wearing the first one&rsquo;s clothes.
          </li>
        </UL>

        <H2>The better frame: be the node, not the wire</H2>
        <P>
          Here&rsquo;s the thing OpenWhisp can be that almost nothing else can. It already owns the
          highest-bandwidth human input channel on the Mac: the microphone, the on-device transcription, the
          overlay, and the hard-won system permissions behind them. When an agent needs a person,{" "}
          <em>&ldquo;ask by voice, the human answers by voice, keep working&rdquo;</em> is simply a better
          interaction than a typed question rotting in a terminal nobody is looking at.
        </P>
        <P>
          So the role isn&rsquo;t <em>the bus</em>. It&rsquo;s <strong>the endpoint where a swarm of agents
          reaches the human</strong> — the star at the center of the diagram, not the mesh between the points.
          Whatever coordination layer wins between agents, they all still need one thing OpenWhisp is uniquely
          placed to provide: a fast, private, voice-first way to reach the person. Stay an endpoint. Let
          someone else build middleware.
        </P>

        <H2>What this could look like</H2>
        <P>
          Three directions follow from &ldquo;be the node.&rdquo; None of these exist yet; they&rsquo;re where
          the thesis points.
        </P>

        <H3>1. A star, not a mesh</H3>
        <P>
          Every agent gets its own private, isolated, human-mediated channel to <em>you</em>. Many agents can
          each independently ask you things; none of them can reach each other through OpenWhisp. This is most
          of the value of &ldquo;human in the loop for a swarm&rdquo; — and it doesn&rsquo;t require breaking
          any of the isolation the bridge is built on.
        </P>
        <P>
          The genuinely new problem is <em>multiplexing</em>: five agents wanting your attention at once. But
          that&rsquo;s a UI problem, not a message-routing one — a small queue of pending questions in the
          overlay, each tagged with the agent that asked, that you clear by voice one at a time:
        </P>
        <Pre>{`┌─ agents waiting on you ───────────────┐
│ ● claude-code (api)  deploy target?   │  ← you answer
│ ○ reviewer           ok to force-push?│
│ ○ cursor             which schema?     │
└───────────────────────────────────────┘
   speak your answer · it routes to the one asking`}</Pre>

        <H3>2. Let the orchestrator route; you voice the human step</H3>
        <P>
          In real multi-agent setups there is already a coordinator — a lead agent, a workflow runner,
          something that spawned the others. <em>That</em> is the bus. OpenWhisp&rsquo;s job is to be the tool
          that coordinator calls at the one step in its plan that needs a person. You never route between
          agents; the orchestrator does, and it reaches for a voice channel at the human-decision node. This
          keeps OpenWhisp a leaf and lets it ride whatever orchestration layer wins, instead of betting on
          one.
        </P>

        <H3>3. If ever more than a leaf, be the audit surface — not the transport</H3>
        <P>
          The one &ldquo;bus-like&rdquo; thing that actually fits is <em>observability of the human moments</em>:
          a local, private, searchable record of every decision a person made across all their agents —
          what you approved, when, and which agent asked. Those interactions happen on <em>your</em> machine,
          which makes it something a cloud orchestrator structurally can&rsquo;t own. That&rsquo;s still an
          endpoint feature, not a transport feature.
        </P>

        <H2>Why we&rsquo;re confident about the shape, if not the timeline</H2>
        <P>
          OpenWhisp is <A href={REPO}>open source</A> and local-first by construction. The current{" "}
          <A href="/blog/talk-to-claude-code-by-voice/">Agent Bridge</A> is already a private, signed,
          consent-gated, per-agent channel on your Mac — which happens to be exactly the primitive a star
          topology is made of. Getting from &ldquo;one agent can ask you a question&rdquo; to &ldquo;a swarm
          of agents queues for your attention, one calm voice channel&rdquo; is additive. It doesn&rsquo;t
          ask you to trust a new network service or hand a cloud a log of your decisions.
        </P>
        <P>
          The one-sentence version: being the place agents reach the human is a moat we mostly already have;
          being the wire agents reach each other on is a commodity we&rsquo;d have to demolish that moat to
          build. So the plan is to build the star, let someone else build the mesh, and be the node they all
          have to route through.
        </P>
        <Note>
          Think we&rsquo;ve got this wrong? That&rsquo;s the point of writing it down. Open an issue or a
          discussion on <A href={REPO}>GitHub</A> — this is a direction, not a decision, and it&rsquo;s better
          argued in the open.
        </Note>
      </>
    ),
    faq: [
      {
        q: "Is OpenWhisp a message bus for AI agents?",
        a: "No — and this post argues it shouldn't be. A bus routes messages between agents, which would break the per-agent isolation that makes a local agent bridge trustworthy. The thesis is the opposite: OpenWhisp should be the endpoint where agents reach the human (a star topology), not the wire agents use to reach each other.",
      },
      {
        q: "Does OpenWhisp support multiple agents at once today?",
        a: "This post is a vision piece, not a feature announcement. What ships today is the Agent Bridge, where a single coding agent can ask you a question by voice. The multi-agent 'swarm queues for your attention' ideas described here are unbuilt directions, not current features.",
      },
      {
        q: "Why is human attention the bottleneck in multi-agent work?",
        a: "Each agent runs fast on its own, but every one of them stops and waits for you whenever it needs a decision. Adding more agents doesn't add throughput — it adds to the queue at a single checkout lane: you. So the limiting resource becomes human attention, which is an attention problem before it's a coordination problem.",
      },
    ],
    related: ["talk-to-claude-code-by-voice", "private-on-device-ai-dictation"],
  },

  {
    slug: "local-ai-is-enough-for-dictation",
    title: "You don't need a giant AI model for dictation — your Mac is enough",
    description:
      "Dictation cleanup is a small, well-scoped task, so a tiny local model handles it fine. And because OpenWhisp is open source with a bundled llama.cpp, you can point it at a self-hosted Qwen3 32B if you want more.",
    keyword: "local ai dictation model",
    datePublished: "2026-07-06",
    dateModified: "2026-07-06",
    readingTime: "6 min read",
    answer:
      "Cleaning up dictated text — fixing punctuation, removing filler, tightening a sentence — is a small, well-scoped job that a tiny AI model does well. OpenWhisp ships with a 0.5B model that runs entirely on your Mac, and thanks to Apple Silicon's unified memory (every Mac from the M1 onward), it's fast and battery-friendly. Because the app is open source and bundles llama.cpp, you can also point it at a self-hosted model as large as your hardware allows — a Qwen3 32B, say — with no code changes.",
    body: (
      <>
        <P>
          There&rsquo;s a reflex, when a product involves &ldquo;AI,&rdquo; to assume it needs the biggest,
          smartest model available — GPT-class, in the cloud, behind an API key. For a dictation app,
          that&rsquo;s the wrong instinct. The job an AI model does here is small and well-defined, and a
          model small enough to live on your own machine handles it comfortably.
        </P>

        <H2>Dictation cleanup is a small job</H2>
        <P>
          Think about what the model is actually asked to do after your speech is transcribed:
        </P>
        <UL>
          <li>Fix capitalization and punctuation.</li>
          <li>Drop filler words &mdash; &ldquo;um,&rdquo; &ldquo;uh,&rdquo; &ldquo;you know.&rdquo;</li>
          <li>Tighten a rambling sentence, or reshape a note into a message.</li>
          <li>Follow a short instruction like &ldquo;make it more formal&rdquo; or &ldquo;translate to Russian.&rdquo;</li>
        </UL>
        <P>
          None of that needs frontier reasoning. It needs a model that writes clean, grammatical text and
          follows a simple instruction — which even sub-1B models do well now. Reach for a 70B cloud model
          here and you&rsquo;re paying (in latency, money, and privacy) for capability the task never uses.
          Worse, a round-trip to the cloud adds noticeable lag to something that should feel instant, and
          it sends your words off your machine.
        </P>

        <H2>Apple Silicon is quietly great at this</H2>
        <P>
          The reason a local model is not just tolerable but genuinely good on a Mac comes down to hardware.
          Every Apple Silicon Mac since the <strong>M1</strong> uses <strong>unified memory</strong>: the CPU,
          GPU, and Neural Engine all share one fast pool of RAM. On a typical machine a model has to be
          shuffled across the (slow) boundary between system memory and a separate GPU&rsquo;s VRAM. On a Mac
          there is no boundary — the model weights sit in memory the GPU can read directly.
        </P>
        <P>
          That has two happy consequences for local AI. First, models load and run fast without a discrete
          GPU. Second, the amount of model you can run is bounded by your <em>total</em> RAM, not by a
          separate, much smaller pool of video memory — so a 32&nbsp;GB or 64&nbsp;GB Mac can hold models
          that would need an expensive dedicated GPU on a PC. Apple didn&rsquo;t set out to build an AI
          workstation, but the unified-memory design turned every modern Mac into a capable one.
        </P>
        <Note>
          <strong>The short version:</strong> the smallest model OpenWhisp ships (Qwen2.5&nbsp;0.5B,
          ~491&nbsp;MB) is plenty for everyday dictation cleanup, runs on any M-series Mac, and never touches
          the network. You can stop reading here and just use it. The rest of this post is for people who
          want to push further.
        </Note>

        <H2>What OpenWhisp ships by default</H2>
        <P>
          Turn on AI cleanup and OpenWhisp downloads a small open-weights model that runs on your Mac through
          a bundled <A href="https://github.com/ggml-org/llama.cpp">llama.cpp</A> runtime — no Ollama, no
          server to start, no account. Three sizes are one click apart in Settings:
        </P>
        <UL>
          <li><strong>Qwen2.5 0.5B</strong> (~491&nbsp;MB) — the default. Fastest, lowest memory, and fine for cleanup.</li>
          <li><strong>Qwen2.5 1.5B</strong> (~1.1&nbsp;GB) — a step up in quality for a little more memory.</li>
          <li><strong>SmolLM2 360M</strong> (~271&nbsp;MB) — the smallest, for tight RAM.</li>
        </UL>
        <P>
          All three are Apache-2.0, download once, and then work fully offline. For most people this is the
          whole story: it&rsquo;s good, it&rsquo;s private, and it costs nothing.{" "}
          <A href="/blog/private-on-device-ai-dictation/">More on the private, on-device setup here.</A>
        </P>

        <H2>Hackers: bring your own, as big as your Mac allows</H2>
        <P>
          Here&rsquo;s where being open source and built on llama.cpp pays off. The built-in model is just a
          default, not a ceiling. OpenWhisp&rsquo;s AI cleanup can point at any{" "}
          <strong>OpenAI-compatible server</strong>, which means you can run a far larger model yourself and
          have dictation use it — no code changes, just a URL in Settings.
        </P>
        <P>
          Say you have a Mac with plenty of unified memory (or a Linux box with a real GPU) and you want your
          voice edits handled by something much stronger — a{" "}
          <strong>Qwen3 32B</strong> (or the 30B-A3B mixture-of-experts variant, which is lighter to run for
          its quality). Start it behind an OpenAI-compatible endpoint:
        </P>
        <Pre>{`# Option A — llama.cpp (the same engine OpenWhisp bundles)
llama-server -m qwen3-32b-Q4_K_M.gguf --host 0.0.0.0 --port 8080

# Option B — Ollama, which serves an OpenAI-compatible API
ollama serve            # listens on http://localhost:11434
ollama run qwen3:32b`}</Pre>
        <P>
          Then in OpenWhisp choose the <strong>Local (private)</strong> AI provider and point it at your
          server:
        </P>
        <UL>
          <li>llama.cpp default: <code className="font-mono text-[0.9em] text-speak">http://localhost:8080/v1</code></li>
          <li>Ollama: <code className="font-mono text-[0.9em] text-speak">http://localhost:11434/v1</code></li>
        </UL>
        <P>
          That&rsquo;s it. Your dictation now gets rewritten by a 32B model that never leaves your network.
          Because OpenWhisp bundles the same llama.cpp under the hood, a self-hosted llama.cpp server behaves
          exactly like the built-in one, just bigger — the ceiling is your hardware, not the app.
        </P>

        <H2>The point</H2>
        <P>
          Good local AI isn&rsquo;t about cramming the largest possible model onto your laptop. It&rsquo;s
          about matching the model to the task. Dictation cleanup is a small task, so a small model on your
          Mac is the right, private, zero-cost default — and Apple Silicon makes it genuinely fast. And if
          you want more, the door is open: it&rsquo;s open source, it speaks the standard API, and it&rsquo;ll
          talk to whatever you can host.
        </P>
      </>
    ),
    faq: [
      {
        q: "Do I need a powerful AI model for dictation?",
        a: "No. Cleaning up dictated text — punctuation, filler removal, light rewriting, following a short instruction — is a small, well-scoped task that a tiny model handles well. OpenWhisp's default is a 0.5B model (~491 MB) that runs entirely on your Mac.",
      },
      {
        q: "Why is a Mac good for running local AI models?",
        a: "Apple Silicon (every Mac since the M1) uses unified memory: the CPU, GPU, and Neural Engine share one fast pool of RAM. There's no slow copy to a separate GPU's VRAM, so models load and run fast, and how large a model you can run is bounded by total RAM rather than a small dedicated video-memory pool.",
      },
      {
        q: "Can I use my own larger model with OpenWhisp?",
        a: "Yes. OpenWhisp's AI cleanup can point at any OpenAI-compatible server, so you can self-host a much larger model — for example a Qwen3 32B via llama.cpp or Ollama — and select the Local (private) provider with your server's URL. No code changes; the built-in model is a default, not a ceiling.",
      },
      {
        q: "Does using a local AI model keep my dictation private?",
        a: "Yes. Both the built-in on-device model and a local server you host yourself keep everything on your machine or network — nothing is sent to the cloud. The only exception is if you explicitly choose the OpenAI cloud provider.",
      },
    ],
    related: ["private-on-device-ai-dictation", "dictate-on-mac-offline", "talk-to-claude-code-by-voice"],
  },

  {
    slug: "dictate-anywhere-mac-scratchpad",
    title: "Dictate anywhere on your Mac — even with no text field to type into",
    description:
      "Most dictation needs a focused text field. OpenWhisp's floating Scratchpad gives you an always-on-top note to talk into anytime — a quick, fully-local capture surface.",
    keyword: "dictate anywhere mac",
    datePublished: "2026-07-10",
    dateModified: "2026-07-10",
    readingTime: "4 min read",
    answer:
      "OpenWhisp's floating Scratchpad lets you dictate on a Mac even when no app has a text field focused. Open it from the menu bar (or the openwhisp://scratchpad URL), and an always-on-top panel appears to talk or type into. It holds a list of notes, saves them on-device, and never sends anything to the cloud.",
    body: (
      <>
        <P>
          Dictation apps have a blind spot: they need somewhere to put the words. If no text field is focused
          &mdash; you&rsquo;re staring at your desktop, a full-screen video, a Finder window &mdash; there&rsquo;s
          nowhere for the transcript to go. The thought you wanted to capture waits until you find an app to type
          into, and by then it&rsquo;s often gone.
        </P>
        <P>
          OpenWhisp&rsquo;s <strong>floating Scratchpad</strong> fixes that. It&rsquo;s a small, always-on-top note
          panel you can summon anytime and talk straight into &mdash; no target app required.
        </P>

        <H2>How it works</H2>
        <UL>
          <li>Open the Scratchpad from the OpenWhisp menu-bar icon (or run <code className="font-mono text-[0.9em] text-speak">open &quot;openwhisp://scratchpad&quot;</code> from a launcher).</li>
          <li>The panel floats on top of your other windows and takes focus.</li>
          <li>Start a dictation with your trigger key &mdash; the text appends into the active note. Or just type.</li>
          <li>Keep several notes in a list; each shows a small provenance line (when it was last dictated vs. typed), newest first.</li>
        </UL>

        <H2>A capture surface, kept on your Mac</H2>
        <P>
          The Scratchpad is a quick-capture buffer, not a cloud notes service. Your notes are saved on device and
          persist between launches, and nothing leaves your Mac &mdash; the same{" "}
          <A href="/blog/private-on-device-ai-dictation/">local-first, private</A> posture as the rest of OpenWhisp.
          It&rsquo;s the fastest way to get a fleeting thought out of your head and into text when there&rsquo;s no
          document open to hold it.
        </P>

        <H2>Where it fits</H2>
        <P>
          Think of it as the voice equivalent of a sticky note: a fleeting to-do while you&rsquo;re heads-down in a
          call, a quote you want to keep while reading, a reminder mid-task. When you&rsquo;re ready, copy it into
          wherever it belongs. And because you can open it from a URL, you can bind it to a{" "}
          <A href="/blog/automate-dictation-shortcuts-webhooks/">launcher hotkey</A> and have a capture note one
          keystroke away.
        </P>
      </>
    ),
    faq: [
      {
        q: "Can I dictate on a Mac without a text field focused?",
        a: "Yes. OpenWhisp's floating Scratchpad is an always-on-top note panel you can open from the menu bar (or the openwhisp://scratchpad URL) and dictate into anytime, even when no other app has a text field focused.",
      },
      {
        q: "Where are Scratchpad notes stored?",
        a: "On your Mac. The Scratchpad keeps a local list of notes that persist between launches; nothing is uploaded to any server.",
      },
      {
        q: "Can I open the Scratchpad with a shortcut?",
        a: "Yes. It responds to the openwhisp://scratchpad URL, so you can trigger it from Raycast, Alfred, or any launcher and bind that to a hotkey.",
      },
    ],
    related: ["hands-free-dictation-mac", "automate-dictation-shortcuts-webhooks", "private-on-device-ai-dictation"],
  },

  {
    slug: "hands-free-dictation-mac",
    title: "Hands-free dictation on a Mac: talk without holding a key",
    description:
      "Tired of holding a key while you dictate? OpenWhisp's hands-free mode locks the mic open with one tap — speak with your hands free, tap or Esc to stop. On-device, with a silence safety net.",
    keyword: "hands-free dictation mac",
    datePublished: "2026-07-10",
    dateModified: "2026-07-10",
    readingTime: "4 min read",
    answer:
      "OpenWhisp now supports hands-free dictation on a Mac: instead of holding a key the whole time, you tap your trigger once to lock the mic open, speak freely, then tap again or press Esc to stop. A silence safety net ends a forgotten session automatically. Hold-to-talk still works exactly as before.",
    body: (
      <>
        <P>
          Push-to-talk is great for a quick sentence &mdash; hold the key, speak, release. But for anything longer
          &mdash; a paragraph, a journal entry, thinking out loud &mdash; holding a key the entire time is a small,
          constant strain, and it ties up a hand you might want for something else.
        </P>
        <P>
          OpenWhisp&rsquo;s <strong>hands-free mode</strong> removes the hold. One tap locks the mic open; you speak
          with both hands free; a tap or <Kbd>Esc</Kbd> stops it.
        </P>

        <H2>How to turn it on</H2>
        <UL>
          <li>Go to <strong>Settings › Dictation › Activation</strong> and set the activation style to <strong>&ldquo;Hands-free (tap to lock)&rdquo;</strong>. (Or leave it on hold-to-talk and just double-tap your trigger key to lock the mic for a single session.)</li>
          <li>Tap your trigger key &mdash; the overlay shows a lock badge and &ldquo;Hands-free &mdash; tap key or Esc to stop.&rdquo;</li>
          <li>Speak. The mic stays live with nothing held down.</li>
          <li>Tap the trigger again to insert what you said, or press <Kbd>Esc</Kbd> to discard the session.</li>
        </UL>

        <H2>It won&rsquo;t record forever by accident</H2>
        <P>
          The obvious worry with a locked mic is walking away and leaving it running. OpenWhisp has a safety net:
          <strong> auto-stop after a long silence</strong> is on by default, so a session you forget about ends
          itself after a long quiet stretch instead of recording indefinitely. It&rsquo;s all{" "}
          <A href="/blog/dictate-on-mac-offline/">on-device</A> &mdash; the audio never leaves your Mac.
        </P>

        <H2>You don&rsquo;t lose hold-to-talk</H2>
        <P>
          Hands-free is an addition, not a replacement. Holding the key still works exactly as before, so you can use
          the quick hold for a one-liner and switch to hands-free for the long stuff. Pair it with a{" "}
          <A href="/blog/dictate-anywhere-mac-scratchpad/">floating Scratchpad</A> and you can lock the mic, lean back,
          and talk a whole note into existence without touching the keyboard again.
        </P>
      </>
    ),
    faq: [
      {
        q: "Can I dictate on a Mac without holding a key down?",
        a: "Yes. OpenWhisp's hands-free mode locks the mic open with one tap of your trigger key. You speak with your hands free and tap again (or press Esc) to stop. Hold-to-talk remains available too.",
      },
      {
        q: "What stops hands-free dictation from recording forever if I forget?",
        a: "An auto-stop-after-long-silence safety net, on by default, ends a locked session after a long quiet stretch — so a forgotten session can't keep recording.",
      },
      {
        q: "Is hands-free dictation still private and on-device?",
        a: "Yes. Like all OpenWhisp dictation, hands-free transcription runs on-device and the audio never leaves your Mac.",
      },
    ],
    related: ["dictate-anywhere-mac-scratchpad", "dictate-on-mac-offline", "wispr-flow-alternative"],
  },

  {
    slug: "transcribe-audio-video-files-mac",
    title: "Transcribe audio and video files locally on your Mac (with SRT/VTT subtitles)",
    description:
      "Drop an MP3 or MP4 into OpenWhisp and get a transcript — or .srt/.vtt subtitles — generated entirely on your Mac. Batch queue, automatic chunking, and watch folders. No upload, no cloud.",
    keyword: "transcribe audio video files mac offline",
    datePublished: "2026-07-10",
    dateModified: "2026-07-10",
    readingTime: "5 min read",
    answer:
      "OpenWhisp can transcribe audio and video files on a Mac completely offline: add an MP3, MP4, M4A, WAV, or WEBM and it runs your on-device engine, showing a live per-file queue. Long files are chunked automatically, and finished transcripts export to plain text, SubRip (.srt), or WebVTT (.vtt) with timestamps. Set a watch folder and dropped media transcribes itself.",
    body: (
      <>
        <P>
          Live dictation is only half of speech-to-text. The other half is the pile of recordings you already have:
          a meeting recording, a lecture, a podcast episode, a screen-capture video you need captions for. Most
          tools that transcribe those files upload them to a server. OpenWhisp does it <strong>entirely on your
          Mac.</strong>
        </P>

        <H2>Drop in a file, get a transcript</H2>
        <UL>
          <li>Open <strong>Settings › File Transcription</strong> and add one or more media files &mdash; MP3, MP4, M4A, WAV, WEBM, and more.</li>
          <li>OpenWhisp decodes each to 16&nbsp;kHz audio and runs it through your on-device engine, one file at a time.</li>
          <li>A live queue shows each file&rsquo;s progress: Queued &rarr; Loading model &rarr; Transcribing &rarr; Done. Long files are chunked automatically.</li>
          <li>Export a finished transcript as plain text, <strong>.srt</strong>, or <strong>.vtt</strong> &mdash; the subtitle formats carry chunk-level timestamps.</li>
        </UL>

        <H2>Subtitles, generated on device</H2>
        <P>
          The SubRip (.srt) and WebVTT (.vtt) exports make this a genuine local captioning tool. Feed it a video&rsquo;s
          audio and you get a timestamped subtitle file you can drop straight into a video editor or a web player &mdash;
          without sending the footage to anyone. For sensitive recordings (interviews, internal meetings, anything under
          NDA), that&rsquo;s the difference between &ldquo;can&rsquo;t use a transcription service&rdquo; and
          &ldquo;done in the background.&rdquo;
        </P>

        <H2>Set it and forget it: watch folders</H2>
        <P>
          You can point OpenWhisp at a <strong>watch folder</strong>: any media dropped into it transcribes itself
          automatically (it waits for a file to finish copying before starting). Route your recorder&rsquo;s output
          folder there and transcripts appear without you lifting a finger.
        </P>

        <H2>Why local matters here</H2>
        <P>
          Cloud transcription services charge per minute and require you to upload the file &mdash; a non-starter for
          long or confidential recordings. Because OpenWhisp runs{" "}
          <A href="/blog/dictate-on-mac-offline/">Whisper-class models on your own hardware</A>, batch transcription
          is free, works offline, and keeps every file on your machine. It&rsquo;s the same engine behind live
          dictation, pointed at files instead of your microphone.
        </P>
      </>
    ),
    faq: [
      {
        q: "Can I transcribe a video or audio file on a Mac without uploading it?",
        a: "Yes. OpenWhisp transcribes MP3, MP4, M4A, WAV, WEBM and other media files entirely on-device — the file never leaves your Mac. Add files in Settings › File Transcription and export the result as text, SRT, or VTT.",
      },
      {
        q: "Can OpenWhisp generate subtitles (SRT/VTT)?",
        a: "Yes. Finished transcripts export to SubRip (.srt) and WebVTT (.vtt) with chunk-level timestamps, so you can caption a video locally.",
      },
      {
        q: "Can it transcribe a folder of files automatically?",
        a: "Yes. Set up a watch folder and any media dropped into it is transcribed automatically once the file finishes copying.",
      },
    ],
    related: ["dictate-on-mac-offline", "best-mac-dictation-apps", "private-on-device-ai-dictation"],
  },

  {
    slug: "automate-dictation-shortcuts-webhooks",
    title: "Automate your dictation: run Shortcuts, webhooks, and files when you finish speaking",
    description:
      "OpenWhisp can do something the moment a dictation finishes — append to a file, run a Shortcut, POST a webhook, open a URL. Plus an openwhisp:// scheme to drive it from Raycast or Alfred. Fail-open, on-device.",
    keyword: "automate dictation mac shortcuts webhook",
    datePublished: "2026-07-10",
    dateModified: "2026-07-10",
    readingTime: "6 min read",
    answer:
      "OpenWhisp's Rules and output targets let you automate what happens when a dictation finishes: append it to a Markdown file, run a macOS Shortcut, POST it to a webhook, open a URL, or run a script — triggered by what you said. An openwhisp:// URL scheme also lets Raycast, Alfred, or any launcher start dictation. Everything fails open: if an action fails, your words are still typed.",
    body: (
      <>
        <P>
          Dictation usually ends the same way: the text lands in whatever app you&rsquo;re in. But often that&rsquo;s
          just step one &mdash; you wanted the note in your journal, the task in Things, the idea POSTed to a webhook
          that kicks off a workflow. OpenWhisp can now do that <em>automatically</em>, the moment you stop speaking.
        </P>

        <H2>Output targets: send a dictation somewhere other than the focused app</H2>
        <P>
          In <strong>Settings › Output › Output target</strong> you pick where the final transcript goes:
        </P>
        <UL>
          <li><strong>A file</strong> &mdash; append each dictation to an Obsidian daily note, a Logseq journal, or any <code className="font-mono text-[0.9em] text-speak">.md</code>/<code className="font-mono text-[0.9em] text-speak">.txt</code>, with an optional dated heading.</li>
          <li><strong>A macOS Shortcut</strong> &mdash; hand the text to any Shortcut you&rsquo;ve built (add to Reminders, run AppleScript, whatever the Shortcuts ecosystem can do).</li>
          <li><strong>A webhook</strong> &mdash; POST the transcript as JSON (text, language, app, timestamp) to Notion, Zapier, n8n, or your own endpoint, with optional auth headers.</li>
        </UL>

        <H2>Rules: trigger actions based on what you said</H2>
        <P>
          <strong>Rules</strong> (Settings › Rules) go a step further: they run actions when a transcript{" "}
          <em>matches</em>. A rule is a match condition &mdash; starts-with, contains, exact, or regex, optionally
          scoped to one app &mdash; plus an ordered list of actions: insert a snippet, open a URL (with{" "}
          <code className="font-mono text-[0.9em] text-speak">{"{{text}}"}</code> for the transcript), run a script,
          run a Shortcut, POST a webhook, or append to a file. Say the right trigger phrase and the automation fires.
        </P>

        <H2>Drive OpenWhisp from a launcher: the openwhisp:// scheme</H2>
        <P>
          OpenWhisp answers an <code className="font-mono text-[0.9em] text-speak">openwhisp://</code> URL, so any
          launcher or script can control it &mdash; no CLI needed:
        </P>
        <Pre>{`open "openwhisp://record"                       # start / stop dictation
open "openwhisp://paste-last-result"            # paste the last result
open "openwhisp://refine?instruction=make%20it%20formal"

# chain verbs — they run in order, all-or-nothing
open "openwhisp://?switch-mode=email&record"`}</Pre>
        <P>
          Point Raycast or Alfred at one of these and bind it to a hotkey. The scheme deliberately exposes only a
          small, validated allow-list of safe verbs &mdash; never a shell string or an arbitrary file path &mdash;
          and rejects anything malformed as a whole.
        </P>

        <H2>Nothing gets dropped</H2>
        <P>
          The important design choice: every one of these is a <strong>fail-open side channel</strong>. If a webhook
          is down, a Shortcut errors, or a file can&rsquo;t be written, your words still land in the focused app
          exactly as they always did. An automation can never cost you a dictation. And it&rsquo;s all local by default
          &mdash; Rules run on dictation only, so an{" "}
          <A href="/blog/talk-to-claude-code-by-voice/">agent&rsquo;s</A> transcript never triggers them unless you opt
          in.
        </P>

        <H2>For the tinkerers</H2>
        <P>
          This is OpenWhisp leaning into its <A href="/blog/wispr-flow-alternative/">hackable, open-source</A> nature:
          your voice becomes a trigger for whatever you can wire up on your own machine, with the safety of knowing the
          plumbing can only ever <em>add</em> to normal dictation, never break it.
        </P>
      </>
    ),
    faq: [
      {
        q: "Can OpenWhisp run a Shortcut or webhook when I finish dictating?",
        a: "Yes. Output targets can send the final transcript to a file, a macOS Shortcut, or a webhook, and Rules can run those actions (plus open URLs or run scripts) when a transcript matches a condition you set.",
      },
      {
        q: "Can I start OpenWhisp dictation from Raycast or Alfred?",
        a: "Yes. OpenWhisp answers an openwhisp:// URL scheme with a validated allow-list of verbs (record, refine, paste-last-result, switch-mode, and more), so any launcher or script can drive it.",
      },
      {
        q: "What happens to my text if an automation fails?",
        a: "Nothing is lost. Every output target and rule is fail-open: if a file, Shortcut, or webhook can't take the text, your words are still typed into the focused app as usual.",
      },
    ],
    related: ["talk-to-claude-code-by-voice", "dictate-anywhere-mac-scratchpad", "wispr-flow-alternative"],
  },

  {
    slug: "parakeet-realtime-streaming-dictation-mac",
    title: "Parakeet: real-time streaming dictation on a Mac (words ~0.3s behind your voice)",
    description:
      "OpenWhisp's new on-device Parakeet engine streams words to the screen about 0.3s behind your voice, with live punctuation — final text lands ~50ms after you release the key. Fully local, no cloud.",
    keyword: "realtime streaming dictation mac",
    datePublished: "2026-07-11",
    dateModified: "2026-07-14",
    readingTime: "6 min read",
    answer:
      "Parakeet is OpenWhisp's on-device dictation engine — and now its default. It streams words to the screen as you talk — partial text trails your voice by about 0.3 seconds, already punctuated and capitalized, and the final text lands roughly 50ms after you release the hotkey. It runs entirely on your Mac; a fresh install uses it from the first launch, and WhisperKit, whisper.cpp, and Apple Speech stay one click away.",
    body: (
      <>
        <P>
          Most on-device dictation works in one shot: you hold a key, talk, release, and the app decodes the whole
          clip at once. Parakeet is different by design. It&rsquo;s a <strong>streaming</strong> engine, so text
          appears <em>while</em> you&rsquo;re still speaking &mdash; partials trail your voice by about a third of a
          second, already carrying punctuation and capitalization &mdash; and the final result lands roughly
          <strong> 50&nbsp;milliseconds</strong> after you let go of the hotkey. It&rsquo;s a new engine you can pick
          in OpenWhisp&rsquo;s settings, and it runs entirely on your Mac.
        </P>

        <H2>Streaming vs. batch: why the latency feels different</H2>
        <P>
          A <strong>batch</strong> engine (like <A href="https://github.com/argmaxinc/WhisperKit">WhisperKit</A>, the
          engine behind{" "}
          <A href="/blog/dictate-on-mac-offline/">offline dictation on a Mac</A>) buffers your whole utterance and
          transcribes it after you stop. That&rsquo;s accurate and fully local, but there&rsquo;s a decode pause on
          release &mdash; the app has to think about the clip before the words appear.
        </P>
        <P>
          A <strong>streaming</strong> engine is architecturally continuous: it&rsquo;s transcribing as the audio
          arrives, so you watch the sentence build in real time. With Parakeet the partials trail your voice by about
          0.3 seconds, and because it has already been keeping up, pressing stop doesn&rsquo;t trigger a fresh decode
          of the whole clip &mdash; the final text settles in about 50&nbsp;milliseconds. There&rsquo;s no
          end-of-dictation wait, which is the part that makes it feel immediate.
        </P>

        <H2>Four streaming model variants</H2>
        <P>
          Parakeet isn&rsquo;t one model but a small family, so you can trade speed for accuracy or coverage for size:
        </P>
        <UL>
          <li><strong>Realtime English</strong> &mdash; the unified low-latency model tuned for live dictation.</li>
          <li><strong>Best-accuracy English</strong> &mdash; when you want the cleanest English transcript.</li>
          <li><strong>Ultra-light 120M</strong> &mdash; the smallest, lightest variant.</li>
          <li><strong>Multilingual</strong> &mdash; roughly 40 languages, auto-detected (you can also give it a language hint).</li>
        </UL>

        <H2>It also powers files, meetings, and history</H2>
        <P>
          Parakeet isn&rsquo;t only for live dictation. A separate 25-language batch model backs the file-transcription
          side too: the{" "}
          <A href="/blog/transcribe-audio-video-files-mac/">batch file queue</A>, watch folders, meeting capture, and
          re-transcribing anything already in your history all run on Parakeet when you choose it. So the engine you
          dictate with is the same one that turns your recordings and meetings into text.
        </P>

        <H2>On-device and private, like the rest of OpenWhisp</H2>
        <P>
          Parakeet is built on the Apache-2.0 <A href="https://github.com/FluidInference/FluidAudio">FluidAudio</A>{" "}
          SDK and runs NVIDIA Parakeet models through CoreML &mdash; entirely on your Mac. Nothing is uploaded, which
          keeps it in line with{" "}
          <A href="/blog/private-on-device-ai-dictation/">OpenWhisp&rsquo;s on-device, no-cloud approach</A>. It&rsquo;s
          transcription only: there&rsquo;s no translation step, so your words come back in the language you spoke them.
        </P>

        <H2>The default engine &mdash; but not the only one</H2>
        <P>
          Parakeet tested well enough that it&rsquo;s now the <strong>default, recommended engine</strong>: a fresh
          install downloads and uses it from the very first launch. If you were already using OpenWhisp, an update
          leaves you on whatever engine you&rsquo;d chosen &mdash; it never swaps a working engine out from under you.
          Either way it&rsquo;s not a lock-in: WhisperKit is still there in <strong>Settings &rsaquo; Models</strong>,
          as are whisper.cpp and Apple Speech, and the FluidAudio model repositories show up in{" "}
          <strong>Settings &rsaquo; Storage</strong> with their sizes and a one-click delete, so you only keep the
          variants you actually use. Weighing the options? The{" "}
          <A href="/blog/best-mac-dictation-apps/">Mac dictation apps guide</A> and the{" "}
          <A href="/blog/wispr-flow-alternative/">Wispr Flow alternative</A> writeup put the trade-offs in context.
        </P>

        <H2>Bonus: agents can stop the moment you finish speaking</H2>
        <P>
          Parakeet also ships an end-of-utterance model that emits a genuine &ldquo;the speaker finished&rdquo; signal.
          When a coding agent hands you the mic, OpenWhisp can use that signal to end the session right after your
          utterance settles, instead of waiting out a silence timer. This is{" "}
          <strong>experimental and off by default</strong>, it applies only to agent-requested dictations, and it&rsquo;s
          inert on every other engine &mdash; your own hotkey dictations are never auto-stopped. It pairs with{" "}
          <A href="/blog/talk-to-claude-code-by-voice/">talking to coding agents by voice</A>.
        </P>

        <H2>Try it</H2>
        <P>
          Parakeet ships in OpenWhisp, a free, open-source dictation app for Apple Silicon Macs. Get it from the{" "}
          <A href="https://openwhisp.app/">OpenWhisp site</A> or <A href={REPO}>GitHub</A>, then pick Parakeet in
          Settings &rsaquo; Models.
        </P>
      </>
    ),
    faq: [
      {
        q: "What is Parakeet in OpenWhisp?",
        a: "Parakeet is a new on-device transcription engine for OpenWhisp built on NVIDIA Parakeet models via the Apache-2.0 FluidAudio SDK. Unlike the batch engines, it streams: text appears about 0.3 seconds behind your voice with punctuation, and the final result lands roughly 50ms after you release the hotkey.",
      },
      {
        q: "Is Parakeet the default engine now?",
        a: "Yes. Parakeet is the default, recommended transcription engine — a fresh install uses it from the first launch. Existing users keep whatever engine they'd already chosen. You can switch anytime in Settings › Models, where WhisperKit, whisper.cpp, and Apple Speech remain available.",
      },
      {
        q: "What languages does Parakeet support?",
        a: "For live dictation there's an English realtime model, a best-accuracy English model, an ultra-light 120M model, and a multilingual model covering roughly 40 languages with auto-detect. File transcription, meetings, and history re-transcription use a separate 25-language batch model. Parakeet is transcription only — it does not translate.",
      },
      {
        q: "Does Parakeet run in the cloud?",
        a: "No. Parakeet runs entirely on your Mac through CoreML, so nothing is uploaded. Its model repositories appear in Settings › Storage with sizes and one-click delete.",
      },
    ],
    related: ["dictate-on-mac-offline", "private-on-device-ai-dictation", "transcribe-audio-video-files-mac", "best-mac-dictation-apps"],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
