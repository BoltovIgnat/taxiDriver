"use client";

import { useState } from "react";
import type { FAQItem } from "@/types";
import { BezelCard } from "@/components/ui/BezelCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";

export function FAQSection({
  items,
  title = "Частые вопросы",
  showHeader = true,
}: {
  items: FAQItem[];
  title?: string;
  showHeader?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section className="section-padding bg-surface">
      <div className="container-main mx-auto max-w-3xl">
        {showHeader && (
          <FadeIn>
            <SectionHeader eyebrow="FAQ" title={title} />
          </FadeIn>
        )}
        <div className={showHeader ? "mt-12 space-y-3" : "space-y-3"}>
          {items.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <FadeIn key={item.id} delay={i * 50}>
                <BezelCard padding="sm" className="!p-1.5">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 rounded-[calc(2rem-0.375rem)] px-5 py-4 text-left font-semibold text-[var(--color-text)]"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    {item.question}
                    <i
                      className={`ri-arrow-down-s-line shrink-0 text-xl text-accent transition-transform duration-500 ease-premium ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.answer}</div>
                  )}
                </BezelCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
