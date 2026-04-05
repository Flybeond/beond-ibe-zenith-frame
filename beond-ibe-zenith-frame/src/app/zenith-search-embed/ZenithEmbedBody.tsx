"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * Root layout uses min-h-full / h-full on html+body so the main app fills the viewport.
 * Inside the iframe we need the document to shrink-wrap the Zenith widget so the parent
 * can size the iframe via scrollHeight + ResizeObserver.
 */
export default function ZenithEmbedBody({
  children,
}: {
  children: React.ReactNode;
}) {
  /** Default link/form target so Zenith navigations break out of the iframe when allowed by the spec. */
  useLayoutEffect(() => {
    if (document.querySelector("base[data-zenith-embed-default-target]")) return;
    const base = document.createElement("base");
    base.target = "_top";
    base.setAttribute("data-zenith-embed-default-target", "");
    document.head.prepend(base);
    return () => {
      base.remove();
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlMinHeight = html.style.minHeight;
    const prevHtmlHeight = html.style.height;
    const prevBodyMinHeight = body.style.minHeight;

    html.style.minHeight = "0";
    html.style.height = "auto";
    body.style.minHeight = "0";

    return () => {
      html.style.minHeight = prevHtmlMinHeight;
      html.style.height = prevHtmlHeight;
      body.style.minHeight = prevBodyMinHeight;
    };
  }, []);

  return <>{children}</>;
}
