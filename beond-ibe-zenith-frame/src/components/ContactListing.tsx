import Link from "next/link";
import { ExternalLinkIcon } from "./ExternalLinkIcon";

export type ContactListingItem = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  /** Show external-link icon and open in a new tab. */
  external?: boolean;
};

type ContactListingProps = {
  items: readonly ContactListingItem[];
  className?: string;
  /** Desktop columns (default: 3). */
  mdColumns?: 2 | 3;
};

export default function ContactListing({
  items,
  className = "",
  mdColumns = 3,
}: ContactListingProps) {
  return (
    <section className={`bg-(--color-surface-2) ${className}`.trim()}>
      <div className="site-container pb-12 md:pb-16 lg:pb-20">
        <div
          className={`grid grid-cols-1 gap-6 ${
            mdColumns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
          }`}
        >
          {items.map((item) => {
            const common =
              "inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-5 py-2 text-sm font-semibold transition-colors";
            const cta = item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${common} hover:bg-(--color-foreground) hover:text-(--color-background)`}
                aria-label={`${item.ctaLabel} (opens external site in a new tab)`}
              >
                {item.ctaLabel}
                <ExternalLinkIcon className="size-3.5 opacity-75" />
              </a>
            ) : (
              <Link
                href={item.href}
                className={`${common} hover:bg-(--color-foreground) hover:text-(--color-background)`}
              >
                {item.ctaLabel}
              </Link>
            );

            return (
              <article
                key={`${item.title}-${item.href}`}
                className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-7"
              >
                <h2 className="text-lg font-semibold leading-snug md:text-xl">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-(--color-muted)">
                  {item.description}
                </p>
                <div className="mt-auto pt-6">{cta}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

