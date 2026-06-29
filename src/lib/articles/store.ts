import { promises as fs } from "fs";
import path from "path";
import type { Article } from "@/types";

const DATA_PATH = path.join(process.cwd(), "data", "articles.json");

async function readFile(): Promise<Article[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Article[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeFile(articles: Article[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(articles, null, 2) + "\n", "utf-8");
}

export async function getArticles(): Promise<Article[]> {
  const articles = await readFile();
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await readFile();
  return articles.find((a) => a.slug === slug);
}

export async function createArticle(article: Article): Promise<Article> {
  const articles = await readFile();
  if (articles.some((a) => a.slug === article.slug)) {
    throw new Error("Статья с таким URL уже существует");
  }
  articles.unshift(article);
  await writeFile(articles);
  return article;
}

export async function deleteArticle(slug: string): Promise<boolean> {
  const articles = await readFile();
  const next = articles.filter((a) => a.slug !== slug);
  if (next.length === articles.length) return false;
  await writeFile(next);
  return true;
}
