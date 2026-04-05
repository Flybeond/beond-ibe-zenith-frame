import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Page not found | Beond",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-white text-(--color-foreground)">
        <div className="site-container flex min-h-[min(70dvh,40rem)] flex-col items-center justify-center py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
            404
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Page not found
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-(--color-muted) md:text-base">
            The page you are looking for does not exist or may have been moved.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex rounded-full border border-black/15 bg-(--color-foreground) px-6 py-2.5 text-sm font-semibold text-(--color-background) transition-opacity hover:opacity-90"
          >
            Back to home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
