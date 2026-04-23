"use client";

import { useMemo, useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  name: string;
  items: readonly FaqItem[];
};

export type FaqAccordionProps = {
  title?: string;
  subtitle?: string;
  categories: readonly FaqCategory[];
  className?: string;
  initialCategory?: string;
};

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 transition-transform duration-200 ${
        open ? "rotate-45" : ""
      }`}
      aria-hidden
      focusable="false"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function FaqAccordion({
  title = "Frequently asked questions",
  subtitle,
  categories,
  className = "",
  initialCategory = "All",
}: FaqAccordionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const normalizedQuery = query.trim().toLowerCase();

  const safeCategories = useMemo(
    () =>
      (categories ?? [])
        .filter(Boolean)
        .map((c) => ({
          name: c.name,
          items: (c.items ?? []).filter(Boolean),
        }))
        .filter((c) => c.name && c.items.length > 0),
    [categories],
  );

  const allItems = useMemo(
    () => safeCategories.flatMap((c) => c.items),
    [safeCategories],
  );

  const visibleItems = useMemo(() => {
    const base =
      selectedCategory === "All"
        ? allItems
        : safeCategories.find((c) => c.name === selectedCategory)?.items ?? [];

    if (!normalizedQuery) return base;
    return base.filter((it) => {
      const hay = `${it.question}\n${it.answer}`.toLowerCase();
      return hay.includes(normalizedQuery);
    });
  }, [allItems, normalizedQuery, safeCategories, selectedCategory]);

  const categoryNames = useMemo(() => {
    const names = safeCategories.map((c) => c.name);
    return ["All", ...names];
  }, [safeCategories]);

  return (
    <section
      className={`bg-(--color-ink) text-white ${className}`.trim()}
      aria-label={title}
    >
      <div className="site-container py-12 md:py-16">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h2>

        {subtitle ? (
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-white/75 md:text-base">
            {subtitle}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categoryNames.map((name) => {
              const active = selectedCategory === name;
              return (
                <button
                  key={name}
                  type="button"
                  className={[
                    "rounded-full border px-4 py-2 text-sm transition-colors",
                    active
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-white/10 bg-transparent text-white/70 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                  onClick={() => {
                    setSelectedCategory(name);
                    setOpenIndex(0);
                  }}
                >
                  {name}
                </button>
              );
            })}
          </div>

          <div className="w-full md:max-w-sm">
            <label className="sr-only" htmlFor="faq-search">
              Search FAQs
            </label>
            <input
              id="faq-search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpenIndex(0);
              }}
              placeholder="Search"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none focus:border-white/20 md:text-base"
              type="search"
            />
          </div>
        </div>

        <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-black/10">
          {visibleItems.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-white/70 md:px-7 md:text-base">
              No FAQs found.
            </div>
          ) : (
            visibleItems.map((item, i) => {
              const open = openIndex === i;
              return (
                <div key={`${item.question}-${i}`} className="p-0">
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-6 px-5 py-5 text-left md:px-7 md:py-6"
                    aria-expanded={open}
                    onClick={() =>
                      setOpenIndex((prev) => (prev === i ? null : i))
                    }
                  >
                    <span className="text-base font-semibold leading-snug md:text-lg">
                      {item.question}
                    </span>
                    <span className="mt-0.5 text-white/90">
                      <PlusIcon open={open} />
                    </span>
                  </button>

                  {open ? (
                    <div className="-mt-2 px-5 pb-5 md:px-7 md:pb-6">
                      <p className="text-sm leading-relaxed text-white/80 md:text-base">
                        {item.answer}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

