import type { Metadata } from "next";
import StaticFAQs from "@/components/StaticFAQs";

export const metadata: Metadata = {
  title: "beOnd Assurance | Beond",
  description: "Learn about beOnd Assurance and find answers to common questions.",
};

export default function BeondAssurancePage() {
  return <StaticFAQs />;
}

