import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BezelCard } from "@/components/ui/BezelCard";
import { SiteImage } from "@/components/ui/SiteImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { getArticleBySlug, getArticles } from "@/lib/articles/store";
import { imageFallbacks, images } from "@/config/images";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.description };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Блог", href: "/blog" },
          { label: article.title },
        ]}
      />
      <article className="section-padding bg-surface">
        <div className="container-main mx-auto max-w-3xl">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              {article.date} · {article.readTime}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{article.title}</h1>
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[2rem] ring-1 ring-black/[0.06] shadow-soft">
              <SiteImage
                src={images.blog.article}
                fallback={imageFallbacks.blog.article}
                alt={article.title}
                fill
                priority
                sizes="(max-width:768px) 100vw, 768px"
              />
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <BezelCard className="mt-10">
              <div className="whitespace-pre-line text-base leading-[1.85] text-steel">{article.content}</div>
            </BezelCard>
          </FadeIn>
        </div>
      </article>
    </>
  );
}
