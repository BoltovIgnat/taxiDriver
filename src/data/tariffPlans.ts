import { formatRub, OFFER } from "@/data/siteCopy";

export type TariffPlanId = "rental" | "own";

export interface TariffPlan {
  id: TariffPlanId;
  href: string;
  featured?: boolean;
  badge?: string;
  /** Кому подходит — сценарий, не название тарифа */
  audience: string;
  title: string;
  description: string;
  icon: string;
  /** Ключевые цифры для быстрого сравнения */
  metrics: {
    dailyIncome: string;
    monthlyIncome: string;
    rentalCost: string;
    commission: string;
  };
  cars?: string[];
  includes: string[];
  cta: string;
}

/** Единый визуальный стиль карточек — фото такси в Москве */
export const TARIFF_CARD_IMAGE = "/images/tarify/hero.jpg";
export const TARIFF_CARD_IMAGE_FALLBACK = "/images/tarify/hero.png";

export const tariffPlans: TariffPlan[] = [
  {
    id: "rental",
    href: "/tarify-i-avto/arenda",
    featured: true,
    badge: "Популярный выбор",
    audience: "Нет своей машины",
    title: "Аренда автомобиля",
    description:
      "Берёте авто парка без залога и депозита — выходите на линию уже завтра. Платите только за смену.",
    icon: "ri-car-line",
    metrics: {
      dailyIncome: "от 4 500 ₽/день",
      monthlyIncome: `от ${formatRub(OFFER.moscow.rentalExampleMonthly)}/мес`,
      rentalCost: "от 800 ₽/сутки",
      commission: "от 15%",
    },
    cars: ["Kia Rio", "Hyundai Solaris", "Skoda Octavia"],
    includes: [
      "Без залога и первоначального взноса",
      "ТО, ОСАГО и техподдержка",
      "Выплаты каждый день на карту",
      "Подключение за 1 рабочий день",
    ],
    cta: "Выбрать аренду",
  },
  {
    id: "own",
    href: "/tarify-i-avto/svoe-avto",
    audience: "Есть автомобиль",
    title: "Работа на своём авто",
    description:
      "Максимальный доход — не платите аренду. Поможем с лицензией такси и подключением к агрегаторам.",
    icon: "ri-steering-2-line",
    metrics: {
      dailyIncome: "от 5 500 ₽/день",
      monthlyIncome: `от ${formatRub(OFFER.moscow.displayFromMonthly)}/мес`,
      rentalCost: "0 ₽",
      commission: "от 15%",
    },
    includes: [
      "Весь доход за вычетом комиссии парка",
      "Помощь с лицензией и разрешением",
      "Без скрытых платежей",
      "Свободный график",
    ],
    cta: "Посмотреть условия",
  },
];

export const tariffComparisonRows = [
  { label: "Кому подходит", rental: "Нет машины или не хотите изнашивать свою", own: "Есть подходящий автомобиль" },
  { label: "Стартовый залог", rental: "Не нужен", own: "—" },
  { label: "Аренда авто", rental: "от 800 ₽/сутки*", own: "0 ₽" },
  { label: "Комиссия парка", rental: "от 15%", own: "от 15%" },
  { label: "Доход в месяц (Москва)", rental: `от ${formatRub(OFFER.moscow.rentalExampleMonthly)}`, own: `от ${formatRub(OFFER.moscow.displayFromMonthly)}` },
  { label: "Автомобили", rental: "Эконом и комфорт", own: "Ваш автомобиль" },
  { label: "Подключение", rental: "1 рабочий день", own: "1 рабочий день" },
] as const;
