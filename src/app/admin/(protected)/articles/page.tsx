import Link from "next/link";
import { ArticleList } from "@/components/admin/ArticleList";
import { getArticles } from "@/lib/articles/store";

export default async function AdminArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Статьи блога</h1>
          <p className="mt-1 text-sm text-muted">{articles.length} статей</p>
        </div>
        <Link href="/admin/articles/new" className="btn-primary inline-flex w-fit">
          + Новая статья
        </Link>
      </div>
      <ArticleList articles={articles} />
    </div>
  );
}
