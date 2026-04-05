import BookNowScrollToSearch from "./BookNowScrollToSearch";
import VimeoVideoBanner from "./VimeoVideoBanner";
import HomeHeroZenithSearch from "./HomeHeroZenithSearch";

export default function HomeHero() {
  return (
    <div className="relative isolate w-full">
      {/*
        Video-only positioning context so title + Book now sit on the banner,
        not on the Zenith block below (mobile).
      */}
      <div className="relative w-full">
        <VimeoVideoBanner className="w-full" />

        {/* Title + subtitle over the video (mobile: 20px from top of banner; desktop: upper area) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 pt-[20px] pb-4 md:top-20 md:z-10 md:pb-0 md:pt-0">
          <div className="site-container">
            <div className="space-y-2 text-left md:space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] md:text-4xl lg:text-5xl">
                Welcome on board
              </h1>
              <p className="max-w-2xl text-base text-white/90 [text-shadow:0_1px_16px_rgba(0,0,0,0.5)] md:text-lg">
                The world&apos;s first premium leisure airline.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile only: bottom of video banner; scrolls flight search into view */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-6 md:hidden">
          <BookNowScrollToSearch className="pointer-events-auto rounded-full border-2 border-white bg-transparent px-8 py-3 text-sm font-semibold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] transition-colors hover:bg-white/15" />
        </div>
      </div>

      {/*
        Mobile: search in normal flow under the video (single iframe).
        Desktop: same node pinned to the bottom of the video area.
      */}
      <div className="relative z-10 bg-(--color-background) md:pointer-events-none md:absolute md:inset-x-0 md:bottom-0 md:z-10 md:bg-transparent md:pb-8">
        <div className="site-container md:pointer-events-auto">
          <HomeHeroZenithSearch />
        </div>
      </div>
    </div>
  );
}
