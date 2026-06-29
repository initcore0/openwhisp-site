import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Reveals children with a transform/opacity rise when they scroll into view.
 * One-shot (does not re-hide on scroll out). Honors prefers-reduced-motion by
 * rendering fully visible immediately. Uses IntersectionObserver — never a
 * scroll listener — per the performance guardrails.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error polymorphic ref across the small union is safe here
      ref={ref}
      className={`reveal${shown ? " reveal-in" : ""} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
