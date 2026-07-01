import type { City } from "@/types";
import { siteConfig } from "@/config/site";

function addDaysIso(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0]!;
}

export function buildJobPostingSchema(city: City) {
  const monthlyMatch = city.income.displayRange.match(/[\d\s]+/);
  const monthlyValue = monthlyMatch
    ? parseInt(monthlyMatch[0].replace(/\s/g, ""), 10)
    : 100_000;

  const description = [
    city.metaDescription,
    "Подключение к агрегаторам через партнёрский сервис. Формат сотрудничества — самозанятость (НПД).",
  ].join(" ");

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `Водитель такси (самозанятый) в ${city.namePrepositional}`,
    description,
    datePosted: addDaysIso(-14),
    validThrough: addDaysIso(90),
    employmentType: "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
      url: siteConfig.url,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: city.region,
        addressCountry: "RU",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "RUB",
      value: {
        "@type": "QuantitativeValue",
        minValue: monthlyValue,
        unitText: "MONTH",
      },
    },
    directApply: true,
    identifier: {
      "@type": "PropertyValue",
      name: siteConfig.name,
      value: `taxi-driver-${city.slug}`,
    },
  };
}
