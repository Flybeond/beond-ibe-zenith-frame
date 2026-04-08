"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export type FullWidthVimeoEmbedProps = {
  /** Vimeo video id (e.g. "1005712484"). */
  videoId: string;
  className?: string;
};

function buildVimeoEmbedSrc(videoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    muted: "1",
    loop: "1",
    background: "1",
    autopause: "0",
    title: "0",
    byline: "0",
    portrait: "0",
    controls: "0",
    dnt: "1",
  });
  return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
}

export default function FullWidthVimeoEmbed({
  videoId,
  className = "",
}: FullWidthVimeoEmbedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const src = useMemo(() => buildVimeoEmbedSrc(videoId), [videoId]);

  useEffect(() => {
    if (shouldLoad) return;
    const el = containerRef.current;
    if (!el) return;

    // If IO is unavailable, load immediately.
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      // Start loading slightly before it enters viewport.
      { rootMargin: "300px 0px", threshold: 0.01 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [shouldLoad]);

  return (
    <section className={`w-full bg-black ${className}`.trim()}>
      {/* Full-width responsive 16:9 background video (autoplay, muted, no controls) */}
      <div ref={containerRef} className="relative w-full pt-[56.25%]">
        {shouldLoad ? (
          <iframe
            src={src}
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0 pointer-events-none"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
            title="Background video"
          />
        ) : (
          <div
            className="absolute inset-0 bg-(--color-ink)"
            aria-hidden
          />
        )}
      </div>
    </section>
  );
}

