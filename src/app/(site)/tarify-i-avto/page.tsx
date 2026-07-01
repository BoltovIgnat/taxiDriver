import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { BezelCard } from "@/components/ui/BezelCard";
import { SiteImage } from "@/components/ui/SiteImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { imageFallbacks, images } from "@/config/images";

export const metadata: Metadata = {
  title: "Тарифы и автомобили",
  description: "Работа на своём авто, аренда без залога, условия подключения водителей такси.",
};

const options = [
  {
    href: "/tarify-i-avto/svoe-avto",
    title: "На своём авто",
    desc: "Максимальный доход — без арендных платежей. Поможем с лицензией.",
    image: images.tarify.svoeAvto,
    fallback: imageFallbacks.tarify.svoeAvto,
  },
  {
    href: "/tarify-i-avto/arenda",
    title: "Аренда авто",
    desc: "От 800 ₽/сутки. Эконом и комфорт. Без залога и первоначального взноса.",
    image: images.tarify.arenda,
    fallback: imageFallbacks.tarify.arenda,
  },
  {
    href: "/tarify-i-avto/bez-zaloga",
    title: "Без залога",
    desc: "Берите машину без депозита — платите только за смену.",
    image: images.tarify.bezZaloga,
    fallback: imageFallbacks.tarify.bezZaloga,
  },
];

export default function TarifyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Тарифы и авто" }]} />
      <PageHero
        eyebrow="Формат работы"
        title="Тарифы и авто"
        subtitle="Выберите формат работы — мы подберём оптимальный вариант в вашем городе"
        imageSrc={images.tarify.hero}
        imageFallback={imageFallbacks.tarify.hero}
        imageAlt="Яндекс Такси на улице Москвы"
      />
      <section className="section-padding bg-bg pt-0">
        <div className="container-main grid gap-6 md:grid-cols-3">
          {options.map((opt, i) => (
            <FadeIn key={opt.href} delay={i * 60}>
              <Link href={opt.href} className="group block h-full">
                <BezelCard className="h-full transition-transform duration-500 ease-premium group-hover:-translate-y-1">
                  <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-[calc(2rem-0.75rem)]">
                    <SiteImage
                      src={opt.image}
                      fallback={opt.fallback}
                      alt={opt.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <h2 className="text-xl font-bold group-hover:text-accent">{opt.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{opt.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Подробнее
                    <i className="ri-arrow-right-up-line transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-px" aria-hidden />
                  </span>
                </BezelCard>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
