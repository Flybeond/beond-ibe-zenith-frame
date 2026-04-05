"use client";

import { useEffect } from "react";

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
