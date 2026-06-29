import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { IncomeCalculator } from "@/components/calculator/IncomeCalculator";
import { PageHero } from "@/components/sections/PageHero";
import { BezelCard } from "@/components/ui/BezelCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { imageFallbacks, images } from "@/config/images";

export const metadata: Metadata = {
  title: "Работа в такси на своём авто",
  description: "Подключение водителей на личном автомобиле. Максимальный доход, помощь с лицензией такси.",
};

export default function SvoeAvtoPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Тарифы и авто", href: "/tarify-i-avto" },
          { label: "На своём авто" },
        ]}
      />
      <PageHero
        eyebrow="Своё авто"
        title="Работа на своём авто"
        subtitle="Самый выгодный формат — забираете весь доход за вычетом комиссии парка"
        imageSrc={images.tarify.svoeAvto}
        imageFallback={imageFallbacks.tarify.svoeAvto}
        imageAlt="Работа на своём автомобиле"
      />
      <section className="section-padding bg-bg pt-0 pb-0">
        <div className="container-main mx-auto max-w-3xl">
          <FadeIn>
            <BezelCard>
              <p className="text-base leading-[1.8] text-steel">
                Если у вас есть подходящий автомобиль — это самый выгодный формат. Не платите аренду,
                забираете весь доход за вычетом комиссии парка (от 15%). Поможем оформить лицензию такси,
                разрешение на перевозку и подключим к агрегаторам за 1 день.
              </p>
            </BezelCard>
          </FadeIn>
        </div>
      </section>
      <IncomeCalculator showHeader={false} />
    </>
  );
}
