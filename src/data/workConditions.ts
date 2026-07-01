import { COPY, formatRub, OFFER } from "@/data/siteCopy";

export interface WorkConditionBlock {
  id: string;
  icon: string;
  title: string;
  summary: string;
  highlight: { label: string; value: string };
  details: string[];
  footnote?: string;
  href?: string;
  linkLabel?: string;
}

export const workConditionHighlights = [
  { label: "Комиссия парка", value: "от 15%" },
  { label: "Выплаты", value: "Каждый день" },
  { label: "Аренда авто", value: "от 800 ₽/сут" },
  { label: "Подключение", value: "1 день" },
] as const;

export const workConditionBlocks: WorkConditionBlock[] = [
  {
    id: "commission",
    icon: "ri-percent-line",
    title: "Комиссия и доход",
    summary: "Платите только процент с заказа — без абонентки и скрытых списаний.",
    highlight: { label: "Комиссия парка", value: "от 15%" },
    details: [
      "Абонентской платы и вступительных взносов нет",
      "Условия фиксируются при подключении — не меняем в одностороннем порядке",
      `Доход в Москве — ${formatRub(OFFER.moscow.displayFromMonthly)}–${formatRub(OFFER.moscow.activeMaxMonthly)}/мес при активном графике`,
      "Налог самозанятого (НПД) — 4–6%, оформляем вместе",
    ],
    href: "/skolko-mozhno-zarabotat",
    linkLabel: "Рассчитать доход",
  },
  {
    id: "payouts",
    icon: "ri-bank-card-line",
    title: "Выплаты на карту",
    summary: "Деньги приходят каждый вечер — не ждёте конца месяца.",
    highlight: { label: "График выплат", value: "Ежедневно" },
    details: [
      "Перевод на банковскую карту вечером за текущий рабочий день",
      "Минимальная сумма вывода — 500 ₽",
      "Комиссия за перевод — 0%",
      "Работает в выходные и праздники",
    ],
  },
  {
    id: "car",
    icon: "ri-car-line",
    title: "Автомобиль",
    summary: "Своё авто или аренда парка — выбираете формат под себя.",
    highlight: { label: "Аренда", value: "от 800 ₽/сут" },
    details: [
      "Аренда без залога и первоначального взноса",
      "Эконом: Kia Rio, Hyundai Solaris",
      "Комфорт: Skoda Octavia и аналоги",
      "ТО, ОСАГО и техподдержка — на нас при аренде",
    ],
    footnote: "Точная ставка зависит от города и класса авто.",
    href: "/tarify-i-avto",
    linkLabel: "Сравнить форматы",
  },
  {
    id: "support",
    icon: "ri-customer-service-2-line",
    title: "Подключение и поддержка",
    summary: "От заявки до выхода на линию — сопровождаем на каждом шаге.",
    highlight: { label: "Срок подключения", value: "1 день" },
    details: [
      "Менеджер на связи в Telegram и по телефону",
      "Помощь с самозанятостью, лицензией такси и документами",
      "Инструктаж по приложению агрегатора для новичков",
      "Поддержка 24/7 по рабочим вопросам",
    ],
    href: "/kak-nachat",
    linkLabel: "Как начать работать",
  },
];

export const workConditionDocuments = {
  title: "Документы для подключения",
  required: [
    COPY.passportRf,
    "Водительское удостоверение категории B (стаж от 3 лет)",
    "СНИЛС и ИНН",
    "Статус самозанятого (НПД) — поможем оформить",
  ],
  ownCar: ["ПТС и СТС", "Полис ОСАГО", "Лицензия такси — оформим вместе"],
};

export const workConditionSteps = [
  { step: "1", title: "Заявка", text: "Имя и телефон — перезвоним за 15 минут" },
  { step: "2", title: "Документы", text: "Проверим комплект и самозанятость" },
  { step: "3", title: "Авто", text: "Своё или аренда без залога" },
  { step: "4", title: "Линия", text: "Первые выплаты — вечером первого дня" },
] as const;
