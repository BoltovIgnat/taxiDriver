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
