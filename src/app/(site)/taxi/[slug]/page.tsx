import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { IncomeCalculator } from "@/components/calculator/IncomeCalculator";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { BezelCard } from "@/components/ui/BezelCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { cities, getCityBySlug } from "@/data/cities";
import { getReviewsByIds } from "@/data/reviews";
import { getFaqByIds } from "@/data/faq";
import { getCityCardImage } from "@/config/cityImages";
import { buildJobPostingSchema } from "@/lib/seo/job-posting";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: `/taxi/${city.slug}` },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const cityReviews = getReviewsByIds(city.reviewIds);
  const cityFaq = getFaqByIds(city.faqIds);
  const schema = buildJobPostingSchema(city);

  const cityCard = getCityCardImage(city.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Города", href: "/goroda" },
          { label: city.name },
        ]}
      />
      <HeroSection
        title={`Работа в такси в ${city.namePrepositional}`}
        subtitle={city.heroSubtitle}
        city={city.name}
        imageSrc={city.photo.src}
        imageFallback={cityCard.fallback}
      />
      <section className="section-padding bg-surface pt-0">
        <div className="container-main">
          <FadeIn>
            <TrustBadges badges={city.conditions.badges} variant="light" />
            <h2 className="mt-10 text-2xl font-bold lg:text-3xl">
              Условия в {city.namePrepositional}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {city.conditions.highlights.map((item) => (
                <li key={item}>
                  <BezelCard padding="sm">
                    <span className="flex items-start gap-2 text-sm leading-relaxed text-steel">
                      <i className="ri-check-line mt-0.5 text-accent" aria-hidden />
                      {item}
                    </span>
                  </BezelCard>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>
      <IncomeCalculator defaultCitySlug={city.slug} lockCity showForm />
      {cityReviews.length > 0 && (
        <ReviewsSection reviews={cityReviews} title={`Отзывы водителей в ${city.namePrepositional}`} />
      )}
      <FAQSection items={cityFaq} title={`FAQ — такси в ${city.namePrepositional}`} />
      <section className="section-padding bg-bg">
        <FadeIn>
          <div className="container-main mx-auto max-w-3xl">
            <p className="text-base leading-[1.8] text-steel lg:text-lg">{city.description}</p>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
