import HomeHero from "../../components/HomeHero";
import HeroBannerCarousel from "@/components/HeroBannerCarousel";
import ThreeImageFeatures, {
  BEOND_THREE_IMAGE_FEATURES,
} from "../../components/ThreeImageFeatures";

export default function Home() {
  return (
    <>
    <HeroBannerCarousel></HeroBannerCarousel>
      <HomeHero />
      <ThreeImageFeatures
        title={BEOND_THREE_IMAGE_FEATURES.title}
        items={BEOND_THREE_IMAGE_FEATURES.items}
      />
    </>
  );
}
