import { HomeHero } from "@/components/sections/HomeHero";
import { TrustStatsStrip } from "@/components/sections/TrustBadges";
import { IncomeCalculator } from "@/components/calculator/IncomeCalculator";
import { CityGrid } from "@/components/sections/CityGrid";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { BezelCard } from "@/components/ui/BezelCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { getFeaturedCities } from "@/data/cities";
import { reviews } from "@/data/reviews";
import { faqItems } from "@/data/faq";

const STEPS = [
  { icon: "ri-edit-line", title: "Оставьте заявку", text: "Имя и телефон — 30 секунд" },
  { icon: "ri-phone-line", title: "Перезвоним", text: "За 15 минут в рабочее время" },
  { icon: "ri-settings-3-line", title: "Подключим", text: "Документы и авто за 1 день" },
  { icon: "ri-wallet-3-line", title: "Зарабатывайте", text: "Выплаты каждый вечер на карту" },
];

export default function HomePage() {
  const featured = getFeaturedCities();

  return (
    <>
      <HomeHero />
      <TrustStatsStrip />
      <IncomeCalculator prominent />
      <section className="section-padding bg-surface">
        <div className="container-main">
          <FadeIn>
            <SectionHeader eyebrow="Процесс" title="Как это работает" />
          </FadeIn>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 60}>
                <BezelCard className="h-full text-center">
                  <div className="step-icon">
                    <i className={item.icon} aria-hidden />
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </BezelCard>
              </FadeIn>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="#calculator" className="!px-8 !py-4 !text-base !font-bold">
              Стать водителем
            </Button>
          </div>
        </div>
      </section>
      <CityGrid cities={featured} title="Популярные города" />
      <div className="container-main pb-16 text-center md:pb-24">
        <Button href="/goroda" variant="secondary" showArrow>
          Все города
        </Button>
      </div>
      <ReviewsSection reviews={reviews.slice(0, 3)} />
      <FAQSection items={faqItems.slice(0, 5)} />
      <section className="bg-[#111] py-16 md:py-24">
        <div className="container-main text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Готовы выйти на линию?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-gray-400">
            Оставьте заявку — подключим за 1 день, выплаты каждый вечер на карту
          </p>
          <div className="mt-8">
            <Button href="#calculator" className="!px-10 !py-4 !text-base !font-bold">
              Стать водителем
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
