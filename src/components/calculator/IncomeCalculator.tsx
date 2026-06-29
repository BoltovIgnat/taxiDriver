"use client";

import { useEffect, useMemo, useState } from "react";
import type { CarType } from "@/types";
import { calculateIncome, formatRub, getRatesForCity } from "@/lib/calculator";
import { cn } from "@/lib/utils";
import { cities } from "@/data/cities";
import { reachGoal } from "@/lib/analytics/yandex-metrika";
import { LeadForm } from "@/components/forms/LeadForm";
import { BezelCard } from "@/components/ui/BezelCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";

interface IncomeCalculatorProps {
  defaultCitySlug?: string;
  lockCity?: boolean;
  showForm?: boolean;
  showHeader?: boolean;
  id?: string;
  prominent?: boolean;
}

export function IncomeCalculator({
  defaultCitySlug = "moskva",
  lockCity = false,
  showForm = true,
  showHeader = true,
  id = "calculator",
  prominent = false,
}: IncomeCalculatorProps) {
  const [citySlug, setCitySlug] = useState(defaultCitySlug);
  const [carType, setCarType] = useState<CarType>("own");
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [daysPerWeek, setDaysPerWeek] = useState(6);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    setCitySlug(defaultCitySlug);
  }, [defaultCitySlug]);

  const city = useMemo(
    () => cities.find((c) => c.slug === citySlug) ?? cities[0],
    [citySlug],
  );

  const result = useMemo(() => {
    const rates = getRatesForCity(city, carType);
    return calculateIncome(rates, carType, hoursPerDay, daysPerWeek);
  }, [city, carType, hoursPerDay, daysPerWeek]);

  const trackInteraction = () => {
    if (!interacted) {
      setInteracted(true);
      reachGoal("calc_interaction");
    }
  };

  return (
    <section
      id={id}
      className={cn(
        "section-padding",
        prominent ? "bg-[#111] text-white" : "bg-bg",
      )}
    >
      <div className="container-main">
        {showHeader && (
          <FadeIn>
            <SectionHeader
              eyebrow="Калькулятор"
              title="Рассчитайте свой доход"
              subtitle="Прикиньте заработок в вашем городе — и закрепите условия заявкой"
              className={prominent ? "[&_h2]:text-white [&_p]:text-gray-400 [&_span]:text-accent" : undefined}
            />
          </FadeIn>
        )}

        <FadeIn delay={100} className={cn("mx-auto max-w-5xl", showHeader && "mt-12")}>
          <BezelCard
            padding="lg"
            className={prominent ? "!bg-[#1a1a1a] !ring-white/10" : undefined}
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-6">
                {!lockCity && (
                  <div>
                    <label className={cn("mb-2 block text-sm font-semibold", prominent ? "text-gray-300" : "text-steel")}>
                      Город
                    </label>
                    <select
                      value={citySlug}
                      onChange={(e) => { setCitySlug(e.target.value); trackInteraction(); }}
                      className={cn("input-field", prominent && "!bg-[#111] !text-white !ring-white/10")}
                    >
                      {cities.map((c) => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className={cn("mb-2 block text-sm font-semibold", prominent ? "text-gray-300" : "text-steel")}>
                    Тип авто
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["own", "rental"] as CarType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => { setCarType(type); trackInteraction(); }}
                        className={cn(
                          "rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-500 ease-premium",
                          carType === type
                            ? "bg-accent text-on-accent shadow-glow"
                            : prominent
                              ? "bg-[#111] text-gray-300 ring-1 ring-white/10 hover:ring-accent/50"
                              : "bg-bg text-steel ring-1 ring-black/[0.06] hover:ring-amber-200",
                        )}
                      >
                        {type === "own" ? "Своё авто" : "Аренда"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={cn("mb-3 flex justify-between text-sm font-semibold", prominent ? "text-gray-300" : "text-steel")}>
                    <span>Часов в день</span>
                    <span className="tabular-nums text-accent">{hoursPerDay} ч</span>
                  </label>
                  <input
                    type="range"
                    min={4}
                    max={12}
                    value={hoursPerDay}
                    onChange={(e) => { setHoursPerDay(Number(e.target.value)); trackInteraction(); }}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className={cn("mb-3 flex justify-between text-sm font-semibold", prominent ? "text-gray-300" : "text-steel")}>
                    <span>Дней в неделю</span>
                    <span className="tabular-nums text-accent">{daysPerWeek}</span>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={7}
                    value={daysPerWeek}
                    onChange={(e) => { setDaysPerWeek(Number(e.target.value)); trackInteraction(); }}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="calc-result-panel">
                <p className="text-xs font-bold uppercase tracking-[0.15em] opacity-70">
                  Примерный доход в {city.namePrepositional}
                </p>
                <p className="mt-3 text-5xl font-extrabold tabular-nums tracking-tight sm:text-6xl lg:text-7xl">
                  ≈ {formatRub(result.monthly)}
                </p>
                <p className="mt-1 text-sm font-semibold opacity-70">в месяц</p>
                <div className="mt-8 flex gap-10 text-sm">
                  <div>
                    <p className="text-xl font-bold tabular-nums">{formatRub(result.daily)}</p>
                    <p className="opacity-70">в день</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold tabular-nums">{formatRub(result.weekly)}</p>
                    <p className="opacity-70">в неделю</p>
                  </div>
                </div>
                <p className="mt-8 max-w-xs text-xs leading-relaxed opacity-60">
                  Примерный расчёт. Фактический доход зависит от спроса, сезона и активности на линии.
                </p>
              </div>
            </div>
          </BezelCard>

          {showForm && (
            <BezelCard
              className={cn("mt-6", prominent && "!bg-[#1a1a1a] !ring-white/10")}
              padding="md"
            >
              <h3 className={cn("text-xl font-bold", prominent && "text-white")}>
                Стать водителем — оставьте заявку
              </h3>
              <p className={cn("mt-1 text-sm", prominent ? "text-gray-400" : "text-muted")}>
                Перезвоним за 15 минут и расскажем условия в {city.namePrepositional}
              </p>
              <div className="mt-5">
                <LeadForm city={city.name} carType={carType} calculatedIncome={result.monthly} />
              </div>
            </BezelCard>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
