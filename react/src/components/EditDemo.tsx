import { useEffect, useRef, useState } from "react";

/**
 * The signature voice-editing moment, animated. On a loop (only while visible):
 *   1. the "before" selection sits highlighted
 *   2. the double-tap gesture fires, "Refining…" shimmers
 *   3. the "after" text types out and the card lights up
 * Reduced-motion renders the finished state, no loop.
 */
const BEFORE = "hey so i can’t make the 3pm thing, can we push it";
const AFTER = "Hi — I’m no longer able to make our 3:00 PM meeting. Could we reschedule?";

type Phase = "idle" | "refining" | "typing" | "done";

export function EditDemo() {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      setTyped(AFTER);
      return;
    }

    let timers: number[] = [];
    let raf = 0;
    let alive = true;

    const clearAll = () => {
      timers.forEach(clearTimeout);
      timers = [];
      cancelAnimationFrame(raf);
    };

    function runCycle() {
      if (!alive) return;
      setPhase("idle");
      setTyped("");
      timers.push(window.setTimeout(() => setPhase("refining"), 1100));
      timers.push(
        window.setTimeout(() => {
          setPhase("typing");
          let i = 0;
          const tick = () => {
            if (!alive) return;
            i += 1;
            setTyped(AFTER.slice(0, i));
            if (i < AFTER.length) {
              timers.push(window.setTimeout(tick, 26));
            } else {
              setPhase("done");
              timers.push(window.setTimeout(runCycle, 2600)); // hold, then loop
            }
          };
          tick();
        }, 2600),
      );
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          clearAll();
          runCycle();
        } else {
          clearAll();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);

    return () => {
      alive = false;
      clearAll();
      io.disconnect();
    };
  }, []);

  const refining = phase === "refining";
  const showAfter = phase === "typing" || phase === "done";

  return (
    <figure ref={ref} className="m-0 grid gap-3" aria-label="Selected text rewritten in place after a spoken instruction">
      {/* before */}
      <div
        className="rounded-2xl border bg-ink-2 p-5 transition-colors duration-500"
        style={{
          borderColor: refining ? "color-mix(in srgb, var(--color-refine) 35%, var(--color-line))" : "var(--color-line)",
        }}
      >
        <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-d">
          selected
        </span>
        <p
          className="mt-2 text-[16.5px] leading-relaxed transition-opacity duration-500"
          style={{ color: "var(--color-listen)", opacity: showAfter ? 0.4 : 1 }}
        >
          {BEFORE}
        </p>
      </div>

      {/* gesture */}
      <div className="flex flex-wrap items-center gap-3 pl-1">
        <kbd
          className="rounded-md border border-b-2 px-2 py-0.5 font-mono text-[0.86em] text-text-d transition-transform duration-200"
          style={{
            borderColor: "color-mix(in srgb, var(--color-refine) 45%, var(--color-line))",
            transform: refining ? "scale(1.06)" : "scale(1)",
          }}
        >
          double-tap
        </kbd>
        <span className="text-[15px] italic text-text-d">&ldquo;make it polite and professional&rdquo;</span>
        <span className="ml-auto flex items-center gap-2 font-mono text-xs">
          <span
            className="pulse-dot h-2 w-2 rounded-full bg-refine shadow-[0_0_8px_var(--color-refine)] transition-opacity duration-300"
            style={{ opacity: refining ? 1 : 0.3 }}
          />
          <span className={refining ? "refining-shimmer" : "text-muted-d"}>
            {phase === "done" ? "Done" : "Refining…"}
          </span>
        </span>
      </div>

      {/* after */}
      <div
        className="rounded-2xl border bg-ink-2 p-5 transition-all duration-500"
        style={{
          borderColor: showAfter ? "color-mix(in srgb, var(--color-refine) 40%, var(--color-line))" : "var(--color-line)",
          boxShadow: phase === "done" ? "0 0 0 1px color-mix(in srgb, var(--color-refine) 18%, transparent)" : "none",
          opacity: showAfter ? 1 : 0.55,
        }}
      >
        <span
          className="rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-500"
          style={{
            borderColor: showAfter ? "color-mix(in srgb, var(--color-refine) 40%, var(--color-line))" : "var(--color-line)",
            color: showAfter ? "var(--color-refine)" : "var(--color-muted-d)",
          }}
        >
          replaced in place
        </span>
        <p className="mt-2 min-h-[3em] text-[16.5px] leading-relaxed text-listen">
          {typed}
          {phase === "typing" && <span className="caret-blink ml-0.5 inline-block h-[1.05em] w-0.5 translate-y-0.5 bg-refine align-text-bottom" />}
        </p>
      </div>
    </figure>
  );
}
