import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { BezelCard } from "@/components/ui/BezelCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { imageFallbacks, images } from "@/config/images";

export const metadata: Metadata = {
  title: "Условия работы водителем такси",
  description: "Условия подключения водителей: комиссия, выплаты, аренда авто, документы, поддержка.",
};

const CONDITIONS = [
  {
    icon: "ri-percent-line",
    title: "Комиссия",
    text: "Комиссия парка — от 15% с каждого заказа. Абонентской платы нет. Все условия фиксируются при подключении.",
  },
  {
    icon: "ri-bank-card-line",
    title: "Выплаты",
    text: "Ежедневно на банковскую карту. Деньги поступают вечером за текущий рабочий день. Минимальная сумма вывода — 500 ₽.",
  },
  {
    icon: "ri-car-line",
    title: "Автомобиль",
    text: "Можно работать на своём авто или взять машину в аренду. Аренда — от 800 ₽/сутки, без залога. Эконом и комфорт класс.",
  },
  {
    icon: "ri-customer-service-2-line",
    title: "Поддержка",
    text: "Менеджер на связи в Telegram и по телефону. Помогаем с документами, лицензией, самозанятостью и техническими вопросами.",
  },
];

export default function UsloviyaPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Условия" }]} />
      <PageHero
        eyebrow="Условия"
        title="Условия работы"
        subtitle="Подключаем водителей к крупнейшим агрегаторам такси напрямую — без посредников и скрытых комиссий"
        imageSrc={images.usloviya.hero}
        imageFallback={imageFallbacks.usloviya.hero}
        imageAlt="Условия работы водителем"
      />
      <section className="section-padding bg-bg pt-0">
        <div className="container-main">
          <div className="grid gap-5 sm:grid-cols-2">
            {CONDITIONS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 60}>
                <BezelCard className="h-full">
                  <div className="step-icon !mx-0 !mb-4">
                    <i className={item.icon} aria-hidden />
                  </div>
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
                </BezelCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
