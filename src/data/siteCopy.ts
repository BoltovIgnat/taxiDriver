/**
 * Единая матрица оффера и общие тексты сайта.
 * Все суммы и формулировки дохода — только отсюда.
 */
export const OFFER = {
  /** Заголовок на главной — нижняя граница активного дохода в Москве */
  heroFromMonthly: 130_000,

  moscow: {
    /** «От …» на странице города и в карточках */
    displayFromMonthly: 130_000,
    /** Диапазон для FAQ и пояснений */
    activeMinMonthly: 130_000,
    activeMaxMonthly: 170_000,
    /** Пример чистого дохода на аренде (отзыв, мокап) */
    rentalExampleMonthly: 145_000,
  },

  regions: {
    minMonthly: 75_000,
    maxMonthly: 110_000,
  },

  /** Данные мокапа приложения на главной (Алексей, Москва) */
  phoneMockup: {
    shiftToday: 6_400,
    /** Текущий месяц — ~18-й день при цели rentalExampleMonthly */
    monthCurrent: 87_650,
    monthPrevious: 145_000,
    weekTotal: 43_080,
    weekDays: [
      { label: "Пн", amount: 5_200 },
      { label: "Вт", amount: 6_100 },
      { label: "Ср", amount: 5_800 },
      { label: "Чт", amount: 6_300 },
      { label: "Пт", amount: 7_100 },
      { label: "Сб", amount: 6_180 },
      { label: "Вс", amount: 6_400, today: true },
    ] satisfies { label: string; amount: number; today?: boolean }[],
  },
} as const;

export function formatRub(amount: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(amount)} ₽`;
}

export function formatRubShort(amount: number): string {
  if (amount >= 100_000) {
    return `${Math.round(amount / 1000)} тыс ₽`;
  }
  return formatRub(amount);
}

export function formatMonthlyFrom(amount: number): string {
  return `от ${formatRub(amount)}/мес`;
}

export function formatIncomeRange(min: number, max: number): string {
  const minK = Math.round(min / 1000);
  const maxK = Math.round(max / 1000);
  return `${minK}–${maxK} тысяч`;
}

/** Общие русские формулировки (без латиницы-гомоглифов) */
export const COPY = {
  passport: "Паспорт",
  passportRf: "Паспорт РФ",
  passportList: "Паспорт, водительское удостоверение (стаж от 3 лет), СНИЛС, ИНН",
  passportListOwnCar: "Для своего авто — ПТС, СТС, ОСАГО",
  taxometer: "таксометр",
} as const;

export const FAQ_COPY = {
  docs: `${COPY.passportRf}, водительское удостоверение категории B (стаж от 3 лет), СНИЛС и ИНН. Если работаете на своём авто — нужны ПТС, СТС и полис ОСАГО. Мы поможем оформить лицензию такси и разрешение на перевозку пассажиров.`,

  incomeReal: `Зависит от города, графика и типа авто. В Москве активные водители зарабатывают ${formatIncomeRange(OFFER.moscow.activeMinMonthly, OFFER.moscow.activeMaxMonthly)} рублей в месяц. В регионах — от ${Math.round(OFFER.regions.minMonthly / 1000)} до ${Math.round(OFFER.regions.maxMonthly / 1000)} тысяч. Используйте калькулятор на сайте для оценки.`,

  fines: "Штрафы за нарушение ПДД — на водителе. Штрафы агрегатора за отмены и низкий рейтинг — обсуждаем индивидуально. Мы помогаем избежать штрафов: обучаем правилам сервиса.",

  license: `Да, полностью. Оформляем лицензию, разрешение, установку оборудования (шашка, ${COPY.taxometer} при необходимости). Стоимость и сроки зависят от города — расскажем при подключении.`,
} as const;

export const REVIEW_COPY = {
  alexeyMoscow: `Подключился за один день. Взял авто в аренду без залога — Kia Rio, 1 800 ₽ в сутки. За первый месяц вышло около ${formatRub(OFFER.moscow.rentalExampleMonthly)} чистыми при графике 6/1. Выплаты каждый вечер на карту, без задержек.`,
} as const;
