import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getNewsArticleBySlug, NEWS_ARTICLES } from "@/lib/news";

export function generateStaticParams() {
  return NEWS_ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const a = getNewsArticleBySlug(params.slug);
  if (!a) {
    return { title: "News | Beond" };
  }
  return {
    title: `${a.title} | Beond`,
    description: a.excerpt,
  };
}

export default function LatestNewsDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getNewsArticleBySlug(params.slug);

  if (!article) {
    return (
      <main className="bg-(--color-surface-2) text-(--color-foreground)">
        <div className="site-container py-12 md:py-16">
          <h1 className="text-2xl font-semibold">Article not found</h1>
          <p className="mt-3 text-(--color-muted)">
            Please return to{" "}
            <Link href="/latestnews" className="underline underline-offset-4">
              Latest News
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-(--color-surface-2) text-(--color-foreground)">
      <div className="site-container pt-12 pb-8 md:pt-16">
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
            <li>
              <Link
                href="/latestnews"
                className="hover:underline underline-offset-4"
              >
                News
              </Link>
            </li>
            <li aria-hidden className="text-black/25">
              /
            </li>
            <li className="text-(--color-foreground)">Article</li>
          </ol>
        </nav>

        <h1 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-black">
          {article.title}
        </h1>

        {article.date ? (
          <p className="mt-3 text-sm text-(--color-muted)">{article.date}</p>
        ) : null}
      </div>

      <div className="site-container pb-16">
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
          <div className="relative aspect-16/10 w-full bg-black/5">
            <Image
              src={article.imageSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 1024px"
              priority={false}
            />
          </div>
          <div className="p-6 md:p-8">
            <p className="text-base font-medium text-(--color-secondary-cobalt)">
              {article.excerpt}
            </p>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-(--color-muted) md:text-base">
              {article.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/latestnews"
                className="inline-flex items-center gap-2 text-(--color-primary-copper) hover:underline underline-offset-4"
              >
                Back to Latest News
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

