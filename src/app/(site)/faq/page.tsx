import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSection } from "@/components/sections/FAQSection";
import { PageHero } from "@/components/sections/PageHero";
import { faqItems } from "@/data/faq";
import { imageFallbacks, images } from "@/config/images";

export const metadata: Metadata = {
  title: "Частые вопросы — работа водителем такси",
  description: "Ответы на вопросы о документах, самозанятости, аренде авто, выплатах и подключении к такси.",
};

export default function FAQPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "FAQ" }]} />
      <PageHero
        eyebrow="FAQ"
        title="Частые вопросы"
        subtitle="Всё о документах, самозанятости, аренде авто и выплатах — коротко и по делу"
        imageSrc={images.faq.hero}
        imageFallback={imageFallbacks.faq.hero}
        imageAlt="Частые вопросы водителей"
      />
      <FAQSection items={faqItems} showHeader={false} />
    </>
  );
}
