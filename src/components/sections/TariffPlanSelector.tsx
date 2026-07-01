import Link from "next/link";
import { SiteImage } from "@/components/ui/SiteImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";
import {
  tariffComparisonRows,
  tariffPlans,
  TARIFF_CARD_IMAGE,
  TARIFF_CARD_IMAGE_FALLBACK,
} from "@/data/tariffPlans";

function TariffPlanCard({ plan, index }: { plan: (typeof tariffPlans)[number]; index: number }) {
  return (
    <FadeIn delay={index * 80}>
      <article
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-surface ring-1 ring-black/[0.06] transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-soft",
          plan.featured && "ring-2 ring-accent shadow-glow lg:scale-[1.02]",
        )}
      >
        {plan.badge && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-on-accent">
            {plan.badge}
          </span>
        )}

        <div className="relative h-36 overflow-hidden bg-[#111] sm:h-40">
          <SiteImage
            src={TARIFF_CARD_IMAGE}
            fallback={TARIFF_CARD_IMAGE_FALLBACK}
            alt=""
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover opacity-70"
          />
          <div
            className={cn(
              "absolute inset-0",
              plan.featured
                ? "bg-gradient-to-r from-[#111]/90 via-[#111]/50 to-accent/30"
                : "bg-gradient-to-r from-[#111]/95 via-[#111]/70 to-[#111]/40",
            )}
          />
          <div className="absolute inset-0 flex items-end justify-between p-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
                {plan.audience}
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">{plan.title}</h2>
            </div>
            <span
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl",
                plan.featured ? "bg-accent text-on-accent" : "bg-white/10 text-white backdrop-blur-sm",
              )}
            >
              <i className={plan.icon} aria-hidden />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-steel">{plan.description}</p>

          <dl className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-bg p-3 ring-1 ring-black/[0.04]">
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">Доход в день</dt>
              <dd className="mt-1 text-base font-extrabold tabular-nums text-[var(--color-text)]">
                {plan.metrics.dailyIncome}
              </dd>
            </div>
            <div className="rounded-2xl bg-bg p-3 ring-1 ring-black/[0.04]">
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">В месяц</dt>
              <dd className="mt-1 text-base font-extrabold tabular-nums text-accent">
                {plan.metrics.monthlyIncome}
              </dd>
            </div>
            <div className="rounded-2xl bg-bg p-3 ring-1 ring-black/[0.04]">
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">Аренда</dt>
              <dd className="mt-1 text-sm font-bold tabular-nums text-[var(--color-text)]">
                {plan.metrics.rentalCost}
              </dd>
            </div>
            <div className="rounded-2xl bg-bg p-3 ring-1 ring-black/[0.04]">
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">Комиссия</dt>
              <dd className="mt-1 text-sm font-bold text-[var(--color-text)]">{plan.metrics.commission}</dd>
            </div>
          </dl>

          {plan.cars && (
            <div className="mt-4">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">Автомобили</p>
              <p className="mt-1.5 flex flex-wrap gap-1.5">
                {plan.cars.map((car) => (
                  <span
                    key={car}
                    className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-steel"
                  >
                    {car}
                  </span>
                ))}
              </p>
            </div>
          )}

          <ul className="mt-5 space-y-2 border-t border-black/[0.05] pt-5">
            {plan.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-steel">
                <i className="ri-check-line mt-0.5 shrink-0 text-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href={plan.href}
            className={cn(
              "btn-primary mt-6 inline-flex w-full items-center justify-center gap-1 !py-4 !text-base !font-bold",
              !plan.featured && "!bg-[#111] !text-white hover:!opacity-90",
            )}
          >
            {plan.cta}
            <i className="ri-arrow-right-line text-lg" aria-hidden />
          </Link>
        </div>
      </article>
    </FadeIn>
  );
}

export function TariffPlanSelector() {
  const featured = tariffPlans.find((p) => p.featured);
  const others = tariffPlans.filter((p) => !p.featured);

  return (
    <section className="section-padding bg-bg pt-0">
      <div className="container-main">
        <FadeIn>
          <SectionHeader
            eyebrow="Выбор формата"
            title="Как вы хотите работать?"
            subtitle="Два способа начать — выберите сценарий под вашу ситуацию. Цифры для Москвы при графике 6–7 дней в неделю; в вашем городе может отличаться."
            align="left"
            className="mb-10 max-w-3xl"
          />
        </FadeIn>

        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {featured && <TariffPlanCard plan={featured} index={0} />}
          {others.map((plan, i) => (
            <TariffPlanCard key={plan.id} plan={plan} index={i + 1} />
          ))}
        </div>

        <FadeIn delay={160} className="mt-8 flex flex-col items-start gap-3 rounded-2xl bg-accent-soft px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-steel">
            <span className="font-semibold text-[var(--color-text)]">Не знаете, что выбрать?</span>{" "}
            Рассчитайте доход в калькуляторе — подберём формат под ваш город.
          </p>
          <Link href="/skolko-mozhno-zarabotat" className="btn-primary shrink-0 !px-5 !py-2.5 !text-sm">
            Рассчитать доход
          </Link>
        </FadeIn>

        <FadeIn delay={200} className="mt-12">
          <h3 className="text-xl font-bold text-[var(--color-text)] sm:text-2xl">Сравнение форматов</h3>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            «Без залога» — не отдельный тариф, а условие аренды: депозит не берём, платите только за смену.{" "}
            <Link href="/tarify-i-avto/bez-zaloga" className="font-medium text-accent underline underline-offset-2">
              Подробнее об аренде без залога
            </Link>
          </p>

          <div className="mt-6 overflow-x-auto rounded-[2rem] ring-1 ring-black/[0.06]">
            <table className="w-full min-w-[540px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-black/[0.06] bg-surface">
                  <th className="px-5 py-4 font-semibold text-muted" scope="col" />
                  <th className="px-5 py-4 font-bold text-[var(--color-text)]" scope="col">
                    Аренда авто
                  </th>
                  <th className="px-5 py-4 font-bold text-[var(--color-text)]" scope="col">
                    Своё авто
                  </th>
                </tr>
              </thead>
              <tbody>
                {tariffComparisonRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn(
                      "border-b border-black/[0.04] last:border-0",
                      i % 2 === 0 ? "bg-bg" : "bg-surface",
                    )}
                  >
                    <th className="px-5 py-3.5 font-medium text-steel" scope="row">
                      {row.label}
                    </th>
                    <td className="px-5 py-3.5 text-steel">{row.rental}</td>
                    <td className="px-5 py-3.5 text-steel">{row.own}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted">
            * Стоимость аренды зависит от города, класса и модели автомобиля.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
