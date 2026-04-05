import Image from "next/image";
import React from "react";

export type ThreeImageFeatureItem = {
  src: string;
  alt: string;
  subtitle: string;
  description: string;
};

export type ThreeImageFeaturesProps = {
  title: string;
  items: readonly [ThreeImageFeatureItem, ThreeImageFeatureItem, ThreeImageFeatureItem];
  className?: string;
};

/** Example content — replace `src` URLs with your own assets when ready. */
export const BEOND_THREE_IMAGE_FEATURES = {
  title: "Premium direct flights to and from the Maldives",
  items: [
    {
      src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&h=675&fit=crop&q=80",
      alt: "Tropical coastline and clear water",
      subtitle: "Your private sanctuary awaits",
      description:
        "Settle into spacious, modern cabins featuring luxuriously appointed business class style lie-flat seats crafted in fine Italian leather. Our highly trained crew caters to your every wish, while eco-friendly plush blankets and oversized pillows guarantee total comfort throughout your journey.",
    },
    {
      src: "https://images.unsplash.com/photo-1540339832-7e01c72b9b93?w=900&h=675&fit=crop&q=80",
      alt: "A culinary adventure at 30,000 feet",
      subtitle: "A culinary adventure at 30,000 feet",
      description:
        "Savour a menu featuring globally and regionally inspired dishes prepared by renowned chefs using fresh, seasonal and sustainable ingredients. Our attentive crew ensures a bespoke dining experience, complete with exquisite chinaware, fine wines and select beverages.",
    },
    {
      src: "https://images.unsplash.com/photo-1488085061387-422e29abf0b2?w=900&h=675&fit=crop&q=80",
      alt: "Tailored comfort & entertainment",
      subtitle: "Tailored comfort & entertainment",
      description:
        "Explore global flavours through our curated menus, then choose your own path to relaxation with entertainment at your fingertips, accessible on your device or ours.",
    },
  ],
} satisfies ThreeImageFeaturesProps;

export default function ThreeImageFeatures({
  title,
  items,
  className = "",
}: ThreeImageFeaturesProps) {
  return (
    <section
      className={`bg-(--color-surface-2) text-(--color-foreground) ${className}`.trim()}
      aria-labelledby="three-image-features-title"
    >
      <div className="site-container py-12 md:py-16 lg:py-20">
        <h2
          id="three-image-features-title"
          className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl"
        >
          {title}
        </h2>

        <ul className="mt-8 grid list-none grid-cols-1 gap-10 md:mt-12 md:grid-cols-3 md:gap-6 lg:gap-10 p-0">
          {items.map((item, index) => (
            <li key={`${item.src}-${index}`} className="flex flex-col">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-(--color-surface) shadow-sm ring-1 ring-black/5">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 33vw, 360px"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-snug md:text-xl">
                {item.subtitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-muted) md:text-base">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
