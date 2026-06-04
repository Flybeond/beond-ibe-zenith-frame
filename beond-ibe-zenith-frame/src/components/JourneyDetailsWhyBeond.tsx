import Image from "next/image";

export type JourneyItem = {
  tabLabel: string;
  heading: string;
  contentHtml: string;
  image1: string;
  image2: string;
};

type Props = {
  items: readonly JourneyItem[];
};

export default function JourneyDetailsWhyBeond({ items }: Props) {
  return (
    <section className="bg-[#2A2E36] text-white">
      {/* Decorative wave banner */}
      <div className="w-full overflow-hidden leading-0">
        <Image
          src="/whybeond/wave-banner.png"
          alt=""
          width={1440}
          height={341}
          className="h-auto w-full"
          aria-hidden
        />
      </div>

      <div className="site-container pb-16 md:pb-20">
        <div className="flex flex-col gap-16">
          {items.map((item) => (
            <div key={item.tabLabel} className="flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-16 items-start">
              {/* Text */}
              <div className="md:w-[31.5%] shrink-0">
                <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {item.heading}
                </h2>
                <div
                  className="mt-4 text-sm leading-relaxed text-white/70 md:text-base [&_p]:mt-3 first:[&_p]:mt-0"
                  dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                />
              </div>

              {/* Images */}
              <div className="flex flex-1 gap-3 md:gap-4">
                <div className="journey-img relative w-1/2 overflow-hidden rounded-2xl bg-white/10" style={{ height: 420 }}>
                  <Image
                    src={item.image1}
                    alt={item.heading}
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 45vw, 30vw"
                  />
                </div>
                <div className="journey-img relative w-1/2 overflow-hidden rounded-2xl bg-white/10" style={{ height: 420 }}>
                  <Image
                    src={item.image2}
                    alt={item.heading}
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 45vw, 30vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
