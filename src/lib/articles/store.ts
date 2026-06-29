import configPromise from "@payload-config";
import { getPayload } from "payload";
import type { Article } from "@/types";

type ArticleDoc = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  content: string;
};

function formatDate(date: string): string {
  return date.includes("T") ? date.split("T")[0]! : date;
}

function toArticle(doc: ArticleDoc): Article {
  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    date: formatDate(doc.date),
    readTime: doc.readTime,
    content: doc.content,
  };
}

async function getPayloadClient() {
  return getPayload({ config: configPromise });
}

export async function getArticles(): Promise<Article[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "articles",
      sort: "-date",
      limit: 100,
      depth: 0,
    });
    return docs.map((doc) => toArticle(doc as unknown as ArticleDoc));
  } catch (error) {
    console.error("Failed to load articles from Payload:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "articles",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });
    const doc = docs[0];
    return doc ? toArticle(doc as unknown as ArticleDoc) : undefined;
  } catch (error) {
    console.error(`Failed to load article "${slug}" from Payload:`, error);
    return undefined;
  }
}
