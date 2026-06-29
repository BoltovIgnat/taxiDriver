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
  { icon: "ri-wallet-3-line", label: "Выплаты каждый день" },
  { icon: "ri-timer-flash-line", label: "Старт за 1 день" },
  { icon: "ri-shield-check-line", label: "Без залога" },
  { icon: "ri-group-line", label: "5 000+ водителей" },
  { icon: "ri-star-fill", label: "Рейтинг 4.9" },
];

export function TrustStatsStrip() {
  return (
    <section className="border-y border-black/10 bg-accent py-5 md:py-6">
      <div className="container-main">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-lg text-accent">
                <i className={item.icon} aria-hidden />
              </span>
              <p className="text-sm font-bold leading-tight text-on-accent sm:text-base">
                {item.label}
              </p>
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
