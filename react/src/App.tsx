import { useState } from "react";
import {
  ShieldCheck,
  CurrencyDollarSimple,
  GithubLogo,
  DownloadSimple,
  CaretRight,
  TextAa,
  Brain,
  ClockCounterClockwise,
  Cpu,
  Heart,
  List,
  X,
  PaperPlaneTilt,
  CheckCircle,
  PlugsConnected,
  FilmSlate,
  Lightning,
  Command,
  UsersThree,
  Broadcast,
  Translate,
  PuzzlePiece,
} from "@phosphor-icons/react";
import { Waveform } from "./components/Waveform";
import { MagneticButton } from "./components/MagneticButton";
import { EditDemo } from "./components/EditDemo";
import { withBase } from "./base";

const REPO = "https://github.com/initcore0/openwhisp";
const DMG = `${REPO}/releases/latest/download/OpenWhisp.dmg`;
const DONATE = "https://buymeacoffee.com/initcore0";
// Assembled at runtime so the address never appears verbatim in the prerendered
// HTML or the bundle — keeps it off the cheap email-scraper radar.
const CONTACT_EMAIL = ["maksym", ".", "naboka", "@", "gmail", ".", "com"].join("");
const CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

// The three tools the Agent Bridge exposes over MCP (docs/AGENT_BRIDGE.md in the app repo).
const AGENT_TOOLS = [
  {
    name: "openwhisp_dictate",
    badge: undefined as string | undefined,
    desc: "Your agent pauses and asks you a question by voice. The overlay opens, you speak, and the moment you go quiet the transcript returns to the agent — no typing paragraphs into a chat box.",
  },
  {
    name: "openwhisp_refine",
    badge: "only in OpenWhisp",
    desc: "Agents rewrite text with the same on-device model as your refine hotkey — your prompts, your machine, nothing sent anywhere.",
  },
  {
    name: "openwhisp_history",
    badge: undefined,
    desc: "Recent dictations — text, timestamp, target app — readable by the agent, stored only on your Mac.",
  },
] as const;

function Eyebrow({ children, accent = "speak" }: { children: React.ReactNode; accent?: "speak" | "refine" }) {
  return (
    <p
      className="font-mono text-xs uppercase tracking-[0.18em] mb-5"
      style={{ color: accent === "refine" ? "var(--color-refine)" : "var(--color-speak)" }}
    >
      {children}
    </p>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md backdrop-saturate-150">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2.5 text-listen" aria-label="OpenWhisp home">
            <BrandMark className="h-6 w-6 text-speak" />
            <span className="font-display text-lg font-semibold tracking-tight">OpenWhisp</span>
          </a>
          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-d md:flex" aria-label="Primary">
            <a className="transition-colors hover:text-listen" href="#mcp">MCP</a>
            <a className="transition-colors hover:text-listen" href="#features">Features</a>
            <a className="transition-colors hover:text-listen" href="#privacy">Privacy</a>
            <a className="transition-colors hover:text-listen" href={withBase("/changelog/")}>Changelog</a>
            <a className="transition-colors hover:text-listen" href={withBase("/blog/")}>Blog</a>
            <a className="transition-colors hover:text-listen" href={REPO} rel="noopener">GitHub</a>
            <a
              className="group inline-flex items-center gap-1.5 text-refine/80 transition-colors hover:text-refine"
              href={DONATE}
              rel="noopener"
            >
              <Heart weight="fill" className="h-4 w-4 transition-transform group-hover:scale-110" />
              Support
            </a>
            <a
              href={DMG}
              rel="noopener"
              className="inline-flex items-center gap-1.5 rounded-lg bg-speak px-3.5 py-2 font-display text-[13px] font-semibold text-[#04181a] transition-shadow hover:shadow-[0_0_18px_-2px_color-mix(in_srgb,var(--color-speak)_60%,transparent)]"
            >
              <DownloadSimple weight="bold" className="h-4 w-4" /> Download
            </a>
          </nav>

          {/* Mobile: hamburger toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="-mr-1 inline-flex h-10 w-10 items-center justify-center rounded-lg text-listen transition-colors hover:bg-ink-2 md:hidden"
          >
            {menuOpen ? <X weight="bold" className="h-5 w-5" /> : <List weight="bold" className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu panel */}
        <div
          id="mobile-menu"
          className={`overflow-hidden border-t border-line md:hidden ${menuOpen ? "block" : "hidden"}`}
        >
          <nav className="mx-auto flex max-w-[1180px] flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {[
              { href: "#mcp", label: "MCP" },
              { href: "#features", label: "Features" },
              { href: "#privacy", label: "Privacy" },
              { href: "/changelog/", label: "Changelog" },
              { href: "/blog/", label: "Blog" },
              { href: "#contact", label: "Contact" },
              { href: REPO, label: "GitHub", external: true },
            ].map((item) => (
              <a
                key={item.label}
                href={item.external ? item.href : withBase(item.href)}
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

      <main id="top">
        {/* HERO — split, left-aligned content / right-aligned asset (anti-center) */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 50% at 16% 38%, color-mix(in srgb, var(--color-speak) 11%, transparent), transparent 70%)",
            }}
          />
          <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-28">
            <div className="cascade">
              <Eyebrow>OpenWhisp &middot; realtime local dictation for macOS</Eyebrow>
              <h1 className="font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight text-listen md:text-6xl">
                {/* The brand name leads the heading for search engines; the tagline
                    is what a human reads. Hidden text keeps the visual design while
                    making the H1 text itself carry the product name. */}
                <span className="sr-only">OpenWhisp: </span>
                Speak. It&rsquo;s typed.
                <br />
                <span className="text-speak">Nothing leaves your Mac.</span>
              </h1>
              <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-text-d">
                Words appear <em className="not-italic font-semibold text-listen">as you talk</em> &mdash; about a
                third of a second behind your voice, already punctuated. Release the key and they land in any app.
                And it&rsquo;s the only dictation app{" "}
                <a href="#mcp" className="border-b border-speak/45 text-speak transition-colors hover:border-speak">
                  your coding agent can talk to
                </a>
                .
              </p>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <MagneticButton href={REPO} variant="primary">
                  <GithubLogo weight="fill" className="h-5 w-5" /> Star on GitHub
                </MagneticButton>
                <MagneticButton href={DMG} variant="ghost">
                  <DownloadSimple className="h-5 w-5" weight="bold" /> Download for macOS
                </MagneticButton>
              </div>
              <p className="mt-5 font-mono text-[13px] text-muted-d">
                Free &amp; open source &middot; macOS&nbsp;15+ &middot; Apple&nbsp;Silicon &middot; MIT
              </p>
            </div>

            {/* the signature overlay */}
            <figure
              className="rise rounded-3xl border border-line p-6 pb-5 shadow-[0_30px_80px_-30px_#000]"
              style={{ background: "color-mix(in srgb, var(--color-ink-2) 92%, var(--color-listen))", animationDelay: "120ms" }}
              aria-label="OpenWhisp listening and transcribing speech into text"
            >
              <Waveform className="block h-24 w-full [filter:drop-shadow(0_0_6px_color-mix(in_srgb,var(--color-speak)_45%,transparent))]" />
              <figcaption className="mt-3.5 min-h-[2.4em] text-[17px] text-listen">
                Speak. It&rsquo;s typed. Nothing leaves your Mac.
                <span className="caret-blink ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-0.5 bg-speak align-text-bottom" />
              </figcaption>
              <p className="mt-4 font-mono text-xs text-muted-d">
                <Kbd>hold</Kbd> to talk &middot; release to insert
              </p>
            </figure>
          </div>
        </section>

        {/* PILLARS — the three reasons, stated once */}
        <section aria-label="Why OpenWhisp" className="border-y border-line bg-ink-2">
          <div className="mx-auto grid max-w-[1180px] gap-px overflow-hidden rounded-2xl px-6 py-16 md:grid-cols-3">
            <Pillar icon={<Lightning weight="duotone" className="h-7 w-7" />} title="Realtime, not batch">
              Powered by Parakeet, our default engine: words stream in ~0.3&nbsp;s behind your voice with
              punctuation, and the final text lands the instant you let go.
            </Pillar>
            <Pillar icon={<ShieldCheck weight="duotone" className="h-7 w-7" />} title="Never phones home">
              Transcription runs entirely on your machine and works offline. Your audio never leaves the Mac
              unless you explicitly turn on a cloud model.
            </Pillar>
            <Pillar icon={<CurrencyDollarSimple weight="duotone" className="h-7 w-7" />} title="Free, and yours">
              No price, no account, no subscription, no usage meter. It runs on hardware you already own, and the
              source is yours to read and change.
            </Pillar>
          </div>
        </section>

        {/* AGENT BRIDGE — the differentiator, straight after the pillars */}
        <section id="mcp" className="relative overflow-hidden py-20 md:py-24">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 60% at 15% 25%, color-mix(in srgb, var(--color-speak) 10%, transparent), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-[1180px] px-6">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-speak">
              <PlugsConnected weight="duotone" className="h-4 w-4" />
              Agent Bridge &middot; built-in MCP server
            </p>
            <h2 className="mt-5 max-w-[22ch] font-display text-3xl font-semibold tracking-tight text-listen md:text-[2.5rem]">
              Give your coding agent a voice &mdash; yours
            </h2>
            <p className="mt-4 max-w-[64ch] leading-relaxed text-text-d">
              OpenWhisp doubles as a local{" "}
              <a
                href="https://modelcontextprotocol.io"
                rel="noopener"
                className="border-b border-speak/45 text-speak transition-colors hover:border-speak"
              >
                MCP
              </a>{" "}
              server for Claude Code, Cursor, and any MCP-aware agent. Instead of stopping mid-task to wait for
              typed input, your agent asks you out loud &mdash; you answer by voice and it keeps working.{" "}
              <span className="text-listen">No other dictation app ships this.</span>
            </p>

            <div className="mt-11 grid items-start gap-10 md:grid-cols-[1fr_1.05fr]">
              <ul className="grid gap-4">
                {AGENT_TOOLS.map((t) => (
                  <li key={t.name} className="rounded-2xl border border-line bg-ink-2 p-5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-[13.5px] font-medium text-speak">{t.name}</span>
                      {t.badge && (
                        <span className="rounded-full border border-refine/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-refine">
                          {t.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-d">{t.desc}</p>
                  </li>
                ))}
              </ul>
              <AgentBridgeDemo />
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-2">
              <p className="max-w-[52ch] text-[15px] leading-relaxed text-text-d">
                <span className="font-semibold text-listen">Works where built-in voice modes don&rsquo;t.</span>{" "}
                Any API key or Bedrock setup, over SSH, in regulated environments, in any editor &mdash; because
                it never phones home in the first place. It even picks up your project&rsquo;s branch and file
                names so spoken code lands right, and a tap finishes your answer.
              </p>
              <p className="max-w-[52ch] font-mono text-[13px] leading-relaxed text-muted-d">
                <span className="text-speak">Off by default.</span> Nothing listens until you enable it, and you
                approve each agent and each capability. It&rsquo;s a private socket on your Mac &mdash; no open
                port, no cloud &mdash; and your hotkey always takes the mic back.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES — light surface, 2-col asymmetric grid via divide lines */}
        <section id="features" className="bg-paper py-20 text-ink md:py-24">
          <div className="mx-auto max-w-[1180px] px-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#0a7d84]">Also in the box</p>
            <h2 className="mt-4 max-w-[20ch] font-display text-3xl font-semibold tracking-tight md:text-[2.5rem]">
              Everything else, still on your Mac
            </h2>
            <div className="mt-11 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              <Feature icon={<TextAa weight="duotone" />} title="Writes like you meant it">
                Filler words gone, punctuation right, your jargon spelled correctly. Say &ldquo;new
                paragraph&rdquo; and get one.
              </Feature>
              <Feature icon={<Brain weight="duotone" />} title="Built-in offline AI">
                A small model runs on your Mac to polish text &mdash; no setup, no server. Dial it from a light
                touch to a full polish, and revert to your exact words anytime.
              </Feature>
              <Feature icon={<UsersThree weight="duotone" />} title="Meetings">
                Record a call, label who spoke (Me / Them), and get a Markdown summary &mdash; all locally.
              </Feature>
              <Feature icon={<FilmSlate weight="duotone" />} title="Files &amp; folders">
                Drop in audio or video, or point it at a watch folder. Exports text or SRT/VTT subtitles.
              </Feature>
              <Feature icon={<Broadcast weight="duotone" />} title="Live captions for streams">
                Drop a Browser source into OBS and your speech becomes subtitles &mdash; served from your own
                Mac, and translatable to English as you speak.
              </Feature>
              <Feature icon={<Translate weight="duotone" />} title="Translation, on your Mac">
                Speak any supported language and type English. Runs on Apple&rsquo;s on-device translation
                &mdash; works with every engine, and an optional live preview shows it as you talk.
              </Feature>
              <Feature icon={<PuzzlePiece weight="duotone" />} title="Plugins">
                Optional surfaces you drive by voice &mdash; say &ldquo;create a meme about&hellip;&rdquo; and the
                first one builds it locally. Off until you enable them.
              </Feature>
              <Feature icon={<Command weight="duotone" />} title="Modes &amp; automation">
                Per-app tone &mdash; casual in Slack, formal in Mail, verbatim in your terminal. Drive dictation
                from Raycast or Alfred with the <code className="font-mono text-[0.85em]">openwhisp://</code> URL
                scheme.
              </Feature>
              <Feature icon={<Lightning weight="duotone" />} title="Rules &amp; output targets">
                On finish: run a Shortcut, hit a webhook, append to a file. Fails open &mdash; your words always
                land.
              </Feature>
              <Feature icon={<ClockCounterClockwise weight="duotone" />} title="Searchable history">
                Everything you&rsquo;ve dictated, stored locally. Re-run any entry through a newer model.
              </Feature>
              <Feature icon={<Cpu weight="duotone" />} title="Five engines">
                Parakeet by default. WhisperKit, whisper.cpp, Apple Speech, and Apple&rsquo;s SpeechAnalyzer
                (macOS&nbsp;26) are one click away &mdash; with ~40 languages auto-detected.
              </Feature>
            </div>
          </div>
        </section>

        {/* SPOTLIGHT — voice editing */}
        <section id="refine" className="relative overflow-hidden py-20 md:py-24">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 60% at 80% 28%, color-mix(in srgb, var(--color-refine) 13%, transparent), transparent 70%)",
            }}
          />
          <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-6 md:grid-cols-2">
            <div>
              <Eyebrow accent="refine">New &middot; voice editing</Eyebrow>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-listen md:text-[2.5rem]">
                Select text anywhere, then edit it by voice
              </h2>
              <p className="mt-5 max-w-[46ch] leading-relaxed text-text-d">
                OpenWhisp isn&rsquo;t just for dictating new text. Highlight a sentence in any app, hold your
                dictation key, tap the Refine key &mdash; <Kbd className="text-[0.8em]">right &#8963;</Kbd> by
                default &mdash; and say what you want changed. Release, and it&rsquo;s rewritten in place. No
                retyping, no copy-paste, no switching windows.
              </p>
              <ul className="mt-6 grid gap-3.5">
                <Bullet>
                  &ldquo;Make it more formal&rdquo; &middot; &ldquo;Translate to Russian&rdquo; &middot;
                  &ldquo;Tighten this up&rdquo; &mdash; plain language, any language.
                </Bullet>
                <Bullet>
                  Your selection is read through the Accessibility API &mdash; and if an app doesn&rsquo;t
                  expose it, your clipboard is restored after the fallback copy. Secure and password fields
                  are never read.
                </Bullet>
                <Bullet>The rewrite can run on the built-in offline model or your own local server to stay fully private, or OpenAI if you prefer.</Bullet>
              </ul>
            </div>

            {/* before -> gesture -> after, animated on a loop */}
            <EditDemo />
          </div>
        </section>

        {/* PRIVACY */}
        <section id="privacy" className="mx-auto grid max-w-[1180px] items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-24">
          <div>
            <Eyebrow>Privacy by construction</Eyebrow>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-listen md:text-[2.5rem]">
              The default is &ldquo;stays on this Mac&rdquo;
            </h2>
            <ul className="mt-6 grid gap-4">
              <Bullet>Audio is recorded locally and the recording is deleted after each transcription.</Bullet>
              <Bullet>
                History, settings, and any API keys live on your machine &mdash; keys in the macOS Keychain, not
                in plain text.
              </Bullet>
              <Bullet>
                AI cleanup can run fully on-device: the built-in offline model and your own local server both
                keep everything on your Mac. The <em className="not-italic font-semibold text-speak">only</em>{" "}
                time text leaves your machine is if you choose the OpenAI provider.
              </Bullet>
              <Bullet>Your transcript text is never written to the app&rsquo;s log files.</Bullet>
            </ul>
          </div>
          <BoundaryDiagram />
        </section>

        {/* OPEN SOURCE */}
        <section id="source" className="border-y border-line bg-ink-2 py-20 md:py-24">
          <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 md:grid-cols-[1fr_1.05fr]">
            <div>
              <Eyebrow>Open source &middot; MIT</Eyebrow>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-listen md:text-[2.5rem]">
                Read it, build it, change it
              </h2>
              <p className="mt-4 max-w-[46ch] text-muted-d">
                OpenWhisp is MIT-licensed and built from plain Swift scripts &mdash; no Xcode project required.
                Clone it, build the bundled runtimes, and run:
              </p>
              <div className="mt-7 flex flex-wrap gap-3.5">
                <Button href={REPO} variant="primary">
                  <GithubLogo weight="fill" className="h-5 w-5" /> Star on GitHub
                </Button>
                <Button href={`${REPO}/releases`} variant="ghost">All releases</Button>
              </div>
              <p className="mt-6 font-mono text-[13px] text-muted-d">
                The download is signed and notarized by Apple, so it opens with a double-click &mdash; no Gatekeeper
                warnings. Prefer to build it yourself? The full source is right here.
              </p>
            </div>
            <Terminal />
          </div>
        </section>

        {/* FAQ — visible copy mirrors the FAQPage JSON-LD in index.html */}
        <section id="faq" className="mx-auto max-w-[820px] px-6 py-20 md:py-24">
          <Eyebrow>Questions, answered</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-listen md:text-[2.5rem]">
            Frequently asked questions
          </h2>
          <div className="mt-9 border-y border-line">
            <Faq q="Does my audio ever leave my Mac?">
              No. Transcription runs entirely on your Mac and works offline. Audio is never uploaded, and the
              recording is deleted after each transcription. The only time any text leaves your machine is if
              you explicitly choose the optional OpenAI provider for AI cleanup.
            </Faq>
            <Faq q="Is OpenWhisp the same as OpenWISP?">
              No &mdash; different projects with confusingly similar names. <strong>OpenWISP</strong> (with an
              <em>i</em>) is a network-management system for wifi and IoT. <strong>OpenWhisp</strong> (with an{" "}
              <em>h</em>, as in <em>whisper</em>) is this app: a free, open-source realtime dictation app for
              macOS that runs entirely on your device.
            </Faq>
            <Faq q="How much does OpenWhisp cost?">
              Nothing. OpenWhisp is free and open source under the MIT license &mdash; no account, no
              subscription, no usage meter.
            </Faq>
            <Faq q="What are the system requirements?">
              An Apple Silicon Mac (M1 or newer) running macOS&nbsp;15 Sequoia or later.
            </Faq>
            <Faq q="Can OpenWhisp translate what I say?">
              Yes, and it happens on your Mac. Turn on &ldquo;Translate to English,&rdquo; download the
              language pair once, and dictation in any supported language lands as English text &mdash;
              translated by Apple&rsquo;s on-device framework, with nothing sent to a server. It works with
              every transcription engine, and an optional live preview shows the translation while you speak.
            </Faq>
            <Faq q="How is it different from the built-in macOS dictation?">
              OpenWhisp streams words in about 0.3 seconds behind your voice, already punctuated, and adds
              things macOS dictation doesn&rsquo;t have: voice editing of selected text, AI refinement that runs
              offline, custom vocabulary, per-app modes, a searchable local history, and a built-in MCP server
              so AI coding agents can use your voice.
            </Faq>
            <Faq q="Can AI coding agents like Claude Code use OpenWhisp?">
              Yes. OpenWhisp doubles as a local MCP server, so Claude Code, Cursor, and any MCP-aware agent can
              ask you questions out loud and take your spoken answer, rewrite text with your on-device model,
              and read your recent dictations. It works with any API key or Bedrock setup, over SSH, and in
              regulated environments, because nothing is ever sent to the cloud. It is off until you enable it,
              and you approve each agent and each capability.
            </Faq>
            <Faq q="How do I install OpenWhisp?">
              Download the DMG, drag OpenWhisp to your Applications folder, and open it. The build is signed and
              notarized by Apple, so it launches with a double-click &mdash; no Gatekeeper prompts. You can also
              build it yourself from source.
            </Faq>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden py-24 text-center">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 80% at 50% 120%, color-mix(in srgb, var(--color-speak) 15%, transparent), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-[1180px] px-6">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-listen md:text-[2.75rem]">
              Try it on your next sentence
            </h2>
            <p className="mt-3 text-muted-d">Free, open source, and entirely yours.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <Button href={REPO} variant="primary">
                <GithubLogo weight="fill" className="h-5 w-5" /> Star on GitHub
              </Button>
              <Button href={DMG} variant="ghost">
                <DownloadSimple weight="bold" className="h-5 w-5" /> Download for macOS
              </Button>
            </div>
            <p className="mt-5 font-mono text-[13px] text-muted-d">
              Signed &amp; notarized by Apple &middot; macOS&nbsp;15+ &middot; Apple&nbsp;Silicon
            </p>
          </div>
        </section>

        {/* SUPPORT */}
        <section id="support" className="border-t border-line py-16">
          <div className="mx-auto max-w-[640px] rounded-2xl border border-refine/25 bg-refine/[0.06] p-7 text-center">
            <p className="flex items-center justify-center gap-2 font-display text-lg font-semibold text-listen">
              <Heart weight="fill" className="h-5 w-5 text-refine" />
              I appreciate your support
            </p>
            <p className="mx-auto mt-2 max-w-[46ch] text-[15px] leading-relaxed text-muted-d">
              OpenWhisp is free and open source. If it saves you some typing, a coffee helps cover the Apple
              Developer membership and keeps development moving.
            </p>
            <a
              href={DONATE}
              rel="noopener"
              className="mt-5 inline-flex items-center gap-2 rounded-[10px] border border-refine/40 px-5 py-2.5 font-display text-sm font-semibold text-refine transition-all duration-150 hover:bg-refine/10 active:scale-[0.98]"
            >
              <Heart weight="fill" className="h-4 w-4" /> Buy me a coffee
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-t border-line py-20 md:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-12 px-6 md:grid-cols-[1fr_1.1fr]">
            <div>
              <Eyebrow>Say hello</Eyebrow>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-listen md:text-[2.5rem]">
                Questions, ideas, kind words
              </h2>
              <p className="mt-4 max-w-[44ch] leading-relaxed text-muted-d">
                Found a bug or want a feature? The best place is a{" "}
                <a
                  href={`${REPO}/issues`}
                  rel="noopener"
                  className="border-b border-speak/45 text-speak transition-colors hover:border-speak"
                >
                  GitHub issue
                </a>
                . For everything else &mdash; feedback, questions, or just to say the app saved you some
                typing &mdash; drop a note here and it lands straight in my inbox.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-line py-10">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-8 gap-y-4 px-6">
          <div className="flex items-center gap-2.5 font-display font-semibold text-listen">
            <BrandMark className="h-5 w-5 text-speak" />
            OpenWhisp
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-muted-d" aria-label="Footer">
            <a className="hover:text-listen" href={REPO} rel="noopener">GitHub</a>
            <a className="hover:text-listen" href={`${REPO}#readme`} rel="noopener">Docs</a>
            <a className="hover:text-listen" href={`${REPO}/releases`} rel="noopener">Releases</a>
            <a className="hover:text-listen" href={withBase("/changelog/")}>Changelog</a>
            <a className="hover:text-listen" href="#faq">FAQ</a>
            <a className="hover:text-listen" href="#contact">Contact</a>
            <a className="hover:text-listen" href={`${REPO}/blob/main/LICENSE`} rel="noopener">License</a>
            <a className="hover:text-refine" href={DONATE} rel="noopener">Support</a>
          </nav>
          <p className="ml-auto text-[13px] text-muted-d">
            &copy; {new Date().getFullYear()} OpenWhisp &middot; MIT licensed &middot; Powered by{" "}
            <a className="hover:text-speak" href="https://github.com/argmaxinc/WhisperKit" rel="noopener">
              WhisperKit
            </a>{" "}
            &amp;{" "}
            <a className="hover:text-speak" href="https://github.com/ggerganov/whisper.cpp" rel="noopener">
              whisper.cpp
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

/* ---------- small building blocks ---------- */

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    // FormSubmit's honeypot: bots fill it, humans never see it.
    if (data._honey) return;
    setStatus("sending");
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: "OpenWhisp contact form",
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      // FormSubmit returns 200 with success:"false" (e.g. before the form is
      // activated) — treat that as a failure so the sender gets the fallback.
      const body = await res.json().catch(() => null);
      if (body && String(body.success) === "false") throw new Error("rejected");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-speak/30 bg-speak/[0.06] p-8 text-center">
        <CheckCircle weight="duotone" className="h-10 w-10 text-speak" />
        <p className="mt-4 font-display text-xl font-semibold text-listen">Message sent</p>
        <p className="mt-2 max-w-[36ch] text-[15px] leading-relaxed text-muted-d">
          Thanks for writing &mdash; it&rsquo;s on its way to my inbox. If you left an email,
          I&rsquo;ll get back to you.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-[10px] border border-line bg-ink-2 px-4 py-3 text-[15px] text-listen outline-none transition-colors placeholder:text-muted-d/60 focus:border-speak/60";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4" aria-label="Contact form">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-d">Name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Ada Lovelace" className={field} />
        </label>
        <label className="grid gap-1.5">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-d">
            Email <span className="normal-case tracking-normal">(if you&rsquo;d like a reply)</span>
          </span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={field} />
        </label>
      </div>
      <label className="grid gap-1.5">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-d">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What's on your mind?"
          className={`${field} resize-y`}
        />
      </label>
      {/* honeypot — visually hidden, tabbed past by humans */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-transparent bg-speak px-6 py-3 font-display text-base font-semibold text-[#04181a] transition-all duration-150 hover:shadow-[0_0_24px_-2px_color-mix(in_srgb,var(--color-speak)_55%,transparent)] active:translate-y-px disabled:cursor-default disabled:opacity-60 disabled:hover:shadow-none"
        >
          <PaperPlaneTilt weight="bold" className="h-5 w-5" />
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && (
          <p className="text-sm text-refine">
            Hmm, that didn&rsquo;t go through &mdash; mind emailing me directly at{" "}
            <a className="border-b border-refine/45 hover:border-refine" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            ?
          </p>
        )}
      </div>
    </form>
  );
}

function Button({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "ghost";
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[10px] border px-6 py-3 font-display text-base font-semibold transition-all duration-150 active:translate-y-px";
  const styles =
    variant === "primary"
      ? "border-transparent bg-speak text-[#04181a] hover:shadow-[0_0_24px_-2px_color-mix(in_srgb,var(--color-speak)_55%,transparent)]"
      : "border-line bg-transparent text-text-d hover:border-muted-d hover:bg-ink-2";
  return (
    <a href={href} rel="noopener" className={`${base} ${styles}`}>
      {children}
    </a>
  );
}

function Kbd({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd className={`rounded-md border border-b-2 border-line bg-ink px-2 py-0.5 font-mono text-[0.86em] text-text-d ${className}`}>
      {children}
    </kbd>
  );
}

function Pillar({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-ink-2 p-8">
      <div className="mb-4 text-speak">{icon}</div>
      <h3 className="font-display text-xl font-semibold text-listen" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="mt-2.5 text-[15px] leading-relaxed text-muted-d">{children}</p>
    </div>
  );
}

function Feature({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <article className="border-t border-[#e2e7ef] pt-5">
      <div className="mb-3 text-[#0a7d84] [&>svg]:h-6 [&>svg]:w-6">{icon}</div>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{children}</p>
    </article>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-line last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-[17px] font-semibold text-listen transition-colors hover:text-speak [&::-webkit-details-marker]:hidden">
        {q}
        <CaretRight
          weight="bold"
          className="h-4 w-4 shrink-0 text-muted-d transition-transform duration-200 group-open:rotate-90"
        />
      </summary>
      <p className="max-w-[62ch] pb-6 text-[15.5px] leading-relaxed text-muted-d">{children}</p>
    </details>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-7 text-[15.5px] leading-relaxed text-text-d">
      <span className="absolute left-0 top-[0.5em] h-2.5 w-2.5 rounded-[3px] bg-speak shadow-[0_0_10px_color-mix(in_srgb,var(--color-speak)_70%,transparent)]" />
      {children}
    </li>
  );
}

function BoundaryDiagram() {
  return (
    <div
      role="img"
      aria-label="Microphone, transcription, on-device AI refinement, and typed text all sit inside a boundary labeled 'your Mac'. A separate, optional, opt-in path leads outside to OpenAI cleanup."
    >
      <div
        className="relative rounded-2xl border-2 border-dashed px-6 pb-7 pt-10"
        style={{
          borderColor: "color-mix(in srgb, var(--color-speak) 55%, var(--color-line))",
          background: "color-mix(in srgb, var(--color-speak) 5%, var(--color-ink-2))",
        }}
      >
        <span className="absolute -top-3 left-5 rounded-full border border-speak/40 bg-ink px-3 py-0.5 font-mono text-xs uppercase tracking-[0.12em] text-speak">
          your Mac
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Node>Mic</Node>
          <CaretRight className="h-4 w-4 text-speak" />
          <Node>Transcribe</Node>
          <CaretRight className="h-4 w-4 text-speak" />
          <Node>Refine (AI)</Node>
          <CaretRight className="h-4 w-4 text-speak" />
          <Node>Typed text</Node>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 px-2 pt-4">
        <span className="font-mono text-xs text-muted-d">&#8627; only if you pick OpenAI</span>
        <Node dashed>OpenAI cleanup</Node>
      </div>
    </div>
  );
}

function Node({ children, dashed }: { children: React.ReactNode; dashed?: boolean }) {
  return (
    <span
      className={`rounded-[10px] border bg-ink px-3.5 py-2.5 font-mono text-[13.5px] ${
        dashed ? "border-dashed border-line text-muted-d" : "border-line text-listen"
      }`}
    >
      {children}
    </span>
  );
}

function Terminal() {
  return (
    <pre
      className="overflow-x-auto rounded-2xl border border-line bg-[#06080c] p-6 font-mono text-[13.5px] leading-[1.85] text-text-d shadow-[0_24px_60px_-30px_#000]"
      aria-label="Build commands"
    >
      <code>
        <span className="text-muted"># clone with the whisper.cpp submodule</span>
        {"\n"}git clone --recursive \{"\n"}  {REPO}.git{"\n"}cd openwhisp{"\n\n"}
        <span className="text-muted"># build the bundled whisper runtime</span>
        {"\n"}./scripts/build-whisper.sh{"\n\n"}
        <span className="text-muted"># compile, package, run</span>
        {"\n"}./build.sh &amp;&amp; ./package.sh{"\n"}open build/OpenWhisp.app
      </code>
    </pre>
  );
}

function AgentBridgeDemo() {
  return (
    <pre
      className="overflow-x-auto rounded-2xl border border-line bg-[#06080c] p-6 font-mono text-[13.5px] leading-[1.85] text-text-d shadow-[0_24px_60px_-30px_#000]"
      aria-label="Agent Bridge example: one-time setup, an agent asking a question by voice, and refining text from a shell pipeline"
    >
      <code>
        <span className="text-muted"># one-time setup — registers the server + agent instructions</span>
        {"\n"}openwhisp setup claude-code{"\n\n"}
        <span className="text-muted"># later, mid-task, your agent asks out loud:</span>
        {"\n"}
        <span className="text-refine">&#9679;</span> openwhisp_dictate(&quot;Deploy to staging or production?&quot;)
        {"\n"}
        <span className="text-muted">  &#8627; overlay opens &middot; you speak &middot; silence sends it</span>
        {"\n"}
        <span className="text-speak">&#9679;</span> &quot;production, and tag it v1.4&quot;{"\n\n"}
        <span className="text-muted"># the CLI composes in pipelines, too</span>
        {"\n"}pbpaste | openwhisp refine -i &quot;make it formal&quot; | pbcopy
      </code>
    </pre>
  );
}

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
