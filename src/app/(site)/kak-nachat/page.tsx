import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { BezelCard } from "@/components/ui/BezelCard";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { imageFallbacks, images } from "@/config/images";

export const metadata: Metadata = {
  title: "Как начать работать водителем такси",
  description: "Пошаговая инструкция: документы, самозанятость, подключение к агрегатору, выход на линию.",
};

const steps = [
  { icon: "ri-edit-line", title: "Оставьте заявку", text: "Заполните короткую форму на сайте — имя и телефон. Менеджер перезвонит за 15 минут." },
  { icon: "ri-file-list-3-line", title: "Подготовьте документы", text: "Пасport, водительское удостоверение (стаж от 3 лет), СНИЛС, ИНН. Для своего авто — ПТС, СТС, ОСАГО." },
  { icon: "ri-government-line", title: "Оформите самозанятость", text: "Зарегистрируйтесь в приложении «Мой налог» — мы поможем, это занимает 10 минут." },
  { icon: "ri-car-line", title: "Получите авто", text: "Работайте на своём или возьмите в аренду без залога. Выберем машину под ваш город." },
  { icon: "ri-smartphone-line", title: "Пройдите подключение", text: "Установим приложение агрегатора, оформим лицензию такси, проведём короткий инструктаж." },
  { icon: "ri-wallet-3-line", title: "Выходите на линию", text: "Начинайте зарабатывать. Первые выплаты — уже вечером первого рабочего дня." },
];

export default function KakNachatPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Как начать" }]} />
      <PageHero
        eyebrow="Старт"
        title="Как начать работать"
        subtitle="От заявки до первого заработка — 1–2 дня"
        imageSrc={images.kakNachat.hero}
        imageFallback={imageFallbacks.kakNachat.hero}
        imageAlt="Как начать работать водителем"
      />
      <section className="section-padding bg-bg pt-0">
        <div className="container-main mx-auto max-w-3xl">
          <ol className="space-y-5">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 50}>
                <BezelCard padding="sm">
                  <div className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <i className={`${step.icon} text-accent`} aria-hidden />
                        <h2 className="font-bold">{step.title}</h2>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                    </div>
                  </div>
                </BezelCard>
              </FadeIn>
            ))}
          </ol>
          <FadeIn delay={300}>
            <Button href="/#calculator" className="mt-10" showArrow>
              Оставить заявку
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
