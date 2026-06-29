import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { BezelCard } from "@/components/ui/BezelCard";
import { SiteImage } from "@/components/ui/SiteImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { imageFallbacks, images } from "@/config/images";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  showForm?: boolean;
  city?: string;
  ctaHref?: string;
  ctaLabel?: string;
  imageSrc?: string;
  imageFallback?: string;
  imageClassName?: string;
}

export function HeroSection({
  title,
  subtitle,
  showForm = true,
  city,
  ctaHref = "#calculator",
  ctaLabel = "Стать водителем",
  imageSrc = images.home.heroDesktop,
  imageFallback = imageFallbacks.home.heroDesktop,
  imageClassName = "object-cover object-[65%_center]",
}: HeroSectionProps) {
  return (
    <section className="hero-dark section-padding">
      <div className="container-main relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <TrustBadges variant="dark" />
            <h1 className="mt-6 text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-[3.25rem]">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-300 lg:text-xl">
              {subtitle}
            </p>
            {!showForm && (
              <Button href={ctaHref} className="mt-8" showArrow>
                {ctaLabel}
              </Button>
            )}
          </FadeIn>

          <FadeIn delay={120} className="relative">
            <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#1e293b] ring-1 ring-white/10 lg:mb-0 lg:aspect-[16/11]">
              <SiteImage
                src={imageSrc}
                fallback={imageFallback}
                alt="Водитель такси"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={imageClassName}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-hero)]/40 via-transparent to-transparent" />
            </div>

            {showForm && (
              <BezelCard className="lg:absolute lg:-bottom-8 lg:-left-8 lg:max-w-md lg:shadow-float">
                <h2 className="text-xl font-bold text-[var(--color-text)]">Стать водителем</h2>
                <p className="mt-1 text-sm text-muted">Перезвоним за 15 минут</p>
                <div className="mt-5">
                  <LeadForm city={city} compact />
                </div>
              </BezelCard>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
