import Image from "next/image";
import React from "react";

export type DestinationCardItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  href?: string;
};

export type DestinationsListingProps = {
  heading?: string;
  items: readonly DestinationCardItem[];
  className?: string;
};

export default function DestinationsListing({
  heading,
  items,
  className = "",
}: DestinationsListingProps) {
  return (
    <section className={`bg-white ${className}`.trim()}>
      <div className="site-container py-12 md:py-16">
        {heading ? (
          <h2 className="text-3xl md:text-4xl text-black font-light tracking-wide">
            {heading}
          </h2>
        ) : null}

        <div className={`${heading ? "mt-10" : ""} grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3`}>
          {items.map((item, idx) => {
            const CardInner = (
              <div className="bg-white rounded-2xl border border-black/10 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative w-full aspect-16/10">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt ?? item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="text-2xl font-normal text-black">
                    {item.title}
                  </div>
                  <div className="text-(--color-secondary-cobalt) font-light text-base pt-2">
                    {item.description}
                  </div>
                </div>
              </div>
            );

            return item.href ? (
              <a
                key={`${item.title}-${idx}`}
                href={item.href}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary-copper) rounded-2xl"
              >
                {CardInner}
              </a>
            ) : (
              <div key={`${item.title}-${idx}`}>{CardInner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

