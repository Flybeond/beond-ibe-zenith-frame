"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  isZenithEmbedHeightMessage,
  measureEmbedDocumentHeight,
} from "@/lib/embedDocumentHeight";

type ZenithSearchFrameProps = {
  /** Tighter padding when floated over the video hero. */
  variant?: "default" | "hero";
  className?: string;
  /** Called after iframe height is synced (e.g. parent can reserve layout space on mobile). */
  onIframeGeometryChange?: () => void;
};

function readEmbedContentHeight(doc: Document): number {
  return measureEmbedDocumentHeight(doc);
}

export default function ZenithSearchFrame({
  variant = "default",
  className = "",
  onIframeGeometryChange,
}: ZenithSearchFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);
  const mountResizeObserverRef = useRef<ResizeObserver | null>(null);
  const rafRef = useRef<number | null>(null);
  const debounceTimerRef = useRef<number | null>(null);
  const pollIntervalRef = useRef<number | null>(null);
  const retryTimeoutIdsRef = useRef<number[]>([]);

  const clearRetryTimers = useCallback(() => {
    retryTimeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
    retryTimeoutIdsRef.current = [];
    if (pollIntervalRef.current != null) {
      window.clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

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
      const next = readEmbedContentHeight(d);
      if (next > 0) {
        iframe.style.height = `${next}px`;
      }
      onIframeGeometryChange?.();
    });
  }, [onIframeGeometryChange]);

  const scheduleSyncHeight = useCallback(() => {
    if (debounceTimerRef.current != null) {
      window.clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = window.setTimeout(() => {
      debounceTimerRef.current = null;
      syncHeight();
    }, 80);
  }, [syncHeight]);

  const attachObservers = useCallback(
    (doc: Document) => {
      resizeObserverRef.current?.disconnect();
      mutationObserverRef.current?.disconnect();
      mountResizeObserverRef.current?.disconnect();

      const ro = new ResizeObserver(() => scheduleSyncHeight());
      ro.observe(doc.documentElement);
      ro.observe(doc.body);
      resizeObserverRef.current = ro;

      const mo = new MutationObserver(() => scheduleSyncHeight());
      mo.observe(doc.body, { childList: true, subtree: true });
      mutationObserverRef.current = mo;

      const mount = doc.getElementById("SearchCriterias");
      if (mount) {
        const mro = new ResizeObserver(() => scheduleSyncHeight());
        mro.observe(mount);
        mountResizeObserverRef.current = mro;
      }
    },
    [scheduleSyncHeight],
  );

  const onIframeLoad = useCallback(() => {
    clearRetryTimers();

    const attach = (attempt: number) => {
      const iframe = iframeRef.current;
      const doc = iframe?.contentDocument;
      if (!doc?.body) {
        if (attempt < 30) {
          requestAnimationFrame(() => attach(attempt + 1));
        }
        return;
      }

      attachObservers(doc);
      syncHeight();
      requestAnimationFrame(() => syncHeight());

      const delays = [120, 350, 800, 1600, 3200];
      retryTimeoutIdsRef.current = delays.map((ms) =>
        window.setTimeout(() => syncHeight(), ms),
      );

      let ticks = 0;
      pollIntervalRef.current = window.setInterval(() => {
        syncHeight();
        if (++ticks >= 24) {
          if (pollIntervalRef.current != null) {
            window.clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
        }
      }, 250);
    };

    attach(0);
  }, [attachObservers, clearRetryTimers, syncHeight]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const iframe = iframeRef.current;
      if (!iframe || e.source !== iframe.contentWindow) return;
      if (!isZenithEmbedHeightMessage(e.data)) return;
      const h = Math.max(1, Math.ceil(e.data.height));
      iframe.style.height = `${h}px`;
      onIframeGeometryChange?.();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onIframeGeometryChange]);

  useEffect(() => {
    return () => {
      clearRetryTimers();
      resizeObserverRef.current?.disconnect();
      mutationObserverRef.current?.disconnect();
      mountResizeObserverRef.current?.disconnect();
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
      }
      if (debounceTimerRef.current != null) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, [clearRetryTimers]);

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
