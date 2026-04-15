"use client";

import { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface CarouselSliderProps {
  children: ReactNode[];
  showDots?: boolean;
  showArrows?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  gap?: number;
  visibleCount?: number; // how many slides visible at once (1 = fullscreen, 3 = card row, etc.)
}

export function CarouselSlider({
  children,
  showDots = true,
  showArrows = true,
  autoplay = false,
  autoplayInterval = 4000,
  gap = 24,
  visibleCount = 1,
}: CarouselSliderProps) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const count = children.length;
  const maxIndex = Math.max(0, count - visibleCount);

  function prev() {
    setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
  }
  function next() {
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
  }

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
    }, autoplayInterval);
    return () => clearInterval(timer);
  }, [autoplay, autoplayInterval, maxIndex]);

  // Calculate transform: each slide is (100/visibleCount)% wide
  const slideWidthPercent = 100 / visibleCount;
  const gapFraction = (gap * (visibleCount - 1)) / visibleCount;

  return (
    <div style={{ position: "relative", overflow: "hidden", width: "100%" }}>
      {/* Track */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: `${gap}px`,
          transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          transform: `translateX(calc(-${current} * (${slideWidthPercent}% + ${gap / visibleCount}px)))`,
          willChange: "transform",
        }}
      >
        {children.map((child, i) => (
          <div
            key={`slide-item-${i}`}
            style={{
              flex: `0 0 calc(${slideWidthPercent}% - ${gapFraction / visibleCount}px)`,
              minWidth: 0,
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && count > visibleCount && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Zurück"
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              background: "var(--yellow)",
              border: "none",
              cursor: "pointer",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              fontSize: "1.25rem",
              fontWeight: 700,
            }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Weiter"
            style={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              background: "var(--yellow)",
              border: "none",
              cursor: "pointer",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              fontSize: "1.25rem",
              fontWeight: 700,
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && count > visibleCount && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "1.5rem",
          }}
        >
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={`carousel-dot-${i}`}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Folie ${i + 1}`}
              style={{
                width: i === current ? "28px" : "10px",
                height: "10px",
                borderRadius: "5px",
                background: i === current ? "var(--yellow)" : "#D0D0D0",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.25s, background 0.25s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
