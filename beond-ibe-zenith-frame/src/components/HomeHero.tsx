"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import VimeoVideoBanner from "./VimeoVideoBanner";
import ZenithSearchFrame from "./ZenithSearchFrame";

const MD_MIN = "(min-width: 768px)";
const BUFFER_PX = 48;
/** Used until layout measures the real iframe overflow (mobile only). */
const MOBILE_FALLBACK_PAD_PX = 480;

export default function HomeHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    if (typeof window !== "undefined" && window.matchMedia(MD_MIN).matches) {
      root.style.paddingBottom = "";
      return;
    }

    const iframe = root.querySelector(
      'iframe[title="Flight search"]',
    ) as HTMLIFrameElement | null;
    if (!iframe) {
      root.style.paddingBottom = `${MOBILE_FALLBACK_PAD_PX}px`;
      return;
    }

    const rootRect = root.getBoundingClientRect();
    const iframeRect = iframe.getBoundingClientRect();
    const overflow = iframeRect.bottom - rootRect.bottom;
    const next = Math.max(0, Math.ceil(overflow)) + BUFFER_PX;
    root.style.paddingBottom = `${Math.max(next, 120)}px`;
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    const iframe = root.querySelector('iframe[title="Flight search"]');
    if (iframe) ro.observe(iframe);

    const mq = window.matchMedia(MD_MIN);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);

    const t1 = window.setTimeout(measure, 400);
    const t2 = window.setTimeout(measure, 1500);
    const t3 = window.setTimeout(measure, 3000);

    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [measure]);

  return (
    <div
      ref={rootRef}
      className="relative isolate w-full max-md:pb-[480px] md:pb-0"
    >
      <VimeoVideoBanner className="w-full" />
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col pt-32 md:pt-20 pb-1 md:pb-8">
        <div className="site-container pointer-events-auto flex min-h-0 flex-1 flex-col">
          <div className="text-left space-y-2 md:space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              Welcome on board
            </h1>
            <p className="max-w-2xl text-base text-white/90 md:text-lg [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]">
              The world&apos;s first premium leisure airline.
            </p>
          </div>

          <div className="mt-auto w-full pt-5 md:pt-14">
            <ZenithSearchFrame variant="hero" onIframeGeometryChange={measure} />
          </div>
        </div>
      </div>
    </div>
  );
}
