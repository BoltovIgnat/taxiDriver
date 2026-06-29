"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BezelCard } from "@/components/ui/BezelCard";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/articles/utils";

export function ArticleForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (autoSlug) setSlug(slugify(value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          content,
          slug: slug || undefined,
        }),
      });

      const data = (await res.json()) as { error?: string; article?: { slug: string } };

      if (!res.ok) {
        setError(data.error ?? "Ошибка сохранения");
        return;
      }

      router.push("/admin/articles");
      router.refresh();
    } catch {
      setError("Не удалось отправить запрос");
    } finally {
      setLoading(false);
    }
  }

  return (
    <BezelCard>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-semibold text-steel">
            Заголовок
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="input-field"
            placeholder="Работа водителем такси без опыта"
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="mb-2 block text-sm font-semibold text-steel">
            URL (slug)
          </label>
          <div className="flex gap-2">
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => {
                setAutoSlug(false);
                setSlug(e.target.value);
              }}
              className="input-field"
              placeholder="rabota-voditelem-bez-opyta"
              pattern="[a-z0-9-]+"
            />
          </div>
          <p className="mt-1 text-xs text-muted">Страница: /blog/{slug || "..."}</p>
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-semibold text-steel">
            Краткое описание
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field min-h-[80px] resize-y"
            placeholder="Текст для карточки в блоге и meta description"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="mb-2 block text-sm font-semibold text-steel">
            Текст статьи
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field min-h-[280px] resize-y font-mono text-sm"
            placeholder="Абзацы разделяйте пустой строкой"
            required
          />
        </div>

        {error && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Сохранение..." : "Опубликовать"}
          </Button>
          <Button type="button" variant="secondary" href="/admin/articles">
            Отмена
          </Button>
        </div>
      </form>
    </BezelCard>
  );
}
