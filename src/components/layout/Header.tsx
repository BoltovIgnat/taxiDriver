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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#111]">
        <div className="container-main flex h-16 items-center justify-between gap-4 md:h-[4.5rem] lg:max-w-[90%]">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-bold tracking-tight text-white md:text-lg"
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
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-300 ease-premium",
                  pathname === item.href
                    ? "bg-accent font-bold text-on-accent"
                    : "text-gray-300 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={`tel:${siteConfig.phone}`}
              onClick={() => reachGoal("phone_click")}
              className="text-sm font-bold text-white"
            >
              {siteConfig.phoneDisplay}
            </a>
            <Button id="header-cta" href="/#calculator" className="!px-5 !py-2.5 !text-sm !font-bold" showArrow>
              Стать водителем
            </Button>
          </div>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-white/15 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
          >
            <span
              className={cn(
                "absolute h-0.5 w-5 bg-white transition-all duration-500 ease-premium",
                open ? "rotate-45" : "-translate-y-1.5",
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-5 bg-white transition-all duration-500 ease-premium",
                open ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-5 bg-white transition-all duration-500 ease-premium",
                open ? "-rotate-45" : "translate-y-1.5",
              )}
            />
          </button>
        </div>
      </header>

      <div className="h-16 md:h-[4.5rem]" aria-hidden />

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#111]/95 backdrop-blur-xl"
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
            <Link
              href="/#calculator"
              className="btn-primary mt-8 inline-flex items-center justify-center !px-8 !py-4 !text-base !font-bold"
              onClick={() => setOpen(false)}
            >
              Стать водителем
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              onClick={() => reachGoal("phone_click")}
              className="mt-4 text-xl font-semibold text-gray-400"
            >
              {siteConfig.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
