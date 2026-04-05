import React from "react";

const logoUrl = "/companylogo-dark.png";

const navItems: Array<{ label: string; href: string }> = [
  { label: "Manage Booking", href: "https://fo-emea.ttinteractive.com/Zenith/FrontOffice/beond/en-GB/Home/FindBooking" },
  { label: "Check In", href: "https://fo-emea.ttinteractive.com/zenith/frontoffice/beond/en-GB/Home/FindBooking?mode=webchecking" },
  { label: "Flight Status", href: "https://fo-emea.ttinteractive.com/Zenith/FrontOffice/beond/en-GB/FlightStatusSearch/FlightStatus" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-(--color-background) text-(--color-foreground) border-b border-black/5 shadow-md">
      <div className="max-w-6xl mx-auto px-4" >
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
                className="hover:underline underline-offset-4"
              >
                {item.label}
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
                      className="hover:underline underline-offset-4"
                    >
                      {item.label}
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

