import Link from "next/link";
import type { City } from "@/types";
import { BezelCard } from "@/components/ui/BezelCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SiteImage } from "@/components/ui/SiteImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { getCityCardImage } from "@/config/cityImages";

export function CityGrid({ cities, title }: { cities: City[]; title?: string }) {
  return (
    <section className="section-padding bg-surface">
      <div className="container-main">
        {title && (
          <FadeIn>
            <SectionHeader eyebrow="География" title={title} align="left" className="mb-12" />
          </FadeIn>
        )}
        <div className="-mx-2 flex flex-wrap justify-center gap-y-4">
          {cities.map((city, i) => {
            const cardImage = getCityCardImage(city.slug);
            return (
            <FadeIn key={city.slug} delay={i * 40} className="w-full px-2 sm:w-1/2 lg:w-1/3 xl:w-1/4">
              <Link href={`/taxi/${city.slug}`} className="group block">
                <BezelCard padding="sm" className="h-full transition-transform duration-500 ease-premium group-hover:-translate-y-1">
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-[calc(2rem-0.75rem)]">
                    <SiteImage
                      src={cardImage.src}
                      fallback={cardImage.fallback}
                      alt={`Работа в такси в ${city.name}`}
                      fill
                      sizes="(max-width:640px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-hero)]/70 to-transparent" />
                    <p className="absolute bottom-3 left-3 text-lg font-bold text-white">{city.name}</p>
                  </div>
                  <p className="text-sm text-muted">{city.region}</p>
                  <p className="mt-2 text-base font-bold text-accent">{city.income.displayRange}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-steel transition-colors group-hover:text-accent">
                    Подробнее
                    <i className="ri-arrow-right-line" aria-hidden />
                  </span>
                </BezelCard>
              </Link>
            </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
