import type { Metadata } from "next";
import ContactBanner from "@/components/ContactBanner";
import ContactListing, { type ContactListingItem } from "@/components/ContactListing";

export const metadata: Metadata = {
  title: "Contact | Beond",
  description:
    "Contact beOnd Guest Experience for booking support, claims, refunds, and general enquiries.",
};

const listingItems: readonly ContactListingItem[] = [
  {
    title: "General Inquiry",
    description:
      "To resolve issues related to booking, baggage, and inflight requests, or arrange for special assistance, send us an email.",
    ctaLabel: "Submit a request",
    href: "mailto:customersupport@flybeond.com?subject=General%20Inquiry",
    external: true,
  },
  {
    title: "Claims and Refunds",
    description:
      "If your journey has already taken place and you would like to submit a claim — whether you are the passenger, booking holder, or a legal representative acting on behalf of a guest - please send us an email using the link below.",
    ctaLabel: "Submit a claim",
    href: "mailto:customersupport@flybeond.com?subject=Claims%20and%20Refunds",
    external: true,
  },
  {
    title: "Charter Inquiries",
    description: "For charter inquiries please contact",
    ctaLabel: "charters@flybeond.com",
    href: "mailto:charters@flybeond.com",
    external: true,
  },
  {
    title: "Group Bookings",
    description: "For group bookings please contact",
    ctaLabel: "groups@flybeond.com",
    href: "mailto:groups@flybeond.com",
    external: true,
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <ContactBanner
        pageLabel="Contact"
        title="We are here to help, 24/7"
        description="You can reach the beOnd Guest Experience Team on the following numbers:"
      >
        <ul className="m-0 list-none p-0 space-y-2 text-sm md:text-base">
          <li>
            <a
              href="tel:+97148076111"
              className="font-semibold hover:underline underline-offset-4"
            >
              +971 (0)4 807 6111
            </a>
          </li>
          <li>
            <a
              href="tel:+390294753047"
              className="font-semibold hover:underline underline-offset-4"
            >
              +39 (0)2 94753 047
            </a>
          </li>
          <li>
            <a
              href="tel:+410435086122"
              className="font-semibold hover:underline underline-offset-4"
            >
              +41 (0)4 3508 6122
            </a>
          </li>
        </ul>

        <p className="mt-5 text-sm text-(--color-muted) md:text-base">
          Alternatively, you can email us at{" "}
          <a
            className="font-semibold text-(--color-foreground) hover:underline underline-offset-4"
            href="mailto:customersupport@flybeond.com"
          >
            customersupport@flybeond.com
          </a>
          .
        </p>
      </ContactBanner>

      <ContactListing items={listingItems} />
    </>
  );
}

