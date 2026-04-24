import type { Metadata } from "next";
import StaticFAQs from "@/components/StaticFAQs";
import ImageBanner from "@/components/ImageBanner";
import assuranceBanner from "@/../public/banner/beOnd-Aessurance_resize_DesktopV3.webp";

export const metadata: Metadata = {
  title: "beOnd Assurance | Beond",
  description: "Learn about beOnd Assurance and find answers to common questions.",
};

export default function BeondAssurancePage() {
  return (
    <main className="bg-(--color-surface-2) text-(--color-foreground)">
      <ImageBanner title="" image={assuranceBanner} />
      <StaticFAQs hideHeader />
    </main>
  );
}

