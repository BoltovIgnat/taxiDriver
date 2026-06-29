import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BezelCard } from "@/components/ui/BezelCard";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Политика конфиденциальности" }]} />
      <section className="section-padding">
        <div className="container-main mx-auto max-w-3xl">
          <FadeIn>
            <span className="mb-4 inline-block rounded-full bg-accent-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-steel)]">
              Документы
            </span>
            <h1 className="text-3xl font-bold">Политика конфиденциальности</h1>
          </FadeIn>
          <FadeIn delay={80}>
            <BezelCard className="mt-8">
              <div className="space-y-5 text-sm leading-relaxed text-muted">
                <p>Настоящая Политика определяет порядок обработки персональных данных пользователей сайта в соответствии с Федеральным законом № 152-ФЗ.</p>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--color-text)]">1. Какие данные мы собираем</h2>
                  <p className="mt-2">Имя, номер телефона, город, данные калькулятора дохода, URL страницы отправки формы.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--color-text)]">2. Цели обработки</h2>
                  <p className="mt-2">Обработка заявок на подключение водителей, обратная связь, передача данных таксопарку-партнёру.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--color-text)]">3. Хранение данных</h2>
                  <p className="mt-2">Данные хранятся на серверах на территории Российской Федерации. Срок хранения — до достижения целей обработки или отзыва согласия.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--color-text)]">4. Права пользователя</h2>
                  <p className="mt-2">Вы вправе запросить удаление или изменение ваших персональных данных, направив запрос на контактный телефон или email, указанный на сайте.</p>
                </div>
              </div>
            </BezelCard>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
