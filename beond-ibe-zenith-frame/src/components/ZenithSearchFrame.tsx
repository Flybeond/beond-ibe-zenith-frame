"use client";

import { useCallback, useEffect, useRef } from "react";

type ZenithSearchFrameProps = {
  /** Tighter padding when floated over the video hero. */
  variant?: "default" | "hero";
  className?: string;
};

export default function ZenithSearchFrame({
  variant = "default",
  className = "",
}: ZenithSearchFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const rafRef = useRef<number | null>(null);

  const syncHeight = useCallback(() => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!doc?.body) return;

    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const d = iframe?.contentDocument;
      if (!d?.body || !iframe) return;
      const next = Math.max(
        d.documentElement.scrollHeight,
        d.body.scrollHeight,
      );
      if (next > 0) {
        iframe.style.height = `${next}px`;
      }
    });
  }, []);

  const onIframeLoad = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument?.body) return;

    resizeObserverRef.current?.disconnect();
    resizeObserverRef.current = null;

    const doc = iframe.contentDocument;
    syncHeight();

    const ro = new ResizeObserver(() => syncHeight());
    ro.observe(doc.documentElement);
    ro.observe(doc.body);
    resizeObserverRef.current = ro;

    // Embed document resets body/html min-height in a child useEffect; re-measure next frame.
    requestAnimationFrame(() => syncHeight());
  }, [syncHeight]);

  useEffect(() => {
    return () => {
      resizeObserverRef.current?.disconnect();
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const sectionPad =
    variant === "hero" ? "py-4 md:py-6" : "py-10";
  const sectionX = variant === "hero" ? "px-0" : "px-4";

  return (
    <section
      id="SearchCriterias"
      className={`w-full ${sectionX} ${sectionPad} flex justify-center ${className}`.trim()}
      aria-label="Flight search"
    >
      <iframe
        ref={iframeRef}
        title="Flight search"
        src="/zenith-search-embed"
        onLoad={onIframeLoad}
        className={`w-full min-h-[80px] rounded-2xl border border-black/5 bg-(--color-background) ${
          variant === "hero" ? "shadow-lg" : "shadow-sm"
        }`}
      />
    </section>
  );
}
