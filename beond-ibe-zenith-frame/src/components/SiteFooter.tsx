import React from "react";

const logoUrl =
  "https://edge.sitecorecloud.io/arabesquefl5949-beondibe-ibeprod-b667/media/flightbooking/Homepage/logo.png";

const socialIcons: Array<{ label: string; href: string; src: string }> = [
  {
    label: "Facebook",
    href: "https://facebook.com/flybeond",
    src: "https://edge.sitecorecloud.io/arabesquefl5949-beondibe-ibeprod-b667/media/Project/flight-booking/flight-booking/Social-Media/facebook_svg.svg",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/flybeond",
    src: "https://edge.sitecorecloud.io/arabesquefl5949-beondibe-ibeprod-b667/media/Project/flight-booking/flight-booking/Social-Media/instagram_svg.svg",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/flybeond/",
    src: "https://edge.sitecorecloud.io/arabesquefl5949-beondibe-ibeprod-b667/media/Project/flight-booking/flight-booking/Social-Media/linkedin_svg.svg",
  },
  {
    label: "Snapchat",
    href: "https://www.snapchat.com/add/fly-beond",
    src: "https://edge.sitecorecloud.io/arabesquefl5949-beondibe-ibeprod-b667/media/Project/flight-booking/flight-booking/Social-Media/snapchat_svg.svg",
  },
  {
    label: "TikTok",
    href: "http://www.tiktok.com/@flybeond",
    src: "https://edge.sitecorecloud.io/arabesquefl5949-beondibe-ibeprod-b667/media/Project/flight-booking/flight-booking/Social-Media/tiktok_svg.svg",
  },
  {
    label: "X",
    href: "https://twitter.com/BeondAirlines",
    src: "https://edge.sitecorecloud.io/arabesquefl5949-beondibe-ibeprod-b667/media/Project/flight-booking/flight-booking/Social-Media/x_logo_svg.svg",
  },
  {
    label: "YouTube",
    href: "http://www.youtube.com/@flybeond",
    src: "https://edge.sitecorecloud.io/arabesquefl5949-beondibe-ibeprod-b667/media/Project/flight-booking/flight-booking/Social-Media/youtube_svg.svg",
  },
];

const footerColumns: Array<{
  heading: string;
  links: Array<{ label: string; href: string }>;
}> = [
  {
    heading: "Experience",
    links: [
      { label: "Experience", href: "https://flybeond.com/en/experience" },
      { label: "Offers", href: "https://flybeond.com/en/offers" },
      {
        label: "Business Class Flights",
        href: "https://flybeond.com/en/business-class-flights",
      },
    ],
  },
  {
    heading: "Destinations",
    links: [
      { label: "Destinations", href: "https://flybeond.com/en/destinations" },
    ],
  },
  {
    heading: "Policies",
    links: [
      { label: "Privacy Policy", href: "https://flybeond.com/en/privacypolicy" },
      {
        label: "Terms and conditions",
        href: "https://flybeond.com/en/TermsAndConditions",
      },
      {
        label: "Cookie Policy",
        href: "https://edge.sitecorecloud.io/arabesquefl5949-beondibe-ibeprod-b667/media/Project/flight-booking/flight-booking/Legal-Docs/Cookie-Policy.pdf",
      },
      { label: "Imprint", href: "https://flybeond.com/en/Imprint" },
      {
        label: "Conditions of carriage",
        href: "https://edge.sitecorecloud.io/arabesquefl5949-beondibe-ibeprod-b667/media/Project/flight-booking/flight-booking/Legal-Docs/CoC_Beond_MS_080823_v2.pdf",
      },
      {
        label: "Notice of passenger rights",
        href: "https://flybeond.com/Noticeofpassengerrights",
      },
    ],
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-(--color-ink) text-white mt-10">
      <div className="contaner max-w-6xl mx-auto px-4 pt-12 pb-8">
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

          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {footerColumns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <div className="text-sm font-semibold">{col.heading}</div>
                <div className="flex flex-col gap-3 text-sm text-white/80">
                  {col.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="hover:text-white hover:underline underline-offset-4 transition-colors"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 md:col-span-3">
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
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="text-xs text-white/60">
            © {year} BeOnd Aivation DWC LLC
          </div>
          <div className="text-xs text-white/60">
            Designed for a premium leisure travel experience.
          </div>
        </div>
      </div>
    </footer>
  );
}

