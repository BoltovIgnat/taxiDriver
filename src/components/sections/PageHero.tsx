import { FadeIn } from "@/components/ui/FadeIn";
import { SiteImage } from "@/components/ui/SiteImage";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageFallback?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  align?: "left" | "center";
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageFallback,
  imageAlt = "",
  children,
  align = "left",
}: PageHeroProps) {
  const centered = align === "center";

  return (
    <section className="section-padding bg-surface pb-12 md:pb-16 lg:pb-20">
      <div className="container-main">
        <div
          className={
            imageSrc && !centered
              ? "grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              : centered
                ? "mx-auto max-w-2xl text-center"
                : "max-w-3xl"
          }
        >
          <FadeIn className={centered ? "mx-auto" : undefined}>
            {eyebrow && (
              <span className="mb-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </span>
            )}
            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-lg leading-relaxed text-muted lg:text-xl">{subtitle}</p>
            )}
            {children && <div className={centered ? "mt-8" : "mt-8 max-w-xl"}>{children}</div>}
          </FadeIn>

          {imageSrc && !centered && imageFallback && (
            <FadeIn delay={120}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-bg ring-1 ring-black/[0.06] shadow-soft">
                <SiteImage
                  src={imageSrc}
                  fallback={imageFallback}
                  alt={imageAlt || title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
