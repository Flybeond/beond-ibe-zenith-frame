import type { Metadata } from "next";
import ImageBanner from "@/components/ImageBanner";
import ourPromiseBanner from "@/../public/banner/our-promise-banner.jpeg";

export const metadata: Metadata = {
  title: "Our promise | Beond",
  description:
    "Our commitment to support you 24/7 with clear re-accommodation options in case of disruption.",
};

export default function OurPromisePage() {
  return (
    <main className="bg-(--color-surface-2) text-(--color-foreground)">
      <ImageBanner
        title=""
        image={ourPromiseBanner}
      />

      <div className="site-container py-12 md:py-16">
        <div className="max-w-4xl space-y-4 text-sm leading-relaxed text-(--color-muted) md:text-base">
          <p>
            At beOnd, we understand that even the best-planned journeys can face
            the unexpected. When this happens, our commitment is simple: we’re
            here for you 24/7, ensuring your experience remains seamless,
            supportive, and stress-free.
          </p>
          <p>
            That’s why we’ve updated our re-accommodation rules – to offer you
            greater clarity and flexibility, so you can resume your journey with
            confidence.
          </p>
        </div>

        <section className="mt-10 max-w-4xl">
          <h2 className="text-xl font-semibold text-(--color-foreground) md:text-2xl">
            In the unlikely event of a disruption, we will provide one of the
            following options*
          </h2>

          <div className="mt-6 space-y-4">
            <article className="rounded-2xl border border-black/10 bg-white p-6">
              <h3 className="text-base font-semibold text-(--color-foreground) md:text-lg">
                Rebooking in Business Class
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-muted) md:text-base">
                We’ll arrange Business Class travel for you with one of our
                partner airlines, subject to availability, and up to a maximum
                of 30% above the value of your original flight segment with us.
              </p>
            </article>

            <article className="rounded-2xl border border-black/10 bg-white p-6">
              <h3 className="text-base font-semibold text-(--color-foreground) md:text-lg">
                Travel Arranged in Economy
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-muted) md:text-base">
                If Business Class isn’t available or exceeds the 30% threshold,
                we’ll rebook you in Economy Class at our cost and issue a full
                refund of the cancelled sector as a voucher for future travel
                with beOnd.
              </p>
            </article>

            <article className="rounded-2xl border border-black/10 bg-white p-6">
              <h3 className="text-base font-semibold text-(--color-foreground) md:text-lg">
                Choose Your Own Way
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-muted) md:text-base">
                If you prefer to make your own travel arrangements, we’ll
                provide a full refund of the cancelled sector. However, in that
                case beOnd will not be responsible for rebooking or related
                costs.
              </p>
            </article>
          </div>

          <div className="mt-10 rounded-2xl border border-black/10 bg-(--color-secondary-linen) p-6">
            <h3 className="text-base font-semibold text-(--color-foreground) md:text-lg">
              Terms &amp; Conditions
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-(--color-muted) md:text-base">
              <li>
                The above options are subject to availability, our Conditions of
                Carriage, Fare Rules and Rules and Regulations.
              </li>
              <li>
                The above options are applicable to passengers whose
                reservations are ticketed. Tickets not issued are cancelled.
              </li>
              <li>The above options are valid for tickets issued from 1 April 2025.</li>
              <li>
                Travel vouchers are valid for one year from voucher issuance.
                Bookings must be completed through beOnd&apos;s Guest Experience
                team. Travel vouchers must be issued in the name of guests in
                the booking PNR and are non-transferable, non-renewable and
                non-exchangeable. Exception requests will be handled on a
                discretionary basis.
              </li>
              <li>
                If you have an online ticket for flight cancelled by beOnd,
                refund request should be submitted to{" "}
                <a
                  className="font-semibold text-(--color-foreground) hover:underline underline-offset-4"
                  href="mailto:customersupport@flybeond.com"
                >
                  customersupport@flybeond.com
                </a>
                .
              </li>
              <li>
                Please note that credit card refunds will be issued to your
                original form of payment. Your statement may not immediately
                reflect the refund as it may take up to a billing cycle for the
                credit card company to process the refund and for it to appear
                on your statement. Processing times may vary by country,
                depending on the banking system.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

