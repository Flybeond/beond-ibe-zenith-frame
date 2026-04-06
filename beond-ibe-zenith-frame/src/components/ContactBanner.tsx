import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

type ContactBannerProps = {
  /** Breadcrumb label for the current page (e.g. "Contact"). */
  pageLabel: string;
  /** Main headline. */
  title: string;
  /** Optional supporting text. */
  description?: string;
  /** Extra content under the description (e.g. phone numbers). */
  children?: ReactNode;
};

export default function ContactBanner({
  pageLabel,
  title,
  description,
  children,
}: ContactBannerProps) {
  return (
    <section className="bg-(--color-surface-2) text-(--color-foreground)">
      <div className="site-container py-10 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <nav aria-label="Breadcrumb" className="text-xs text-(--color-muted)">
              <ol className="flex flex-wrap items-center gap-2 p-0 m-0 list-none">
                <li>
                  <Link href="/" className="hover:underline underline-offset-4">
                    Home
                  </Link>
                </li>
                <li aria-hidden className="text-black/25">
                  /
                </li>
                <li className="text-(--color-foreground)">{pageLabel}</li>
              </ol>
            </nav>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-(--color-muted) md:text-base">
                {description}
              </p>
            ) : null}
            {children ? <div className="mt-5">{children}</div> : null}
          </div>

          <div className="md:col-span-5">
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-(--color-surface) ring-1 ring-black/5">
                <Image
                  src="/contact/contactImage2.webp"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 33vw, 240px"
                  priority={false}
                />
              </div>
              <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-(--color-surface) ring-1 ring-black/5">
                <Image
                  src="/contact/contactImage1.webp"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 33vw, 240px"
                  priority={false}
                />
              </div>
              <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-(--color-surface) ring-1 ring-black/5">
                <Image
                  src="/contact/contactImage3.webp"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 33vw, 240px"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

