# Спецификация: сайт набора водителей такси

**Версия:** 1.0  
**Референс:** [работа-курьером-вакансии.рф](https://работа-курьером-вакансии.рф) — та же воронка, другая ниша  
**Стек:** React + TypeScript + Next.js (App Router) + Tailwind CSS  

---

## 1. Ключевое отличие от «обычного лендинга»

| Обычный лендинг | Этот проект |
|-----------------|-------------|
| Шаблон + Lorem Ipsum | **20–40 городов с реальными цифрами и текстами** |
| Одна страница | **Шаблонная архитектура:** хаб → карточка → SEO-страница города |
| Форма «на потом» | **Калькулятор дохода — центр воронки**, форма сразу под ним |
| Дизайн ради wow | **Доверие:** сталь/графит, крупные цифры, маркеры без залога |
| Сдача «каркаса» | **Живой сайт на хостинге**, собирающий заявки в CRM |

Подрядчик сдаёт **production-ready продукт**, а не MVP с заглушками.

---

## 2. Цели и метрики успеха

**Бизнес-цель:** собирать заявки водителей по городам и передавать в таксопарк-партнёр.

**Пользовательский путь:**

```
Хаб городов → «Работа в такси в [город]» → калькулятор → форма (имя + телефон) → CRM → партнёр
```

**Технические KPI приёмки:**

- Core Web Vitals в зелёной зоне (LCP ≤ 2.5 с на mobile 360px)
- Формы отправляют заявки в amoCRM / Bitrix24
- Яндекс.Метрика: цели «калькулятор», «форма», «клик по телефону»
- JobPosting schema на страницах городов
- Согласие 152-ФЗ во всех формах

---

## 3. Стек

**Next.js 14+ (App Router)** — предпочтительнее Vite из-за SEO/SSG.

**Дополнительно:**

- TypeScript (strict)
- Tailwind CSS + CSS variables для темы
- React Hook Form + Zod — валидация форм
- `next/image` — оптимизация фото
- Контент городов — JSON/YAML или MDX (не хардкод в компонентах)

**Деплой:** Vercel / Netlify / любой хостинг с edge в РФ (данные форм — сервер в РФ).

---

## 4. Карта страниц и маршрутов

```
/                                    → Главный лендинг
/goroda                              → Хаб городов (поиск + список)
/taxi/[slug]                         → «Работа в такси в [город]»
/usloviya                             → Условия работы
/kak-nachat                           → Как начать (пошагово)
/tarify-i-avto                        → Тарифы и авто (хаб воронок)
/tarify-i-avto/svoe-avto              → На своём авто
/tarify-i-avto/arenda                 → Аренда авто
/tarify-i-avto/bez-zaloga             → Без залога
/skolko-mozhno-zarabotat              → Отдельная страница-кalькулятор
/otzyvy                               → Отзывы (+ видео)
/o-servise                            → О сервисе
/blog                                 → Хаб статей
/blog/[slug]                          → Детальная статья
/faq                                  → FAQ
/kontakty                             → Контакты
/spasibo                              → Страница «Спасибо»
/privacy                              → Политика (юридическая)
/terms                                → Условия (юридическая)
404                                   → Not Found
```

**Принцип:** 1 шаблон = N страниц через данные. Страницы городов генерируются из `cities.json` через `generateStaticParams`.

---

## 5. Архитектура данных

### 5.1. Модель города (`City`)

```typescript
interface City {
  slug: string;
  name: string;
  namePrepositional: string;
  region?: string;
  isFeatured: boolean;
  metaTitle: string;
  metaDescription: string;
  income: {
    ownCar: IncomeRates;
    rental: IncomeRates;
    displayRange: string;
  };
  conditions: {
    badges: TrustBadge[];
    highlights: string[];
    rentalAvailable: boolean;
    ownCarAllowed: boolean;
    dailyPayouts: boolean;
    noDeposit: boolean;
  };
  heroSubtitle: string;
  description: string;
  photo: { src: string; alt: string };
  faq: FAQItem[];
  reviews: string[];
  partnerId?: string;
}
```

### 5.2. Коэффициенты калькулятора (`IncomeRates`)

```typescript
interface IncomeRates {
  rubPerHour: number;
  rubPerOrder?: number;
  rentalCostPerDay?: number;
  commissionPercent?: number;
}
```

**Формула:**

```
доход_день = hoursPerDay × rubPerHour − (carType === 'rental' ? rentalCostPerDay : 0)
доход_неделя = доход_день × daysPerWeek
доход_месяц = доход_день × 30
```

### 5.3. Глобальные сущности

- `reviews.json` — отзывы
- `faq.json` — общий FAQ
- `articles/*.mdx` — блог
- `site.config.ts` — телефон, CRM keys, метрика ID

---

## 6. Компонентная архитектура

```
src/
├── app/
├── components/
│   ├── layout/          Header, Footer, Breadcrumbs, FloatingCTA
│   ├── sections/        Hero, TrustBadges, Conditions, Steps, Reviews, FAQ, CTA
│   ├── calculator/      IncomeCalculator, useCalculator
│   ├── forms/           LeadForm, ConsentCheckbox
│   └── ui/
├── lib/                 crm, analytics, seo, utils
├── data/
└── types/
```

---

## 7. Калькулятор дохода

| Поле | Тип | Default |
|------|-----|---------|
| Город | select / autocomplete | из URL или «Москва» |
| Тип авто | radio: своё / аренда | своё |
| Часов в день | slider 4–12 | 8 |
| Дней в неделю | slider 5–7 | 6 |

Вывод: крупная цифра `~X ₽/мес`, вторично день/неделя, дисклеймер, inline-форма под результатом.

---

## 8. Формы и CRM

**POST /api/lead** → Zod → amoCRM / Bitrix24 → redirect `/spasibo`

Поля: имя, телефон (обяз.), город, тип авто, расчётный доход, referrer (авто), согласие ПДн.

---

## 9. SEO и аналитика

- Уникальные meta на каждый город
- `sitemap.ts`, `robots.ts`
- JobPosting schema на `/taxi/[slug]`
- Яндекс.Метрика: `calc_interaction`, `form_submit`, `phone_click`, `messenger_click`

---

## 10. Дизайн-система

Палитра: сталь/графит + один акцент (#2563EB). Mobile-first 360px, desktop 1440px.

Trust badges: без залога, авто предоставляем, выплаты ежедневно, помощь с лицензией, прямое подключение.

---

## 11. Наполнение

20–40 городов, 8–15 отзывов, 12–20 FAQ, 3–5 статей, фото Unsplash/Pexels. Без Lorem Ipsum.

---

## 12. Чеклист приёмки

- [ ] 20+ городов, калькулятор из JSON
- [ ] Формы → CRM
- [ ] SEO: sitemap, JobPosting, мета
- [ ] LCP ≤ 2.5s mobile
- [ ] 152-ФЗ checkbox
- [ ] Живая ссылка + репозиторий + README

---

## 13. Оценка

~74–108 часов (включая наполнение 30 городов).
