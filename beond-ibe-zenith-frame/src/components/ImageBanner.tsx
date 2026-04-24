import Image, { type StaticImageData } from "next/image";

type ImageBannerProps = {
  title: string;
  subtitle?: string;
  image: StaticImageData;
};

export default function ImageBanner({ title, subtitle, image }: ImageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-(--color-surface-2) text-(--color-foreground)">
      <div className="relative">
        <Image
          src={image}
          alt=""
          priority={false}
          className="h-auto w-full"
          sizes="100vw"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="site-container pb-8 md:pb-10">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl drop-shadow-sm">
            {title}
            </h1>
            {subtitle ? (
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-(--color-muted) md:text-base">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

