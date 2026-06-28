import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { reviews } from "@/data/reviews";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { imageFallbacks, images } from "@/config/images";

export const metadata: Metadata = {
  title: "Отзывы водителей такси",
  description: "Реальные отзывы водителей о работе в такси. Доход, условия, аренда авто без залога.",
};

export default function OtzyvyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Отзывы" }]} />
      <PageHero
        eyebrow="Отзывы"
        title="Отзывы водителей"
        subtitle="Реальные истории людей, которые уже работают с нами — доход, условия, поддержка"
        imageSrc={images.reviews.hero}
        imageFallback={imageFallbacks.reviews.hero}
        imageAlt="Отзывы водителей такси"
      />
      <ReviewsSection reviews={reviews} showHeader={false} />
    </>
  );
}
