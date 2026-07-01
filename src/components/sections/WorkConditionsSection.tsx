import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import {
  workConditionBlocks,
  workConditionDocuments,
  workConditionHighlights,
  workConditionSteps,
} from "@/data/workConditions";

function ConditionBlockCard({
  block,
  index,
}: {
  block: (typeof workConditionBlocks)[number];
  index: number;
}) {
  return (
    <FadeIn delay={index * 60}>
      <article className="flex h-full flex-col rounded-[2rem] bg-surface p-6 ring-1 ring-black/[0.06] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-2xl text-steel">
            <i className={block.icon} aria-hidden />
          </span>
          <div className="rounded-2xl bg-bg px-4 py-2.5 text-right ring-1 ring-black/[0.04]">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              {block.highlight.label}
            </p>
            <p className="mt-0.5 text-lg font-extrabold tabular-nums text-accent">
              {block.highlight.value}
            </p>
          </div>
        </div>

        <h2 className="mt-5 text-xl font-bold text-[var(--color-text)]">{block.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-steel">{block.summary}</p>

        <ul className="mt-5 flex-1 space-y-2.5 border-t border-black/[0.05] pt-5">
          {block.details.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-steel">
              <i className="ri-check-line mt-0.5 shrink-0 text-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        {block.footnote && (
          <p className="mt-4 text-xs text-muted">{block.footnote}</p>
        )}

        {block.href && block.linkLabel && (
          <Link
            href={block.href}
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-[var(--color-text)]"
          >
            {block.linkLabel}
            <i className="ri-arrow-right-line" aria-hidden />
          </Link>
        )}
      </article>
    </FadeIn>
  );
}

export function WorkConditionsSection() {
  return (
    <section className="section-padding bg-bg pt-0">
      <div className="container-main">
        <FadeIn>
          <SectionHeader
            eyebrow="Прозрачные условия"
            title="Что вы получаете и сколько платите"
            subtitle="Без мелкого шрифта: комиссия, выплаты, аренда и документы — всё на одной странице. Цифры для ориентира, точные условия фиксируем при подключении."
            align="left"
            className="mb-8 max-w-3xl"
          />
        </FadeIn>

        <FadeIn delay={40}>
          <div className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {workConditionHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-[#111] px-4 py-4 text-center ring-1 ring-white/10 sm:px-5 sm:py-5"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                  {item.label}
                </p>
                <p className="mt-1.5 text-lg font-extrabold tabular-nums text-accent sm:text-xl">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2">
          {workConditionBlocks.map((block, i) => (
            <ConditionBlockCard key={block.id} block={block} index={i} />
          ))}
        </div>

        <FadeIn delay={200} className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="rounded-[2rem] bg-surface p-6 ring-1 ring-black/[0.06] lg:col-span-3 sm:p-7">
            <h3 className="text-xl font-bold">{workConditionDocuments.title}</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Обязательно</p>
                <ul className="mt-3 space-y-2">
                  {workConditionDocuments.required.map((doc) => (
                    <li key={doc} className="flex items-start gap-2 text-sm text-steel">
                      <i className="ri-file-list-3-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">На своём авто</p>
                <ul className="mt-3 space-y-2">
                  {workConditionDocuments.ownCar.map((doc) => (
                    <li key={doc} className="flex items-start gap-2 text-sm text-steel">
                      <i className="ri-car-line mt-0.5 shrink-0 text-accent" aria-hidden />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-accent p-6 text-on-accent lg:col-span-2 sm:p-7">
            <h3 className="text-xl font-bold">Как подключиться</h3>
            <ol className="mt-6 space-y-4">
              {workConditionSteps.map((item) => (
                <li key={item.step} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/10 text-sm font-extrabold">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="mt-0.5 text-sm opacity-80">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </FadeIn>

        <FadeIn delay={260} className="mt-10 flex flex-col items-center gap-4 rounded-[2rem] bg-[#111] px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-lg font-bold text-white">Готовы подключиться?</p>
            <p className="mt-1 text-sm text-gray-400">
              Рассчитайте доход или оставьте заявку — перезвоним за 15 минут.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/skolko-mozhno-zarabotat" variant="secondary" className="!border-white/20 !bg-transparent !text-white hover:!bg-white/10">
              Калькулятор
            </Button>
            <Button href="/#calculator" className="!px-6 !font-bold">
              Оставить заявку
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
