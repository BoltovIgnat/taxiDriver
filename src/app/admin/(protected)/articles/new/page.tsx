import { ArticleForm } from "@/components/admin/ArticleForm";

export default function AdminNewArticlePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-2xl font-bold">Новая статья</h1>
      <ArticleForm />
    </div>
  );
}
