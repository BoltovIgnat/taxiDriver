"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Article } from "@/types";
import { BezelCard } from "@/components/ui/BezelCard";

export function ArticleList({ articles }: { articles: Article[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`Удалить статью «${title}»?`)) return;

    setDeleting(slug);
    try {
      const res = await fetch(`/api/admin/articles/${slug}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setDeleting(null);
    }
  }

  if (articles.length === 0) {
    return (
      <BezelCard className="text-center">
        <p className="text-muted">Статей пока нет</p>
        <Link href="/admin/articles/new" className="btn-primary mt-4 inline-flex">
          Добавить первую
        </Link>
      </BezelCard>
    );
  }

  return (
    <div className="space-y-3">
      {articles.map((article) => (
        <BezelCard key={article.slug} padding="sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs text-muted">
                {article.date} · {article.readTime}
              </p>
              <h2 className="mt-1 font-bold text-[var(--color-text)]">{article.title}</h2>
              <p className="mt-1 truncate text-sm text-muted">/blog/{article.slug}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href={`/blog/${article.slug}`}
                target="_blank"
                className="rounded-full px-4 py-2 text-sm font-medium text-accent ring-1 ring-black/[0.08] hover:bg-accent-soft"
              >
                Открыть
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(article.slug, article.title)}
                disabled={deleting === article.slug}
                className="rounded-full px-4 py-2 text-sm font-medium text-red-600 ring-1 ring-red-200 hover:bg-red-50 disabled:opacity-50"
              >
                {deleting === article.slug ? "..." : "Удалить"}
              </button>
            </div>
          </div>
        </BezelCard>
      ))}
    </div>
  );
}
