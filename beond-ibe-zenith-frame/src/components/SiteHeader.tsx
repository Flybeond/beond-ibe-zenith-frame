import React from "react";
import { ExternalLinkIcon } from "./ExternalLinkIcon";
import NotificationBar from "./NotificationBar";

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

const menuItems: Array<{
  label: string;
  href: string;
  openInNewTab?: boolean;
}> = [
  ...navItems,
  { label: "Contact", href: "/contact" },
  { label: "beOnd Assurance", href: "/beond-assurance" },
  { label: "Our Promise", href: "/our-promise" },
  { label: "Terms and conditions", href: "/TermsAndConditions" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-(--color-background) text-(--color-foreground) border-b border-black/5 shadow-md">
      <NotificationBar />
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

          <div className="hidden md:flex items-center gap-7">
            <nav className="flex items-center gap-7 text-sm font-medium">
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

            <details className="relative">
              <summary
                className="list-none cursor-pointer select-none rounded-full border border-black/15 p-2 text-(--color-foreground) hover:bg-black/5 transition-colors"
                aria-label="Open menu"
              >
                <span className="sr-only">Menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden
                  focusable="false"
                >
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              </summary>
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/10 bg-(--color-ink) text-white shadow-xl p-4 z-50">
                <div className="flex flex-col gap-2 text-sm font-semibold">
                  {menuItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors"
                      aria-label={
                        item.openInNewTab
                          ? `${item.label} (opens external site in a new tab)`
                          : undefined
                      }
                    >
                      <span>{item.label}</span>
                      {item.openInNewTab ? (
                        <ExternalLinkIcon className="size-3.5 opacity-80" />
                      ) : null}
                    </a>
                  ))}
                  <a
                    href="#SearchCriterias"
                    className="mt-1 rounded-lg border border-white/15 px-3 py-2 text-center hover:bg-white/10 transition-colors"
                  >
                    Book
                  </a>
                </div>
              </div>
            </details>
          </div>

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
              <summary
                className="list-none cursor-pointer select-none rounded-full border border-black/15 p-2 text-(--color-foreground) hover:bg-black/5 transition-colors"
                aria-label="Open menu"
              >
                <span className="sr-only">Menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden
                  focusable="false"
                >
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              </summary>
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-white/10 bg-(--color-ink) text-white shadow-xl p-4 z-50">
                <div className="flex flex-col gap-2 text-sm font-semibold">
                  {menuItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors"
                      aria-label={
                        item.openInNewTab
                          ? `${item.label} (opens external site in a new tab)`
                          : undefined
                      }
                    >
                      <span>{item.label}</span>
                      {item.openInNewTab ? (
                        <ExternalLinkIcon className="size-3.5 opacity-80" />
                      ) : null}
                    </a>
                  ))}
                  <a
                    href="#SearchCriterias"
                    className="mt-1 rounded-lg border border-white/15 px-3 py-2 text-center hover:bg-white/10 transition-colors"
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

