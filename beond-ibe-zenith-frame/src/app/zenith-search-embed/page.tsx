import type { Metadata } from "next";
import ZenithSearch from "../../components/ZenithSearch";

export const metadata: Metadata = {
  title: "Flight search",
  robots: { index: false, follow: false },
};

export default function ZenithSearchEmbedPage() {
  return <ZenithSearch deferSearchSubmitToParent />;
}
