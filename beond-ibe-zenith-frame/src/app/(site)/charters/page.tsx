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
                Beond Charters
              </h1>
              <p className="text-sm leading-relaxed text-(--color-muted) md:text-base">
                Making travel arrangements for an exclusive group? We are here to provide you with an
                exceptional first-class travel experience. Chartering an aircraft from us means you
                get to pick your schedule, departure airport, and the final destination.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-3 lg:col-span-2">
              {(
                [
                  ["/charters/Seat.jpg", "beOnd charter seat"],
                  ["/charters/Aircraft%20Render.jpg", "beOnd aircraft"],
                  ["/charters/Celebration.jpg", "beOnd celebration"],
                ] as const
              ).map(([src, alt]) => (
                <div
                  key={src}
                  className="relative aspect-3/4 overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5"
                >
                  <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 767px) 30vw, 13vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Charter a plane */}
      <section className="bg-white">
        <div className="site-container py-12 md:py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-center">

            {/* Overlapping images */}
            <div className="relative pb-16 pr-16 md:pb-20 md:pr-20">
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
                  src="/charters/Cabin%20Crew.jpg"
                  alt="beOnd cabin crew"
                  fill
                  className="object-cover"
                  sizes="20vw"
                />
              </div>
            </div>

            {/* Text */}
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Charter a plane
              </h2>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold">Our fleet</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--color-muted) md:text-base">
                    Experience the ultimate in luxury travel. Our A319 aircraft has a seating
                    capacity of 44, featuring premium lie-flat seats for opulent space and comfort.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold">Bespoke premium service</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--color-muted) md:text-base">
                    Let us tailor your journey for excellence. Tell us what you need, and experience
                    a personalised in-flight service just for you.
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
              Travel in luxury, comfort and privacy
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
              Whether your journey is for a conference, an important match or a sold-out concert,
              experience in-flight hospitality at its best.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
            {/* Sports team travel */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                <Image src="/charters/Corporate.jpg" alt="Sports team travel" fill className="object-cover" sizes="(max-width: 639px) 100vw, 33vw" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Sports team travel</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Get your players, staff, &amp; equipment to their destination in luxury. With a
                strong focus on comfort, safety and efficiency, we ensure your athletes are
                well-rested and ready to win.
              </p>
            </div>

            {/* Music tours */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                <Image src="/charters/Sports.jpg" alt="Music tours" fill className="object-cover" sizes="(max-width: 639px) 100vw, 33vw" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Music tours</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Whether you are travelling on a world tour or need a last-minute flight to a music
                festival, we are here to provide you with a solution at any time.
              </p>
            </div>

            {/* MICE */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                <Image src="/charters/Celebration.jpg" alt="Meetings, Incentives, Conferences and Exhibitions" fill className="object-cover" sizes="(max-width: 639px) 100vw, 33vw" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                Meetings, Incentives, Conferences and Exhibitions (MICE)
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Simplifying your corporate travel requirements, encompassing meetings, conferences,
                incentive events, product launches, and even press trips. Let us simplify complex
                group bookings for you.
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
