/**
 * Zenith FrontOffice is served with X-Frame-Options: sameorigin, so it cannot be
 * displayed inside our cross-origin iframe. Navigations to this origin must use
 * the top browsing context.
 */
export const ZENITH_FRAME_BLOCKED_ORIGIN = "https://fo-emea.ttinteractive.com";

export function isZenithFrameBlockedUrl(
  href: string,
  baseHref: string,
): boolean {
  try {
    return new URL(href, baseHref).origin === ZENITH_FRAME_BLOCKED_ORIGIN;
  } catch {
    return false;
  }
}

/** Embed → parent: navigate the host app to this URL (see ZenithSearchFrame listener). */
export const ZENITH_EMBED_TOP_NAV_MSG = "zenith-embed-top-nav" as const;

export type ZenithEmbedTopNavPayload = {
  type: typeof ZENITH_EMBED_TOP_NAV_MSG;
  url: string;
};

export function isZenithEmbedTopNavMessage(
  data: unknown,
): data is ZenithEmbedTopNavPayload {
  if (!data || typeof data !== "object") return false;
  const o = data as Record<string, unknown>;
  return (
    o.type === ZENITH_EMBED_TOP_NAV_MSG &&
    typeof o.url === "string" &&
    o.url.length > 0
  );
}

/** Parent only follows breakout URLs to the known Zenith host (avoid open redirects). */
export function isAllowedZenithTopNavUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.origin === ZENITH_FRAME_BLOCKED_ORIGIN;
  } catch {
    return false;
  }
}

/** Ask the parent page to navigate (embed cannot reliably assign `window.top` in all browsers). */
export function postZenithTopNavToParent(url: string) {
  if (typeof window === "undefined" || window.parent === window) return;
  window.parent.postMessage(
    { type: ZENITH_EMBED_TOP_NAV_MSG, url },
    window.location.origin,
  );
}

/** Embed → parent: user submitted the Zenith search form (native submit only). */
export const ZENITH_EMBED_SEARCH_SUBMIT_MSG = "zenith-embed-search-submit" as const;

export type ZenithSearchSubmitDetail = {
  /** Resolved form `action` URL. */
  action: string;
  /** Uppercase HTTP method (e.g. GET / POST). */
  method: string;
  /** String fields from the form (files omitted). */
  params: Record<string, string>;
};

export type ZenithEmbedSearchSubmitPayload = ZenithSearchSubmitDetail & {
  type: typeof ZENITH_EMBED_SEARCH_SUBMIT_MSG;
};

const MAX_FORM_KEYS = 80;
const MAX_FORM_VALUE_LEN = 2048;

/** Collect string fields for postMessage (bounded size). */
export function formToSearchParamRecord(
  form: HTMLFormElement,
): Record<string, string> {
  const fd = new FormData(form);
  const out: Record<string, string> = {};
  let n = 0;
  for (const [k, v] of fd.entries()) {
    if (n >= MAX_FORM_KEYS) break;
    if (typeof v !== "string") continue;
    const key = String(k).slice(0, 128);
    const val = v.slice(0, MAX_FORM_VALUE_LEN);
    out[key] = out[key] !== undefined ? `${out[key]},${val}` : val;
    n++;
  }
  return out;
}

export function isZenithEmbedSearchSubmitMessage(
  data: unknown,
): data is ZenithEmbedSearchSubmitPayload {
  if (!data || typeof data !== "object") return false;
  const o = data as Record<string, unknown>;
  if (o.type !== ZENITH_EMBED_SEARCH_SUBMIT_MSG) return false;
  if (typeof o.action !== "string" || typeof o.method !== "string") return false;
  if (!o.params || typeof o.params !== "object" || Array.isArray(o.params)) {
    return false;
  }
  for (const v of Object.values(o.params)) {
    if (typeof v !== "string") return false;
  }
  return true;
}

export function postZenithSearchSubmitToParent(detail: ZenithSearchSubmitDetail) {
  if (typeof window === "undefined" || window.parent === window) return;
  console.log("[Zenith embed] postMessage search-submit → parent", detail);
  window.parent.postMessage(
    {
      type: ZENITH_EMBED_SEARCH_SUBMIT_MSG,
      action: detail.action,
      method: detail.method,
      params: detail.params,
    },
    window.location.origin,
  );
}

/**
 * Zenith often uses root-relative `action` (e.g. `/Zenith/FrontOffice/...`). Resolved
 * against the embed page URL that becomes our origin, not fo-emea — fix by resolving
 * path-only actions against the FrontOffice origin.
 */
export function resolveZenithFormActionUrl(
  form: HTMLFormElement,
  pageBaseHref: string,
): URL | null {
  const raw = form.getAttribute("action")?.trim() ?? "";
  try {
    const pageOrigin = new URL(pageBaseHref).origin;
    const first = new URL(raw || pageBaseHref, pageBaseHref);
    if (first.origin === ZENITH_FRAME_BLOCKED_ORIGIN) {
      return first;
    }
    if (first.origin !== pageOrigin) {
      return null;
    }
    if (raw === "") {
      return null;
    }
    if (/^https?:\/\//i.test(raw)) {
      return null;
    }
    const tti = new URL(raw, `${ZENITH_FRAME_BLOCKED_ORIGIN}/`);
    return tti.origin === ZENITH_FRAME_BLOCKED_ORIGIN ? tti : null;
  } catch {
    return null;
  }
}

/**
 * Target BookingEngine SearchResult on FrontOffice (session segment from TTI).
 * Update if Zenith provides a dynamic session URL.
 */
export const ZENITH_BOOKING_SEARCH_RESULT_URL =
  "https://fo-emea.ttinteractive.com/Zenith/FrontOffice/(S(19243186797549dfbd089ffa28765ab8))/beond/en-GB/BookingEngine/SearchResult";

/** Append Zenith form fields as query string on the SearchResult URL. */
export function buildZenithBookingSearchResultUrl(
  params: Record<string, string>,
): string {
  const u = new URL(ZENITH_BOOKING_SEARCH_RESULT_URL);
  for (const [k, v] of Object.entries(params)) {
    if (v !== "") u.searchParams.append(k, v);
  }
  return u.href;
}
