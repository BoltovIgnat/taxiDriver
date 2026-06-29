import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  showArrow?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent shadow-glow hover:opacity-90 active:scale-[0.98]",
  secondary:
    "bg-surface text-[var(--color-text)] ring-1 ring-black/[0.08] hover:bg-bg active:scale-[0.98]",
  ghost: "text-[var(--color-steel)] hover:bg-accent-soft",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  disabled,
  onClick,
  showArrow = false,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5",
    "text-sm font-semibold transition-all duration-500 ease-premium",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    variants[variant],
    disabled && "pointer-events-none opacity-60",
    className,
  );

  const content = (
    <>
      {children}
      {showArrow && (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
          <i className="ri-arrow-right-up-line text-base" aria-hidden />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
