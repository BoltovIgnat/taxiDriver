import type { Review } from "@/types";
import { BezelCard } from "@/components/ui/BezelCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";

export function ReviewsSection({
  reviews,
  title = "Отзывы водителей",
  showHeader = true,
}: {
  reviews: Review[];
  title?: string;
  showHeader?: boolean;
}) {
  return (
    <section className="section-padding bg-bg">
      <div className="container-main">
        {showHeader && (
          <FadeIn>
            <SectionHeader eyebrow="Отзывы" title={title} />
          </FadeIn>
        )}
        <div className={showHeader ? "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "grid gap-6 md:grid-cols-2 lg:grid-cols-3"}>
          {reviews.map((review, i) => (
            <FadeIn key={review.id} delay={i * 60}>
              <BezelCard className="flex h-full flex-col">
                <div className="mb-4 flex gap-0.5 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <i key={j} className="ri-star-fill text-lg" aria-hidden />
                  ))}
                </div>
                <p className="flex-1 text-base leading-relaxed text-steel">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-6 border-t border-black/[0.05] pt-4">
                  <p className="font-bold text-[var(--color-text)]">{review.name}</p>
                  <p className="text-sm text-muted">{review.city}</p>
                </div>
                {review.videoUrl && (
                  <div className="mt-4 aspect-video overflow-hidden rounded-2xl ring-1 ring-black/[0.06]">
                    <iframe
                      src={review.videoUrl}
                      title={`Отзыв ${review.name}`}
                      className="h-full w-full"
                      allowFullScreen
                    />
                  </div>
                )}
              </BezelCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
