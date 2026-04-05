import HomeHero from "../../components/HomeHero";
import ThreeImageFeatures, {
  BEOND_THREE_IMAGE_FEATURES,
} from "../../components/ThreeImageFeatures";

export default function Home() {
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
