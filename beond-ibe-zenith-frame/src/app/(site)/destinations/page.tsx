import type { Metadata } from "next";
import DestinationsListing, {
  type DestinationCardItem,
} from "@/components/DestinationsListing";

export const metadata: Metadata = {
  title: "Destinations | Beond",
  description:
    "Fly direct to the Maldives from destinations across the globe with beOnd.",
};

const DESTINATIONS: readonly DestinationCardItem[] = [
  {
    title: "Flights to Male",
    description:
      "Malé is your gateway to the Maldives. Explore spice markets bursting with colour and visit local treasures and timeless landmarks. Malé's bustling streets offer a glimpse into local life, where you can interact with friendly locals and discover the heart and soul of the Maldives.",
    imageSrc: "/destinations/Destinations_Maldives.webp",
    imageAlt: "Male",
  },
  {
    title: "Flights to Zurich",
    description:
      "Your gateway to the wonders of Switzerland and the Swiss Alps. Start your Swiss adventure in Zurich, a vibrant city nestled amidst breathtaking scenery. Explore snow-capped peaks, pristine lakes and charming villages – all within easy reach of this captivating city.",
    imageSrc: "/destinations/Destinations_Zurich.webp",
    imageAlt: "Zurich",
  },
  {
    title: "Flights to Dubai",
    description:
      "More than meets the eye. Discover Dubai, a city where ancient traditions seamlessly blend with modern marvels. From the serene sands of the desert to the bustling energy of the Marina, immerse yourself in the city’s cultural tapestry.",
    imageSrc: "/destinations/Destinations_Dubai.webp",
    imageAlt: "Dubai",
  },
  {
    title: "Flights to Munich",
    description:
      "Munich, the capital of Bavaria invites you to discover where tradition meets tomorrow. Dive into the city’s rich history and cultural heritage, then explore beyond the city limits where the spectacular Bavarian Alps and stunning scenery await.",
    imageSrc: "/destinations/Destinations_Munich.webp",
    imageAlt: "Munich",
  },
  {
    title: "Flights to Riyadh",
    description:
      "From the historic walls of Diriyah to the sleek, modern skyline of Riyadh, this is a city of contrasts waiting to be discovered. With its world-class museums, green spaces, lively souks and architectural wonders, explore Riyadh’s rich tapestry of traditional culture and cutting-edge innovation.",
    imageSrc: "/destinations/Destinations_Riyadh.webp",
    imageAlt: "Riyadh",
  },
  {
    title: "Flights to Red Sea",
    description:
      "Journey to the Saudi Red Sea coast where pristine shores and crystal-clear waters frame a new generation of world-class resorts. Rooted in culture and wrapped in stillness, it is a destination best experienced at this moment.",
    imageSrc: "/destinations/Destinations_RedSea.webp",
    imageAlt: "Red Sea",
  },
  {
    title: "Flights to Milan",
    description:
      "Journey to the heart of Italian elegance with a unique blend of culture and cosmopolitan charm. Stroll through the fashion district, savour exquisite cuisine and unwind in chic cafes soaking up the city’s dynamic atmosphere.",
    imageSrc: "/destinations/Destinations_Milan.webp",
    imageAlt: "Milan",
  },
] as const;

export default function DestinationsPage() {
  return (
    <>
      <section className="bg-white">
        <div className="site-container pt-12 pb-6 md:pt-16 md:pb-8">
          <nav aria-label="Breadcrumb" className="text-xs text-(--color-muted)">
            <ol className="flex flex-wrap items-center gap-2 p-0 m-0 list-none">
              <li>
                <a href="/" className="hover:underline underline-offset-4">
                  Home
                </a>
              </li>
              <li aria-hidden className="text-black/25">
                /
              </li>
              <li className="text-(--color-foreground)">Destinations</li>
            </ol>
          </nav>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl text-black">
            Fly direct to the Maldives from destinations across the globe
          </h1>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-(--color-muted) md:text-base">
            Set off on an unforgettable journey with beOnd to one of the most
            idyllic destinations in the world. Fly direct to the Maldives from
            Europe, the UAE, Saudi Arabia, and Asia. Experience the epitome of
            inflight comfort, exclusivity and exceptional service.
          </p>
        </div>
      </section>

      <DestinationsListing heading="Where we fly" items={DESTINATIONS} />
    </>
  );
}

