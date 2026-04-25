import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getNewsArticleBySlug, NEWS_ARTICLES } from "@/lib/news";

export function generateStaticParams() {
  return NEWS_ARTICLES.map((a) => ({ slug: a.slug }));
}

async function resolveParams(
  params: { slug?: string | string[] } | Promise<{ slug?: string | string[] }> | undefined,
): Promise<{ slug?: string | string[] }> {
  if (!params) return {};
  return await Promise.resolve(params);
}

export async function generateMetadata({
  params,
}: {
  params: { slug?: string | string[] } | Promise<{ slug?: string | string[] }>;
}): Promise<Metadata> {
  const p = await resolveParams(params);
  const a = getNewsArticleBySlug(p.slug);
  if (!a) {
    return { title: "News | Beond" };
  }
  return {
    title: `${a.title} | Beond`,
    description: a.excerpt,
  };
}

export default async function LatestNewsDetailsPage({
  params,
}: {
  params: { slug?: string | string[] } | Promise<{ slug?: string | string[] }>;
}) {
  const p = await resolveParams(params);
  const article = getNewsArticleBySlug(p.slug);

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

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-(--color-muted) md:text-base">
              {(() => {
                const out: React.ReactNode[] = [];
                let pendingBullets: string[] = [];

                const flushBullets = (keyBase: string) => {
                  if (pendingBullets.length === 0) return;
                  const items = pendingBullets;
                  pendingBullets = [];
                  out.push(
                    <ul key={`${keyBase}-ul`} className="list-disc pl-5 space-y-2">
                      {items.map((b, i) => (
                        <li key={`${keyBase}-li-${i}`}>{b.replace(/^•\s*/, "")}</li>
                      ))}
                    </ul>,
                  );
                };

                article.content.forEach((p, i) => {
                  const trimmed = p.trim();
                  const isBullet = /^•\s*/.test(trimmed);

                  if (isBullet) {
                    pendingBullets.push(trimmed);
                    return;
                  }

                  flushBullets(String(i));
                  out.push(<p key={`p-${i}`}>{p}</p>);
                });

                flushBullets("end");
                return out;
              })()}
            </div>

            {article.instagramUrl ? (
              <div className="mt-8">
                <a
                  href={article.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-(--color-primary-copper) hover:underline underline-offset-4"
                >
                  See our Instagram post
                </a>
              </div>
            ) : null}

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

