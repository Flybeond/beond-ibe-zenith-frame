import type { Metadata } from "next";
import Image from "next/image";
import JourneyDetailsWhyBeond, {
  type JourneyItem,
} from "@/components/JourneyDetailsWhyBeond";
import RouteMap from "@/components/RouteMap";

export const metadata: Metadata = {
  title: "Why Beond | Beond",
  description:
    "The first pure luxury airline providing an exceptional inflight experience — from airport lounges to exquisite cuisine and luxurious cabins.",
};

const JOURNEY_ITEMS: readonly JourneyItem[] = [
  {
    tabLabel: "Beverages",
    heading: "Select beverages on beOnd",
    contentHtml:
      "<p>Pair your meal with a choice of premium spirits or explore our extensive wine list. Whether you prefer a glass of Champagne, a carefully chosen wine or a freshly squeezed juice, our selection caters to every taste.</p>",
    image1: "/whybeond/IMAGE-13.webp",
    image2: "/whybeond/IMAGE-14.webp",
  },
  {
    tabLabel: "Luxury Transfer",
    heading: "Private chauffeuring",
    contentHtml:
      "<p>Begin your journey in luxury with our airline chauffeur service*, ensuring a seamless, stress-free journey to the airport.</p><br /><p>*Based on availability and on your selected fare</p>",
    image1: "/whybeond/IMAGE-7.webp",
    image2: "/whybeond/IMAGE-8.webp",
  },
  {
    tabLabel: "Lounge Access",
    heading: "Premium airport lounge access*",
    contentHtml:
      "<p>Enhance your pre-flight experience with airport lounge access offering premium refreshments, comfortable seating and high-speed Wi-Fi.</p><br /><p>*Based on availability and on your selected fare</p>",
    image1: "/whybeond/IMAGE-9.webp",
    image2: "/whybeond/IMAGE-10.webp",
  },
  {
    tabLabel: "Dining",
    heading: "In-flight fine dining",
    contentHtml:
      "<p>The in-flight menu showcases fresh, seasonal ingredients, including sustainably sourced produce, vegetarian options and delicious bread baskets. At Beond, we prioritise your comfort and well-being by catering to all dietary preferences. Elevate your dining experience with our bespoke table service presented on high-quality chinaware for a touch of elegance.</p>",
    image1: "/whybeond/IMAGE-11.webp",
    image2: "/whybeond/IMAGE-12.webp",
  },
] as const;

export default function WhyBeondPage() {
  return (
    <main className="text-(--color-foreground)">
      {/* Page heading */}
      <section className="bg-white">
        <div className="site-container pt-10 pb-8 md:pt-14 md:pb-10">
          <nav aria-label="Breadcrumb" className="mb-3 text-xs text-(--color-muted)">
            <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
              <li>
                <a href="/" className="hover:underline underline-offset-4">
                  Home
                </a>
              </li>
              <li aria-hidden className="text-black/25">/</li>
              <li className="text-(--color-foreground)">Why Beond</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Why fly with Beond?
          </h1>
        </div>
      </section>

      {/* Intro: text content + 3 portrait images */}
      <section className="bg-white">
        <div className="site-container py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-14">
            <div className="space-y-4 text-sm leading-relaxed text-(--color-muted) md:text-base lg:col-span-3">
              <p>
                The first pure luxury airline that aims to provide you with an
                exceptional inflight experience that exceeds your expectations
                and caters to your needs and preferences. From the airport
                lounges to the exquisite cuisine, made from the finest and
                freshest ingredients to comfortable seats, and luxurious
                amenities, we have created an experience that puts you at the
                center.
              </p>
              <p>
                At Beond, we define luxury by the quality of your experience and
                services. Our luxury is about exclusivity, authenticity, and
                meaningfulness. It&apos;s about indulging in the finest things
                in life and enjoying them in a way that stimulates the senses
                and nourishes the soul. To do this, we aim to fly you to remote
                and unspoiled places where you can release the explorer in you
                and immerse yourself in the experience of a perfect vacation.
              </p>
              <p>
                When you fly with us, you will have an &quot;aha&quot; moment
                because we want to create lasting memories and be the gateway to
                new and exciting destinations.
              </p>
              <p>
                We continue to look for limitless opportunities to grow with you
                and connect you to exotic destinations. Let&apos;s fly you
                beyond!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-3 lg:col-span-2">
              {(
                [
                  ["/whybeond/WhybeOnd_1.webp", "Beond luxury experience"],
                  ["/whybeond/WhybeOnd_2.webp", "Beond luxury cabin"],
                  ["/whybeond/WhybeOnd_3.webp", "Beond destinations"],
                ] as const
              ).map(([src, alt]) => (
                <div
                  key={src}
                  className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5"
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 30vw, 13vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <JourneyDetailsWhyBeond items={JOURNEY_ITEMS} />

      <RouteMap />
    </main>
  );
}
