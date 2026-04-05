"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type HeroCarouselSlide = {
  src: string;
  alt: string;
  /** Short line shown over the slide (optional). */
  caption?: string;
};

/** Default assets in `public/carousel/`. */
export const DEFAULT_HERO_CAROUSEL_SLIDES: HeroCarouselSlide[] = [
  {
    src: "/carousel/2880x1400 1.webp",
    alt: "Tropical coastline and clear water",
    caption: "Your private sanctuary awaits",
  },
  {
    src: "/carousel/2880x1400.webp",
    alt: "A culinary adventure at 30,000 feet",
    caption: "A culinary adventure at 30,000 feet",
  },
  {
    src: "/carousel/2880x1400 V1.webp",
    alt: "Tailored comfort and entertainment",
    caption: "Tailored comfort & entertainment",
  },
];

export type HeroBannerCarouselProps = {
  slides?: readonly HeroCarouselSlide[];
  /** Main headline over the carousel. */
  title?: string;
  subtitle?: string;
  /** Auto-advance; set 0 to disable. */
  intervalMs?: number;
  className?: string;
  /** Extra content below the image area (e.g. search), full width. */
  children?: ReactNode;
};

export default function HeroBannerCarousel({
  slides = DEFAULT_HERO_CAROUSEL_SLIDES,
  title = "Welcome on board",
  subtitle = "The world's first premium leisure airline.",
  intervalMs = 7000,
  className = "",
  children,
}: HeroBannerCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = slides.length;
  const safeIndex = count > 0 ? index % count : 0;

  const go = useCallback(
    (delta: number) => {
      if (count === 0) return;
      setIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (count <= 1 || intervalMs <= 0 || paused || reduceMotion) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [count, intervalMs, paused, reduceMotion]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (count === 0) {
    return null;
  }

  const transitionClass = reduceMotion ? "" : "transition-opacity duration-700 ease-out";

  return (
    <div className={`relative isolate w-full ${className}`.trim()}>
      <div
        className="relative w-full overflow-hidden bg-(--color-ink)"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Match video hero proportions */}
        <div className="relative w-full pt-[100%] md:pt-[56.2%]">
          <div className="absolute inset-0" role="region" aria-roledescription="carousel" aria-label="Hero images">
            {slides.map((slide, i) => (
              <div
                key={`${slide.src}-${i}`}
                className={`absolute inset-0 ${transitionClass} ${
                  i === safeIndex ? "z-1 opacity-100" : "z-0 opacity-0"
                }`}
                aria-hidden={i !== safeIndex}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={i === 0}
                  draggable={false}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-black/25"
                  aria-hidden
                />
              </div>
            ))}

            {(title || subtitle) && (
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 pt-[20px] pb-4 md:top-20 md:pt-0 md:pb-0">
                <div className="site-container">
                  <div className="max-w-3xl space-y-2 text-left md:space-y-3">
                    {title ? (
                      <h1 className="text-3xl font-semibold tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] md:text-4xl lg:text-5xl">
                        {title}
                      </h1>
                    ) : null}
                    {subtitle ? (
                      <p className="max-w-2xl text-base text-white/90 [text-shadow:0_1px_16px_rgba(0,0,0,0.5)] md:text-lg">
                        {subtitle}
                      </p>
                    ) : null}
                    {slides[safeIndex]?.caption ? (
                      <p
                        className="max-w-2xl pt-1 text-sm font-medium text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] md:pt-2 md:text-base"
                        key={safeIndex}
                      >
                        {slides[safeIndex].caption}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-2 px-2 pb-4 md:px-4 md:pb-5">
              <button
                type="button"
                className="pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/45 md:h-11 md:w-11"
                aria-label="Previous slide"
                onClick={() => go(-1)}
              >
                <ChevronIcon dir="left" />
              </button>

              <div className="flex flex-1 justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`h-2.5 rounded-full transition-all ${
                      i === safeIndex
                        ? "w-8 bg-white"
                        : "w-2.5 bg-white/45 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === safeIndex}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>

              <button
                type="button"
                className="pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/45 md:h-11 md:w-11"
                aria-label="Next slide"
                onClick={() => go(1)}
              >
                <ChevronIcon dir="right" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {children ? <div className="relative z-10 w-full">{children}</div> : null}
    </div>
  );
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {dir === "left" ? (
        <path d="M15 6l-6 6 6 6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}
