export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date?: string;
  imageSrc: string;
  content: readonly string[];
};

export const NEWS_ARTICLES: readonly NewsArticle[] = [
  {
    slug: "bahrain-premium-airline-aviation-centre",
    title:
      "beOnd and the Kingdom of Bahrain to Establish Premium Airline and Aviation Centre of Excellence",
    excerpt:
      "beOnd Assurance provided as complimentary with every ticket purchased, strengthening the airline’s premium leisure offering.",
    imageSrc: "/banner/our-promise-banner.jpeg",
    content: [
      "beOnd Assurance provided as complimentary with every ticket purchased, strengthening the airline’s premium leisure offering.",
    ],
  },
  {
    slug: "saudi-arabia-aoc-one-million-luxury-travellers-2030",
    title:
      "beOnd to Launch Airline Based in the Kingdom of Saudi Arabia; Envisions Carrying One Million Luxury Travellers by 2030",
    excerpt:
      "beOnd, the world’s first premium leisure airline, today announced that it has begun the process to launch an airline and receive an Air Operator Certificate (AOC) in the Kingdom of Saudi Arabia, pursuant to the General Authority of Civil Aviation (GACA).",
    imageSrc: "/3images-1.webp",
    content: [
      "beOnd, the world’s first premium leisure airline, today announced that it has begun the process to launch an airline and receive an Air Operator Certificate (AOC) in the Kingdom of Saudi Arabia, pursuant to the General Authority of Civil Aviation (GACA).",
      "The announcement positions beOnd at the heart of the Kingdom’s ambitious tourism and aviation vision. It aligns with the Aviation Program under Saudi Arabia’s National Transport and Logistics Strategy and strengthens the Kingdom’s objective of building a competitive, world-class aviation sector.",
    ],
  },
  {
    slug: "premium-travel-protection-ceylinco",
    title: "beOnd Partners with Ceylinco Insurance to Launch Premium Travel Protection",
    excerpt:
      "beOnd Assurance provided as complimentary with every ticket purchased, strengthening the airline’s premium leisure offering.",
    imageSrc: "/banner/beOnd-Aessurance_resize_DesktopV3.webp",
    content: [
      "beOnd Assurance provided as complimentary with every ticket purchased, strengthening the airline’s premium leisure offering.",
    ],
  },
  {
    slug: "global-hotel-alliance-partnership",
    title:
      "beOnd and Global Hotel Alliance Partner to Elevate Global Luxury Travel Experience for Their Customers",
    excerpt:
      "beOnd, the world’s first premium leisure airline, and Global Hotel Alliance (GHA), the world’s largest alliance of independent hotel brands and creator of the award-winning multi-brand loyalty programme GHA DISCOVERY, have announced a new partnership that enhances the luxury travel journey with exclusive benefits for their loyal guests.",
    imageSrc: "/3images-2.webp",
    content: [
      "beOnd, the world’s first premium leisure airline, and Global Hotel Alliance (GHA), the world’s largest alliance of independent hotel brands and creator of the award-winning multi-brand loyalty programme GHA DISCOVERY, have announced a new partnership that enhances the luxury travel journey with exclusive benefits for their loyal guests.",
    ],
  },
  {
    slug: "maldives-commitment-fleet-expansion-2030",
    title:
      "beOnd Reaffirms its Commitment to the Maldives: Fleet Expansion to 22 Aircraft and 30+ Destinations by 2030",
    excerpt:
      "beOnd, the world’s first premium leisure airline, today announced its long-term commitment to the Maldives outlining plans to grow the fleet to 22 aircraft based in Maldives and more than 30 destinations by the end of the decade, including four new destinations in 2026.",
    imageSrc: "/3images-3.webp",
    content: [
      "beOnd, the world’s first premium leisure airline, today announced its long-term commitment to the Maldives outlining plans to grow the fleet to 22 aircraft based in Maldives and more than 30 destinations by the end of the decade, including four new destinations in 2026.",
    ],
  },
  {
    slug: "direct-flights-europe-to-red-sea",
    title:
      "beOnd Launches First-Ever Direct Flights from Europe to Red Sea International Airport",
    excerpt:
      "Flights from Milan start in November ahead of the busy holiday season. New service connects Milan travellers to a growing Red Sea destination aboard beOnd’s all-lie-flat cabin starting from November.",
    imageSrc: "/destinations/Destinations_RedSea.webp",
    content: [
      "Flights from Milan start in November ahead of the busy holiday season.",
      "New service connects Milan travellers to a growing Red Sea destination aboard beOnd’s all-lie-flat cabin starting from November.",
    ],
  },
] as const;

export function getNewsArticleBySlug(slug: string) {
  return NEWS_ARTICLES.find((a) => a.slug === slug);
}

