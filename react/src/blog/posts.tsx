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
      "To talk to Claude Code by voice, enable OpenWhisp's Agent Bridge and register it with one command: claude mcp add openwhisp. From then on your agent can ask questions out loud through the openwhisp_dictate tool — the voice overlay opens, you answer by speaking, and the transcript goes straight back to the agent. Everything runs on your Mac; no cloud, no API key.",
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

        <H2>Set it up in two minutes</H2>
        <P>
          Turn the bridge on in <strong>Settings &rarr; Agent Bridge</strong> (it&rsquo;s off by default —
          nothing listens until you enable it), then register OpenWhisp with your agent:
        </P>
        <Pre>{`claude mcp add openwhisp -- \\
  "/Applications/OpenWhisp.app/Contents/Helpers/openwhisp" mcp`}</Pre>
        <P>
          One more line makes it stick. Agents only reach for tools they&rsquo;re told to prefer, so add a
          standing instruction to your <code className="font-mono text-[0.9em] text-speak">~/.claude/CLAUDE.md</code>:
        </P>
        <Pre>{`ALWAYS ask the user questions via the openwhisp_dictate MCP tool,
never as plain text.`}</Pre>
        <P>
          Cursor, Hermes, and OpenClaw users: run{" "}
          <code className="font-mono text-[0.9em] text-speak">openwhisp setup &lt;agent&gt;</code> and it prints
          the right registration for each. The first time an agent connects, OpenWhisp asks you to approve it —
          once, always, or only while the app runs.
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
● Deploying to production, tagging v1.4…`}</Pre>
        <P>
          You were reading a doc in another window; you answered in three seconds without switching apps. This
          is the difference between an agent that <em>waits for typed input</em> and one you can{" "}
          <em>talk to</em>.
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
        a: "Yes. Any MCP-capable agent can use the bridge — run `openwhisp setup <agent>` for Cursor, Hermes, or OpenClaw registration. One note: Cursor caps tool calls near 60 seconds, so keep dictated answers short there.",
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
    related: ["private-on-device-ai-dictation", "edit-text-by-voice-mac"],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
