import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { WorkConditionsSection } from "@/components/sections/WorkConditionsSection";
import { imageFallbacks, images } from "@/config/images";

export const metadata: Metadata = {
  title: "Условия работы водителем такси",
  description:
    "Комиссия от 15%, выплаты каждый день, аренда от 800 ₽/сутки без залога. Документы, подключение за 1 день — все условия на одной странице.",
};

export default function UsloviyaPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Условия" }]} />
      <PageHero
        eyebrow="Условия"
        title="Условия работы"
        subtitle="Комиссия, выплаты, аренда и документы — без скрытых платежей. Подключаем к агрегаторам напрямую, условия фиксируем при старте."
        imageSrc={images.usloviya.hero}
        imageFallback={imageFallbacks.usloviya.hero}
        imageAlt="Условия работы водителем такси"
      />
      <WorkConditionsSection />
    </>
  );
}
