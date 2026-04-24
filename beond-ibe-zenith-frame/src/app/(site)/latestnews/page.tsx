import type { Metadata } from "next";
import NewsListing, { type NewsCardItem } from "@/components/NewsListing";
import { NEWS_ARTICLES } from "@/lib/news";

export const metadata: Metadata = {
  title: "Latest News | Beond",
  description:
    "Stay updated with beOnd business news, including the latest press releases and articles.",
};

const NEWS: readonly NewsCardItem[] = NEWS_ARTICLES.map((a) => ({
  title: a.title,
  excerpt: a.excerpt,
  date: a.date,
  imageSrc: a.imageSrc,
  href: `/latestnews/${a.slug}`,
}));

export default function LatestNewsPage() {
  return (
    <>
      <section className="bg-white">
        <div className="site-container pt-12 pb-2 md:pt-16">
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
              <li className="text-(--color-foreground)">News</li>
            </ol>
          </nav>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl text-black">
            Media Centre
          </h1>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-(--color-muted) md:text-base">
            Stay updated with all of our business news, including the latest press
            releases and articles
          </p>
        </div>
      </section>

      <NewsListing heading="Latest News" items={NEWS} />
    </>
  );
}

