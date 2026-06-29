import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { IncomeCalculator } from "@/components/calculator/IncomeCalculator";
import { PageHero } from "@/components/sections/PageHero";
import { BezelCard } from "@/components/ui/BezelCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { imageFallbacks, images } from "@/config/images";

export const metadata: Metadata = {
  title: "Аренда авто без залога",
  description: "Автомобиль для такси без залога и первоначального взноса. Начните работать уже завтра.",
};

export default function BezZalogaPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Тарифы и авто", href: "/tarify-i-avto" },
          { label: "Без залога" },
        ]}
      />
      <PageHero
        eyebrow="Без залога"
        title="Аренда без залога"
        subtitle="Начните зарабатывать без стартового капитала — платите только за смену"
        imageSrc={images.tarify.bezZaloga}
        imageFallback={imageFallbacks.tarify.bezZaloga}
        imageAlt="Аренда авто без залога"
      />
      <section className="section-padding bg-bg pt-0 pb-0">
        <div className="container-main mx-auto max-w-3xl">
          <FadeIn>
            <BezelCard>
              <p className="text-base leading-[1.8] text-steel">
                Мы не берём залог и депозит за автомобиль. Единственная оплата — ежедневная аренда
                от 800 ₽/сутки. Это главное отличие от других парков, где просят 30–50 тысяч залога.
              </p>
            </BezelCard>
          </FadeIn>
        </div>
      </section>
      <IncomeCalculator showHeader={false} />
    </>
  );
}
