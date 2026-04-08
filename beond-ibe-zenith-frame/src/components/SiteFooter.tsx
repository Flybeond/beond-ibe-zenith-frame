import React from "react";
import { ExternalLinkIcon } from "./ExternalLinkIcon";

const logoUrl = "/companylogo-white.png";

const BEOND_HOLIDAYS_URL = "https://holidays.flybeond.com/";

const socialIcons: Array<{ label: string; href: string; src: string }> = [
  {
    label: "Facebook",
    href: "https://facebook.com/flybeond",
    src: "/facebook_svg.svg",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/flybeond",
    src: "/instagram_svg.svg",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/flybeond/",
    src: "/linkedin_svg.svg",
  },
  {
    label: "Snapchat",
    href: "https://www.snapchat.com/add/fly-beond",
    src: "/snapchat_svg.svg",
  },
  {
    label: "TikTok",
    href: "http://www.tiktok.com/@flybeond",
    src: "/tiktok_svg.svg",
  },
  {
    label: "X",
    href: "https://twitter.com/BeondAirlines",
    src: "/x_logo_svg.svg",
  },
  {
    label: "YouTube",
    href: "http://www.youtube.com/@flybeond",
    src: "/youtube_svg.svg",
  },
];

const footerColumns: Array<{
  heading: string;
  links: Array<{ label: string; href: string; externalIcon?: boolean }>;
}> = [
  {
    heading: "Manage Booking",
    links: [
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
        externalIcon: true,
      },
    ],
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-(--color-ink) text-white">
      <div className="site-container pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="flex flex-col gap-4 md:col-span-3">
            <a
              href="https://flybeond.com/"
              aria-label="beOnd home"
              className="inline-flex items-center gap-3"
            >
              <img
                src={logoUrl}
                alt="beOnd"
                className="h-8 w-auto"
                loading="lazy"
              />
            </a>
            <p className="text-sm text-white/80 leading-relaxed">
              Premium direct flights to and from the Maldives.
            </p>

            <div className="flex items-center gap-2 pt-2">
              {socialIcons.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  <img src={s.src} alt={s.label} width={28} height={28} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-1 gap-10">
            {footerColumns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
                  {col.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        l.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex items-center gap-1.5 hover:text-white hover:underline underline-offset-4 transition-colors"
                      aria-label={
                        l.externalIcon
                          ? `${l.label} (opens external site in a new tab)`
                          : undefined
                      }
                    >
                      {l.label}
                      {l.externalIcon ? (
                        <ExternalLinkIcon className="size-3.5 opacity-80" />
                      ) : null}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/*<div className="flex flex-col gap-4 md:col-span-3">
            <div className="text-sm font-semibold">Sign up for our newsletter</div>
            <p className="text-sm text-white/80 leading-relaxed">
              Stay up to date with offers and announcements.
            </p>
            <form className="flex flex-col gap-3">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full rounded-full px-4 py-2 bg-white text-black placeholder:text-black/50 outline-none focus:ring-2 focus:ring-(--color-brand)"
              />
              <button
                type="button"
                className="w-fit rounded-full bg-(--color-brand) text-black px-6 py-2 text-sm font-semibold hover:bg-[color-mix(in_srgb,var(--color-brand),white_15%)] transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="text-xs text-white/60">
              By subscribing, you agree to receive marketing emails.
            </div>
          </div>*/}
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 items-end md:items-center md:justify-end">
          <div className="text-xs text-white/60 text-right">
            © {year} beOnd Aviation DWC LLC
          </div>
        </div>
      </div>
    </footer>
  );
}

