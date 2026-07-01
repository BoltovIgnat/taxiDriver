import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { cities } from "@/data/cities";
import { getArticles } from "@/lib/articles/store";

export const dynamic = "force-dynamic";

/** Дата последнего обновления статических страниц (деплой / правки контента) */
const STATIC_CONTENT_UPDATED = new Date("2026-06-29");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const articles = await getArticles();

  const staticPages = [
    "",
    "/goroda",
    "/usloviya",
    "/kak-nachat",
    "/tarify-i-avto",
    "/tarify-i-avto/svoe-avto",
    "/tarify-i-avto/arenda",
    "/tarify-i-avto/bez-zaloga",
    "/skolko-mozhno-zarabotat",
    "/otzyvy",
    "/o-servise",
    "/blog",
    "/faq",
    "/kontakty",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      lastModified: STATIC_CONTENT_UPDATED,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...cities.map((city) => ({
      url: `${base}/taxi/${city.slug}`,
      lastModified: STATIC_CONTENT_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...articles.map((article) => ({
      url: `${base}/blog/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
