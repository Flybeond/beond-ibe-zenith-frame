"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  isZenithEmbedHeightMessage,
  measureEmbedDocumentHeight,
} from "@/lib/embedDocumentHeight";
import {
  isAllowedZenithTopNavUrl,
  isFoEmeaZenithSearchEmbedUrl,
  isSameOriginZenithSearchEmbedUrl,
  isZenithEmbedSearchSubmitMessage,
  isZenithEmbedTopNavMessage,
  type ZenithSearchSubmitDetail,
} from "@/lib/zenithNavHost";

type ZenithSearchFrameProps = {
  /**
   * `hero` — compact padding over the video (desktop).
   * `home` — stacked mobile (px + bottom space) and hero-style desktop (matches `hero`).
   */
  variant?: "default" | "hero" | "home";
  className?: string;
  /** Called after iframe height is synced (e.g. parent can reserve layout space on mobile). */
  onIframeGeometryChange?: () => void;
  /**
   * When the user submits a Zenith form that posts to FrontOffice, the embed sends
   * `action`, `method`, and string `params` here so you can redirect or log on the host page.
   * (Only fires for native form submit to `fo-emea.ttinteractive.com`.)
   */
  onSearchSubmit?: (detail: ZenithSearchSubmitDetail) => void;
};

function readEmbedContentHeight(doc: Document): number {
  return measureEmbedDocumentHeight(doc);
}

export default function ZenithSearchFrame({
  variant = "default",
  className = "",
  onIframeGeometryChange,
  onSearchSubmit,
}: ZenithSearchFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const onSearchSubmitRef = useRef(onSearchSubmit);
  onSearchSubmitRef.current = onSearchSubmit;

  useEffect(() => {
    console.log(
      "[ZenithSearchFrame] Host page: listening for iframe postMessage (height + search-submit).",
    );
  }, []);
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

      if (isZenithEmbedTopNavMessage(e.data)) {
        if (isSameOriginZenithSearchEmbedUrl(e.data.url, window.location.origin)) {
          console.log(
            "[ZenithSearchFrame] top-nav ignored (would assign host to zenith-search-embed)",
            { url: e.data.url },
          );
          return;
        }
        if (isFoEmeaZenithSearchEmbedUrl(e.data.url)) {
          console.log(
            "[ZenithSearchFrame] top-nav ignored (fo-emea /zenith-search-embed — currency/embed refresh stays in iframe)",
            { url: e.data.url },
          );
          return;
        }
        if (!isAllowedZenithTopNavUrl(e.data.url)) return;
        console.log("[ZenithSearchFrame] top-nav (assign host to iframe target URL)", {
          url: e.data.url,
        });
        window.location.assign(e.data.url);
        return;
      }

      if (isZenithEmbedSearchSubmitMessage(e.data)) {
        console.log("[ZenithSearchFrame] received search-submit", e.data);
        onSearchSubmitRef.current?.({
          action: e.data.action,
          method: e.data.method,
          params: e.data.params,
        });
        return;
      }

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
    variant === "hero"
      ? "py-3 md:py-6"
      : variant === "home"
        ? "pt-0 pb-6 md:py-4 md:pb-6"
        : "pt-10 pb-6 md:py-10";
  const sectionX =
    variant === "hero"
      ? "px-0"
      : variant === "home"
        ? "px-0"
        : "px-4";

  return (
    <section
      id="SearchCriterias"
      className={`scroll-mt-20 w-full ${sectionX} ${sectionPad} flex justify-center ${className}`.trim()}
      aria-label="Flight search"
    >
      <iframe
        ref={iframeRef}
        title="Flight search"
        src="/zenith-search-embed"
        onLoad={onIframeLoad}
        // Block top-level navigation from Zenith (e.g. currency → window.top.location).
        // Breakout to TTI still uses postMessage + parent location.assign.
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
        className={`w-full min-h-[80px] max-md:max-h-[min(88dvh,40rem)] rounded-2xl border-0 bg-(--color-background) md:border md:border-black/5 ${
          variant === "hero"
            ? "shadow-none md:shadow-lg"
            : variant === "home"
              ? "shadow-none md:shadow-lg"
              : "shadow-none md:shadow-sm"
        }`}
      />
    </section>
  );
}

export type { ZenithSearchSubmitDetail } from "@/lib/zenithNavHost";
