function normalizeSiteUrl(raw: string | undefined): string {
  const value = raw?.trim() || "http://localhost:3000";
  const withProtocol =
    value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`;
  return withProtocol.replace(/\/$/, "");
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Таксопарк Партнёр",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
    "Подключение водителей такси в городах России. Аренда авто без залога, выплаты каждый день, помощь с самозанятостью.",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? process.env.CONTACT_PHONE ?? "+78001234567",
  phoneDisplay:
    process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "8 (800) 123-45-67",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? process.env.WHATSAPP_NUMBER ?? "79001234567",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? process.env.TELEGRAM_USERNAME ?? "taxi_partner",
  metrikaId: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? "",
  nav: [
    { href: "/goroda", label: "Города" },
    { href: "/usloviya", label: "Условия" },
    { href: "/tarify-i-avto", label: "Тарифы и авто" },
    { href: "/skolko-mozhno-zarabotat", label: "Калькулятор" },
    { href: "/otzyvy", label: "Отзывы" },
    { href: "/faq", label: "FAQ" },
    { href: "/kontakty", label: "Контакты" },
  ],
  trustBadges: [
    "no-deposit",
    "car-provided",
    "own-car",
    "daily-payouts",
    "license-help",
    "direct-connection",
  ] as const,
};
