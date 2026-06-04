import Image from "next/image";

export default function RouteMap() {
  return (
    <section className="bg-(--color-surface-2) text-(--color-foreground)">
      <div className="site-container py-12 md:py-16">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Our routes
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-(--color-muted) md:text-base">
          We fly you from various routes on a direct business class flight to
          the tropical wonder of the Maldives on an unforgettable trip. beOnd
          introducing a new definition of luxury travel.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-black/10 bg-white">
          <Image
            src="/route-map.svg"
            alt="beOnd route map"
            width={1440}
            height={341}
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}

