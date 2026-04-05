import React from "react";

const DEFAULT_DESKTOP_VIDEO_ID = "1005712484";
const DEFAULT_MOBILE_VIDEO_ID = "1127857029";

export type VimeoVideoBannerProps = {
  /** Desktop Vimeo video id (default: 1005712484). */
  desktopVideoId?: string;
  /** Mobile Vimeo video id (default: 1127857029). */
  mobileVideoId?: string;
  /**
   * @deprecated Use `desktopVideoId` instead. If set, overrides desktop id.
   */
  videoId?: string;
  /** Optional poster while the player loads (e.g. CMS thumbnail URL). */
  posterUrl?: string;
  /** Vimeo `thumbnail_id` for the desktop player URL. */
  desktopThumbnailId?: string;
  /** Vimeo `thumbnail_id` for the mobile player URL. */
  mobileThumbnailId?: string;
  /** When set and per-device ids are omitted, applied to both players. */
  thumbnailId?: string;
  title?: string;
  className?: string;
};

function buildVimeoSrc(videoId: string, thumbnailId?: string) {
  const params = new URLSearchParams({
    badge: "0",
    autopause: "0",
    player_id: "0",
    app_id: "58479",
    autoplay: "1",
    background: "1",
  });
  if (thumbnailId) {
    params.set("thumbnail_id", thumbnailId);
  }
  return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
}

const iframeStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

export default function VimeoVideoBanner({
  desktopVideoId,
  mobileVideoId,
  videoId,
  posterUrl,
  desktopThumbnailId,
  mobileThumbnailId,
  thumbnailId,
  title = "Experience Beond Video",
  className = "",
}: VimeoVideoBannerProps) {
  const desktopId = videoId ?? desktopVideoId ?? DEFAULT_DESKTOP_VIDEO_ID;
  const mobileId = mobileVideoId ?? DEFAULT_MOBILE_VIDEO_ID;
  const desktopThumb = desktopThumbnailId ?? thumbnailId;
  const mobileThumb = mobileThumbnailId ?? thumbnailId;

  return (
    <div
      className={`bg-center bg-cover ${className}`.trim()}
      style={{
        padding: "56.2% 0 0 0",
        position: "relative",
        ...(posterUrl
          ? { backgroundImage: `url(${JSON.stringify(posterUrl)})` }
          : {}),
      }}
    >
      {/* Mobile (default; hidden from md and up) */}
      <iframe
        src={buildVimeoSrc(mobileId, mobileThumb)}
        style={iframeStyle}
        className="border-0 md:hidden"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        allowFullScreen
        title={title}
      />
      {/* Desktop (md and up) */}
      <iframe
        src={buildVimeoSrc(desktopId, desktopThumb)}
        style={iframeStyle}
        className="hidden border-0 md:block"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        allowFullScreen
        title={title}
      />
    </div>
  );
}
