# Промпты для Lovart — верстка HTML/CSS

Как использовать:

1. Открой промпт нужной страницы (`01-home.md` … `20-404.md`) — **базовые требования уже внутри**.
2. Скопируй **весь файл целиком** и отправь в Lovart.
3. Для доработки макета в код — `_FOLLOWUP-html-css.md`.
4. Общие правки дизайн-системы — `_BASE.md` (источник правды, дублируется в каждый файл).
## Страницы

| Файл | Маршрут | Описание |
|------|---------|----------|
| `01-home.md` | `/` | Главный лендинг |
| `02-goroda.md` | `/goroda` | Хаб городов |
| `03-city-page.md` | `/taxi/[slug]` | Страница города (шаблон) |
| `04-calculator.md` | `/skolko-mozhno-zarabotat` | Standalone калькулятор |
| `05-usloviya.md` | `/usloviya` | Условия работы |
| `06-kak-nachat.md` | `/kak-nachat` | Как начать |
| `07-tarify-hub.md` | `/tarify-i-avto` | Тарифы — хаб |
| `08-tarify-svoe-avto.md` | `/tarify-i-avto/svoe-avto` | На своём авто |
| `09-tarify-arenda.md` | `/tarify-i-avto/arenda` | Аренда авто |
| `10-tarify-bez-zaloga.md` | `/tarify-i-avto/bez-zaloga` | Без залога |
| `11-otzyvy.md` | `/otzyvy` | Отзывы |
| `12-faq.md` | `/faq` | FAQ |
| `13-kontakty.md` | `/kontakty` | Контакты |
| `14-spasibo.md` | `/spasibo` | Спасибо |
| `15-blog-hub.md` | `/blog` | Блог — хаб |
| `16-blog-article.md` | `/blog/[slug]` | Статья — шаблон |
| `17-o-servise.md` | `/o-servise` | О сервисе |
| `18-privacy.md` | `/privacy` | Политика конфиденциальности |
| `19-terms.md` | `/terms` | Пользовательское соглашение |
| `20-404.md` | `404` | Страница не найдена |

## Workflow

1. Сначала **01-home** → утверди стиль.
2. Затем **03-city-page** → второй эталон.
3. Остальные — с фразой в конце промпта: *«Используй тот же header, footer, кнопки и карточки, что на главной»*.

## Изображения

Промпты для генерации **фото и иллюстраций** — в папке [`images/`](images/README.md).

Каждый блок `IMG-N` уже содержит `_STYLE-BASE` и `_NEGATIVE` — копируй блок целиком.
