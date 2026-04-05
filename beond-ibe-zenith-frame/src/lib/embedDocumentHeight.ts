/** postMessage payload from /zenith-search-embed → parent (same origin). */
export const ZENITH_EMBED_HEIGHT_MSG = "zenith-search-embed-height" as const;

export type ZenithEmbedHeightPayload = {
  type: typeof ZENITH_EMBED_HEIGHT_MSG;
  height: number;
};

/**
 * Height of embed document content. Uses scroll metrics plus max descendant
 * bottom so absolutely positioned Zenith UI still increases the needed iframe height.
 */
export function measureEmbedDocumentHeight(doc: Document): number {
  const html = doc.documentElement;
  const body = doc.body;
  if (!body) return 0;

  let max = Math.max(
    html.scrollHeight,
    body.scrollHeight,
    html.offsetHeight,
    body.offsetHeight,
  );

  const mount = doc.getElementById("SearchCriterias");
  if (mount) {
    max = Math.max(
      max,
      mount.scrollHeight,
      mount.offsetHeight,
      Math.ceil(mount.getBoundingClientRect().height),
    );
    const win = doc.defaultView;
    const scrollY = win?.scrollY ?? 0;
    const stack: Element[] = [mount];
    while (stack.length) {
      const el = stack.pop()!;
      max = Math.max(max, Math.ceil(el.getBoundingClientRect().bottom + scrollY));
      stack.push(...el.children);
    }
  }

  return Math.max(1, max);
}

export function isZenithEmbedHeightMessage(
  data: unknown,
): data is ZenithEmbedHeightPayload {
  if (!data || typeof data !== "object") return false;
  const o = data as Record<string, unknown>;
  return (
    o.type === ZENITH_EMBED_HEIGHT_MSG &&
    typeof o.height === "number" &&
    Number.isFinite(o.height)
  );
}
