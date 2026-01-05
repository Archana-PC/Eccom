
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const CategoryRibbon = ({
  categories = [],
  showSaleBadge = true,
  saleBadgeText = "Sale Ends Soon",
  className = "",
  onCategoryClick = null,

  // Pagination hooks from parent (container/home page)
  hasNextPage = false,
  onLoadNextPage = null,
  isPaging = false,
}) => {
  const defaultCategories = useMemo(
    () => [
      { id: 1, name: "New Arrivals", slug: "new-arrivals" },
      { id: 2, name: "Best Sellers", slug: "best-sellers" },
      { id: 3, name: "Spring Collection", slug: "spring-collection" },
      { id: 4, name: "Summer Essentials", slug: "summer-essentials" },
      { id: 5, name: "Formal Wear", slug: "formal-wear" },
      { id: 6, name: "Accessories", slug: "accessories" },
      { id: 7, name: "Limited Edition", slug: "limited-edition" },
    ],
    []
  );

  const displayCategories =
    categories?.length > 0 ? categories : defaultCategories;

  const scrollerRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const prevLenRef = useRef(displayCategories.length);

  const handleCategoryClick = (category) => {
    onCategoryClick?.(category);
  };

  const updateShadows = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const left = el.scrollLeft;
    const right = el.scrollWidth - (el.scrollLeft + el.clientWidth);

    setCanLeft(left > 2);
    setCanRight(right > 2);
  };

  // Attach scroll/resize listeners only once
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateShadows();

    const onScroll = () => updateShadows();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateShadows);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateShadows);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recalculate when list size changes (ex: page-2 appended)
  useEffect(() => {
    updateShadows();

    // If new categories appended, nudge scroll so user can see new items
    if (displayCategories.length > prevLenRef.current) {
      requestAnimationFrame(() => {
        scrollerRef.current?.scrollBy({ left: 260, behavior: "smooth" });
        updateShadows();
      });
    }

    prevLenRef.current = displayCategories.length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayCategories.length]);

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "left" ? -260 : 260,
      behavior: "smooth",
    });
  };

  // ✅ MAIN CHANGE: right arrow can load next page if already at end
  const handleRight = async () => {
    const el = scrollerRef.current;
    if (!el) return;

    const remaining = el.scrollWidth - (el.scrollLeft + el.clientWidth);

    // 1) Still can scroll inside current items
    if (remaining > 2) {
      scrollByAmount("right");
      return;
    }

    // 2) End reached => fetch next page (if exists)
    if (hasNextPage && !isPaging) {
      try {
        const maybePromise = onLoadNextPage?.();
        if (maybePromise && typeof maybePromise.then === "function") {
          await maybePromise;
        }
        // after append, reveal new items
        requestAnimationFrame(() => scrollByAmount("right"));
      } catch (e) {
        // optional: console.log(e);
      }
    }
  };

  return (
    <div className={`bg-white border-b border-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between py-2">
          {/* Sale Badge */}
          {showSaleBadge && (
            <div className="shrink-0 mr-3">
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full 
                           bg-linear-to-r from-[#0099CC] to-[#006699] 
                           text-white text-xs font-bold"
              >
                <span className="hidden md:inline">{saleBadgeText}</span>
                <span className="md:hidden">SALE</span>
              </span>
            </div>
          )}

          {/* Premium Scroll Area */}
          <div className="relative flex-1 overflow-hidden">
            {/* Left Fade */}
            {canLeft && (
              <div
                className="pointer-events-none absolute left-0 top-0 h-full w-10 
                           bg-linear-to-r from-white to-transparent"
                aria-hidden="true"
              />
            )}

            {/* Right Fade (show also when next page exists) */}
            {(canRight || hasNextPage) && (
              <div
                className="pointer-events-none absolute right-0 top-0 h-full w-10 
                           bg-linear-to-l from-white to-transparent"
                aria-hidden="true"
              />
            )}

            {/* Left Arrow */}
            {canLeft && (
              <button
                type="button"
                onClick={() => scrollByAmount("left")}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10
                           h-8 w-8 rounded-full bg-white/90 border border-gray-200
                           shadow-sm hover:bg-white transition grid place-items-center"
                aria-label="Scroll categories left"
              >
                ‹
              </button>
            )}

            {/* Right Arrow (show when canRight OR hasNextPage) */}
            {(canRight || hasNextPage) && (
              <button
                type="button"
                onClick={handleRight}
                disabled={isPaging}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-10
                           h-8 w-8 rounded-full bg-white/90 border border-gray-200
                           shadow-sm hover:bg-white transition grid place-items-center
                           disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label={
                  hasNextPage && !canRight ? "Load more categories" : "Scroll categories right"
                }
                title={
                  hasNextPage && !canRight ? "Load more categories" : "Scroll right"
                }
              >
                {isPaging && !canRight ? "…" : "›"}
              </button>
            )}

            {/* Scroll Row */}
            <div
              ref={scrollerRef}
              className="flex items-center space-x-4 lg:space-x-8 
                         overflow-x-auto overflow-y-hidden scrollbar-hide 
                         scroll-smooth py-1 pr-8 pl-8"
            >
              {displayCategories.map((category) => (
                <Link
                  key={category.id || category.slug}
                  to={`/category/${category.slug}`}
                  onClick={() => handleCategoryClick(category)}
                  className="group relative shrink-0"
                >
                  <span
                    className="text-xs md:text-sm font-medium text-gray-700 
                               group-hover:text-[#006699] transition-colors duration-200
                               whitespace-nowrap"
                  >
                    {category.name}
                  </span>
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 
                               bg-[#0099CC] group-hover:w-full 
                               transition-all duration-300"
                  />
                </Link>
              ))}
            </div>
          </div>
          {/* /Premium Scroll Area */}
        </div>
      </div>
    </div>
  );
};

export default CategoryRibbon;
