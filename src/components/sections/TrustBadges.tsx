import { TRUST_BADGE_LABELS, type TrustBadge } from "@/types";
import { siteConfig } from "@/config/site";

const BADGE_ICONS: Record<TrustBadge, string> = {
  "no-deposit": "ri-shield-check-line",
  "car-provided": "ri-car-line",
  "own-car": "ri-steering-2-line",
  "daily-payouts": "ri-wallet-3-line",
  "license-help": "ri-file-list-3-line",
  "direct-connection": "ri-rocket-line",
};

const HIGHLIGHTS = [
  { icon: "ri-wallet-3-line", title: "Выплаты каждый день", text: "Деньги на карту вечером" },
  { icon: "ri-timer-flash-line", title: "Старт за 1 день", text: "Документы и выход на линию" },
  { icon: "ri-shield-check-line", title: "Без залога", text: "Аренда авто без депозита" },
  { icon: "ri-group-line", title: "5 000+ водителей", text: "Уже работают с нами" },
  { icon: "ri-star-fill", title: "Рейтинг 4.9", text: "Поддержка 24/7" },
];

export function TrustStatsStrip() {
  return (
    <section id="trust-stats-strip" className="border-y border-black/10 bg-accent py-5 md:py-6">
      <div className="container-main">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="flex items-start gap-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-lg text-accent">
                <i className={item.icon} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="whitespace-nowrap text-sm font-bold leading-tight text-on-accent lg:text-[13px] xl:text-sm">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-on-accent/70 sm:text-sm">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustBadges({
  badges,
  variant = "dark",
}: {
  badges?: TrustBadge[];
  variant?: "dark" | "light";
}) {
  const items = badges ?? [...siteConfig.trustBadges];
  const cls = variant === "dark" ? "trust-badge-dark" : "trust-badge-light";

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((badge) => (
        <span key={badge} className={cls}>
          <i className={BADGE_ICONS[badge]} aria-hidden />
          {TRUST_BADGE_LABELS[badge]}
        </span>
      ))}
    </div>
  );
}
