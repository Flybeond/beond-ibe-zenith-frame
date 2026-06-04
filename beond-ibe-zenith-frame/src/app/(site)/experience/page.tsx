import type { Metadata } from "next";
import Image from "next/image";
import FullWidthVimeoEmbed from "@/components/FullWidthVimeoEmbed";

export const metadata: Metadata = {
  title: "Experience | Beond",
  description:
    "beOnd offers a premium flying experience that blends the exclusivity of private travel with the comfort and scale of a scheduled airline.",
};

const CABIN_CARDS = [
  { src: "/experience/EXP-P4.png", caption: "Fully reclining flat-bed seating in every row" },
  { src: "/experience/EXP-P51.png", caption: "Generous personal space and soft ambient lighting" },
  { src: "/experience/EXP-P6.png", caption: "No economy cabin, no middle seats, just premium comfort" },
] as const;

const DINING_CARDS = [
  { src: "/experience/EXP-P8.png", caption: "Curated three-course menus" },
  { src: "/experience/EXP-P7.png", caption: "Fine wines, champagne, and specialty teas" },
  { src: "/experience/EXP-P92.png", caption: "Full table lay-up service on fine chinaware" },
] as const;

const SERVICE_CARDS = [
  { src: "/experience/EXP-P10.png", caption: "Boutique crew-to-guest ratios" },
  { src: "/experience/EXP-P11.png", caption: "Multilingual hosts trained in lifestyle hospitality" },
  { src: "/experience/IMG_6697.png", caption: "Custom turndown service on longer routes" },
] as const;

const TESTIMONIALS = [
  {
    quote:
      '"beOnd delivers an exceptional premium experience that feels more like a private jet than a commercial airline. The attention to detail, privacy, and overall service quality truly sets it apart from anything else I\'ve experienced in aviation."',
    attribution: "— Matthias.D, Luxury Travel Influencer",
    image1: "/experience/testimonial-1a.png",
    image2: "/experience/EXP-P2.png",
  },
  {
    quote:
      "“This was the closest I’ve gotten to a private jet without chartering one. Discreet, refined, and just beautiful.”",
    attribution: "— Sindy.T, Luxury Travel Influencer",
    image1: "/experience/testimonial-2a.png",
    image2: "/experience/testimonial-2b.webp",
  },
] as const;

function CardGrid({
  heading,
  cards,
  bg = "bg-white",
}: {
  heading: string;
  cards: readonly { src: string; caption: string }[];
  bg?: string;
}) {
  return (
    <section className={bg}>
      <div className="site-container py-10 md:py-12">
        <h2 className="text-3xl text-black tracking-wide text-(--color-foreground) pb-6">
          {heading}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map((card) => (
            <div key={card.src} className="flex flex-col gap-3">
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl">
                <Image
                  src={card.src}
                  alt={card.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 639px) 100vw, 33vw"
                />
              </div>
              <p className="text-sm font-medium text-(--color-foreground) leading-snug">
                {card.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ExperiencePage() {
  return (
    <main className="text-(--color-foreground)">
      {/* 1 — Page heading + 3 portrait images */}
      <section className="bg-white">
        <div className="site-container pt-10 pb-8 md:pt-14 md:pb-10">
          <nav aria-label="Breadcrumb" className="mb-3 text-xs text-(--color-muted)">
            <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
              <li>
                <a href="/" className="hover:underline underline-offset-4">Home</a>
              </li>
              <li aria-hidden className="text-black/25">/</li>
              <li className="text-(--color-foreground)">Experience</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-14 lg:items-start">
            <div className="lg:col-span-3 space-y-4">
              <h1 className="text-3xl text-black tracking-wide md:text-4xl lg:text-5xl">
                Best Private Jet Alternatives for Luxury Leisure Travellers
              </h1>
              <p className="text-sm leading-relaxed text-(--color-muted) md:text-base">
                If you&rsquo;re searching for the best private jet alternative for your next luxury
                holiday, beOnd offers a premium flying experience that blends the exclusivity of
                private travel with the comfort and scale of a scheduled airline.
              </p>
              <p className="text-sm leading-relaxed text-(--color-muted) md:text-base">
                Whether you&rsquo;re flying to the Maldives, Dubai, or seasonal routes from Milan,
                Munich and Zurich, beOnd&rsquo;s all-lie-flat seating, boutique personalised
                service, and curated onboard offerings redefine how luxury leisure travel should feel.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-3 lg:col-span-2">
              {(
                [
                  ["/experience/banner-img1.webp", "beOnd cabin experience"],
                  ["/experience/banner-img2.webp", "beOnd in-flight service"],
                  ["/experience/banner-img3.webp", "beOnd luxury dining"],
                ] as const
              ).map(([src, alt]) => (
                <div
                  key={src}
                  className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5"
                >
                  <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 767px) 30vw, 13vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Comparison table */}
      <section className="bg-white">
        <div className="site-container py-10 md:py-12">
          <h2 className="text-3xl text-black tracking-wide pb-6 md:text-4xl">
            Why choose beOnd over private jet charters?
          </h2>
          <div className="overflow-x-auto rounded-xl shadow-sm">
            <table className="w-full border-collapse text-sm text-(--color-foreground)">
              <thead>
                <tr className="bg-(--color-secondary-linen)">
                  {["Feature", "Private Jet", "beOnd"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-4 text-left font-bold border-b border-black/10"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Lie-flat seats for all guests", "✔️", "✔️"],
                  ["Gourmet onboard dining", "✔️", "✔️"],
                  ["Scheduled yet exclusive routes", "✖️", "✔️"],
                  ["Transparent pricing", "✖️", "✔️"],
                  ["Affordable flight cost", "✖️", "✔️"],
                  ["No hidden extras", "✖️", "✔️"],
                ].map(([feature, jet, beond], i) => (
                  <tr key={feature} className={i % 2 === 0 ? "bg-white" : "bg-[#f6f7f9]"}>
                    <td className="px-5 py-4 border-b border-black/5">{feature}</td>
                    <td className="px-5 py-4 border-b border-black/5">{jet}</td>
                    <td className="px-5 py-4 border-b border-black/5">{beond}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3 — Designed for the modern luxury traveller */}
      <section className="bg-(--color-secondary-linen)">
        <div className="site-container py-10 md:py-14">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-md">
              <Image
                src="/experience/flight-image.webp"
                alt="beOnd aircraft"
                fill
                className="object-cover"
                sizes="(max-width: 767px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl font-light tracking-wide md:text-4xl">
                Designed for the modern luxury traveller
              </h2>
              <div className="mt-4 text-sm leading-relaxed text-(--color-muted) md:text-base space-y-2">
                <p className="font-semibold text-(--color-foreground)">
                  beOnd caters to a growing class of lifestyle-first, affluent, upscale leisure travellers seeking:
                </p>
                <ul className="space-y-1 list-none p-0">
                  <li>• Hassle-free booking and check-in</li>
                  <li>• Seamless airport lounge access</li>
                  <li>• A relaxed cabin ambiance with only a maximum of 68 guests on board</li>
                  <li>• Direct or optimised routes to dream destinations like the Maldives</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Video */}
      <section className="bg-white">
        <div className="site-container pt-10 pb-0 md:pt-12">
          <h2 className="text-3xl text-black tracking-wide md:text-4xl pb-4">
            Step Inside: The beOnd Experience
          </h2>
        </div>
      </section>
      <FullWidthVimeoEmbed videoId="1005712484" />

      {/* 5–7 — Card groups */}
      <CardGrid heading="Cabin highlights" cards={CABIN_CARDS} />
      <CardGrid heading="Onboard dining" cards={DINING_CARDS} bg="bg-(--color-secondary-linen)" />
      <CardGrid heading="Service that feels personal" cards={SERVICE_CARDS} />

      {/* 8 — Testimonials */}
      <section className="bg-[#2A2E36] text-white">
        <div className="site-container py-14 md:py-20">
          <div className="flex flex-col gap-16">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.attribution}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-start"
              >
                <div className="flex flex-col justify-center gap-4">
                  <blockquote className="text-lg font-light leading-relaxed text-white md:text-xl lg:text-2xl">
                    {t.quote}
                  </blockquote>
                  <p className="text-sm text-white/60">{t.attribution}</p>
                </div>
                <div className="flex gap-3 md:gap-4">
                  <div className="relative w-1/2 overflow-hidden rounded-2xl bg-white/10" style={{ height: 420 }}>
                    <Image src={t.image1} alt="" fill className="object-cover" sizes="25vw" />
                  </div>
                  <div className="relative w-1/2 overflow-hidden rounded-2xl bg-white/10" style={{ height: 420 }}>
                    <Image src={t.image2} alt="" fill className="object-cover" sizes="25vw" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
