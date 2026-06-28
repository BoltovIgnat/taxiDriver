import type { CalculatorInput, CalculatorResult, City, IncomeRates } from "@/types";

export function calculateIncome(
  rates: IncomeRates,
  carType: CalculatorInput["carType"],
  hoursPerDay: number,
  daysPerWeek: number,
): CalculatorResult {
  let daily = hoursPerDay * rates.rubPerHour;

  if (carType === "rental" && rates.rentalCostPerDay) {
    daily -= rates.rentalCostPerDay;
  }

  if (rates.commissionPercent) {
    daily *= 1 - rates.commissionPercent / 100;
  }

  daily = Math.max(0, Math.round(daily));
  const weekly = Math.round(daily * daysPerWeek);
  const monthly = Math.round(daily * 30);

  return { daily, weekly, monthly };
}

export function getRatesForCity(city: City, carType: CalculatorInput["carType"]): IncomeRates {
  return carType === "rental" ? city.income.rental : city.income.ownCar;
}

export function formatRub(amount: number): string {
  return new Intl.NumberFormat("ru-RU").format(amount) + " ₽";
}
