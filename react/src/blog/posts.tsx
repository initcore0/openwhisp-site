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
    related: ["dictate-on-mac-offline", "edit-text-by-voice-mac", "best-mac-dictation-apps"],
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
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
