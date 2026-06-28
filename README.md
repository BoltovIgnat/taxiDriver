# Сайт набора водителей такси

Next.js + TypeScript + Tailwind CSS. Воронка: хаб городов → страница города → калькулятор → форма → CRM.

## Запуск локально

```bash
npm install
cp .env.example .env.local
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Переменные окружения

Скопируйте `.env.example` → `.env.local` (локально) или задайте в Vercel Dashboard → Settings → Environment Variables.

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_SITE_URL` | URL сайта (для sitemap, canonical) |
| `NEXT_PUBLIC_SITE_NAME` | Название бренда |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | ID счётчика Яндекс.Метрики |
| `CRM_PROVIDER` | `telegram` / `amocrm` / `bitrix24` |
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` | Fallback для заявок |
| `AMOCRM_*` / `BITRIX24_WEBHOOK_URL` | Интеграция CRM |

### Цели Яндекс.Метрики (создать вручную в интерфейсе)

- `calc_interaction` — первое изменение в калькуляторе
- `form_submit` — успешная отправка формы
- `phone_click` — клик по телефону
- `messenger_click` — WhatsApp / Telegram

## Деплой на Vercel

```bash
npm i -g vercel
vercel login
vercel
```

Или через GitHub:
1. Запушьте репозиторий на GitHub
2. [vercel.com/new](https://vercel.com/new) → Import Project
3. Framework: Next.js (авто)
4. Добавьте env-переменные из `.env.example`
5. Deploy

После деплоя обновите `NEXT_PUBLIC_SITE_URL` на production URL и redeploy.

## Добавление города

1. Откройте `src/data/cities.ts`
2. Добавьте объект через функцию `city(...)` по образцу
3. Страница появится на `/taxi/[slug]` и в sitemap автоматически

## Структура

- `src/data/` — города, отзывы, FAQ, статьи
- `src/components/calculator/` — калькулятор дохода
- `src/components/forms/` — форма заявки
- `src/lib/crm/` — отправка в CRM
- `src/lib/analytics/` — Яндекс.Метрика
- `docs/SPEC.md` — спецификация
