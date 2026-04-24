import Image from "next/image";
import React from "react";

export type NewsCardItem = {
  title: string;
  excerpt: string;
  date?: string;
  imageSrc: string;
  imageAlt?: string;
  href?: string;
};

export type NewsListingProps = {
  heading?: string;
  items: readonly NewsCardItem[];
  className?: string;
};

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
      aria-hidden
      focusable="false"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
      aria-hidden
      focusable="false"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export default function NewsListing({
  heading,
  items,
  className = "",
}: NewsListingProps) {
  return (
    <section className={`bg-white ${className}`.trim()}>
      <div className="site-container py-12 md:py-16">
        {heading ? (
          <h2 className="text-3xl md:text-4xl text-black font-light tracking-wide pb-10">
            {heading}
          </h2>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const Wrapper: React.ElementType = item.href ? "a" : "div";

            return (
              <Wrapper
                key={`${item.title}-${idx}`}
                {...(item.href
                  ? {
                      href: item.href,
                      className:
                        "block focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary-copper) rounded-xl",
                    }
                  : {})}
              >
                <div className="mr-0 md:mr-3">
                <div className="overflow-hidden rounded-xl bg-black/5 md:h-48 lg:h-52 xl:h-64 2xl:h-72">
                  <div className="relative h-full w-full">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt ?? item.title}
                      fill
                      className="h-full w-full object-cover"
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    />
                  </div>
                </div>

                <div className="pb-10 pt-10">
                  {item.date ? (
                    <div className="flex items-center gap-2 py-4 text-(--color-primary-shimmer)">
                      <ClockIcon />
                      <div className="text-xs font-medium">{item.date}</div>
                    </div>
                  ) : null}

                  <div className="text-2xl text-black">{item.title}</div>
                  <div className="text-(--color-secondary-cobalt) text-base py-3">
                    {item.excerpt}
                  </div>

                  <div className="inline-flex items-baseline gap-2 py-4 text-(--color-primary-copper)">
                    <span className="text-base">Read More</span>
                    <ArrowRightIcon />
                  </div>
                </div>
              </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

