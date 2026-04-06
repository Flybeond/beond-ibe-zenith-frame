import HomeHero from "../../components/HomeHero";
import ThreeImageFeatures, {
  BEOND_THREE_IMAGE_FEATURES,
} from "../../components/ThreeImageFeatures";
import { redirect } from "next/navigation";

// Query-string driven redirects must run per-request (not at build time).
export const dynamic = "force-dynamic";
export const revalidate = 0;

const ZENITH_LANDING_REDIRECT_BASE_URL =
  "https://fo-emea.ttinteractive.com/Zenith/FrontOffice/beond/en-GB/BookingEngine/SearchResult";

const CURRENCY_BY_ORIGIN_AIRPORT: Record<string, string> = {
  CDG: "EUR",
  MUC: "EUR",
  MXP: "EUR",
  MLE: "USD",
  SVO: "USD",
  RSI: "SAR",
  RUH: "SAR",
  ZRH: "CHF",
  DWC: "AED",
  LHR: "EUR",
};

function currencyForOriginAirport(originAirport: string): string | undefined {
  return CURRENCY_BY_ORIGIN_AIRPORT[originAirport.toUpperCase()];
}

function firstParam(
  v: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

function buildZenithRedirectUrlFromLandingSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): string | null {
  const origin = firstParam(searchParams.OriginAirport);
  const destination = firstParam(searchParams.DestinationAirport);
  const departDate = firstParam(searchParams.DepartDate);

  if (!origin || !destination || !departDate) return null;

  const isReturnTrip =
    (firstParam(searchParams.IsReturnTrip) || "").toLowerCase() === "true";
  const returnDate = firstParam(searchParams.ReturnDate);

  const adtRaw = firstParam(searchParams.ADT) || "0";
  const chdRaw = firstParam(searchParams.CHD) || "0";
  const adt = Math.max(0, Number.parseInt(adtRaw, 10) || 0);
  const chd = Math.max(0, Number.parseInt(chdRaw, 10) || 0);

  const currency =
    firstParam(searchParams.Currency) ||
    currencyForOriginAirport(origin) ||
    "USD";
  const promoCode = firstParam(searchParams.PromoCode) || "";

  const u = new URL(ZENITH_LANDING_REDIRECT_BASE_URL);
  u.searchParams.set("IdPos", "1");
  u.searchParams.set("OriginAirportCode", origin);
  u.searchParams.set("DestinationAirportCode", destination);
  u.searchParams.set("OutboundDate", departDate);
  if (isReturnTrip && returnDate) {
    u.searchParams.set("InboundDate", returnDate);
  }

  // TravelerTypes array format expected by Zenith
  let i = 0;
  if (adt > 0) {
    u.searchParams.set(`TravelerTypes[${i}].Key`, "AD");
    u.searchParams.set(`TravelerTypes[${i}].Value`, String(adt));
    i++;
  }
  if (chd > 0) {
    u.searchParams.set(`TravelerTypes[${i}].Key`, "CHD");
    u.searchParams.set(`TravelerTypes[${i}].Value`, String(chd));
    i++;
  }

  u.searchParams.set("Flexible", "true");
  u.searchParams.set("Currency", currency);
  if (promoCode !== "") u.searchParams.set("PromoCode", promoCode);

  return u.href;
}

type LandingSearchParams = Record<string, string | string[] | undefined>;

async function resolveSearchParams(
  searchParams: LandingSearchParams | Promise<LandingSearchParams> | undefined,
): Promise<LandingSearchParams> {
  if (!searchParams) return {};
  return await Promise.resolve(searchParams);
}

export default async function Home({
  searchParams,
}: {
  searchParams?: LandingSearchParams | Promise<LandingSearchParams>;
}) {
  const sp = await resolveSearchParams(searchParams);
  const redirectUrl = buildZenithRedirectUrlFromLandingSearchParams(sp);
  if (redirectUrl) {
    redirect(redirectUrl);
  }

  return (
    <>
      <HomeHero />
      <ThreeImageFeatures
        title={BEOND_THREE_IMAGE_FEATURES.title}
        items={BEOND_THREE_IMAGE_FEATURES.items}
      />
    </>
  );
}
