"use client";

import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CityGrid } from "@/components/sections/CityGrid";
import { PageHero } from "@/components/sections/PageHero";
import { BezelCard } from "@/components/ui/BezelCard";
import { cities } from "@/data/cities";
import { imageFallbacks, images } from "@/config/images";

export default function GorodaPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return cities;
    return cities.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Города" }]} />
      <PageHero
        eyebrow="География"
        title="Работа в такси по городам"
        subtitle="Выберите свой город — посмотрите условия, рассчитайте доход и оставьте заявку"
        imageSrc={images.goroda.hero}
        imageFallback={imageFallbacks.goroda.hero}
        imageAlt="Карта городов России"
      >
        <BezelCard padding="sm" className="max-w-md">
          <label htmlFor="city-search" className="mb-2 block text-sm font-semibold text-steel">
            Поиск города
          </label>
          <div className="relative">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
            <input
              id="city-search"
              type="search"
              placeholder="Москва, Казань..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-field pl-11"
            />
          </div>
          <p className="mt-3 text-sm text-muted">{filtered.length} городов</p>
        </BezelCard>
      </PageHero>
      <CityGrid cities={filtered} />
    </>
  );
}
