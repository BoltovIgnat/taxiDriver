import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { TariffPlanSelector } from "@/components/sections/TariffPlanSelector";
import { imageFallbacks, images } from "@/config/images";

export const metadata: Metadata = {
  title: "Тарифы и автомобили",
  description:
    "Аренда авто без залога или работа на своём — сравните доход, комиссию и условия. Выберите формат и рассчитайте заработок в вашем городе.",
};

export default function TarifyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Тарифы и авто" }]} />
      <PageHero
        eyebrow="Формат работы"
        title="Тарифы и авто"
        subtitle="Сравните два способа выйти на линию — с арендой или на своём авто. Цифры, машины и условия на одной странице."
        imageSrc={images.tarify.hero}
        imageFallback={imageFallbacks.tarify.hero}
        imageAlt="Яндекс Такси на улице Москвы"
      />
      <TariffPlanSelector />
    </>
  );
}
