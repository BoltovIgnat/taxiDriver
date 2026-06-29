import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BezelCard } from "@/components/ui/BezelCard";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Пользовательское соглашение" }]} />
      <section className="section-padding">
        <div className="container-main mx-auto max-w-3xl">
          <FadeIn>
            <span className="mb-4 inline-block rounded-full bg-accent-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-steel)]">
              Документы
            </span>
            <h1 className="text-3xl font-bold">Пользовательское соглашение</h1>
          </FadeIn>
          <FadeIn delay={80}>
            <BezelCard className="mt-8">
              <div className="space-y-5 text-sm leading-relaxed text-muted">
                <p>Используя сайт, вы соглашаетесь с условиями настоящего Соглашения.</p>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--color-text)]">1. Предмет</h2>
                  <p className="mt-2">Сайт предоставляет информацию об условиях подключения водителей такси и форму для подачи заявки.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--color-text)]">2. Информация на сайте</h2>
                  <p className="mt-2">Данные калькулятора дохода носят ознакомительный характер и не являются гарантией заработка. Фактический доход зависит от множества факторов.</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--color-text)]">3. Ответственность</h2>
                  <p className="mt-2">Администрация сайта не несёт ответственности за действия таксопарков-партнёров. Трудовые отношения оформляются непосредственно с партнёром.</p>
                </div>
              </div>
            </BezelCard>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
