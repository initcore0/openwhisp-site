import { useEffect, useRef } from "react";

/**
 * The signature OpenWhisp waveform — a re-creation of the app's "Quiet Glass"
 * recording overlay. Bars are tall in the middle and taper out (matching the
 * app icon); they animate as if hearing speech. Reduced-motion renders a single
 * static frame. Animates on a canvas via transform-free 2D drawing.
 *
 * Performance notes (this runs behind everything, so it must stay cheap):
 * - The cyan glow is a static CSS drop-shadow on the <canvas> element, NOT a
 *   per-frame canvas shadowBlur (shadowBlur is recomputed every draw and is the
 *   single most expensive 2D op — it was starving the main thread on scroll).
 * - The loop is throttled to ~30fps; this ambient motion is indistinguishable
 *   from 60fps but does half the work.
 * - Per-bar envelope() is constant, so it's precomputed once, not 48×/frame.
 * - Pauses when off-screen (IntersectionObserver) and when the tab is hidden.
 */
const BARS = 48;
const ACCENT_LISTEN = "#E8ECF2";
const ACCENT_SPEAK = "#3DD8E0";
const FRAME_MS = 1000 / 30; // cap at ~30fps

function envelope(n: number): number {
  const x = (n / (BARS - 1)) * 2 - 1;
  return Math.pow(Math.cos((x * Math.PI) / 2), 1.6);
}

export function Waveform({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const seeds = Array.from({ length: BARS }, (_, i) => i * 1.37 + (i % 5) * 0.6);
    // Envelope + per-bar color are constant across frames — compute once.
    const envs = Array.from({ length: BARS }, (_, n) => envelope(n));
    const colors = envs.map((e) => (e > 0.62 ? ACCENT_SPEAK : ACCENT_LISTEN));
    const alphas = envs.map((e) => 0.55 + e * 0.45);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function size() {
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = Math.round(rect.width * dpr);
      canvas!.height = Math.round(rect.height * dpr);
    }

    function draw(t: number, energy: number) {
      const c = ctx!;
      const w = canvas!.width;
      const h = canvas!.height;
      c.clearRect(0, 0, w, h);
      const mid = h / 2;
      const gap = w / BARS;
      const barW = Math.max(2 * dpr, gap * 0.36);
      const r = barW / 2;
      for (let n = 0; n < BARS; n++) {
        const env = envs[n];
        const wobble =
          (Math.sin(t * 0.004 + seeds[n]) * 0.5 + 0.5) *
          (Math.sin(t * 0.011 + seeds[n] * 0.7) * 0.5 + 0.5);
        const amp = env * (0.18 + wobble * 0.82 * energy);
        const barH = Math.max(3 * dpr, amp * h * 0.82);
        const x = n * gap + (gap - barW) / 2;
        c.globalAlpha = alphas[n];
        c.fillStyle = colors[n];
        c.beginPath();
        c.roundRect(x, mid - barH / 2, barW, barH, r);
        c.fill();
      }
      c.globalAlpha = 1;
    }

    size();
    if (reduce) {
      draw(1200, 0.6);
      return;
    }

    let raf = 0;
    let running = false;
    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return; // throttle to ~30fps
      last = now;
      const energy = 0.55 + Math.sin(now * 0.006) * 0.22;
      draw(now, Math.max(0.15, energy));
    };
    const start = () => {
      if (!running && !document.hidden) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only run while the waveform is on screen.
    let onScreen = false;
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0].isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0.1 },
    );
    io.observe(canvas);

    // Also pause when the tab is backgrounded.
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let resizeTimer: number;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(size, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
