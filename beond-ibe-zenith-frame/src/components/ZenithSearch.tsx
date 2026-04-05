/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo } from "react";
import {
  ZENITH_EMBED_HEIGHT_MSG,
  measureEmbedDocumentHeight,
} from "@/lib/embedDocumentHeight";
import {
  ZENITH_FRAME_BLOCKED_ORIGIN,
  formToSearchParamRecord,
  isZenithFrameBlockedUrl,
  postZenithSearchSubmitToParent,
  postZenithTopNavToParent,
  resolveZenithFormActionUrl,
} from "@/lib/zenithNavHost";

type ZenithSearchConfig = {
  baseUrl: string;
  idCompany: number;
  idPos: number;
  locale: string;
  external: boolean;
};

const DEFAULT_CONFIG: ZenithSearchConfig = {
  baseUrl: "https://fo-emea.ttinteractive.com/Zenith/FrontOffice/beond",
  idCompany: 4112,
  idPos: 1,
  locale: "en-GB",
  external: true,
};

function ensureLinkTag(href: string) {
  const existing = document.querySelector(`link[href="${href}"]`);
  if (existing) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`) as
      | HTMLScriptElement
      | null;
    if (existing) {
      if ((existing as any).__loaded) return resolve();
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error(`Failed to load script: ${src}`)),
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => {
      (script as any).__loaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

function runModule(code: string) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "module";
    script.innerHTML = code;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to run module script"));
    document.body.appendChild(script);
    // module scripts don't reliably fire onload in all cases; resolve on next tick
    queueMicrotask(() => resolve());
  });
}

export default function ZenithSearch(props: {
  config?: Partial<ZenithSearchConfig>;
  /**
   * When embedded in our iframe: block the default form submit and only notify the parent.
   * The host page should redirect (e.g. to BookingEngine SearchResult) using `onSearchSubmit`.
   */
  deferSearchSubmitToParent?: boolean;
}) {
  const { deferSearchSubmitToParent = false } = props;
  const config = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...(props.config ?? {}) }),
    [props.config]
  );

  useEffect(() => {
    const w = window as any;
    const mountedKey = "__zenith_searchcriteria_mounted__";
    const loadingKey = "__zenith_searchcriteria_loading__";

    ensureLinkTag("https://fonts.googleapis.com/icon?family=Material+Icons");
    ensureLinkTag(
      "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&display=swap"
    );
    ensureLinkTag(
      "https://fo-emea.ttinteractive.com/Zenith/FrontOffice/Content/beond/SearchCriteria"
    );

    if (w[mountedKey]) return;

    if (!w[loadingKey]) {
      w[loadingKey] = (async () => {
        await loadScript(
          "https://fo-emea.ttinteractive.com/Zenith/FrontOffice/bundles/beond/SearchCriteriaTools"
        );

        await runModule(`
          import app from 'https://fo-emea.ttinteractive.com/Zenith/FrontOffice/bundles/beond/SearchCriteria';
          app.mount('#SearchCriterias');
          window.${mountedKey} = true;
        `);
      })().catch((err: unknown) => {
        // allow retry if load fails
        w[loadingKey] = undefined;
        // surface error in console for debugging
        console.error("ZenithSearch init failed", err);
      });
    }
  }, []);

  /**
   * Intercept programmatic navigations (location.assign / href = …) to FrontOffice and
   * hand off to the parent window via postMessage (avoids X-Frame-Options in the iframe).
   */
  useEffect(() => {
    if (typeof window === "undefined" || window.parent === window) return;

    const loc = window.location;

    const tryBreakout = (raw: string | URL): boolean => {
      const s = typeof raw === "string" ? raw : raw.href;
      const baseHref = window.location.href;
      let resolved: string;
      try {
        resolved = new URL(s, baseHref).href;
      } catch {
        return false;
      }
      if (!isZenithFrameBlockedUrl(resolved, baseHref)) return false;
      postZenithTopNavToParent(resolved);
      return true;
    };

    let savedAssign: typeof loc.assign | undefined;
    let savedReplace: typeof loc.replace | undefined;
    if (typeof loc.assign === "function" && typeof loc.replace === "function") {
      const assignBound = loc.assign.bind(loc);
      const replaceBound = loc.replace.bind(loc);
      savedAssign = assignBound;
      savedReplace = replaceBound;
      try {
        (loc as unknown as { assign: typeof loc.assign }).assign = function (
          url: string | URL,
        ) {
          if (tryBreakout(url)) return;
          assignBound(typeof url === "string" ? url : url.href);
        };
        (loc as unknown as { replace: typeof loc.replace }).replace =
          function (url: string | URL) {
            if (tryBreakout(url)) return;
            replaceBound(typeof url === "string" ? url : url.href);
          };
      } catch {
        /* some engines keep assign/replace non-writable */
        savedAssign = undefined;
        savedReplace = undefined;
      }
    }

    const proto = Location.prototype;
    const hrefDesc = Object.getOwnPropertyDescriptor(proto, "href");
    let hrefPatched = false;
    if (hrefDesc?.set && hrefDesc.get && hrefDesc.configurable !== false) {
      try {
        const origSet = hrefDesc.set;
        Object.defineProperty(proto, "href", {
          configurable: true,
          enumerable: hrefDesc.enumerable,
          get: hrefDesc.get,
          set(value: string) {
            if (tryBreakout(value)) return;
            origSet.call(this, value);
          },
        });
        hrefPatched = true;
      } catch {
        /* ignore */
      }
    }

    return () => {
      if (savedAssign && savedReplace) {
        try {
          (loc as unknown as { assign: typeof savedAssign }).assign =
            savedAssign;
          (loc as unknown as { replace: typeof savedReplace }).replace =
            savedReplace;
        } catch {
          /* ignore */
        }
      }
      if (hrefPatched && hrefDesc) {
        try {
          Object.defineProperty(proto, "href", hrefDesc);
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  /** Confirms embed JS ran; use iframe context in DevTools to see this. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    console.log("[Zenith embed] ZenithSearch mounted", {
      href: window.location.href,
      inIframe: window.parent !== window,
    });
  }, []);

  /**
   * Form submit: always listen (embed page). Parent-handoff only when in iframe.
   * Uses window capture so we still see submits from Shadow DOM / unusual trees.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const baseHref = window.location.href;

    const submitSeen = new WeakSet<SubmitEvent>();
    const onSubmitCapturing = (e: Event) => {
      if (!(e instanceof SubmitEvent)) return;
      if (submitSeen.has(e)) return;
      submitSeen.add(e);

      const form = e.target;
      if (!(form instanceof HTMLFormElement)) return;
      console.log("[Zenith embed] submit event", {
        actionAttr: form.getAttribute("action"),
        method: form.method,
        inIframe: window.parent !== window,
      });

      const actionUrl = resolveZenithFormActionUrl(form, baseHref);
      if (!actionUrl || actionUrl.origin !== ZENITH_FRAME_BLOCKED_ORIGIN) {
        console.log("[Zenith embed] form submit not handled (action not FrontOffice)", {
          actionAttr: form.getAttribute("action"),
          resolvedHref: actionUrl?.href ?? null,
        });
        return;
      }

      const detail = {
        action: actionUrl.href,
        method: (form.method || "GET").toUpperCase(),
        params: formToSearchParamRecord(form),
      };

      console.log("[Zenith embed] FrontOffice form submit", detail);

      if (deferSearchSubmitToParent && window.parent !== window) {
        e.preventDefault();
        postZenithSearchSubmitToParent(detail);
        return;
      }

      if (window.parent !== window) {
        postZenithSearchSubmitToParent(detail);
        form.target = "_top";
      }
    };

    window.addEventListener("submit", onSubmitCapturing, true);
    document.addEventListener("submit", onSubmitCapturing, true);
    return () => {
      window.removeEventListener("submit", onSubmitCapturing, true);
      document.removeEventListener("submit", onSubmitCapturing, true);
    };
  }, [deferSearchSubmitToParent]);

  /**
   * Zenith redirects to FrontOffice with X-Frame-Options: sameorigin — when embedded,
   * intercept TTI links for top navigation.
   */
  useEffect(() => {
    if (typeof window === "undefined" || window.parent === window) return;

    const baseHref = window.location.href;

    const onClickCapturing = (e: MouseEvent) => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
        return;
      }
      const el = (e.target as Element | null)?.closest?.("a[href]");
      if (!el) return;
      const a = el as HTMLAnchorElement;
      if (a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (href == null || href === "" || href.startsWith("#")) return;
      const t = (a.getAttribute("target") ?? "").toLowerCase();
      if (t === "_blank") return;

      if (!isZenithFrameBlockedUrl(href, baseHref)) return;

      e.preventDefault();
      e.stopPropagation();
      postZenithTopNavToParent(new URL(href, baseHref).href);
    };

    document.addEventListener("click", onClickCapturing, true);
    return () => document.removeEventListener("click", onClickCapturing, true);
  }, []);

  /** Report document height to parent iframe (authoritative for async Zenith mount / fonts). */
  useEffect(() => {
    if (typeof window === "undefined" || window.parent === window) return;

    const targetOrigin = window.location.origin;
    let raf: number | null = null;

    const post = () => {
      const height = measureEmbedDocumentHeight(document);
      window.parent.postMessage(
        { type: ZENITH_EMBED_HEIGHT_MSG, height },
        targetOrigin,
      );
    };

    const schedulePost = () => {
      if (raf != null) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = null;
        post();
      });
    };

    const ro = new ResizeObserver(schedulePost);
    ro.observe(document.documentElement);
    if (document.body) ro.observe(document.body);

    const mount = document.getElementById("SearchCriterias");
    if (mount) ro.observe(mount);

    const mo = new MutationObserver(schedulePost);
    if (document.body) {
      mo.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
    }

    void document.fonts?.ready?.then(() => schedulePost());

    schedulePost();
    const extraTimers = [50, 150, 400, 1000, 2200, 5000].map((ms) =>
      window.setTimeout(schedulePost, ms),
    );

    let ticks = 0;
    const poll = window.setInterval(() => {
      schedulePost();
      if (++ticks >= 32) window.clearInterval(poll);
    }, 200);

    return () => {
      if (raf != null) cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      extraTimers.forEach((id) => window.clearTimeout(id));
      window.clearInterval(poll);
    };
  }, []);

  return (
    <section className="px-4 py-10 flex justify-center">
      <style>{`
        body, input { font-family: 'Montserrat', sans-serif; }
        input:focus-visible { outline: none; }
      `}</style>

      <div className="">
        <div className="">


          <div id="SearchCriterias" data-config={JSON.stringify(config)} />
        </div>
      </div>
    </section>
  );
}

