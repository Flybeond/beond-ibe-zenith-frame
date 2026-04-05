import React from "react";
import { ExternalLinkIcon } from "./ExternalLinkIcon";

const logoUrl = "/companylogo-dark.png";

const BEOND_HOLIDAYS_URL = "https://holidays.flybeond.com/";

const navItems: Array<{
  label: string;
  href: string;
  openInNewTab?: boolean;
}> = [
  {
    label: "Manage Booking",
    href: "https://fo-emea.ttinteractive.com/Zenith/FrontOffice/beond/en-GB/Home/FindBooking",
  },
  {
    label: "Check In",
    href: "https://fo-emea.ttinteractive.com/zenith/frontoffice/beond/en-GB/Home/FindBooking?mode=webchecking",
  },
  {
    label: "Flight Status",
    href: "https://fo-emea.ttinteractive.com/Zenith/FrontOffice/beond/en-GB/FlightStatusSearch/FlightStatus",
  },
  {
    label: "beOnd Holidays",
    href: BEOND_HOLIDAYS_URL,
    openInNewTab: true,
  },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-(--color-background) text-(--color-foreground) border-b border-black/5 shadow-md">
      <div className="site-container">
        <div className="h-16 flex items-center justify-between gap-4">
          <a
            href="https://flybeond.com/"
            className="flex items-center gap-3"
            aria-label="beOnd home"
          >
            <img
              src={logoUrl}
              alt="beOnd"
              className="h-7 w-auto"
              loading="eager"
            />
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.openInNewTab ? "_blank" : undefined}
                rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 hover:underline underline-offset-4"
                aria-label={
                  item.openInNewTab
                    ? `${item.label} (opens external site in a new tab)`
                    : undefined
                }
              >
                {item.label}
                {item.openInNewTab ? (
                  <ExternalLinkIcon className="size-3.5 opacity-70" />
                ) : null}
              </a>
            ))}
          </nav>

          {/*<div className="hidden md:flex items-center">
            <a
              href="#SearchCriterias"
              className="rounded-full border border-black/15 px-5 py-2 text-sm font-semibold hover:bg-(--color-foreground) hover:text-(--color-background) transition-colors"
            >
              Book
            </a>
          </div>*/}

          <div className="md:hidden">
            <details className="relative">
              <summary className="list-none cursor-pointer select-none rounded-full border border-black/15 px-4 py-2 text-sm font-semibold">
                Menu
              </summary>
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-black/10 bg-(--color-background) shadow-lg p-4 z-50">
                <div className="flex flex-col gap-3 text-sm font-medium">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 hover:underline underline-offset-4"
                      aria-label={
                        item.openInNewTab
                          ? `${item.label} (opens external site in a new tab)`
                          : undefined
                      }
                    >
                      {item.label}
                      {item.openInNewTab ? (
                        <ExternalLinkIcon className="size-3.5 opacity-70" />
                      ) : null}
                    </a>
                  ))}
                  <a
                    href="#SearchCriterias"
                    className="pt-2 rounded-lg border border-black/10 px-3 py-2 hover:bg-(--color-surface-2)"
                  >
                    Book
                  </a>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}

