import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { BezelCard } from "@/components/ui/BezelCard";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { imageFallbacks, images } from "@/config/images";

export const metadata: Metadata = {
  title: "О сервисе",
  description: "Таксопарк Партнёр — прямое подключение водителей к агрегаторам такси по всей России.",
};

const STATS = [
  { value: "25+", label: "городов" },
  { value: "2019", label: "год основания" },
  { value: "24/7", label: "поддержка" },
];

export default function OServisePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "О сервисе" }]} />
      <PageHero
        eyebrow="О нас"
        title="О сервисе"
        subtitle="Прямое подключение водителей к агрегаторам такси — без посредников и скрытых комиссий"
        imageSrc={images.oServise.hero}
        imageFallback={imageFallbacks.oServise.hero}
        imageAlt="О сервисе подключения водителей"
      />
      <section className="section-padding bg-bg pt-0">
        <div className="container-main mx-auto max-w-3xl space-y-8">
          <FadeIn>
            <div className="grid gap-4 sm:grid-cols-3">
              {STATS.map((stat) => (
                <BezelCard key={stat.label} padding="sm" className="text-center">
                  <p className="text-2xl font-bold text-accent">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted">{stat.label}</p>
                </BezelCard>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <BezelCard>
              <div className="space-y-5 text-base leading-[1.8] text-steel">
                <p>
                  Мы — официальный партнёр крупнейших агрегаторов такси. Подключаем водителей в 25+ городах
                  России: от Москвы до Владивостока. Работаем с 2019 года, за это время помогли тысячам
                  водителей выйти на стабильный доход.
                </p>
                <p>
                  Наша задача — убрать барьеры на входе: сложное оформление документов, залог за авто,
                  непрозрачные комиссии. Вы оставляете заявку — мы берём на себя всё остальное.
                </p>
                <p>
                  Прямое подключение без посредников. Ежедневные выплаты. Поддержка 24/7 в Telegram.
                </p>
              </div>
            </BezelCard>
          </FadeIn>
          <FadeIn delay={120}>
            <Button href="/#calculator" showArrow>
              Оставить заявку
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
