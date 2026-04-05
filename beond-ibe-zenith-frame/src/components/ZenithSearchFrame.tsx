"use client";

import { useCallback, useEffect, useRef } from "react";

export default function ZenithSearchFrame() {
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

  return (
    <section
      id="SearchCriterias"
      className="w-full px-4 py-10 flex justify-center"
      aria-label="Flight search"
    >
      <iframe
        ref={iframeRef}
        title="Flight search"
        src="/zenith-search-embed"
        onLoad={onIframeLoad}
        className="w-full max-w-5xl min-h-[80px] rounded-2xl border border-black/5 bg-(--color-background) shadow-sm"
      />
    </section>
  );
}
