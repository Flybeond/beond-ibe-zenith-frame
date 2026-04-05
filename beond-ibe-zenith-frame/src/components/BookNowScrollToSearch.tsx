"use client";

import type { ReactNode } from "react";

type BookNowScrollToSearchProps = {
  className?: string;
  children?: ReactNode;
};

export default function BookNowScrollToSearch({
  className = "",
  children = "Book now",
}: BookNowScrollToSearchProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        document
          .getElementById("SearchCriterias")
          ?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    >
      {children}
    </button>
  );
}
