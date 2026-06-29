import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { BezelCard } from "@/components/ui/BezelCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { imageFallbacks, images } from "@/config/images";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с нами — телефон, WhatsApp, Telegram. Оставьте заявку на подключение водителем такси.",
};

const CONTACTS = [
  {
    icon: "ri-phone-line",
    label: "Телефон",
    href: `tel:${siteConfig.phone}`,
    value: siteConfig.phoneDisplay,
    external: false,
  },
  {
    icon: "ri-whatsapp-line",
    label: "WhatsApp",
    href: `https://wa.me/${siteConfig.whatsapp}`,
    value: "Написать в WhatsApp",
    external: true,
  },
  {
    icon: "ri-telegram-line",
    label: "Telegram",
    href: `https://t.me/${siteConfig.telegram}`,
    value: `@${siteConfig.telegram}`,
    external: true,
  },
];

export default function KontaktyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Контакты" }]} />
      <PageHero
        eyebrow="Связь"
        title="Контакты"
        subtitle="Работаем ежедневно с 9:00 до 21:00 (МСК). Ответим быстро — по телефону или в мессенджере"
        imageSrc={images.kontakty.hero}
        imageFallback={imageFallbacks.kontakty.hero}
        imageAlt="Связаться с нами"
      />
      <section className="section-padding bg-bg pt-0">
        <div className="container-main grid gap-8 lg:grid-cols-2 lg:gap-12">
          <FadeIn>
            <div className="space-y-4">
              {CONTACTS.map((item) => (
                <BezelCard key={item.label} padding="sm">
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xl text-accent transition-transform duration-500 ease-premium group-hover:scale-105">
                      <i className={item.icon} aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm text-muted">{item.label}</p>
                      <p className="text-lg font-semibold text-[var(--color-text)] group-hover:text-accent">
                        {item.value}
                      </p>
                    </div>
                  </a>
                </BezelCard>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <BezelCard>
              <h2 className="text-xl font-bold">Оставить заявку</h2>
              <p className="mt-1 text-sm text-muted">Перезвоним за 15 минут</p>
              <div className="mt-6">
                <LeadForm />
              </div>
            </BezelCard>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
