# Follow-up: макет → HTML/CSS

> Используй, если Lovart выдал картинку или черновик — отправь этот промпт вторым сообщением.

---

Переделай этот макет в production-ready **HTML + CSS**.

## Требования

- Один HTML-файл, CSS в `<style>` или отдельный файл.
- Pixel-close к макету, но **без absolute-позиционирования** для основного flow.
- Flexbox/Grid для layout.
- Mobile **360px** + Desktop **1440px** — media queries.
- Hover на кнопках/карточках, focus на inputs.
- Форма: `name`, `tel`, checkbox consent — разметка `action="#" method="post"`.
- Калькулятор: range inputs стилизованы; цифра дохода обновляется через простой inline JS (`<script>` в конце body) — допустимо.
- **Никаких** внешних UI-библиотек.
- Комментарии в CSS по секциям: `/* Hero */`, `/* Calculator */`, `/* Footer */`.

## Палитра (если не указана)

```css
:root {
  --bg: #F5F6F7;
  --surface: #FFFFFF;
  --text: #1A1D21;
  --muted: #6B7280;
  --accent: #2563EB;
  --border: #E5E7EB;
}
```
