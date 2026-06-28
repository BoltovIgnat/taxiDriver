export type CarType = "own" | "rental";

export type TrustBadge =
  | "no-deposit"
  | "car-provided"
  | "own-car"
  | "daily-payouts"
  | "license-help"
  | "direct-connection";

export interface IncomeRates {
  rubPerHour: number;
  rentalCostPerDay?: number;
  commissionPercent?: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  photo?: string;
  videoUrl?: string;
  date: string;
}

export interface City {
  slug: string;
  name: string;
  namePrepositional: string;
  region: string;
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
  faqIds: string[];
  reviewIds: string[];
}

export interface LeadPayload {
  name: string;
  phone: string;
  city?: string;
  carType?: CarType;
  calculatedIncome?: number;
  page?: string;
  consent: boolean;
}

export interface CalculatorInput {
  citySlug: string;
  carType: CarType;
  hoursPerDay: number;
  daysPerWeek: number;
}

export interface CalculatorResult {
  daily: number;
  weekly: number;
  monthly: number;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  content: string;
}

export const TRUST_BADGE_LABELS: Record<TrustBadge, string> = {
  "no-deposit": "Без залога за авто",
  "car-provided": "Авто предоставляем",
  "own-car": "Можно на своём авто",
  "daily-payouts": "Выплаты ежедневно",
  "license-help": "Поможем с лицензией",
  "direct-connection": "Прямое подключение",
};
