import { useEffect, useRef } from "react";

/**
 * The signature OpenWhisp waveform — a re-creation of the app's "Quiet Glass"
 * recording overlay. Bars are tall in the middle and taper out (matching the
 * app icon); they animate as if hearing speech. Reduced-motion renders a single
 * static frame. Animates on a canvas via transform-free 2D drawing (no layout
 * thrash), and only while on screen.
 */
const BARS = 48;
const ACCENT_LISTEN = "#E8ECF2";
const ACCENT_SPEAK = "#3DD8E0";

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
      c.shadowColor = ACCENT_SPEAK;
      c.shadowBlur = 8 * dpr * energy;
      for (let n = 0; n < BARS; n++) {
        const env = envelope(n);
        const wobble =
          (Math.sin(t * 0.004 + seeds[n]) * 0.5 + 0.5) *
          (Math.sin(t * 0.011 + seeds[n] * 0.7) * 0.5 + 0.5);
        const amp = env * (0.18 + wobble * 0.82 * energy);
        const barH = Math.max(3 * dpr, amp * h * 0.82);
        const x = n * gap + (gap - barW) / 2;
        c.globalAlpha = 0.55 + env * 0.45;
        c.fillStyle = env > 0.62 ? ACCENT_SPEAK : ACCENT_LISTEN;
        c.beginPath();
        c.roundRect(x, mid - barH / 2, barW, barH, barW / 2);
        c.fill();
      }
      c.globalAlpha = 1;
      c.shadowBlur = 0;
    }

    size();
    if (reduce) {
      draw(1200, 0.6);
      return;
    }

    let raf = 0;
    let running = false;
    const loop = (now: number) => {
      const energy = 0.55 + Math.sin(now * 0.006) * 0.22;
      draw(now, Math.max(0.15, energy));
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) start();
      },
      { threshold: 0.1 },
    );
    io.observe(canvas);

    let resizeTimer: number;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(size, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
