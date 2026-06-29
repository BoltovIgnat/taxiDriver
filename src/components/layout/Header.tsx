"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { reachGoal } from "@/lib/analytics/yandex-metrika";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-6 md:pt-5">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex max-w-container items-center justify-between gap-4",
            "rounded-full bg-surface/90 px-4 py-2.5 shadow-float ring-1 ring-black/[0.06] backdrop-blur-xl md:px-6 md:py-3",
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-bold tracking-tight text-[var(--color-text)] md:text-lg"
          >
            <i className="ri-steering-2-fill text-xl text-accent" aria-hidden />
            <span className="hidden sm:inline">{siteConfig.name}</span>
            <span className="sm:hidden">Таксопарк</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 ease-premium",
                  pathname === item.href
                    ? "bg-accent-soft font-semibold text-[var(--color-steel)]"
                    : "text-steel hover:text-[var(--color-text)]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${siteConfig.phone}`}
              onClick={() => reachGoal("phone_click")}
              className="text-sm font-bold text-[var(--color-text)]"
            >
              {siteConfig.phoneDisplay}
            </a>
            <Button href="/#calculator" className="!px-5 !py-2.5 !text-sm" showArrow>
              Заявка
            </Button>
          </div>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-black/[0.06] lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
          >
            <span
              className={cn(
                "absolute h-0.5 w-5 bg-[var(--color-text)] transition-all duration-500 ease-premium",
                open ? "rotate-45" : "-translate-y-1.5",
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-5 bg-[var(--color-text)] transition-all duration-500 ease-premium",
                open ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-5 bg-[var(--color-text)] transition-all duration-500 ease-premium",
                open ? "-rotate-45" : "translate-y-1.5",
              )}
            />
          </button>
        </div>
      </header>

      <div className="h-[72px] md:h-[80px]" aria-hidden />

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[var(--color-hero)]/80 backdrop-blur-xl"
            onClick={() => setOpen(false)}
            aria-label="Закрыть"
          />
          <nav className="relative flex min-h-[100dvh] flex-col justify-center gap-2 px-8">
            {siteConfig.nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-3xl font-bold text-white transition-all duration-500 ease-premium"
                style={{ transitionDelay: `${100 + i * 50}ms` }}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${siteConfig.phone}`}
              onClick={() => reachGoal("phone_click")}
              className="mt-6 text-xl font-semibold text-white/80"
            >
              {siteConfig.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
