import BookNowScrollToSearch from "./BookNowScrollToSearch";
import HeroBannerCarousel from "./HeroBannerCarousel";
import HomeHeroZenithSearch from "./HomeHeroZenithSearch";

export default function HomeHeroCarousel() {
  return (
    <div className="relative isolate w-full">
      {/* Carousel positioning context so Book now sits on the banner (mobile). */}
      <div className="relative w-full">
        <HeroBannerCarousel className="w-full" />

        {/* Mobile only: bottom of carousel; scrolls flight search into view */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-14 md:hidden">
          <BookNowScrollToSearch className="pointer-events-auto rounded-full border-2 border-white bg-transparent px-8 py-3 text-sm font-semibold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] transition-colors hover:bg-white/15" />
        </div>
      </div>

      {/*
        Mobile: search in normal flow under the carousel (single iframe).
        Desktop: same node pinned to the bottom of the carousel area.
      */}
      <div className="relative z-10 bg-(--color-background) md:pointer-events-none md:absolute md:inset-x-0 md:bottom-0 md:z-10 md:bg-transparent md:pb-8">
        <div className="site-container md:pointer-events-auto">
          <HomeHeroZenithSearch />
        </div>
      </div>
    </div>
  );
}

