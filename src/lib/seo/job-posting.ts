import type { City } from "@/types";
import { siteConfig } from "@/config/site";

export function buildJobPostingSchema(city: City) {
  const monthlyMatch = city.income.displayRange.match(/[\d\s]+/);
  const monthlyValue = monthlyMatch
    ? parseInt(monthlyMatch[0].replace(/\s/g, ""), 10)
    : 100000;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `Водитель такси в ${city.namePrepositional}`,
    description: city.metaDescription,
    datePosted: new Date().toISOString().split("T")[0],
    employmentType: "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
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
  };
}
