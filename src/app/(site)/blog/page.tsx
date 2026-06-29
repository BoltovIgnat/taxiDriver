import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { BezelCard } from "@/components/ui/BezelCard";
import { SiteImage } from "@/components/ui/SiteImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { getArticles } from "@/lib/articles/store";
import { imageFallbacks, images } from "@/config/images";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Блог — статьи о работе в такси",
  description: "Полезные статьи для водителей такси: доход, документы, самозанятость, советы новичкам.",
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Блог" }]} />
      <PageHero
        eyebrow="Блог"
        title="Статьи для водителей"
        subtitle="Доход, документы, самозанятость и советы новичкам — всё в одном месте"
        imageSrc={images.blog.hero}
        imageFallback={imageFallbacks.blog.hero}
        imageAlt="Блог о работе в такси"
      />
      <section className="section-padding bg-bg pt-0">
        <div className="container-main grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <FadeIn key={article.slug} delay={i * 50}>
              <Link href={`/blog/${article.slug}`} className="group block h-full">
                <BezelCard className="h-full transition-transform duration-500 ease-premium group-hover:-translate-y-1">
                  <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-[calc(2rem-0.75rem)]">
                    <SiteImage
                      src={images.blog.article}
                      fallback={imageFallbacks.blog.article}
                      alt={article.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    {article.date} · {article.readTime}
                  </p>
                  <h2 className="mt-2 text-lg font-bold group-hover:text-accent">{article.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{article.description}</p>
                </BezelCard>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
