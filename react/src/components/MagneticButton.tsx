import { useRef, type ReactNode } from "react";

/**
 * A button that pulls slightly toward the cursor. The translation is written to
 * CSS custom properties (--mx / --my) and applied via a `.magnetic` transform,
 * so it never triggers a React re-render on mouse move. Disabled for pointer:
 * coarse (touch) and reduced-motion via CSS.
 */
export function MagneticButton({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "ghost";
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const mx = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const my = (e.clientY - (r.top + r.height / 2)) * 0.35;
    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);
  }
  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  }

  const base =
    "magnetic inline-flex items-center justify-center gap-2 rounded-[10px] border px-6 py-3 font-display text-base font-semibold active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "border-transparent bg-speak text-[#04181a] hover:shadow-[0_0_28px_-2px_color-mix(in_srgb,var(--color-speak)_60%,transparent)]"
      : "border-line bg-transparent text-text-d hover:border-muted-d hover:bg-ink-2";

  return (
    <a
      ref={ref}
      href={href}
      rel="noopener"
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`${base} ${styles}`}
    >
      {children}
    </a>
  );
}
