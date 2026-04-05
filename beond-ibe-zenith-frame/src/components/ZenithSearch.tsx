/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  ZENITH_EMBED_HEIGHT_MSG,
  measureEmbedDocumentHeight,
} from "@/lib/embedDocumentHeight";
import {
  ZENITH_FRAME_BLOCKED_ORIGIN,
  ZENITH_SEARCH_EMBED_PATH,
  buildZenithFrontOfficeGetFormUrl,
  forceFormTargetSelfIfSameOriginZenithEmbed,
  formToSearchParamRecord,
  isFoEmeaZenithSearchEmbedUrl,
  isSameOriginZenithSearchEmbedUrl,
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
  /** Avoid duplicate postMessage when both click + submit fire for the same action. */
  const searchHandoffDedupeRef = useRef(0);
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

    const assignBound =
      typeof loc.assign === "function" ? loc.assign.bind(loc) : null;
    const replaceBound =
      typeof loc.replace === "function" ? loc.replace.bind(loc) : null;

    const tryBreakout = (
      raw: string | URL,
      nav: "assign" | "replace",
    ): boolean => {
      const s = typeof raw === "string" ? raw : raw.href;
      const baseHref = window.location.href;
      let resolved: string;
      try {
        resolved = new URL(s, baseHref).href;
      } catch {
        return false;
      }
      if (!isZenithFrameBlockedUrl(resolved, baseHref)) return false;

      if (isFoEmeaZenithSearchEmbedUrl(resolved)) {
        if (!assignBound || !replaceBound) return false;
        try {
          const u = new URL(resolved);
          const local = `${window.location.origin}${ZENITH_SEARCH_EMBED_PATH}${u.search}`;
          if (nav === "replace") replaceBound(local);
          else assignBound(local);
        } catch {
          if (nav === "replace") replaceBound(resolved);
          else assignBound(resolved);
        }
        return true;
      }

      postZenithTopNavToParent(resolved);
      return true;
    };

    let savedAssign: typeof loc.assign | undefined;
    let savedReplace: typeof loc.replace | undefined;
    if (assignBound && replaceBound) {
      savedAssign = assignBound;
      savedReplace = replaceBound;
      try {
        (loc as unknown as { assign: typeof loc.assign }).assign = function (
          url: string | URL,
        ) {
          if (tryBreakout(url, "assign")) return;
          assignBound(typeof url === "string" ? url : url.href);
        };
        (loc as unknown as { replace: typeof loc.replace }).replace =
          function (url: string | URL) {
            if (tryBreakout(url, "replace")) return;
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
            if (tryBreakout(value, "assign")) return;
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

  /**
   * Zenith currency (and similar) often sets `window.top.location` / `parent.location`.
   * That bypasses `<base>` and `form.target`. Same-origin `/zenith-search-embed` must load
   * inside this iframe, not replace the host page. (Iframe sandbox also blocks top nav.)
   */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const topW = window.top;
    if (!topW || topW === window) return;
    try {
      if (topW.location.origin !== window.location.origin) return;
    } catch {
      return;
    }

    const topLoc = topW.location;
    const topOrigin = topW.location.origin;

    const tryRerouteTopNavToIframe = (
      raw: string | URL,
      mode: "assign" | "replace",
    ): boolean => {
      let resolved: string;
      try {
        resolved =
          typeof raw === "string" ? new URL(raw, topLoc.href).href : raw.href;
      } catch {
        return false;
      }
      if (!isSameOriginZenithSearchEmbedUrl(resolved, topOrigin)) return false;
      if (mode === "replace") window.location.replace(resolved);
      else window.location.assign(resolved);
      return true;
    };

    const assignDesc = Object.getOwnPropertyDescriptor(
      Location.prototype,
      "assign",
    );
    const replaceDesc = Object.getOwnPropertyDescriptor(
      Location.prototype,
      "replace",
    );
    const nativeAssign = assignDesc?.value as
      | ((this: Location, url: string | URL) => void)
      | undefined;
    const nativeReplace = replaceDesc?.value as
      | ((this: Location, url: string | URL) => void)
      | undefined;
    if (!nativeAssign || !nativeReplace) return;

    let patchedAssign = false;
    let patchedReplace = false;
    try {
      (topLoc as unknown as { assign: typeof nativeAssign }).assign = function (
        this: Location,
        url: string | URL,
      ) {
        if (tryRerouteTopNavToIframe(url, "assign")) return;
        nativeAssign.call(this, url);
      };
      patchedAssign = true;
    } catch {
      /* non-writable */
    }
    try {
      (topLoc as unknown as { replace: typeof nativeReplace }).replace =
        function (this: Location, url: string | URL) {
          if (tryRerouteTopNavToIframe(url, "replace")) return;
          nativeReplace.call(this, url);
        };
      patchedReplace = true;
    } catch {
      /* non-writable */
    }

    const hrefDesc = Object.getOwnPropertyDescriptor(Location.prototype, "href");
    let hrefPatched = false;
    if (hrefDesc?.set && hrefDesc.get) {
      try {
        const origSet = hrefDesc.set;
        const origGet = hrefDesc.get;
        Object.defineProperty(topLoc, "href", {
          configurable: true,
          enumerable: hrefDesc.enumerable,
          get() {
            return origGet.call(topLoc);
          },
          set(value: string) {
            if (tryRerouteTopNavToIframe(value, "assign")) return;
            origSet.call(topLoc, value);
          },
        });
        hrefPatched = true;
      } catch {
        /* many engines forbid overriding location.href on the instance */
      }
    }

    return () => {
      try {
        if (patchedAssign && assignDesc?.value) {
          (topLoc as unknown as { assign: typeof nativeAssign }).assign =
            assignDesc.value as typeof nativeAssign;
        }
      } catch {
        /* ignore */
      }
      try {
        if (patchedReplace && replaceDesc?.value) {
          (topLoc as unknown as { replace: typeof nativeReplace }).replace =
            replaceDesc.value as typeof nativeReplace;
        }
      } catch {
        /* ignore */
      }
      if (hrefPatched && hrefDesc) {
        try {
          Object.defineProperty(topLoc, "href", hrefDesc);
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  /**
   * Zenith calls `form.submit()` programmatically — that does NOT fire `submit` events.
   * Intercept here and send the same URL the iframe would navigate to (GET: full query).
   */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.parent === window) return;
    if (!deferSearchSubmitToParent) return;

    const origSubmit = HTMLFormElement.prototype.submit;

    HTMLFormElement.prototype.submit = function submitZenithPatched(
      this: HTMLFormElement,
    ) {
      const pageBase = window.location.href;
      const actionUrl = resolveZenithFormActionUrl(this, pageBase);
      if (!actionUrl || actionUrl.origin !== ZENITH_FRAME_BLOCKED_ORIGIN) {
        forceFormTargetSelfIfSameOriginZenithEmbed(this, pageBase);
        return origSubmit.call(this);
      }

      const method = (this.method || "GET").toUpperCase();
      const now = Date.now();
      if (now - searchHandoffDedupeRef.current < 600) {
        console.log("[Zenith embed] form.submit() handoff deduped");
        return;
      }
      searchHandoffDedupeRef.current = now;

      if (method === "GET") {
        const fullUrl = buildZenithFrontOfficeGetFormUrl(this, pageBase);
        if (fullUrl) {
          console.log(
            "[Zenith embed] intercepted HTMLFormElement.prototype.submit() → top-nav",
            fullUrl,
          );
          postZenithTopNavToParent(fullUrl);
          return;
        }
      }

      const detail = {
        action: actionUrl.href,
        method,
        params: formToSearchParamRecord(this),
      };
      console.log(
        "[Zenith embed] intercepted HTMLFormElement.prototype.submit() → search-submit",
        detail,
      );
      postZenithSearchSubmitToParent(detail);
    };

    return () => {
      HTMLFormElement.prototype.submit = origSubmit;
    };
  }, [deferSearchSubmitToParent]);

  /** Optional: catch navigations that bypass Location.assign (Chromium Navigation API). */
  useEffect(() => {
    if (typeof window === "undefined" || window.parent === window) return;
    const w = window as unknown as {
      navigation?: EventTarget;
    };
    const nav = w.navigation;
    if (!nav?.addEventListener) return;

    const onNavigate = (event: Event) => {
      const e = event as unknown as {
        destination?: { url?: string };
        cancelable?: boolean;
        preventDefault?: () => void;
      };
      const url = e.destination?.url;
      if (!url) return;
      if (!isZenithFrameBlockedUrl(url, window.location.href)) return;
      if (e.cancelable && typeof e.preventDefault === "function") {
        e.preventDefault();
        console.log("[Zenith embed] Navigation API → top-nav", url);
        postZenithTopNavToParent(new URL(url).href);
      }
    };

    nav.addEventListener("navigate", onNavigate as EventListener);
    return () =>
      nav.removeEventListener("navigate", onNavigate as EventListener);
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
   * Form submit + search button clicks (Zenith often uses `button` + JS, no native submit).
   * Logs in iframe DevTools context. postMessage when embedded + FrontOffice form.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const baseHref = window.location.href;

    const handoffFromForm = (
      form: HTMLFormElement,
      source: "submit" | "click",
      e?: Event,
    ) => {
      const actionUrl = resolveZenithFormActionUrl(form, baseHref);
      if (!actionUrl || actionUrl.origin !== ZENITH_FRAME_BLOCKED_ORIGIN) {
        console.log(`[Zenith embed] ${source}: form action not FrontOffice`, {
          actionAttr: form.getAttribute("action"),
          resolvedHref: actionUrl?.href ?? null,
        });
        return;
      }

      const method = (form.method || "GET").toUpperCase();
      const detail = {
        action: actionUrl.href,
        method,
        params: formToSearchParamRecord(form),
      };
      console.log(`[Zenith embed] FrontOffice handoff (${source})`, detail);

      if (source === "click" && !deferSearchSubmitToParent) {
        console.log(
          "[Zenith embed] click-only: deferSearchSubmitToParent is off — parent handoff runs on native submit only",
        );
        return;
      }

      const embedded = window.parent !== window;
      if (!embedded) return;

      const now = Date.now();
      if (now - searchHandoffDedupeRef.current < 600) {
        console.log("[Zenith embed] handoff deduped (submit+click same gesture)");
        if (deferSearchSubmitToParent && e) e.preventDefault();
        return;
      }
      searchHandoffDedupeRef.current = now;

      if (deferSearchSubmitToParent && method === "GET") {
        const fullUrl = buildZenithFrontOfficeGetFormUrl(form, baseHref);
        if (fullUrl) {
          console.log(
            `[Zenith embed] GET ${source} → top-nav (exact Zenith URL)`,
            fullUrl,
          );
          postZenithTopNavToParent(fullUrl);
          if (e) e.preventDefault();
          return;
        }
      }

      postZenithSearchSubmitToParent(detail);

      if (deferSearchSubmitToParent && e) {
        e.preventDefault();
      } else if (!deferSearchSubmitToParent) {
        form.target = "_top";
      }
    };

    const clickInsideMount = (e: MouseEvent): boolean => {
      const mount = document.getElementById("SearchCriterias");
      if (!mount) return false;
      const path =
        typeof e.composedPath === "function" ? e.composedPath() : [];
      return path.some((n) => {
        if (n === mount) return true;
        return n instanceof Node && mount.contains(n);
      });
    };

    const onClickCapture = (e: MouseEvent) => {
      if (
        e.button !== 0 ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      if (!clickInsideMount(e)) return;

      const rawTarget = e.target;
      if (!(rawTarget instanceof Element)) return;

      console.log("[Zenith embed] click inside #SearchCriterias", {
        targetTag: rawTarget.tagName,
        className:
          typeof (rawTarget as HTMLElement).className === "string"
            ? (rawTarget as HTMLElement).className.slice(0, 120)
            : "",
      });

      const control = rawTarget.closest(
        "button, [role='button'], input[type='submit'], input[type='image'], input[type='button']",
      );
      if (!control) return;

      const typeAttr =
        control instanceof HTMLButtonElement
          ? (control.getAttribute("type") || "submit").toLowerCase()
          : control instanceof HTMLInputElement
            ? control.type.toLowerCase()
            : "";

      const labelBlob =
        `${control.textContent || ""} ${control.getAttribute("aria-label") || ""} ${control.getAttribute("value") || ""}`.toLowerCase();

      const labelLooksLikeSearch =
        labelBlob.includes("search") ||
        labelBlob.includes("flight") ||
        labelBlob.includes("find") ||
        labelBlob.includes("book");

      const looksLikeSearchButton =
        typeAttr === "submit" ||
        typeAttr === "image" ||
        (typeAttr === "button" && labelLooksLikeSearch) ||
        (control.getAttribute("role") === "button" && labelLooksLikeSearch);

      if (!looksLikeSearchButton) {
        console.log("[Zenith embed] click: control ignored (not treated as search)", {
          typeAttr,
        });
        return;
      }

      console.log("[Zenith embed] search control click", {
        tag: control.tagName,
        typeAttr,
        labelSnippet: labelBlob.trim().slice(0, 80),
      });

      const form =
        control instanceof HTMLButtonElement || control instanceof HTMLInputElement
          ? control.form
          : null;
      const resolvedForm =
        form instanceof HTMLFormElement
          ? form
          : control.closest("form");

      if (!(resolvedForm instanceof HTMLFormElement)) {
        console.log("[Zenith embed] search click: no form found on control");
        return;
      }

      handoffFromForm(resolvedForm, "click", e);
    };

    const submitSeen = new WeakSet<SubmitEvent>();
    const onSubmitCapturing = (e: Event) => {
      if (!(e instanceof SubmitEvent)) return;
      if (submitSeen.has(e)) return;
      submitSeen.add(e);

      const form = e.target;
      if (!(form instanceof HTMLFormElement)) return;
      if (window.parent !== window) {
        forceFormTargetSelfIfSameOriginZenithEmbed(form, window.location.href);
      }
      console.log("[Zenith embed] submit event", {
        actionAttr: form.getAttribute("action"),
        method: form.method,
        inIframe: window.parent !== window,
      });

      handoffFromForm(form, "submit", e);
    };

    window.addEventListener("click", onClickCapture, true);
    window.addEventListener("submit", onSubmitCapturing, true);
    document.addEventListener("submit", onSubmitCapturing, true);
    return () => {
      window.removeEventListener("click", onClickCapture, true);
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

      const resolvedHref = new URL(href, baseHref).href;
      if (isSameOriginZenithSearchEmbedUrl(resolvedHref, window.location.origin)) {
        a.target = "_self";
        return;
      }

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

