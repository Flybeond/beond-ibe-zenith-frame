import type { Metadata } from "next";
import Image from "next/image";
import ZohoCharterForm from "@/components/ZohoCharterForm";

export const metadata: Metadata = {
  title: "Charters | Beond",
  description:
    "Making travel arrangements for an exclusive group? Charter an aircraft with beOnd and pick your own schedule, departure airport, and destination.",
};

export default function ChartersPage() {
  return (
    <main className="text-(--color-foreground)">

      {/* Banner */}
      <section className="bg-white">
        <div className="site-container pt-10 pb-8 md:pt-14 md:pb-10">
          <nav aria-label="Breadcrumb" className="mb-3 text-xs text-(--color-muted)">
            <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
              <li>
                <a href="/" className="hover:underline underline-offset-4">Home</a>
              </li>
              <li aria-hidden className="text-black/25">/</li>
              <li className="text-(--color-foreground)">Charters</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-3 space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                Private Charters, Redefined
              </h1>
              <p className="text-sm leading-relaxed text-(--color-muted) md:text-base">
                With a fleet of aircraft specially configured for premium group travel, beOnd delivers a private charter experience unlike any other.

              </p>
            </div>

            <div className="relative lg:col-span-2 aspect-video overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
              <Image
                src="/charters/landscape/Aircraft.jpg"
                alt="beOnd charter aircraft"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 40vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Charter a plane */}
      <section className="bg-white">
        <div className="site-container py-12 md:py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-center">

            {/* Overlapping images — order-2 on mobile so text comes first */}
            <div className="relative pb-16 pr-16 md:pb-20 md:pr-20 order-2 md:order-1">
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-md">
                <Image
                  src="/charters/Dining.jpg"
                  alt="beOnd charter cabin"
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 100vw, 45vw"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-2/5 aspect-3/4 overflow-hidden rounded-2xl shadow-xl ring-4 ring-white">
                <Image
                  src="/charters/Seat.jpg"
                  alt="beOnd cabin crew"
                  fill
                  className="object-cover"
                  sizes="20vw"
                />
              </div>
            </div>

            {/* Text */}
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Charter a plane
              </h2>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold">All-premium cabin</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--color-muted) md:text-base">
                    With a seating capacity of 44 in the A319 and 68 in the A321, our cabin is a tranquil sanctuary of opulent space and comfort.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold">Bespoke service and amenities</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--color-muted) md:text-base">
                    Fully customiseable private charter packages and distinctive onboard touches align seamlessly with your personal intent and preferences. 
                  </p>
                </div>
              </div>

              <a
                href="#charter-form"
                className="mt-8 inline-block rounded-full bg-(--color-primary-copper) px-6 py-3 text-sm font-semibold text-(--color-primary-obsidian) transition-colors hover:bg-(--color-primary-obsidian) hover:text-(--color-primary-copper)"
              >
                Request a quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Travel in luxury, comfort and privacy */}
      <section className="bg-[#2A2E36] text-white">
        <div className="site-container py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Tailored to you, perfected by beOnd
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
              Whether your journey is for a conference, an important match or a celebration of a lifetime, experience in-flight hospitality at its best. 
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
            {/* Sports team travel */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                <Image src="/charters/Sports.webp" alt="Sports team travel" fill className="object-cover" sizes="(max-width: 639px) 100vw, 33vw" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Sports teams and music tours</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
Seamless travel for those competing and performing on the world stage.
              </p>
            </div>

            {/* Music tours */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                <Image src="/charters/Corporate.webp" alt="Music tours" fill className="object-cover" sizes="(max-width: 639px) 100vw, 33vw" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Meetings, Incentives, Conferences and Exhibitions (MICE)</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Rewarding journeys for teams and executives shaping tomorrow.
              </p>
            </div>

            {/* MICE */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                <Image src="/charters/Celebration.jpg" alt="Meetings, Incentives, Conferences and Exhibitions" fill className="object-cover" sizes="(max-width: 639px) 100vw, 33vw" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                Private expeditions
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
Curated itineraries across the world’s most unique destinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Charter form */}
      <section id="charter-form" className="relative min-h-175 flex items-center">
        <Image
          src="/charters/Form%20Background.png"
          alt=""
          fill
          className="object-cover"
          aria-hidden
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" aria-hidden />

        <div className="site-container relative py-14 md:py-20 flex justify-center">
          <div className="w-full max-w-4xl">
            <ZohoCharterForm />
          </div>
        </div>
      </section>

    </main>
  );
}
