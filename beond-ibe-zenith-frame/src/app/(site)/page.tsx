import ThreeImageFeatures, {
  BEOND_THREE_IMAGE_FEATURES,
} from "../../components/ThreeImageFeatures";
import VimeoVideoBanner from "../../components/VimeoVideoBanner";
import ZenithSearchFrame from "../../components/ZenithSearchFrame";

export default function Home() {
  return (
    <>
    {/* Mobile: pb reserves space for Zenith iframe — absolute overlay does not affect layout height, so a tall iframe was overlapping ThreeImageFeatures. */}
    <div className="relative isolate w-full max-md:pb-[clamp(22rem,88vw,36rem)] md:pb-0">
      <VimeoVideoBanner className="w-full" />
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col pt-32 md:pt-20 pb-1 md:pb-8">
        <div className="site-container pointer-events-auto flex min-h-0 flex-1 flex-col">
          <div className="text-left space-y-2 md:space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
            Welcome on board
            </h1>
            <p className="max-w-2xl text-base text-white/90 md:text-lg [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]">
            The world's first premium leisure airline.
            </p>
          </div>

          <div className="mt-auto w-full pt-5 md:pt-14">
            <ZenithSearchFrame variant="hero" />
          </div>
        </div>
      </div>
    </div>
    <ThreeImageFeatures
      title={BEOND_THREE_IMAGE_FEATURES.title}
      items={BEOND_THREE_IMAGE_FEATURES.items}
    />
    </>
  );
}
