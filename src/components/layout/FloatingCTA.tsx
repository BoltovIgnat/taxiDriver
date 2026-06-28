"use client";

import { siteConfig } from "@/config/site";
import { reachGoal } from "@/lib/analytics/yandex-metrika";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <a
        href={`https://wa.me/${siteConfig.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => reachGoal("messenger_click", { messenger: "whatsapp" })}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-float transition-transform duration-500 ease-premium hover:scale-105 active:scale-95"
        aria-label="WhatsApp"
      >
        <i className="ri-whatsapp-line text-xl" aria-hidden />
      </a>
      <a
        href={`https://t.me/${siteConfig.telegram}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => reachGoal("messenger_click", { messenger: "telegram" })}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0088cc] text-white shadow-float transition-transform duration-500 ease-premium hover:scale-105 active:scale-95"
        aria-label="Telegram"
      >
        <i className="ri-telegram-line text-xl" aria-hidden />
      </a>
      <a
        href={`tel:${siteConfig.phone}`}
        onClick={() => reachGoal("phone_click")}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-glow transition-transform duration-500 ease-premium hover:scale-105 active:scale-95"
        aria-label="Позвонить"
      >
        <i className="ri-phone-line text-xl" aria-hidden />
      </a>
    </div>
  );
}
