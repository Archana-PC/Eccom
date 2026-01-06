import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const cx = (...c) => c.filter(Boolean).join(" ");

const StylesRibbon = ({ styles = [] }) => {
  const trackRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeSlug = pathname.startsWith("/styles/")
    ? pathname.split("/styles/")[1]?.split("/")[0]
    : null;

  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const sync = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft < max - 1);
  };

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => sync();
    el.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => sync();
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [styles?.length]);

  const scrollByAmount = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <div className="w-full border-b border-border bg-bg-section/70 backdrop-blur supports-backdrop-filter:bg-bg-section/60">
      <div className="relative max-w-7xl mx-auto px-3">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-bg-section to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-bg-section to-transparent" />

        {/* Arrows (desktop) */}
        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          disabled={!canLeft}
          className={cx(
            "hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10",
            "h-9 w-9 items-center justify-center rounded-full border border-border",
            "bg-white/70 backdrop-blur shadow-sm",
            "transition-all hover:bg-white hover:shadow disabled:opacity-30 disabled:cursor-not-allowed"
          )}
          aria-label="Scroll left"
        >
          <span className="text-text-primary text-lg leading-none">‹</span>
        </button>

        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          disabled={!canRight}
          className={cx(
            "hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10",
            "h-9 w-9 items-center justify-center rounded-full border border-border",
            "bg-white/70 backdrop-blur shadow-sm",
            "transition-all hover:bg-white hover:shadow disabled:opacity-30 disabled:cursor-not-allowed"
          )}
          aria-label="Scroll right"
        >
          <span className="text-text-primary text-lg leading-none">›</span>
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          onMouseEnter={() => sync()}
          className={cx(
            "flex gap-2 overflow-x-auto no-scrollbar py-3 pr-6 pl-6 md:px-12",
            "scroll-smooth"
          )}
        >
          {styles.map((s) => {
            const isActive = activeSlug === s.slug;

            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => navigate(`/styles/${s.slug}`)}
                className={cx(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-semibold",
                  "border transition-all duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-primary)/40",
                  isActive
                    ? "border-transparent text-white shadow-sm " +
                      "bg-[linear-gradient(135deg,var(--brand-primary),var(--brand-secondary))]"
                    : "border-border bg-white/60 text-text-primary hover:bg-white hover:shadow-sm"
                )}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StylesRibbon;
