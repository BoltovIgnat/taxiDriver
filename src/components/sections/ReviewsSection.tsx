import type { Review } from "@/types";
import { BezelCard } from "@/components/ui/BezelCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { SiteImage } from "@/components/ui/SiteImage";
import { imageFallbacks } from "@/config/images";

function getInitials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function ReviewAvatar({ review }: { review: Review }) {
  if (review.photo) {
    return (
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/40">
        <SiteImage
          src={review.photo}
          fallback={imageFallbacks.home.driverPortrait}
          alt={review.name}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-steel ring-2 ring-accent/40"
      aria-hidden
    >
      {getInitials(review.name)}
    </div>
  );
}

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
                <div className="mt-6 flex items-center gap-3 border-t border-black/[0.05] pt-4">
                  <ReviewAvatar review={review} />
                  <div>
                    <p className="font-bold text-[var(--color-text)]">{review.name}</p>
                    <p className="text-sm text-muted">{review.city}</p>
                  </div>
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
