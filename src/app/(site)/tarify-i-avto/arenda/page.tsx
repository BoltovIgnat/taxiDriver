import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { IncomeCalculator } from "@/components/calculator/IncomeCalculator";
import { PageHero } from "@/components/sections/PageHero";
import { BezelCard } from "@/components/ui/BezelCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { imageFallbacks, images } from "@/config/images";

export const metadata: Metadata = {
  title: "Аренда авто для такси",
  description: "Аренда автомобиля для работы в такси от 800 ₽/сутки. Эконом и комфорт, без залога.",
};

export default function ArendaPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Тарифы и авто", href: "/tarify-i-avto" },
          { label: "Аренда авто" },
        ]}
      />
      <PageHero
        eyebrow="Аренда"
        title="Аренда авто для такси"
        subtitle="Нет своей машины — не проблема. Эконом и комфорт, техобслуживание на нас"
        imageSrc={images.tarify.arenda}
        imageFallback={imageFallbacks.tarify.arenda}
        imageAlt="Аренда авто для такси"
      />
      <section className="section-padding bg-bg pt-0 pb-0">
        <div className="container-main mx-auto max-w-3xl">
          <FadeIn>
            <BezelCard>
              <p className="text-base leading-[1.8] text-steel">
                Предоставляем автомобили в аренду от 800 ₽/сутки.
                Эконом (Kia Rio, Hyundai Solaris) и комфорт (Skoda Octavia, Toyota Camry).
                Техобслуживание и страховка — на нас. Вы платите только за смену.
              </p>
            </BezelCard>
          </FadeIn>
        </div>
      </section>
      <IncomeCalculator showHeader={false} />
    </>
  );
}
